const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const clearChatBtn = document.getElementById("clearChatBtn");
const bmiForm = document.getElementById("bmiForm");
const bmiResult = document.getElementById("bmiResult");
const skinForm = document.getElementById("skinForm");
const skinImage = document.getElementById("skinImage");
const skinSymptoms = document.getElementById("skinSymptoms");
const skinPreview = document.getElementById("skinPreview");
const skinPreviewWrap = document.getElementById("skinPreviewWrap");
const skinResult = document.getElementById("skinResult");
const themeToggle = document.getElementById("themeToggle");
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".panel, .panel-grid");
const languageSelect = document.getElementById("languageSelect");
const logoutBtn = document.getElementById("logoutBtn");
const micBtn = document.getElementById("micBtn");
const voiceStatusBadge = document.getElementById("voiceStatusBadge");
const speakReplyBtn = document.getElementById("speakReplyBtn");
const quickNavs = document.querySelectorAll(".quick-nav");
const addWaterBtn = document.getElementById("addWaterBtn");
const resetWaterBtn = document.getElementById("resetWaterBtn");
const waterProgressText = document.getElementById("waterProgressText");
const waterProgressBar = document.getElementById("waterProgressBar");
const sidebarWaterCount = document.getElementById("sidebarWaterCount");
const medicineForm = document.getElementById("medicineForm");
const medicineInput = document.getElementById("medicineInput");
const medicineList = document.getElementById("medicineList");
const sidebarMedicineCount = document.getElementById("sidebarMedicineCount");
const dailyFocusCard = document.getElementById("dailyFocusCard");
const refreshFocusBtn = document.getElementById("refreshFocusBtn");
const todayDateChip = document.getElementById("todayDateChip");
const sidebar = document.getElementById("sidebar");
const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
const layout = document.querySelector(".layout");
// 🔥 NEW: Skin Scan inside Chat
const openSkinScanBtn = document.getElementById("openSkinScanBtn");
const closeSkinScanBtn = document.getElementById("closeSkinScanBtn");
const skinScanChatBox = document.getElementById("skinScanChatBox");

const STORAGE_KEY = "mediassist_pro_chat";
const LANGUAGE_KEY = "mediassist_language";
const THEME_KEY = "mediassist_theme";
const WATER_KEY = "mediassist_water";
const MEDICINE_KEY = "mediassist_medicines";
const SIDEBAR_KEY = "mediassist_sidebar_collapsed";

