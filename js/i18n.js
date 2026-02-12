let currentTranslations = {};
let currentLang = "en";

/* ================================
   Detecta idioma automaticamente
================================ */
function detectLanguage() {
  const saved = localStorage.getItem("lang");

  if (saved) return saved;

  const browser = navigator.language || navigator.userLanguage;

  if (browser && browser.startsWith("pt")) {
    return "pt";
  }

  return "en";
}

/* ================================
   Carrega JSON
================================ */
async function loadTranslations(lang) {
  try {
    const res = await fetch(`i18n/${lang}.json`);

    if (!res.ok) throw new Error("Translation file not found");

    currentTranslations = await res.json();
    currentLang = lang;

    applyTranslations();
    updateHtmlLang();
    updateLangButton();

  } catch (err) {
    console.error("i18n error:", err);
  }
  document.documentElement.style.opacity = "1";
}

/* ================================
   Busca valor no JSON
================================ */
function getTranslation(path) {
  return path.split(".").reduce((obj, key) => {
    return obj && obj[key];
  }, currentTranslations);
}

/* ================================
   Aplica no HTML
================================ */
function applyTranslations() {

  /* Textos */
  document.querySelectorAll("[data-i18n]").forEach(el => {

    const key = el.dataset.i18n;
    const value = getTranslation(key);

    if (!value) return;

    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = value;
    } else {
      el.textContent = value;
    }

    if (el.hasAttribute("aria-label")) {
      el.setAttribute("aria-label", value);
    }

  });


  /* ALT */
  document.querySelectorAll("[data-i18n-alt]").forEach(el => {

    const key = el.dataset.i18nAlt;
    const value = getTranslation(key);

    if (value) {
      el.setAttribute("alt", value);
    }

  });


  /* TITLE */
  const titleEl = document.querySelector("title[data-i18n]");

  if (titleEl) {
    const value = getTranslation(titleEl.dataset.i18n);
    if (value) titleEl.textContent = value;
  }


  /* META */
  document.querySelectorAll("meta[data-i18n]").forEach(meta => {

    const key = meta.dataset.i18n;
    const value = getTranslation(key);

    if (value) {
      meta.setAttribute("content", value);
    }

  });


  /* SCHEMA */
  const schemaEl = document.getElementById("schemaData");

  if (schemaEl) {

    const data = JSON.parse(schemaEl.textContent);

    const jobTitle = getTranslation("schema.jobTitle");

    if (jobTitle) {
      data.jobTitle = jobTitle;
      schemaEl.textContent = JSON.stringify(data);
    }

  }

}


/* ================================
   Atualiza <html lang="">
================================ */
function updateHtmlLang() {
  document.documentElement.lang = currentLang;
}

/* ================================
   Atualiza botão 🌐
================================ */
function updateLangButton() {
  const btn = document.getElementById("langToggle");

  if (!btn) return;

  btn.textContent = currentLang === "en" 
    ? "🌐 EN" 
    : "🌐 PT";
}

/* ================================
   Inicialização
================================ */
const lang = detectLanguage();
loadTranslations(lang);
