const LANGUAGE_STORAGE_KEY = "ozarcade_language";

const games = [
    {
        id: "snake",
        title: "Snake",
        description: {
            en: "Grow, collect food and avoid crashing into yourself.",
            es: "Crece, recoge comida y evita chocar contra ti mismo."
        },
        status: "in-development",
        path: "games/snake/index.html"
    },
    {
        id: "brick-breaker",
        title: "Brick Breaker",
        description: {
            en: "Break every block while keeping the ball in play.",
            es: "Destruye todos los bloques mientras mantienes la pelota en juego."
        },
        status: "planned",
        path: "games/brick-breaker/index.html"
    },
    {
        id: "pong",
        title: "Pong",
        description: {
            en: "Challenge your opponent in the classic paddle battle.",
            es: "Enfréntate a tu oponente en la clásica batalla de paletas."
        },
        status: "coming-soon",
        path: "games/pong/index.html"
    },
    {
        id: "maze-chase",
        title: "Maze Chase",
        description: {
            en: "Navigate mazes, collect items and avoid your pursuers.",
            es: "Recorre laberintos, recoge objetos y evita a tus perseguidores."
        },
        status: "coming-soon",
        path: "games/maze-chase/index.html"
    }
];

const translations = {
    en: {
        tagline: "Classic games. Built for the web.",
        heroLabel: "ARCADE COLLECTION",
        heroTitle: "Choose your game",
        heroDescription:
            "Play classic-inspired games directly in your browser.",
        catalogTitle: "Games",
        catalogDescription:
            "New titles will be added as OzArcade grows.",
        footerText: "Browser Arcade",

        available: "Available",
        inDevelopment: "In Development",
        planned: "Planned",
        comingSoon: "Coming Soon",
        play: "Play",

        changeLanguage: "Change language to Spanish"
    },

    es: {
        tagline: "Juegos clásicos. Hechos para la web.",
        heroLabel: "COLECCIÓN ARCADE",
        heroTitle: "Elige tu juego",
        heroDescription:
            "Juega títulos inspirados en clásicos directamente desde tu navegador.",
        catalogTitle: "Juegos",
        catalogDescription:
            "Se añadirán nuevos títulos a medida que OzArcade crezca.",
        footerText: "Arcade para navegador",

        available: "Disponible",
        inDevelopment: "En desarrollo",
        planned: "Planeado",
        comingSoon: "Próximamente",
        play: "Jugar",

        changeLanguage: "Cambiar idioma a inglés"
    }
};

const catalogElement = document.querySelector("#game-catalog");
const languageButton = document.querySelector("#language-toggle");

let currentLanguage =
    localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";

function getStatusLabel(status) {
    const statusLabels = {
        available: translations[currentLanguage].available,
        "in-development": translations[currentLanguage].inDevelopment,
        planned: translations[currentLanguage].planned,
        "coming-soon": translations[currentLanguage].comingSoon
    };

    return statusLabels[status] ?? translations[currentLanguage].comingSoon;
}

function createGameCard(game) {
    const card = document.createElement("article");
    card.classList.add("game-card");
    card.dataset.gameId = game.id;

    const status = document.createElement("span");
    status.classList.add("game-status", `status-${game.status}`);
    status.textContent = getStatusLabel(game.status);

    const title = document.createElement("h3");
    title.classList.add("game-title");
    title.textContent = game.title;

    const description = document.createElement("p");
    description.classList.add("game-description");
    description.textContent = game.description[currentLanguage];

    card.append(status, title, description);

    if (game.status === "available") {
        const playLink = document.createElement("a");

        playLink.classList.add("play-button");
        playLink.href = game.path;
        playLink.textContent = translations[currentLanguage].play;

        card.append(playLink);
    } else {
        const unavailableButton = document.createElement("button");

        unavailableButton.classList.add("play-button");
        unavailableButton.type = "button";
        unavailableButton.disabled = true;
        unavailableButton.textContent =
            translations[currentLanguage].comingSoon;

        card.append(unavailableButton);
    }

    return card;
}

function renderCatalog() {
    catalogElement.replaceChildren();

    games.forEach((game) => {
        const card = createGameCard(game);
        catalogElement.append(card);
    });
}

function updateInterfaceLanguage() {
    document.documentElement.lang = currentLanguage;

    const elementsToTranslate =
        document.querySelectorAll("[data-i18n]");

    elementsToTranslate.forEach((element) => {
        const translationKey = element.dataset.i18n;
        const translatedText =
            translations[currentLanguage][translationKey];

        if (translatedText) {
            element.textContent = translatedText;
        }
    });

    languageButton.textContent =
        currentLanguage === "en" ? "ES" : "EN";

    languageButton.setAttribute(
        "aria-label",
        translations[currentLanguage].changeLanguage
    );

    renderCatalog();
}

function changeLanguage() {
    currentLanguage =
        currentLanguage === "en" ? "es" : "en";

    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        currentLanguage
    );

    updateInterfaceLanguage();
}

languageButton.addEventListener("click", changeLanguage);

updateInterfaceLanguage();