const TRANSLATIONS = {
  en: {
    open_skin_scan_btn: "🖼 Skin Scan",
    close_btn: "✖ Close",
    brand_badge: "✨ AI • 🎙 Voice • ❤️ Everyday Health",
    live_dashboard: "Live Dashboard",
    app_title: "🩺 MediAssist Pro",
    topbar_subtitle: "Smarter daily care for chat guidance, skin support, BMI tracking, hydration, medicine planning, and nearby care.",
    language_label: "🌐 Language",
    theme_btn: "🌙 Theme",
    clear_chat_btn: "🗑 Clear Chat",
    logout_btn: "↩ Logout",
    health_hub_title: "🧭 Health Hub",
    health_hub_desc: "Simple tools you can use every day from one place.",
    languages_stat: "Languages",
    voice_chat_stat: "Voice Chat",
    daily_water_stat: "Daily Water",
    medicines_stat: "Medicines",
    ready_text: "Ready",
    nav_overview: "✨ Overview",
    nav_chat: "💬 AI Chat",
    nav_daily: "🫶 Daily Care",
    nav_bmi: "⚖ BMI",
    nav_skin: "🖼 Skin Scan",
    nav_map: "📍 Nearby Care",
    nav_study: "📘 Health Study",
    safety_note_title: "Safety note",
    safety_note_desc: "This app gives educational support only. In emergencies or for worsening symptoms, get real medical help quickly.",
    overview_title: "Your everyday wellness cockpit",
    overview_desc: "Track water, manage simple medicine reminders, ask health questions, scan skin concerns, and find nearby hospitals or pharmacies with fewer clicks.",
    start_chat_btn: "Start Chat",
    open_daily_care_btn: "Open Daily Care",
    quick_ask_ai_title: "Ask AI",
    quick_ask_ai_desc: "Use text or mic for quick health guidance in your language.",
    quick_daily_care_title: "Daily Care",
    quick_daily_care_desc: "Track water intake and medicine tasks for the day.",
    quick_skin_scan_title: "Skin Scan",
    quick_skin_scan_desc: "Upload a skin image and get careful educational guidance.",
    quick_nearby_care_title: "Nearby Care",
    quick_nearby_care_desc: "Locate hospitals, clinics, doctors, and pharmacies near you.",
    chat_title: "Health Chat Assistant",
    chat_desc: "Use keyboard or mic. Answers follow your selected language.",
    mic_ready: "Mic ready",
    chat_placeholder: "Describe your symptoms or ask a health question...",
    speak_btn: "🎙️ Speak",
    read_last_reply_btn: "🔊 Read last reply",
    send_btn: "Send",
    daily_dashboard_title: "Daily Care Dashboard",
    daily_dashboard_desc: "Designed for everyday life with simple health habits and reminders.",
    today_text: "Today",
    water_tracker_title: "💧 Water Tracker",
    add_glass_btn: "+ Add Glass",
    reset_btn: "Reset",
    medicine_planner_title: "💊 Medicine Planner",
    local_checklist_text: "Local checklist",
    medicine_input_placeholder: "Add medicine or vitamin",
    add_btn: "Add",
    no_medicines: "No medicines added yet.",
    wellness_focus_title: "🧘 Wellness Focus",
    wellness_focus_subtitle: "Small actions, daily impact",
    refresh_tip_btn: "Refresh Tip",
    bmi_title: "BMI Calculator",
    bmi_desc: "Quick body mass index estimate",
    height_label: "Height (cm)",
    weight_label: "Weight (kg)",
    calculate_bmi_btn: "Calculate BMI",
    bmi_result_default: "Enter height and weight to calculate BMI.",
    skin_scan_title: "Skin Scan",
    skin_scan_desc: "Upload a photo and add short notes for educational guidance.",
    upload_image_label: "Upload image",
    symptoms_notes_label: "Symptoms / notes",
    skin_notes_placeholder: "Example: itching, redness, dryness, pain",
    scan_image_btn: "Scan Image",
    skin_result_default: "Upload an image to get educational guidance.",
    map_title: "Nearby Care Finder",
    map_desc: "Find doctors, hospitals, clinics & pharmacies within 5 km — tap 🗺️ on a result for directions.",
    map_doctors: "👨‍⚕️ Doctors",
    map_hospitals: "🏥 Hospitals",
    map_clinics: "🏨 Clinics",
    map_pharmacy: "💊 Pharmacy",
    use_my_location_btn: "📍 Use My Location",
    clear_route_btn: "✕ Clear Route",
    map_default_message: "Press Use My Location to find nearby care.",
    study_title: "Basic Health Study",
    study_desc: "Beginner-friendly health notes",

    thinking: "Thinking...",
    chat_service_unavailable: "The chat service is unavailable right now.",
    choose_image_first: "Please choose an image first.",
    scanning_image: "Scanning image...",
    skin_service_unavailable: "Skin scan service is unavailable right now.",
    analysis_label: "Analysis",
    care_label: "Care",
    warning_label: "Warning",
    doctor_label: "Doctor",
    likely_concern_label: "Likely concern",
    medicines_label: "Medicines",
    remedies_label: "Basic home remedies",
    diet_label: "Diet plan",
    precaution_label: "Precaution",
    doctor_when_label: "When to see a doctor",
    bmi_label: "BMI",
    category_label: "Category",
    tip_label: "Tip",
    error_label: "Error",
    not_available: "Not available",
    not_confirmed_diagnosis: "This is not a confirmed diagnosis.",
    symptoms_worse_default: "If symptoms get worse or do not improve.",
    done_suffix: "done",
    glasses_suffix: "glasses",
    mic_listening: "Listening...",
    mic_not_supported: "Mic not supported",
    mic_starting: "Starting mic...",
    mic_permission_denied: "Mic permission denied",
    mic_service_blocked: "Speech service blocked",
    mic_no_speech: "No speech detected",
    mic_not_found: "Microphone not found",
    mic_network_error: "Network error",
    mic_stopped: "Mic stopped",
    loading_route: "Loading route...",
    route_ready: "Route ready",
    route_failed: "Route failed",
    searching_places: "Searching...",
    locating_text: "Locating...",
    denied_text: "Denied",
    no_results: "No results",
    error_text: "Error",
    getting_location: "Getting your location...",
    no_places_found: "No places found within 5 km. Try again in another area.",
    could_not_load_results: "Could not load results. Check your connection.",
    geolocation_not_supported: "Geolocation not supported.",
    location_denied: "Location access denied. Please allow location in your browser.",
    you_are_here: "📍 You are here",
    km_away: "away",
    by_car: "by car",
    unnamed: "unnamed"

    
  },

  mr: {
    open_skin_scan_btn: "🖼 त्वचा तपासणी",
    close_btn: "✖ बंद करा",
    brand_badge: "✨ AI • 🎙 आवाज • ❤️ दैनंदिन आरोग्य",
    live_dashboard: "लाईव्ह डॅशबोर्ड",
    app_title: "🩺 MediAssist Pro",
    topbar_subtitle: "चॅट मार्गदर्शन, त्वचा सहाय्य, BMI तपासणी, पाणी ट्रॅकिंग, औषध नियोजन आणि जवळील आरोग्य सेवा यासाठी स्मार्ट दैनंदिन मदत.",
    language_label: "🌐 भाषा",
    theme_btn: "🌙 थीम",
    clear_chat_btn: "🗑 चॅट साफ करा",
    logout_btn: "↩ लॉगआउट",
    health_hub_title: "🧭 हेल्थ हब",
    health_hub_desc: "दररोज वापरता येतील अशी सोपी साधने एका ठिकाणी.",
    languages_stat: "भाषा",
    voice_chat_stat: "व्हॉइस चॅट",
    daily_water_stat: "दैनिक पाणी",
    medicines_stat: "औषधे",
    ready_text: "तयार",
    nav_overview: "✨ आढावा",
    nav_chat: "💬 AI चॅट",
    nav_daily: "🫶 दैनंदिन काळजी",
    nav_bmi: "⚖ BMI",
    nav_skin: "🖼 त्वचा तपासणी",
    nav_map: "📍 जवळील सेवा",
    nav_study: "📘 आरोग्य अभ्यास",
    safety_note_title: "सुरक्षा सूचना",
    safety_note_desc: "हे अॅप फक्त शैक्षणिक मदत देते. आपत्कालीन स्थितीत किंवा लक्षणे वाढल्यास खऱ्या डॉक्टरांची मदत घ्या.",
    overview_title: "तुमचे दैनंदिन वेलनेस कॉकपिट",
    overview_desc: "पाणी ट्रॅक करा, औषध स्मरण ठेवा, आरोग्य प्रश्न विचारा, त्वचा तपासा आणि जवळील रुग्णालये किंवा फार्मसी शोधा.",
    start_chat_btn: "चॅट सुरू करा",
    open_daily_care_btn: "दैनंदिन काळजी उघडा",
    quick_ask_ai_title: "AI ला विचारा",
    quick_ask_ai_desc: "तुमच्या भाषेत जलद आरोग्य मार्गदर्शनासाठी मजकूर किंवा माइक वापरा.",
    quick_daily_care_title: "दैनंदिन काळजी",
    quick_daily_care_desc: "दिवसाचे पाणी आणि औषधांची कामे ट्रॅक करा.",
    quick_skin_scan_title: "त्वचा तपासणी",
    quick_skin_scan_desc: "त्वचेचा फोटो अपलोड करा आणि शैक्षणिक मार्गदर्शन मिळवा.",
    quick_nearby_care_title: "जवळील सेवा",
    quick_nearby_care_desc: "जवळील रुग्णालये, क्लिनिक, डॉक्टर आणि फार्मसी शोधा.",
    chat_title: "आरोग्य चॅट सहाय्यक",
    chat_desc: "कीबोर्ड किंवा माइक वापरा. उत्तरे निवडलेल्या भाषेत मिळतील.",
    mic_ready: "माइक तयार आहे",
    chat_placeholder: "तुमची लक्षणे लिहा किंवा आरोग्यविषयक प्रश्न विचारा...",
    speak_btn: "🎙️ बोला",
    read_last_reply_btn: "🔊 शेवटचे उत्तर वाचा",
    send_btn: "पाठवा",
    daily_dashboard_title: "दैनंदिन काळजी डॅशबोर्ड",
    daily_dashboard_desc: "सोप्या आरोग्य सवयी आणि स्मरणांसाठी डिझाइन केलेले.",
    today_text: "आज",
    water_tracker_title: "💧 पाणी ट्रॅकर",
    add_glass_btn: "+ ग्लास जोडा",
    reset_btn: "रीसेट",
    medicine_planner_title: "💊 औषध नियोजक",
    local_checklist_text: "स्थानिक यादी",
    medicine_input_placeholder: "औषध किंवा व्हिटॅमिन जोडा",
    add_btn: "जोडा",
    no_medicines: "अजून औषधे जोडलेली नाहीत.",
    wellness_focus_title: "🧘 वेलनेस फोकस",
    wellness_focus_subtitle: "लहान कृती, मोठा परिणाम",
    refresh_tip_btn: "टिप रीफ्रेश करा",
    bmi_title: "BMI कॅल्क्युलेटर",
    bmi_desc: "जलद बॉडी मास इंडेक्स अंदाज",
    height_label: "उंची (सेमी)",
    weight_label: "वजन (कि.ग्रॅ.)",
    calculate_bmi_btn: "BMI मोजा",
    bmi_result_default: "BMI मोजण्यासाठी उंची आणि वजन भरा.",
    skin_scan_title: "त्वचा तपासणी",
    skin_scan_desc: "फोटो अपलोड करा आणि शैक्षणिक मार्गदर्शनासाठी छोटी नोंद जोडा.",
    upload_image_label: "प्रतिमा अपलोड करा",
    symptoms_notes_label: "लक्षणे / नोंदी",
    skin_notes_placeholder: "उदा.: खाज, लालसरपणा, कोरडेपणा, वेदना",
    scan_image_btn: "प्रतिमा तपासा",
    skin_result_default: "शैक्षणिक मार्गदर्शनासाठी प्रतिमा अपलोड करा.",
    map_title: "जवळील आरोग्य सेवा शोधक",
    map_desc: "5 किमी परिसरातील डॉक्टर, रुग्णालये, क्लिनिक आणि फार्मसी शोधा — दिशांसाठी निकालावर 🗺️ दाबा.",
    map_doctors: "👨‍⚕️ डॉक्टर",
    map_hospitals: "🏥 रुग्णालये",
    map_clinics: "🏨 क्लिनिक",
    map_pharmacy: "💊 फार्मसी",
    use_my_location_btn: "📍 माझे स्थान वापरा",
    clear_route_btn: "✕ मार्ग हटवा",
    map_default_message: "जवळील सेवा शोधण्यासाठी माझे स्थान वापरा दाबा.",
    study_title: "मूलभूत आरोग्य अभ्यास",
    study_desc: "सोप्या भाषेतील आरोग्य टिपा",

    thinking: "विचार करत आहे...",
    chat_service_unavailable: "चॅट सेवा सध्या उपलब्ध नाही.",
    choose_image_first: "कृपया आधी प्रतिमा निवडा.",
    scanning_image: "प्रतिमा तपासत आहे...",
    skin_service_unavailable: "त्वचा तपासणी सेवा सध्या उपलब्ध नाही.",
    analysis_label: "विश्लेषण",
    care_label: "काळजी",
    warning_label: "इशारा",
    doctor_label: "डॉक्टर",
    likely_concern_label: "संभाव्य समस्या",
    medicines_label: "औषधे",
    remedies_label: "घरगुती उपाय",
    diet_label: "आहार योजना",
    precaution_label: "काळजी",
    doctor_when_label: "डॉक्टरांना कधी भेटावे",
    bmi_label: "BMI",
    category_label: "प्रकार",
    tip_label: "सल्ला",
    error_label: "त्रुटी",
    not_available: "उपलब्ध नाही",
    not_confirmed_diagnosis: "हे निश्चित निदान नाही.",
    symptoms_worse_default: "लक्षणे वाढल्यास किंवा सुधारणा न झाल्यास डॉक्टरांना भेटा.",
    done_suffix: "पूर्ण",
    glasses_suffix: "ग्लास",
    mic_listening: "ऐकत आहे...",
    mic_not_supported: "माइक समर्थित नाही",
    mic_starting: "माइक सुरू होत आहे...",
    mic_permission_denied: "माइक परवानगी नाकारली",
    mic_service_blocked: "स्पीच सेवा बंद आहे",
    mic_no_speech: "आवाज आढळला नाही",
    mic_not_found: "माइक सापडला नाही",
    mic_network_error: "नेटवर्क त्रुटी",
    mic_stopped: "माइक थांबला",
    loading_route: "मार्ग लोड होत आहे...",
    route_ready: "मार्ग तयार",
    route_failed: "मार्ग मिळाला नाही",
    searching_places: "शोध सुरू आहे...",
    locating_text: "स्थान शोधत आहे...",
    denied_text: "नकार दिला",
    no_results: "निकाल नाही",
    error_text: "त्रुटी",
    getting_location: "तुमचे स्थान मिळवत आहे...",
    no_places_found: "5 किमी परिसरात काही ठिकाणे सापडली नाहीत. दुसऱ्या भागात पुन्हा प्रयत्न करा.",
    could_not_load_results: "निकाल लोड करता आले नाहीत. तुमचे नेटवर्क तपासा.",
    geolocation_not_supported: "Geolocation समर्थित नाही.",
    location_denied: "स्थान परवानगी नाकारली. कृपया ब्राउझरमध्ये परवानगी द्या.",
    you_are_here: "📍 तुम्ही येथे आहात",
    km_away: "अंतरावर",
    by_car: "कारने",
    unnamed: "नाव नाही"
  },

  hi: {
    open_skin_scan_btn: "🖼 स्किन स्कैन",
    close_btn: "✖ बंद करें",
    brand_badge: "✨ AI • 🎙 आवाज • ❤️ रोज़मर्रा स्वास्थ्य",
    live_dashboard: "लाइव डैशबोर्ड",
    app_title: "🩺 MediAssist Pro",
    topbar_subtitle: "चैट गाइडेंस, स्किन सपोर्ट, BMI ट्रैकिंग, पानी ट्रैकिंग, दवा योजना और नज़दीकी स्वास्थ्य सेवाओं के लिए स्मार्ट मदद.",
    language_label: "🌐 भाषा",
    theme_btn: "🌙 थीम",
    clear_chat_btn: "🗑 चैट साफ करें",
    logout_btn: "↩ लॉगआउट",
    health_hub_title: "🧭 हेल्थ हब",
    health_hub_desc: "हर दिन इस्तेमाल के लिए आसान टूल्स एक ही जगह.",
    languages_stat: "भाषाएँ",
    voice_chat_stat: "वॉइस चैट",
    daily_water_stat: "दैनिक पानी",
    medicines_stat: "दवाइयाँ",
    ready_text: "तैयार",
    nav_overview: "✨ ओवरव्यू",
    nav_chat: "💬 AI चैट",
    nav_daily: "🫶 दैनिक देखभाल",
    nav_bmi: "⚖ BMI",
    nav_skin: "🖼 स्किन स्कैन",
    nav_map: "📍 नज़दीकी सेवा",
    nav_study: "📘 स्वास्थ्य अध्ययन",
    safety_note_title: "सुरक्षा नोट",
    safety_note_desc: "यह ऐप केवल शैक्षणिक सहायता देता है। इमरजेंसी या लक्षण बढ़ने पर वास्तविक चिकित्सा सहायता लें।",
    overview_title: "आपका रोज़मर्रा वेलनेस कॉकपिट",
    overview_desc: "पानी ट्रैक करें, दवा रिमाइंडर रखें, स्वास्थ्य प्रश्न पूछें, स्किन स्कैन करें और नज़दीकी अस्पताल या फार्मेसी खोजें।",
    start_chat_btn: "चैट शुरू करें",
    open_daily_care_btn: "दैनिक देखभाल खोलें",
    quick_ask_ai_title: "AI से पूछें",
    quick_ask_ai_desc: "आपकी भाषा में स्वास्थ्य मार्गदर्शन के लिए टेक्स्ट या माइक का उपयोग करें।",
    quick_daily_care_title: "दैनिक देखभाल",
    quick_daily_care_desc: "दिनभर का पानी और दवा कार्य ट्रैक करें।",
    quick_skin_scan_title: "स्किन स्कैन",
    quick_skin_scan_desc: "स्किन फोटो अपलोड करें और सावधानीपूर्वक शैक्षणिक मार्गदर्शन पाएँ।",
    quick_nearby_care_title: "नज़दीकी सेवा",
    quick_nearby_care_desc: "नज़दीकी अस्पताल, क्लिनिक, डॉक्टर और फार्मेसी खोजें।",
    chat_title: "हेल्थ चैट असिस्टेंट",
    chat_desc: "कीबोर्ड या माइक का उपयोग करें। जवाब चुनी गई भाषा में मिलेंगे।",
    mic_ready: "माइक तैयार है",
    chat_placeholder: "अपने लक्षण लिखें या स्वास्थ्य से जुड़ा प्रश्न पूछें...",
    speak_btn: "🎙️ बोलें",
    read_last_reply_btn: "🔊 पिछला उत्तर पढ़ें",
    send_btn: "भेजें",
    daily_dashboard_title: "दैनिक देखभाल डैशबोर्ड",
    daily_dashboard_desc: "सरल स्वास्थ्य आदतों और रिमाइंडर्स के लिए बनाया गया।",
    today_text: "आज",
    water_tracker_title: "💧 पानी ट्रैकर",
    add_glass_btn: "+ गिलास जोड़ें",
    reset_btn: "रीसेट",
    medicine_planner_title: "💊 दवा प्लानर",
    local_checklist_text: "लोकल चेकलिस्ट",
    medicine_input_placeholder: "दवा या विटामिन जोड़ें",
    add_btn: "जोड़ें",
    no_medicines: "अभी तक कोई दवा नहीं जोड़ी गई है।",
    wellness_focus_title: "🧘 वेलनेस फोकस",
    wellness_focus_subtitle: "छोटे कदम, बड़ा असर",
    refresh_tip_btn: "टिप रीफ्रेश करें",
    bmi_title: "BMI कैलकुलेटर",
    bmi_desc: "तेज़ बॉडी मास इंडेक्स अनुमान",
    height_label: "ऊँचाई (सेमी)",
    weight_label: "वज़न (कि.ग्रा.)",
    calculate_bmi_btn: "BMI निकालें",
    bmi_result_default: "BMI निकालने के लिए ऊँचाई और वज़न भरें।",
    skin_scan_title: "स्किन स्कैन",
    skin_scan_desc: "फोटो अपलोड करें और शैक्षणिक मार्गदर्शन के लिए नोट जोड़ें।",
    upload_image_label: "फोटो अपलोड करें",
    symptoms_notes_label: "लक्षण / नोट्स",
    skin_notes_placeholder: "उदाहरण: खुजली, लालपन, सूखापन, दर्द",
    scan_image_btn: "फोटो स्कैन करें",
    skin_result_default: "शैक्षणिक मार्गदर्शन के लिए फोटो अपलोड करें।",
    map_title: "नज़दीकी स्वास्थ्य सेवा खोजक",
    map_desc: "5 किमी के भीतर डॉक्टर, अस्पताल, क्लिनिक और फार्मेसी खोजें — दिशा के लिए रिज़ल्ट पर 🗺️ दबाएँ।",
    map_doctors: "👨‍⚕️ डॉक्टर",
    map_hospitals: "🏥 अस्पताल",
    map_clinics: "🏨 क्लिनिक",
    map_pharmacy: "💊 फार्मेसी",
    use_my_location_btn: "📍 मेरा स्थान उपयोग करें",
    clear_route_btn: "✕ रूट साफ करें",
    map_default_message: "नज़दीकी सेवा खोजने के लिए मेरा स्थान उपयोग करें दबाएँ।",
    study_title: "मूल स्वास्थ्य अध्ययन",
    study_desc: "शुरुआती लोगों के लिए स्वास्थ्य नोट्स",

    thinking: "सोच रहा है...",
    chat_service_unavailable: "चैट सेवा अभी उपलब्ध नहीं है।",
    choose_image_first: "कृपया पहले एक छवि चुनें।",
    scanning_image: "छवि स्कैन हो रही है...",
    skin_service_unavailable: "स्किन स्कैन सेवा अभी उपलब्ध नहीं है।",
    analysis_label: "विश्लेषण",
    care_label: "देखभाल",
    warning_label: "चेतावनी",
    doctor_label: "डॉक्टर",
    likely_concern_label: "संभावित समस्या",
    medicines_label: "दवाइयाँ",
    remedies_label: "घरेलू उपाय",
    diet_label: "डाइट प्लान",
    precaution_label: "सावधानी",
    doctor_when_label: "डॉक्टर को कब दिखाएँ",
    bmi_label: "BMI",
    category_label: "श्रेणी",
    tip_label: "सलाह",
    error_label: "त्रुटि",
    not_available: "उपलब्ध नहीं",
    not_confirmed_diagnosis: "यह पक्का निदान नहीं है।",
    symptoms_worse_default: "अगर लक्षण बढ़ें या ठीक न हों तो डॉक्टर को दिखाएँ।",
    done_suffix: "पूरा",
    glasses_suffix: "गिलास",
    mic_listening: "सुन रहा है...",
    mic_not_supported: "माइक समर्थित नहीं है",
    mic_starting: "माइक शुरू हो रहा है...",
    mic_permission_denied: "माइक अनुमति अस्वीकृत",
    mic_service_blocked: "स्पीच सेवा बंद है",
    mic_no_speech: "कोई आवाज़ नहीं मिली",
    mic_not_found: "माइक नहीं मिला",
    mic_network_error: "नेटवर्क त्रुटि",
    mic_stopped: "माइक बंद हुआ",
    loading_route: "रूट लोड हो रहा है...",
    route_ready: "रूट तैयार",
    route_failed: "रूट नहीं मिला",
    searching_places: "खोज जारी है...",
    locating_text: "स्थान खोजा जा रहा है...",
    denied_text: "अस्वीकृत",
    no_results: "कोई परिणाम नहीं",
    error_text: "त्रुटि",
    getting_location: "आपका स्थान लिया जा रहा है...",
    no_places_found: "5 किमी के भीतर कोई स्थान नहीं मिला। किसी दूसरे क्षेत्र में फिर प्रयास करें।",
    could_not_load_results: "परिणाम लोड नहीं हो सके। नेटवर्क जाँचें।",
    geolocation_not_supported: "Geolocation समर्थित नहीं है।",
    location_denied: "स्थान अनुमति अस्वीकृत। कृपया ब्राउज़र में अनुमति दें।",
    you_are_here: "📍 आप यहाँ हैं",
    km_away: "दूर",
    by_car: "कार से",
    unnamed: "बिना नाम"
  }
};

