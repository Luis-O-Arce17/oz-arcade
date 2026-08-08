const LANGUAGE_STORAGE_KEY = "ozarcade_language";

const DEFAULT_LANGUAGE = "en";

const SUPPORTED_LANGUAGES = [
    "en",
    "es"
];

export function getLanguage() {
    const savedLanguage =
        localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
        return savedLanguage;
    }

    return DEFAULT_LANGUAGE;
}

export function setLanguage(language) {
    if (!SUPPORTED_LANGUAGES.includes(language)) {
        return;
    }

    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        language
    );

    document.documentElement.lang = language;
}

export function getNextLanguage(language) {
    return language === "en" ? "es" : "en";
}

export function applyTranslations(translations, language) {
    document.documentElement.lang = language;

    const elements =
        document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
        const key = element.dataset.i18n;
        const translatedText =
            translations[language]?.[key];

        if (translatedText) {
            element.textContent = translatedText;
        }
    });
}