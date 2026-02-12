document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("langToggle");

  if (!btn) return;

  btn.addEventListener("click", () => {

    const newLang = currentLang === "pt" ? "en" : "pt";

    localStorage.setItem("lang", newLang);

    loadTranslations(newLang);
  });

});