const DAILY_FOCUS = [
  {
    title: { en: "Hydration boost", mr: "पाणी वाढवा", hi: "पानी बढ़ाएँ" },
    text: {
      en: "Drink one glass of water after waking up and one with lunch.",
      mr: "उठल्यानंतर एक ग्लास पाणी आणि दुपारच्या जेवणासोबत एक ग्लास प्या.",
      hi: "उठने के बाद एक गिलास पानी और दोपहर के भोजन के साथ एक गिलास पिएँ।"
    }
  },
  {
    title: { en: "Move a little", mr: "थोडे चला", hi: "थोड़ा चलें" },
    text: {
      en: "Walk for 10 minutes after sitting for a long time.",
      mr: "बराच वेळ बसल्यानंतर 10 मिनिटे चालून या.",
      hi: "लंबे समय तक बैठने के बाद 10 मिनट टहलें।"
    }
  },
  {
    title: { en: "Sleep check", mr: "झोप तपासा", hi: "नींद जाँच" },
    text: {
      en: "Try to keep your sleep time regular tonight.",
      mr: "आज रात्री झोपेची वेळ नियमित ठेवण्याचा प्रयत्न करा.",
      hi: "आज रात सोने का समय नियमित रखने की कोशिश करें।"
    }
  },
  {
    title: { en: "Medication habit", mr: "औषध सवय", hi: "दवा आदत" },
    text: {
      en: "Keep medicines in one safe place and tick them after use.",
      mr: "औषधे एका सुरक्षित ठिकाणी ठेवा आणि घेतल्यानंतर मार्क करा.",
      hi: "दवाइयाँ एक सुरक्षित जगह रखें और लेने के बाद टिक करें।"
    }
  },
  {
    title: { en: "Food balance", mr: "संतुलित आहार", hi: "संतुलित भोजन" },
    text: {
      en: "Add one fruit or vegetable to your next meal.",
      mr: "पुढच्या जेवणात एक फळ किंवा भाजी जोडा.",
      hi: "अगले भोजन में एक फल या सब्ज़ी जोड़ें।"
    }
  },
  {
    title: { en: "Stress reset", mr: "तणाव कमी करा", hi: "तनाव कम करें" },
    text: {
      en: "Take 5 slow deep breaths before starting a busy task.",
      mr: "व्यस्त काम सुरू करण्यापूर्वी 5 हळू खोल श्वास घ्या.",
      hi: "व्यस्त काम शुरू करने से पहले 5 गहरी साँस लें।"
    }
  }
];

