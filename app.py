import base64
import json
import os
import uuid
from pathlib import Path
from typing import Optional

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, redirect, render_template, request, session, url_for
from PIL import Image, UnidentifiedImageError
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)
USERS_FILE = DATA_DIR / "users.json"
if not USERS_FILE.exists():
    USERS_FILE.write_text("[]", encoding="utf-8")

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024
app.config["UPLOAD_FOLDER"] = str(UPLOAD_DIR)
app.secret_key = os.getenv("SECRET_KEY", "mediassist-dev-secret-change-me")

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}
ALLOWED_IMAGE_FORMATS = {"PNG", "JPEG", "WEBP"}
SUPPORTED_LANGUAGES = {
    "en": "English",
    "mr": "Marathi",
    "hi": "Hindi",
}

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_CHAT_MODEL = os.getenv("OPENROUTER_CHAT_MODEL", "arcee-ai/trinity-large-preview:free")
OPENROUTER_VISION_MODEL = os.getenv("OPENROUTER_VISION_MODEL", OPENROUTER_CHAT_MODEL)
OPENROUTER_ENABLE_REASONING = os.getenv("OPENROUTER_ENABLE_REASONING", "true").lower() == "true"
SITE_URL = os.getenv("SITE_URL", "http://localhost:5000")
SITE_NAME = os.getenv("SITE_NAME", "MediAssist Pro")

HEALTH_TOPICS = [
    {
        "title": "Hydration Basics",
        "icon": "💧",
        "points": [
            "Drink water regularly during the day.",
            "Increase fluids in hot weather, fever, or exercise.",
            "Dark urine can be a sign you need more fluids.",
            "Get help if you feel faint or cannot keep fluids down.",
        ],
    },
    {
        "title": "Healthy Eating",
        "icon": "🥗",
        "points": [
            "Include fruits, vegetables, protein, and whole grains in meals.",
            "Reduce sugary drinks and ultra-processed snacks.",
            "Eat regular meals and avoid frequent skipping.",
            "Follow doctor advice for diabetes, kidney disease, or pregnancy.",
        ],
    },
    {
        "title": "Sleep Health",
        "icon": "😴",
        "points": [
            "Most adults need about 7 to 9 hours of sleep.",
            "Sleep and wake at similar times daily.",
            "Reduce caffeine and screen time late in the evening.",
            "Seek medical advice for severe insomnia or loud snoring.",
        ],
    },
    {
        "title": "Basic First Aid",
        "icon": "🩹",
        "points": [
            "Wash minor cuts with clean water and cover them.",
            "Cool minor burns with running water, not ice.",
            "Watch fever, pain, and swelling for worsening signs.",
            "Get urgent care for trouble breathing, chest pain, or heavy bleeding.",
        ],
    },
]


def read_users() -> list[dict]:
    try:
        return json.loads(USERS_FILE.read_text(encoding="utf-8"))
    except Exception:
        return []


def write_users(users: list[dict]) -> None:
    USERS_FILE.write_text(json.dumps(users, indent=2), encoding="utf-8")


def get_user_by_email(email: str) -> Optional[dict]:
    email = (email or "").strip().lower()
    for user in read_users():
        if user.get("email") == email:
            return user
    return None


def is_logged_in() -> bool:
    return bool(session.get("user_email"))


def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def calculate_bmi(height_cm: float, weight_kg: float) -> dict:
    height_m = height_cm / 100
    bmi = round(weight_kg / (height_m * height_m), 1)
    if bmi < 18.5:
        category = "Underweight"
        tip = "Try balanced meals with enough protein and calories."
    elif bmi < 25:
        category = "Normal"
        tip = "Keep a balanced diet, exercise, and regular sleep."
    elif bmi < 30:
        category = "Overweight"
        tip = "Focus on regular walking, portion control, and hydration."
    else:
        category = "Obesity"
        tip = "Consider medical guidance for safe weight management."
    return {"bmi": bmi, "category": category, "tip": tip}


