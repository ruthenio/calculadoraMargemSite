(function () {
  "use strict";

  var STORAGE_KEY = "cm_lang";
  var SUPPORTED = ["en", "es", "fr", "de"];

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function langFromHref(href) {
    var m = href.match(/^\/(en|es|fr|de)\//);
    return m ? m[1] : "pt-BR";
  }

  // Whenever the visitor clicks a language-switcher link, remember the
  // choice so we never override it with auto-detection again.
  document.addEventListener("click", function (e) {
    var target = e.target;
    var a = target && target.closest ? target.closest(".lang-switcher a") : null;
    if (!a) return;
    setStoredLang(langFromHref(a.getAttribute("href") || ""));
  });

  // Auto-detection only runs on the Portuguese (default) pages.
  if (document.documentElement.lang !== "pt-BR") return;

  // Respect a previous explicit or auto choice — never redirect twice.
  if (getStoredLang()) return;

  var browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || ""];
  var target = null;

  for (var i = 0; i < browserLangs.length; i++) {
    var code = String(browserLangs[i]).toLowerCase().slice(0, 2);
    if (code === "pt") {
      target = null;
      break;
    }
    if (SUPPORTED.indexOf(code) !== -1) {
      target = code;
      break;
    }
  }

  if (target) {
    setStoredLang(target);
    var path = window.location.pathname;
    window.location.replace("/" + target + path);
  }
})();