let lastBotReply = "";
let lastFocusIndex = 0;

function t(key) {
  const lang = languageSelect?.value || localStorage.getItem(LANGUAGE_KEY) || "en";
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
}

function translatePage(lang) {
  const selected = TRANSLATIONS[lang] || TRANSLATIONS.en;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (selected[key]) {
      el.textContent = selected[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (selected[key]) {
      el.placeholder = selected[key];
    }
  });
}

async function checkSessionAndProtectPage() {
  try {
    const res = await fetch("/api/session");
    const data = await res.json();
    if (!data.authenticated) {
      window.location.href = "/login";
      return false;
    }
    return true;
  } catch {
    window.location.href = "/login";
    return false;
  }
}

function saveMessages(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function loadMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatPlainTextReply(text) {
  return escapeHtml(text).replace(/\n/g, "<br>");
}

function compactList(items) {
  if (!Array.isArray(items)) return [];
  return items.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 5);
}

function compactLine(label, value) {
  if (!value) return "";
  return `<div class="mini-line"><span class="mini-label">${escapeHtml(label)}:</span> <span>${escapeHtml(value)}</span></div>`;
}

function compactListLine(label, items) {
  const clean = compactList(items);
  if (!clean.length) return "";
  return `
    <div class="mini-line stack-line">
      <span class="mini-label">${escapeHtml(label)}:</span>
      <ul class="mini-list">${clean.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  `;
}

function buildStructuredReplyCard(data) {
  const concern = data?.likely_concern || data?.condition || "";
  const medicines = compactList(data?.medicines || data?.medicine);
  const remedies = compactList(data?.basic_home_remedies || data?.symptoms);
  const diet = compactList(data?.diet_plan || data?.diet);
  const precautions = compactList(data?.precautions);
  const doctor = compactList(data?.when_to_see_doctor || data?.doctor);
  const note = data?.disclaimer || "";

  return `
    <div class="answer-card-wide">
      ${compactLine(t("likely_concern_label"), concern)}
      ${compactListLine(t("medicines_label"), medicines)}
      ${compactListLine(t("remedies_label"), remedies)}
      ${compactListLine(t("diet_label"), diet)}
      ${compactListLine(t("precaution_label"), precautions)}
      ${compactListLine(t("doctor_when_label"), doctor)}
      ${note ? `<div class="answer-note">${escapeHtml(note)}</div>` : ""}
    </div>
  `;
}