def basic_skin_fallback(symptoms: str, language_name: str = "English") -> dict:
    text = (symptoms or "").lower()
    if any(word in text for word in ["itch", "itching", "red", "rash"]):
        likely = "Possible irritation, allergy, or a mild rash"
        care = [
            "Keep the area clean and dry.",
            "Avoid scratching and avoid new cosmetic products.",
            "Use gentle soap and avoid harsh chemicals.",
            "See a doctor if it spreads, becomes painful, or lasts more than a few days.",
        ]
    elif any(word in text for word in ["acne", "pimple", "spots"]):
        likely = "Acne-like skin concern"
        care = [
            "Wash gently twice daily.",
            "Do not squeeze pimples.",
            "Use non-comedogenic skin products.",
            "See a dermatologist if it is severe or scarring.",
        ]
    elif any(word in text for word in ["dry", "flaky", "peeling"]):
        likely = "Dry skin or mild eczema-like irritation"
        care = [
            "Use fragrance-free moisturizer regularly.",
            "Avoid very hot showers.",
            "Use mild soap only when needed.",
            "See a doctor if cracks, bleeding, or infection signs appear.",
        ]
    else:
        likely = "General skin concern that needs closer review"
        care = [
            "Keep the area clean and dry.",
            "Avoid self-medicating with strong creams.",
            "Monitor for pain, swelling, discharge, or fever.",
            "Consult a dermatologist for a proper diagnosis.",
        ]
    return {
        "analysis": likely,
        "care": care,
        "warning": f"This is educational support only and not a confirmed diagnosis. Preferred response language: {language_name}.",
    }


def validate_and_save_image(file_storage) -> tuple[Path, str]:
    if not file_storage or not file_storage.filename:
        raise ValueError("Please upload an image.")

    if not allowed_file(file_storage.filename):
        raise ValueError("Allowed image types: png, jpg, jpeg, webp.")

    original_name = secure_filename(file_storage.filename)
    extension = Path(original_name).suffix.lower() or ".jpg"
    unique_name = f"{Path(original_name).stem}_{uuid.uuid4().hex[:8]}{extension}"
    save_path = UPLOAD_DIR / unique_name

    try:
        file_storage.stream.seek(0)
        image = Image.open(file_storage.stream)
        image_format = (image.format or "").upper()

        if image_format not in ALLOWED_IMAGE_FORMATS:
            raise ValueError("Invalid image format. Use png, jpg, jpeg, or webp.")

        image.verify()

        file_storage.stream.seek(0)
        with Image.open(file_storage.stream) as valid_image:
            valid_image.save(save_path)

        mime_map = {
            "JPEG": "image/jpeg",
            "PNG": "image/png",
            "WEBP": "image/webp",
        }
        mime_type = mime_map.get(image_format, "image/jpeg")
        return save_path, mime_type

    except UnidentifiedImageError as exc:
        raise ValueError("The uploaded file is not a valid image.") from exc
    except ValueError:
        raise
    except Exception as exc:
        raise ValueError("Could not process the uploaded image.") from exc


def build_openrouter_payload(messages: list, model: Optional[str] = None) -> dict:
    payload = {
        "model": model or OPENROUTER_CHAT_MODEL,
        "messages": messages,
        "temperature": 0.3,
    }
    if OPENROUTER_ENABLE_REASONING:
        payload["reasoning"] = {"enabled": True}
    return payload


def call_openrouter(messages: list, model: Optional[str] = None) -> dict:
    if not OPENROUTER_API_KEY:
        raise RuntimeError("Missing OPENROUTER_API_KEY")

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": SITE_URL,
            "X-Title": SITE_NAME,
            "Content-Type": "application/json",
        },
        json=build_openrouter_payload(messages, model=model),
        timeout=90,
    )
    response.raise_for_status()
    return response.json()


def clean_json_text(raw_text: str) -> str:
    if not raw_text:
        return ""

    text = raw_text.strip()
    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]

    if text.endswith("```"):
        text = text[:-3]

    return text.strip()


def safe_list(value, default=None) -> list[str]:
    if default is None:
        default = []
    if isinstance(value, list):
        cleaned = [str(item).strip() for item in value if str(item).strip()]
        return cleaned if cleaned else default
    if isinstance(value, str) and value.strip():
        return [value.strip()]
    return default


def normalize_chat_response(raw_content: str, language_name: str) -> dict:
    default_response = {
        "likely_concern": "General health concern that needs symptom-based review",
        "medicines": ["Take medicine only with advice from a qualified doctor or pharmacist."],
        "basic_home_remedies": ["Rest well.", "Drink enough water.", "Monitor your symptoms."],
        "diet_plan": ["Eat light and nutritious food.", "Avoid very oily or heavy meals if unwell."],
        "precautions": ["Avoid self-medicating with strong medicines.", "Watch for worsening symptoms."],
        "when_to_see_doctor": ["See a doctor if symptoms are severe, worsening, or not improving."],
        "disclaimer": f"This is educational support only and not a confirmed diagnosis. Response language: {language_name}.",
    }

    if not raw_content:
        return default_response

    try:
        parsed = json.loads(clean_json_text(raw_content))
        return {
            "likely_concern": str(parsed.get("likely_concern", default_response["likely_concern"])).strip(),
            "medicines": safe_list(parsed.get("medicines"), default_response["medicines"]),
            "basic_home_remedies": safe_list(parsed.get("basic_home_remedies"), default_response["basic_home_remedies"]),
            "diet_plan": safe_list(parsed.get("diet_plan"), default_response["diet_plan"]),
            "precautions": safe_list(parsed.get("precautions"), default_response["precautions"]),
            "when_to_see_doctor": safe_list(parsed.get("when_to_see_doctor"), default_response["when_to_see_doctor"]),
            "disclaimer": str(parsed.get("disclaimer", default_response["disclaimer"])).strip(),
        }
    except Exception:
        return {
            "likely_concern": "General health concern that needs symptom-based review",
            "medicines": ["Take medicine only with proper medical advice."],
            "basic_home_remedies": ["Rest.", "Hydrate well.", "Monitor symptoms."],
            "diet_plan": ["Eat simple, light, and nutritious food."],
            "precautions": ["Avoid strong self-medication."],
            "when_to_see_doctor": ["See a doctor if symptoms become severe or persistent."],
            "disclaimer": raw_content.strip() or default_response["disclaimer"],
        }