function addMessage(message, sender) {
  if (!chatMessages) return;

  const div = document.createElement("div");
  div.className = `message ${sender}`;

  if (typeof message === "object" && message !== null) {
    if (sender === "bot" && message.structured_reply) {
      div.innerHTML = buildStructuredReplyCard(message.structured_reply);
      lastBotReply = message.reply || div.textContent.trim();
    } else if (message.text) {
      div.innerHTML = formatPlainTextReply(message.text);
      if (sender === "bot") lastBotReply = message.text;
    } else {
      div.textContent = "";
    }
  } else {
    div.innerHTML = formatPlainTextReply(message);
    if (sender === "bot") lastBotReply = String(message);
  }

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getWelcomeMessage() {
  const userName = window.MEDIASSIST_BOOT?.userName || "there";
  const lang = languageSelect?.value || localStorage.getItem(LANGUAGE_KEY) || "en";

  const messages = {
    en: `Hello ${userName}. I am MediAssist Pro. Ask a health question, use the mic, track water, manage medicines, calculate BMI, upload a skin photo, or find nearby care.`,
    mr: `नमस्कार ${userName}. मी MediAssist Pro आहे. आरोग्यविषयक प्रश्न विचारा, माइक वापरा, पाणी ट्रॅक करा, औषधे व्यवस्थापित करा, BMI मोजा, त्वचेचा फोटो अपलोड करा किंवा जवळील सेवा शोधा.`,
    hi: `नमस्ते ${userName}. मैं MediAssist Pro हूँ। स्वास्थ्य प्रश्न पूछें, माइक का उपयोग करें, पानी ट्रैक करें, दवाइयाँ संभालें, BMI निकालें, स्किन फोटो अपलोड करें या नज़दीकी सेवा खोजें।`
  };

  return messages[lang] || messages.en;
}

function renderSavedMessages() {
  if (!chatMessages) return;

  const messages = loadMessages();
  chatMessages.innerHTML = "";

  if (!messages.length) {
    addMessage(getWelcomeMessage(), "bot");
    return;
  }

  messages.forEach((msg) => addMessage(msg, msg.sender));
}

function setLanguageFromStorage() {
  if (languageSelect) {
    languageSelect.value = localStorage.getItem(LANGUAGE_KEY) || "en";
  }
}

function setThemeFromStorage() {
  if ((localStorage.getItem(THEME_KEY) || "dark") === "light") {
    document.body.classList.add("light");
  }
}

function setSidebarState(isCollapsed) {
  if (!sidebar || !layout || !toggleSidebarBtn) return;
  sidebar.classList.toggle("collapsed", isCollapsed);
  layout.classList.toggle("sidebar-collapsed", isCollapsed);
  toggleSidebarBtn.textContent = isCollapsed ? "⏩" : "⏪";
  toggleSidebarBtn.setAttribute("aria-label", isCollapsed ? "Show Health Hub" : "Hide Health Hub");
  localStorage.setItem(SIDEBAR_KEY, isCollapsed ? "true" : "false");
}

function loadSidebarState() {
  const isCollapsed = localStorage.getItem(SIDEBAR_KEY) === "true";
  setSidebarState(isCollapsed);
}

function openSection(target) {
  navButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.target === target));

  sections.forEach((section) => {
    section.classList.add("section-hidden");
    section.classList.remove("section-visible");
  });

  const el = document.getElementById(target);
  if (!el) return;

  el.classList.remove("section-hidden");
  el.classList.add("section-visible");

  // 🔥 NEW: hide skin scan when leaving chat
  if (target !== "chatSection" && skinScanChatBox) {
    skinScanChatBox.classList.add("hidden");
  }

  if (target === "mapSection" && typeof map !== "undefined" && map) {
    setTimeout(() => map.invalidateSize(), 180);
  }
}

function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function loadWaterData() {
  try {
    const data = JSON.parse(localStorage.getItem(WATER_KEY) || "{}");
    if (data.date !== getTodayKey()) {
      return { date: getTodayKey(), count: 0 };
    }
    return data;
  } catch {
    return { date: getTodayKey(), count: 0 };
  }
}

function saveWaterData(data) {
  localStorage.setItem(WATER_KEY, JSON.stringify(data));
}

function updateWaterUI() {
  const data = loadWaterData();
  const count = Math.min(Number(data.count || 0), 8);
  const percent = (count / 8) * 100;

  if (waterProgressText) waterProgressText.textContent = `${count} / 8 ${t("glasses_suffix")}`;
  if (sidebarWaterCount) sidebarWaterCount.textContent = `${count} / 8`;
  if (waterProgressBar) waterProgressBar.style.width = `${percent}%`;
}

function loadMedicines() {
  try {
    return JSON.parse(localStorage.getItem(MEDICINE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveMedicines(items) {
  localStorage.setItem(MEDICINE_KEY, JSON.stringify(items));
}

function renderMedicineList() {
  if (!medicineList) return;

  const items = loadMedicines();
  const doneCount = items.filter((item) => item.done).length;

  if (sidebarMedicineCount) {
    sidebarMedicineCount.textContent = `${doneCount} ${t("done_suffix")}`;
  }

  if (!items.length) {
    medicineList.className = "task-list empty-state slim-empty";
    medicineList.textContent = t("no_medicines");
    return;
  }

  medicineList.className = "task-list";
  medicineList.innerHTML = items.map((item, index) => `
    <div class="task-item ${item.done ? "done" : ""}">
      <label>
        <input type="checkbox" data-medicine-check="${index}" ${item.done ? "checked" : ""}>
        <span>${escapeHtml(item.name)}</span>
      </label>
      <button type="button" class="task-delete" data-medicine-delete="${index}">✕</button>
    </div>
  `).join("");
}

function renderDailyFocus(forceNext = false) {
  if (!dailyFocusCard) return;

  if (forceNext) {
    lastFocusIndex = (lastFocusIndex + 1) % DAILY_FOCUS.length;
  } else {
    lastFocusIndex = new Date().getDate() % DAILY_FOCUS.length;
  }

  const lang = languageSelect?.value || localStorage.getItem(LANGUAGE_KEY) || "en";
  const item = DAILY_FOCUS[lastFocusIndex];
  const title = item.title[lang] || item.title.en;
  const text = item.text[lang] || item.text.en;

  dailyFocusCard.innerHTML = `<strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p>`;
}

function setTodayChip() {
  if (!todayDateChip) return;
  const lang = languageSelect?.value || localStorage.getItem(LANGUAGE_KEY) || "en";
  const localeMap = { en: "en-US", mr: "mr-IN", hi: "hi-IN" };
  const now = new Date();
  todayDateChip.textContent = now.toLocaleDateString(localeMap[lang] || "en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function setGreetingChip() {
  const greetingChip = document.getElementById("greetingChip");
  if (!greetingChip) return;

  const hour = new Date().getHours();
  const lang = languageSelect?.value || localStorage.getItem(LANGUAGE_KEY) || "en";
  let greeting = "Hello";

  if (lang === "mr") {
    if (hour >= 5 && hour < 12) greeting = "शुभ प्रभात";
    else if (hour >= 12 && hour < 17) greeting = "शुभ दुपार";
    else if (hour >= 17 && hour < 21) greeting = "शुभ संध्या";
    else greeting = "शुभ रात्री";
  } else if (lang === "hi") {
    if (hour >= 5 && hour < 12) greeting = "शुभ प्रभात";
    else if (hour >= 12 && hour < 17) greeting = "शुभ दोपहर";
    else if (hour >= 17 && hour < 21) greeting = "शुभ संध्या";
    else greeting = "शुभ रात्रि";
  } else {
    if (hour >= 5 && hour < 12) greeting = "Good morning";
    else if (hour >= 12 && hour < 17) greeting = "Good afternoon";
    else if (hour >= 17 && hour < 21) greeting = "Good evening";
    else greeting = "Good night";
  }

  const userName = window.MEDIASSIST_BOOT?.userName || "User";
  greetingChip.textContent = `${greeting}, ${userName}`;
}

async function initApp() {
  const allowed = await checkSessionAndProtectPage();
  if (!allowed) return;

  setLanguageFromStorage();
  translatePage(languageSelect?.value || "en");
  renderSavedMessages();
  setThemeFromStorage();
  updateWaterUI();
  renderMedicineList();
  renderDailyFocus();
  setTodayChip();
  setGreetingChip();
  loadSidebarState();
}

initApp();

if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    localStorage.setItem(LANGUAGE_KEY, languageSelect.value);
    translatePage(languageSelect.value);
    renderSavedMessages();
    updateWaterUI();
    renderMedicineList();
    renderDailyFocus();
    setTodayChip();
    setGreetingChip();
    updateVoiceStatus(t("mic_ready"));
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem(THEME_KEY, document.body.classList.contains("light") ? "light" : "dark");
  });
}

if (clearChatBtn) {
  clearChatBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    renderSavedMessages();
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.href = "/login";
    }
  });
}

quickNavs.forEach((btn) => {
  btn.addEventListener("click", () => openSection(btn.dataset.open));
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => openSection(button.dataset.target));
});
// 🔥 SKIN SCAN INSIDE CHAT

if (openSkinScanBtn && skinScanChatBox) {
  openSkinScanBtn.addEventListener("click", () => {
    openSection("chatSection");
    skinScanChatBox.classList.remove("hidden");

    setTimeout(() => {
      skinScanChatBox.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  });
}

if (closeSkinScanBtn && skinScanChatBox) {
  closeSkinScanBtn.addEventListener("click", () => {
    skinScanChatBox.classList.add("hidden");
  });
}

if (addWaterBtn) {
  addWaterBtn.addEventListener("click", () => {
    const data = loadWaterData();
    data.count = Math.min(Number(data.count || 0) + 1, 8);
    data.date = getTodayKey();
    saveWaterData(data);
    updateWaterUI();
  });
}

if (resetWaterBtn) {
  resetWaterBtn.addEventListener("click", () => {
    saveWaterData({ date: getTodayKey(), count: 0 });
    updateWaterUI();
  });
}

if (medicineForm) {
  medicineForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = medicineInput?.value.trim();
    if (!value) return;
    const items = loadMedicines();
    items.push({ name: value, done: false });
    saveMedicines(items);
    medicineInput.value = "";
    renderMedicineList();
  });
}

if (medicineList) {
  medicineList.addEventListener("click", (e) => {
    const deleteIndex = e.target.dataset.medicineDelete;
    if (deleteIndex !== undefined) {
      const items = loadMedicines();
      items.splice(Number(deleteIndex), 1);
      saveMedicines(items);
      renderMedicineList();
      return;
    }

    const checkboxIndex = e.target.dataset.medicineCheck;
    if (checkboxIndex !== undefined) {
      const items = loadMedicines();
      items[Number(checkboxIndex)].done = e.target.checked;
      saveMedicines(items);
      renderMedicineList();
    }
  });
}

if (refreshFocusBtn) {
  refreshFocusBtn.addEventListener("click", () => renderDailyFocus(true));
}

if (chatForm) {
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = chatInput?.value.trim();
    if (!message) return;

    const messages = loadMessages();
    const userMessage = { sender: "user", text: message };
    messages.push(userMessage);
    saveMessages(messages);
    addMessage(userMessage, "user");
    if (chatInput) chatInput.value = "";

    const thinkingMessage = { sender: "bot", text: t("thinking") };
    addMessage(thinkingMessage, "bot");
    const thinkingNode = chatMessages?.lastElementChild;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language: languageSelect?.value || "en" })
      });

      const data = await res.json();
      if (thinkingNode) thinkingNode.remove();

      if (data.error === "Please login first.") {
        window.location.href = "/login";
        return;
      }

      const botMessage = {
        sender: "bot",
        text: data.reply || data.error || "No response available.",
        structured_reply: data.structured_reply || null
      };

      messages.push(botMessage);
      saveMessages(messages);
      addMessage(botMessage, "bot");
    } catch {
      if (thinkingNode) thinkingNode.remove();
      const botMessage = { sender: "bot", text: t("chat_service_unavailable") };
      messages.push(botMessage);
      saveMessages(messages);
      addMessage(botMessage, "bot");
    }
  });
}

if (bmiForm) {
  bmiForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const height_cm = Number(document.getElementById("heightCm")?.value);
    const weight_kg = Number(document.getElementById("weightKg")?.value);

    const res = await fetch("/api/bmi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ height_cm, weight_kg })
    });

    const data = await res.json();
    if (!bmiResult) return;

    if (data.error) {
      if (data.error === "Please login first.") {
        window.location.href = "/login";
        return;
      }
      bmiResult.innerHTML = `<strong>${escapeHtml(t("error_label"))}:</strong> ${escapeHtml(data.error)}`;
      return;
    }

    bmiResult.innerHTML = `
      <div class="metric-card">
        <div><strong>${escapeHtml(t("bmi_label"))}:</strong> ${escapeHtml(data.bmi)}</div>
        <div><strong>${escapeHtml(t("category_label"))}:</strong> ${escapeHtml(data.category)}</div>
        <div><strong>${escapeHtml(t("tip_label"))}:</strong> ${escapeHtml(data.tip)}</div>
      </div>
    `;
  });
}

if (skinImage) {
  skinImage.addEventListener("change", () => {
    const file = skinImage.files?.[0];
    if (!file || !skinPreview || !skinPreviewWrap) return;
    skinPreview.src = URL.createObjectURL(file);
    skinPreviewWrap.classList.remove("hidden");
  });
}
function normalizeSkinScanResult(rawResult) {
  if (!rawResult) {
    return {
      analysis: t("not_available"),
      care: [],
      warning: t("not_confirmed_diagnosis"),
      see_doctor_when: t("symptoms_worse_default"),
      likely_concern: "",
      medicines: [],
      basic_home_remedies: [],
      diet_plan: [],
      precautions: [],
      when_to_see_doctor: []
    };
  }

  if (typeof rawResult === "object" && !Array.isArray(rawResult)) {
    return {
      analysis: rawResult.analysis || rawResult.likely_concern || t("not_available"),
      care: rawResult.care || rawResult.basic_home_remedies || [],
      warning: rawResult.warning || rawResult.disclaimer || t("not_confirmed_diagnosis"),
      see_doctor_when:
        rawResult.see_doctor_when ||
        (Array.isArray(rawResult.when_to_see_doctor)
          ? rawResult.when_to_see_doctor.join(", ")
          : rawResult.when_to_see_doctor) ||
        t("symptoms_worse_default"),
      likely_concern: rawResult.likely_concern || rawResult.analysis || "",
      medicines: rawResult.medicines || [],
      basic_home_remedies: rawResult.basic_home_remedies || rawResult.care || [],
      diet_plan: rawResult.diet_plan || [],
      precautions: rawResult.precautions || [],
      when_to_see_doctor: rawResult.when_to_see_doctor || []
    };
  }

  let cleaned = String(rawResult).trim();

  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/i, "").replace(/\s*```$/, "");
  }

  try {
    const parsed = JSON.parse(cleaned);
    return {
      analysis: parsed.analysis || parsed.likely_concern || t("not_available"),
      care: parsed.care || parsed.basic_home_remedies || [],
      warning: parsed.warning || parsed.disclaimer || t("not_confirmed_diagnosis"),
      see_doctor_when:
        parsed.see_doctor_when ||
        (Array.isArray(parsed.when_to_see_doctor)
          ? parsed.when_to_see_doctor.join(", ")
          : parsed.when_to_see_doctor) ||
        t("symptoms_worse_default"),
      likely_concern: parsed.likely_concern || parsed.analysis || "",
      medicines: parsed.medicines || [],
      basic_home_remedies: parsed.basic_home_remedies || parsed.care || [],
      diet_plan: parsed.diet_plan || [],
      precautions: parsed.precautions || [],
      when_to_see_doctor: parsed.when_to_see_doctor || []
    };
  } catch {
    return {
      analysis: t("not_available"),
      care: [],
      warning: t("not_confirmed_diagnosis"),
      see_doctor_when: t("symptoms_worse_default"),
      likely_concern: "",
      medicines: [],
      basic_home_remedies: [],
      diet_plan: [],
      precautions: [],
      when_to_see_doctor: []
    };
  }
}

function renderSkinResult(result) {
  if (!skinResult) return;

  const cleanResult = normalizeSkinScanResult(result);
  const care = compactList(cleanResult.care || []);

  skinResult.innerHTML = `
    <div class="answer-card-wide">
      ${compactLine(t("analysis_label"), cleanResult.analysis || t("not_available"))}
      ${compactListLine(t("care_label"), care)}
      ${compactLine(t("warning_label"), cleanResult.warning || t("not_confirmed_diagnosis"))}
      ${compactLine(t("doctor_label"), cleanResult.see_doctor_when || t("symptoms_worse_default"))}
    </div>
  `;
}
function formatListSection(title, items) {
  const cleanItems = compactList(items);
  if (!cleanItems.length) return `${title}:\n${t("not_available")}`;
  return `${title}:\n${cleanItems.join("\n")}`;
}

function buildStructuredSkinChatMessage(result) {
  const cleanResult = normalizeSkinScanResult(result);

  const likelyConcern = cleanResult.likely_concern || cleanResult.analysis || t("not_available");
  const medicines = cleanResult.medicines || [];
  const remedies = cleanResult.basic_home_remedies || cleanResult.care || [];
  const diet = cleanResult.diet_plan || [];
  const precautions = cleanResult.precautions || [];
  const doctor =
    cleanResult.when_to_see_doctor && cleanResult.when_to_see_doctor.length
      ? cleanResult.when_to_see_doctor
      : [cleanResult.see_doctor_when].filter(Boolean);

  return [
    `${t("likely_concern_label")}:\n${likelyConcern}`,
    formatListSection(t("medicines_label"), medicines),
    formatListSection(t("remedies_label"), remedies),
    formatListSection(t("diet_label"), diet),
    formatListSection(t("precaution_label"), precautions),
    formatListSection(t("doctor_when_label"), doctor)
  ].join("\n\n");
}

function normalizeStructuredSkinReply(replyText) {
  if (!replyText) return "";

  let cleaned = String(replyText).trim();

  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/i, "").replace(/\s*```$/, "");
  }

  try {
    const parsed = JSON.parse(cleaned);

    return buildStructuredSkinChatMessage({
      likely_concern: parsed.likely_concern || parsed.analysis || "",
      medicines: parsed.medicines || [],
      basic_home_remedies: parsed.basic_home_remedies || parsed.care || [],
      diet_plan: parsed.diet_plan || [],
      precautions: parsed.precautions || [],
      when_to_see_doctor: parsed.when_to_see_doctor || [],
      see_doctor_when: parsed.see_doctor_when || "",
      analysis: parsed.analysis || parsed.likely_concern || "",
      warning: parsed.warning || parsed.disclaimer || ""
    });
  } catch {
    return replyText;
  }
}