def build_chat_fallback(message: str, language_name: str) -> dict:
    return {
        "likely_concern": f"General guidance for: {message}",
        "medicines": [
            "Use medicine only if suitable and with advice from a qualified doctor or pharmacist.",
            "Do not start antibiotics or strong medicines without guidance.",
        ],
        "basic_home_remedies": [
            "Get enough rest.",
            "Drink water or other fluids regularly.",
            "Keep watching for changes in your symptoms.",
        ],
        "diet_plan": [
            "Choose light and nutritious meals.",
            "Avoid junk food and very heavy meals while unwell.",
        ],
        "precautions": [
            "Avoid ignoring severe warning signs.",
            "Avoid self-medication with strong drugs.",
        ],
        "when_to_see_doctor": [
            "See a doctor if symptoms get worse.",
            "See a doctor if symptoms last for several days.",
            "Get urgent medical care for breathing trouble, chest pain, fainting, or severe weakness.",
        ],
        "disclaimer": f"This is educational support only and not a confirmed diagnosis. Response language: {language_name}.",
    }


# ---------------- INTRO PAGE ----------------
@app.get("/")
def intro_page():
    return render_template("intro.html")


# ---------------- LOGIN PAGE ----------------
@app.get("/login")
def login_page():
    if is_logged_in():
        return redirect(url_for("main_home"))
    return render_template("login.html")


# ---------------- MAIN APP PAGE ----------------
@app.get("/home")
def main_home():
    if not is_logged_in():
        return redirect(url_for("login_page"))
    return render_template(
        "index.html",
        health_topics=HEALTH_TOPICS,
        languages=SUPPORTED_LANGUAGES,
        user_name=session.get("user_name", "Guest"),
        user_email=session.get("user_email", ""),
    )


@app.get("/health")
def health_check():
    return jsonify({"status": "ok", "message": "MediAssist Pro is running"})


@app.get("/api/session")
def session_api():
    return jsonify(
        {
            "authenticated": is_logged_in(),
            "user": {
                "name": session.get("user_name"),
                "email": session.get("user_email"),
            } if is_logged_in() else None,
            "languages": SUPPORTED_LANGUAGES,
        }
    )


@app.post("/api/auth/register")
def register_api():
    data = request.get_json(force=True)
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if len(name) < 2:
        return jsonify({"error": "Name must be at least 2 characters."}), 400
    if "@" not in email or "." not in email:
        return jsonify({"error": "Please enter a valid email."}), 400
    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters."}), 400
    if get_user_by_email(email):
        return jsonify({"error": "An account with this email already exists."}), 400

    users = read_users()
    users.append(
        {
            "id": uuid.uuid4().hex,
            "name": name,
            "email": email,
            "password_hash": generate_password_hash(password),
        }
    )
    write_users(users)
    session["user_name"] = name
    session["user_email"] = email
    return jsonify({"message": "Registration successful.", "user": {"name": name, "email": email}})


@app.post("/api/auth/login")
def login_api():
    data = request.get_json(force=True)
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    user = get_user_by_email(email)
    if not user or not check_password_hash(user.get("password_hash", ""), password):
        return jsonify({"error": "Invalid email or password."}), 401

    session["user_name"] = user.get("name")
    session["user_email"] = user.get("email")
    return jsonify({
        "message": "Login successful.",
        "user": {"name": user.get("name"), "email": user.get("email")},
        "redirect": "/home"
    })


@app.post("/api/auth/logout")
def logout_api():
    session.clear()
    return jsonify({"message": "Logged out successfully."})