if (skinForm) {
  skinForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = skinImage?.files?.[0];
    if (!file) {
      if (skinResult) skinResult.textContent = t("choose_image_first");
      return;
    }

    const messages = loadMessages();

    const userSkinMessage = {
      sender: "user",
      text: skinSymptoms?.value.trim()
        ? `I uploaded a skin image for scan. Notes: ${skinSymptoms.value.trim()}`
        : "I uploaded a skin image for scan."
    };

    messages.push(userSkinMessage);
    saveMessages(messages);
    addMessage(userSkinMessage, "user");

    const thinkingMessage = { sender: "bot", text: t("scanning_image") };
    addMessage(thinkingMessage, "bot");
    const thinkingNode = chatMessages?.lastElementChild;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("symptoms", skinSymptoms?.value.trim() || "");
    formData.append("language", languageSelect?.value || "en");

    if (skinResult) {
  skinResult.innerHTML = "";
  skinResult.classList.add("hidden");
}

    try {
      const res = await fetch("/api/skin-scan", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (thinkingNode) thinkingNode.remove();

      if (data.error) {
        if (data.error === "Please login first.") {
          window.location.href = "/login";
          return;
        }

        if (skinResult) {
  skinResult.innerHTML = "";
  skinResult.classList.add("hidden");
}

        const errorMessage = {
          sender: "bot",
          text: `${t("error_label")}: ${data.error}`
        };

        messages.push(errorMessage);
        saveMessages(messages);
        addMessage(errorMessage, "bot");
        return;
      }

      const result = normalizeSkinScanResult(data.result || {});

if (skinResult) {
  skinResult.innerHTML = "";
  skinResult.classList.add("hidden");
}

let finalBotText = buildStructuredSkinChatMessage(result);

      try {
        const explanationPrompt = `
A skin scan result was generated.

Analysis: ${result.analysis || ""}
Likely concern: ${result.likely_concern || result.analysis || ""}
Medicines: ${(result.medicines || []).join(", ")}
Basic home remedies: ${(result.basic_home_remedies || result.care || []).join(", ")}
Diet plan: ${(result.diet_plan || []).join(", ")}
Precautions: ${(result.precautions || []).join(", ")}
When to see a doctor: ${(result.when_to_see_doctor || [result.see_doctor_when].filter(Boolean)).join(", ")}

Reply ONLY in this exact format:

Likely concern:
...

Medicines:
...

Basic home remedies:
...

Diet plan:
...

Precaution:
...

When to see a doctor:
...

Rules:
- No paragraph
- Each point new line
- Simple language
- No extra text
- Respond in ${languageSelect?.value || "en"}
        `.trim();

        const chatRes = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: explanationPrompt,
            language: languageSelect?.value || "en"
          })
        });

        const chatData = await chatRes.json();

        if (!chatData.error && chatData.reply) {
          finalBotText = normalizeStructuredSkinReply(chatData.reply);
        }
      } catch {
      }

      const botMessage = {
        sender: "bot",
        text: finalBotText
      };

      messages.push(botMessage);
      saveMessages(messages);
      addMessage(botMessage, "bot");
    } catch {
      if (thinkingNode) thinkingNode.remove();

      if (skinResult) {
  skinResult.innerHTML = "";
  skinResult.classList.add("hidden");
}

      const botMessage = {
        sender: "bot",
        text: t("skin_service_unavailable")
      };

      messages.push(botMessage);
      saveMessages(messages);
      addMessage(botMessage, "bot");
    }
  });
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListening = false;

function updateVoiceStatus(text, isError = false) {
  if (!voiceStatusBadge) return;
  voiceStatusBadge.textContent = text;
  voiceStatusBadge.classList.toggle("error", isError);
}

if (SpeechRecognition && micBtn && chatInput) {
  recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  function getSpeechLang(code) {
    const map = {
      en: "en-US",
      hi: "hi-IN",
      mr: "mr-IN"
    };
    return map[code] || "en-US";
  }

  recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add("active");
    updateVoiceStatus(t("mic_listening"));
  };

  recognition.onend = () => {
    isListening = false;
    micBtn.classList.remove("active");
    updateVoiceStatus(t("mic_ready"));
  };

  recognition.onerror = (event) => {
    isListening = false;
    micBtn.classList.remove("active");

    const errorMap = {
      "not-allowed": t("mic_permission_denied"),
      "service-not-allowed": t("mic_service_blocked"),
      "no-speech": t("mic_no_speech"),
      "audio-capture": t("mic_not_found"),
      "network": t("mic_network_error"),
      "aborted": t("mic_stopped")
    };

    updateVoiceStatus(errorMap[event.error] || `Mic error: ${event.error}`, true);
  };

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      transcript += event.results[i][0].transcript;
    }
    chatInput.value = transcript.trim();
  };

  micBtn.addEventListener("click", async () => {
    recognition.lang = getSpeechLang(languageSelect?.value);

    if (isListening) {
      recognition.stop();
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      updateVoiceStatus(t("mic_not_supported"), true);
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      updateVoiceStatus(t("mic_starting"));
      recognition.start();
    } catch {
      updateVoiceStatus(t("mic_permission_denied"), true);
    }
  });
} else if (micBtn) {
  micBtn.disabled = true;
  updateVoiceStatus(t("mic_not_supported"), true);
}

if (speakReplyBtn) {
  speakReplyBtn.addEventListener("click", () => {
    if (!lastBotReply || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(lastBotReply);
    utterance.lang = ({
      en: "en-US",
      hi: "hi-IN",
      mr: "mr-IN"
    })[languageSelect?.value || "en"] || "en-US";
    window.speechSynthesis.speak(utterance);
  });
}

// ═══════════════════════════════════════════════════════
// MAP — Nearby Care Finder with Routing
// ═══════════════════════════════════════════════════════
let map = null;
let userMarker = null;
let userLatLon = null;
let placeMarkers = [];
let routeLayer = null;
let routeShadowLayer = null;
let activeType = "doctors";

if (document.getElementById("map") && typeof L !== "undefined") {
  map = L.map("map").setView([20.5937, 78.9629], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19
  }).addTo(map);
}

function makeIcon(emoji, color) {
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 4px 12px rgba(0,0,0,0.35);border:2px solid rgba(255,255,255,0.7)">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20]
  });
}

const userIcon = () => makeIcon("📍", "#10b981");
const typeIcons = {
  doctors: { emoji: "👨‍⚕️", color: "#7c5cff" },
  hospital: { emoji: "🏥", color: "#ef4444" },
  clinic: { emoji: "🏨", color: "#f97316" },
  pharmacy: { emoji: "💊", color: "#22c3ee" }
};

function clearMapMarkers() {
  if (!map) return;
  placeMarkers.forEach((m) => map.removeLayer(m));
  placeMarkers = [];
}

function clearRoute() {
  if (!map) return;
  if (routeLayer) {
    map.removeLayer(routeLayer);
    routeLayer = null;
  }
  if (routeShadowLayer) {
    map.removeLayer(routeShadowLayer);
    routeShadowLayer = null;
  }

  const bar = document.getElementById("routeInfoBar");
  const clearBtn = document.getElementById("clearRouteBtn");
  const badge = document.getElementById("mapStatusBadge");

  if (bar) bar.style.display = "none";
  if (clearBtn) clearBtn.style.display = "none";
  if (badge) badge.textContent = t("ready_text");

  document.querySelectorAll(".map-place-card").forEach((c) => c.classList.remove("mpc-active"));
}

function formatDistance(km) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