@app.post("/api/bmi")
def bmi_api():
    if not is_logged_in():
        return jsonify({"error": "Please login first."}), 401
    data = request.get_json(force=True)
    try:
        height_cm = float(data.get("height_cm", 0))
        weight_kg = float(data.get("weight_kg", 0))
        if height_cm <= 0 or weight_kg <= 0:
            return jsonify({"error": "Height and weight must be greater than zero."}), 400
        return jsonify(calculate_bmi(height_cm, weight_kg))
    except (TypeError, ValueError):
        return jsonify({"error": "Please enter valid numeric values."}), 400


@app.post("/api/chat")
def chat_api():
    if not is_logged_in():
        return jsonify({"error": "Please login first."}), 401

    data = request.get_json(force=True)
    message = (data.get("message") or "").strip()
    language_code = (data.get("language") or "en").strip().lower()
    language_name = SUPPORTED_LANGUAGES.get(language_code, "English")

    if not message:
        return jsonify({"error": "Message is required."}), 400

    system_prompt = (
        "You are MediAssist, a careful health education assistant. "
        "Never claim a confirmed diagnosis. "
        "Reply only in valid JSON. Do not add markdown or code fences. "
        "Use exactly these keys: likely_concern, medicines, basic_home_remedies, diet_plan, precautions, when_to_see_doctor, disclaimer. "
        "Rules: likely_concern must be a short string. "
        "All other sections except disclaimer must be arrays of short bullet-style strings. "
        "Medicines should stay safe and general, without risky dosing. "
        "Home remedies should be simple and practical. "
        "Diet plan should be easy for everyday use. "
        "Precautions should be clear and short. "
        "When_to_see_doctor should mention red flags and when medical care is needed. "
        f"Reply entirely in {language_name}. "
        "Disclaimer must clearly say this is educational support only and not a confirmed diagnosis."
    )

    if OPENROUTER_API_KEY:
        try:
            payload = call_openrouter([
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message},
            ])
            choice_message = payload["choices"][0]["message"]
            raw_reply = choice_message.get("content", "")
            reasoning_details = choice_message.get("reasoning_details")
            structured_reply = normalize_chat_response(raw_reply, language_name)
            return jsonify({
                "reply": raw_reply,
                "structured_reply": structured_reply,
                "source": "ai",
                "reasoning_details": reasoning_details,
            })
        except Exception as exc:
            fallback_data = build_chat_fallback(message, language_name)
            return jsonify({
                "reply": fallback_data["likely_concern"],
                "structured_reply": fallback_data,
                "source": "fallback",
                "detail": str(exc),
            })

    fallback_data = build_chat_fallback(message, language_name)
    return jsonify({
        "reply": fallback_data["likely_concern"],
        "structured_reply": fallback_data,
        "source": "fallback",
    })


@app.post("/api/skin-scan")
def skin_scan_api():
    if not is_logged_in():
        return jsonify({"error": "Please login first."}), 401

    image = request.files.get("image")
    symptoms = (request.form.get("symptoms") or "").strip()
    language_code = (request.form.get("language") or "en").strip().lower()
    language_name = SUPPORTED_LANGUAGES.get(language_code, "English")

    try:
        save_path, mime_type = validate_and_save_image(image)
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400

    if OPENROUTER_API_KEY:
        try:
            image_b64 = base64.b64encode(save_path.read_bytes()).decode("utf-8")
            prompt = (
                "You are a cautious skin-health assistant. Analyze the uploaded skin image carefully. "
                "Do not identify it as a confirmed disease. "
                "Return JSON with keys: analysis, care, warning, see_doctor_when. "
                "Each care item should be short. Mention urgent care if severe infection or emergency signs are visible. "
                f"Write all values in {language_name}. "
                f"User symptoms/notes: {symptoms or 'none'}"
            )
            payload = call_openrouter([
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{image_b64}"}},
                    ],
                }
            ], model=OPENROUTER_VISION_MODEL)
            raw = payload["choices"][0]["message"]["content"]
            try:
                parsed = json.loads(raw)
                return jsonify({"result": parsed, "source": "ai"})
            except json.JSONDecodeError:
                return jsonify({
                    "result": {
                        "analysis": raw,
                        "care": [
                            "Keep the area clean and dry.",
                            "Avoid scratching and harsh skin products.",
                            "See a doctor if it gets worse or spreads.",
                        ],
                        "warning": f"This is educational support only and not a confirmed diagnosis. Preferred response language: {language_name}.",
                        "see_doctor_when": "Get medical help if there is pus, severe pain, fever, fast spreading redness, or eye/genital involvement.",
                    },
                    "source": "ai",
                })
        except Exception:
            pass

    result = basic_skin_fallback(symptoms, language_name=language_name)
    result["see_doctor_when"] = (
        "See a doctor if the rash spreads, becomes very painful, causes fever, shows pus, or does not improve."
    )
    return jsonify({"result": result, "source": "fallback"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)