function calcDist(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function drawRoute(destLat, destLon, destName) {
  if (!map || !userLatLon) return;
  clearRoute();

  const [uLat, uLon] = userLatLon;
  const badge = document.getElementById("mapStatusBadge");
  if (badge) badge.textContent = t("loading_route");

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${uLon},${uLat};${destLon},${destLat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.routes || !data.routes[0]) throw new Error("No route");

    const route = data.routes[0];
    const coords = route.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
    const distKm = (route.distance / 1000).toFixed(1);
    const mins = Math.round(route.duration / 60);
    const timeStr = mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins} min`;

    routeShadowLayer = L.polyline(coords, {
      color: "rgba(124,92,255,0.2)",
      weight: 10,
      lineCap: "round"
    }).addTo(map);

    routeLayer = L.polyline(coords, {
      color: "#7c5cff",
      weight: 4,
      lineCap: "round"
    }).addTo(map);

    map.fitBounds(L.latLngBounds([[uLat, uLon], [destLat, destLon]]), { padding: [60, 60] });

    const destNameEl = document.getElementById("routeDestName");
    const distEl = document.getElementById("routeDistance");
    const durEl = document.getElementById("routeDuration");
    const bar = document.getElementById("routeInfoBar");
    const clearBtn = document.getElementById("clearRouteBtn");

    if (destNameEl) destNameEl.textContent = `🏁 ${destName}`;
    if (distEl) distEl.textContent = `📏 ${distKm} km`;
    if (durEl) durEl.textContent = `🚗 ${timeStr} ${t("by_car")}`;
    if (bar) bar.style.display = "flex";
    if (clearBtn) clearBtn.style.display = "inline-flex";
    if (badge) badge.textContent = t("route_ready");
  } catch {
    if (badge) badge.textContent = t("route_failed");
    setTimeout(() => {
      if (badge) badge.textContent = t("ready_text");
    }, 2500);
  }
}

async function findNearbyPlaces(lat, lon) {
  if (!map) return;

  const radiusKm = 5;
  const radiusM = radiusKm * 1000;
  const mapResults = document.getElementById("mapResults");
  const badge = document.getElementById("mapStatusBadge");

  if (mapResults) {
    mapResults.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:24px;color:var(--muted)"><div class="map-spinner"></div><p>${escapeHtml(t("searching_places"))}</p></div>`;
  }
  if (badge) badge.textContent = t("searching_places");

  clearMapMarkers();
  clearRoute();

  const amenityMap = { doctors: "doctors", hospital: "hospital", clinic: "clinic", pharmacy: "pharmacy" };
  const amenity = amenityMap[activeType] || activeType;
  const query = `[out:json][timeout:30];(node[amenity=${amenity}](around:${radiusM},${lat},${lon});way[amenity=${amenity}](around:${radiusM},${lat},${lon});relation[amenity=${amenity}](around:${radiusM},${lat},${lon}););out center 30;`;

  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `data=${encodeURIComponent(query)}`
    });
    const data = await res.json();

    const items = (data.elements || [])
      .map((el) => {
        const iLat = el.lat ?? el.center?.lat;
        const iLon = el.lon ?? el.center?.lon;
        if (!iLat || !iLon) return null;
        return {
          name: el.tags?.name || el.tags?.["name:en"] || `${activeType.charAt(0).toUpperCase() + activeType.slice(1)} (${t("unnamed")})`,
          phone: el.tags?.phone || el.tags?.["contact:phone"] || null,
          address: [el.tags?.["addr:housenumber"], el.tags?.["addr:street"], el.tags?.["addr:city"]].filter(Boolean).join(", ") || null,
          opening: el.tags?.opening_hours || null,
          lat: iLat,
          lon: iLon,
          distance: calcDist(lat, lon, iLat, iLon)
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 15);

    if (!items.length) {
      if (mapResults) {
        mapResults.innerHTML = `<div style="text-align:center;padding:24px;color:var(--muted)"><div style="font-size:2rem">🔍</div><p>${escapeHtml(t("no_places_found"))}</p></div>`;
      }
      if (badge) badge.textContent = t("no_results");
      return;
    }

    if (badge) badge.textContent = `${items.length} ${t("ready_text")}`;

    if (mapResults) {
      mapResults.innerHTML = items
        .map(
          (item, i) => `
        <div class="map-place-card" data-lat="${item.lat}" data-lon="${item.lon}" data-name="${escapeHtml(item.name)}">
          <div class="mpc-num">${i + 1}</div>
          <div class="mpc-body">
            <div class="mpc-name">${escapeHtml(item.name)}</div>
            <div class="mpc-meta">
              <span>📏 ${formatDistance(item.distance)}</span>
              ${item.phone ? `<span>📞 ${escapeHtml(item.phone)}</span>` : ""}
            </div>
            ${item.address ? `<div class="mpc-addr">📍 ${escapeHtml(item.address)}</div>` : ""}
            ${item.opening ? `<div class="mpc-addr">🕐 ${escapeHtml(item.opening)}</div>` : ""}
          </div>
          <button class="mpc-route-btn" title="Get directions">🗺️</button>
        </div>
      `
        )
        .join("");

      mapResults.querySelectorAll(".map-place-card").forEach((card, i) => {
        const routeBtn = card.querySelector(".mpc-route-btn");
        if (routeBtn) {
          routeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            mapResults.querySelectorAll(".map-place-card").forEach((c) => c.classList.remove("mpc-active"));
            card.classList.add("mpc-active");
            drawRoute(parseFloat(card.dataset.lat), parseFloat(card.dataset.lon), card.dataset.name);
          });
        }

        card.addEventListener("click", () => {
          if (placeMarkers[i]) {
            map.setView(placeMarkers[i].getLatLng(), 16);
            placeMarkers[i].openPopup();
          }
        });
      });
    }

    const icon = typeIcons[activeType] || typeIcons.hospital;
    items.forEach((item, i) => {
      const marker = L.marker([item.lat, item.lon], {
        icon: makeIcon(icon.emoji, icon.color)
      }).addTo(map);

      marker.bindPopup(
        `<div style="min-width:160px">
          <strong>${escapeHtml(item.name)}</strong><br>
          <small>${formatDistance(item.distance)} ${escapeHtml(t("km_away"))}</small>
          ${item.phone ? `<br><small>📞 ${escapeHtml(item.phone)}</small>` : ""}
          <br>
          <button onclick="document.querySelectorAll('.map-place-card')[${i}]?.querySelector('.mpc-route-btn')?.click()" style="margin-top:8px;padding:5px 10px;border-radius:8px;border:none;background:#7c5cff;color:white;cursor:pointer;font-size:12px">🗺️ Get Directions</button>
        </div>`
      );
      placeMarkers.push(marker);
    });

    map.fitBounds(L.latLngBounds([[lat, lon], ...items.map((i) => [i.lat, i.lon])]), { padding: [40, 40] });
  } catch {
    if (mapResults) {
      mapResults.innerHTML = `<div style="text-align:center;padding:24px;color:var(--muted)">⚠️ ${escapeHtml(t("could_not_load_results"))}</div>`;
    }
    if (badge) badge.textContent = t("error_text");
  }
}

const mapTypePills = document.getElementById("mapTypePills");
if (mapTypePills) {
  mapTypePills.addEventListener("click", (e) => {
    const pill = e.target.closest(".map-type-pill");
    if (!pill) return;
    document.querySelectorAll(".map-type-pill").forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    activeType = pill.dataset.type;
    if (userLatLon) findNearbyPlaces(...userLatLon);
  });
}

const findNearbyBtn = document.getElementById("findNearbyBtn");
if (findNearbyBtn) {
  findNearbyBtn.addEventListener("click", () => {
    const mapResults = document.getElementById("mapResults");
    const badge = document.getElementById("mapStatusBadge");

    if (!navigator.geolocation) {
      if (mapResults) {
        mapResults.innerHTML = `<p style='padding:16px;color:var(--muted)'>${escapeHtml(t("geolocation_not_supported"))}</p>`;
      }
      return;
    }

    if (badge) badge.textContent = t("locating_text");
    if (mapResults) {
      mapResults.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:24px;color:var(--muted)"><div class="map-spinner"></div><p>${escapeHtml(t("getting_location"))}</p></div>`;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        userLatLon = [lat, lon];
        if (!map) return;

        if (userMarker) map.removeLayer(userMarker);
        userMarker = L.marker([lat, lon], { icon: userIcon(), zIndexOffset: 1000 })
          .addTo(map)
          .bindPopup(`<strong>${escapeHtml(t("you_are_here"))}</strong>`)
          .openPopup();

        map.setView([lat, lon], 14);
        findNearbyPlaces(lat, lon);
      },
      () => {
        if (mapResults) {
          mapResults.innerHTML = `<div style="text-align:center;padding:24px;color:var(--muted)">⚠️ ${escapeHtml(t("location_denied"))}</div>`;
        }
        if (badge) badge.textContent = t("denied_text");
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  });
}

const clearRouteBtn = document.getElementById("clearRouteBtn");
if (clearRouteBtn) {
  clearRouteBtn.addEventListener("click", clearRoute);
}

if (toggleSidebarBtn) {
  toggleSidebarBtn.addEventListener("click", () => {
    const willCollapse = !sidebar?.classList.contains("collapsed");
    setSidebarState(willCollapse);
  });
}