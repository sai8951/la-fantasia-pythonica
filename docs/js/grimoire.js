import { grimoirePages } from "./grimoirePages.js";

const saveData = loadGame();

let language = saveData.language;

if (language !== "ja" && language !== "en") {
    language = null;
}

const pageList = document.getElementById("pageList");
const pageContent = document.getElementById("pageContent");
const pageTitle = document.getElementById("pageTitle");
const backButton = document.getElementById("backButton");
const jaButton = document.getElementById("jaButton");
const enButton = document.getElementById("enButton");

function hasManuscript() {
    return saveData.flags.manuscriptObtained === "true";
}

function hasGrimoireAwakened() {
    return saveData.flags.grimoireAwakened === "true";
}

const mobilePageSelect = document.getElementById("mobilePageSelect");
const mobilePageLabel = document.getElementById("mobilePageLabel");

function applyLanguage(selectedLanguage) {
    language = selectedLanguage;

    saveData.language = selectedLanguage;
    saveGame(saveData);

    jaButton.classList.toggle(
        "active",
        selectedLanguage === "ja"
    );

    enButton.classList.toggle(
        "active",
        selectedLanguage === "en"
    );

    renderGrimoireState();
}

function renderPageList() {
    pageList.innerHTML = "";
    mobilePageSelect.innerHTML = "";

    const unlockedPages = getUnlockedPages();

    unlockedPages.forEach((page, pageIndex) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "page-list-button";
        button.textContent = page.title[language];

        button.addEventListener("click", () => {
            selectPage(pageIndex);
        });

        pageList.appendChild(button);

        const option = document.createElement("option");

        option.value = String(pageIndex);
        option.textContent = page.title[language];

        mobilePageSelect.appendChild(option);
    });
}

function selectPage(pageIndex) {
    const unlockedPages = getUnlockedPages();
    const page = unlockedPages[pageIndex];

    if (!page) {
        return;
    }

    renderPage(page);
    mobilePageSelect.value = String(pageIndex);

    document
        .querySelectorAll(".page-list-button")
        .forEach((button, index) => {
            button.classList.toggle(
                "active",
                index === pageIndex
            );
        });
}

mobilePageSelect.addEventListener("change", () => {
    selectPage(Number(mobilePageSelect.value));
});

function getUnlockedPageIds() {
    const raw = localStorage.getItem(
        "unlockedGrimoirePages"
    );

    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw);

        return Array.isArray(parsed)
            ? parsed
            : [];
    } catch {
        return [];
    }
}

function getUnlockedPages() {
    const unlockedIds = getUnlockedPageIds();

    return grimoirePages.filter(
        (page) => unlockedIds.includes(page.id)
    );
}

function renderGrimoireState() {
    backButton.textContent =
        language === "ja"
            ? "← 戻る"
            : "← Back";

    if (!hasManuscript()) {
        location.href = "./index.html";
        return;
    }

    if (!hasGrimoireAwakened()) {
        pageTitle.textContent =
            language === "ja"
                ? "謎の紙"
                : "Mysterious Pages";

        mobilePageLabel.textContent =
            language === "ja"
                ? ""
                : "";

        pageList.innerHTML = "";
        mobilePageSelect.innerHTML = "";

        document
            .querySelector(".mobile-page-selector")
            .classList.add("hidden");

        pageContent.innerHTML =
            language === "ja"
                ? "<p></p>"
                : "<p></p>";

        return;
    }

    pageTitle.textContent =
        language === "ja"
            ? "魔導書"
            : "Grimoire";

    mobilePageLabel.textContent =
        language === "ja"
            ? "頁を選ぶ"
            : "Select a Page";

    document
        .querySelector(".mobile-page-selector")
        .classList.remove("hidden");

    renderPageList();

    const unlockedPages = getUnlockedPages();

    if (unlockedPages.length > 0) {
        selectPage(0);
    } else {
        pageContent.innerHTML =
            language === "ja"
                ? "<p></p>"
                : "<p></p>";
    }
}

function renderPage(page) {
    pageContent.innerHTML = `
        <h2>${escapeHtml(page.title[language])}</h2>

        <p>${escapeHtml(page.description[language])}</p>

        <h3>${language === "ja" ? "術式" : "Syntax"}</h3>

        <pre><code>${escapeHtml(page.code)}</code></pre>

        <h3>${language === "ja" ? "発動結果" : "Spell Effect"}</h3>

        <pre><code>${escapeHtml(page.output)}</code></pre>
    `;
}

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

jaButton.addEventListener("click", () => {
    applyLanguage("ja");
});

enButton.addEventListener("click", () => {
    applyLanguage("en");
});

if (language === "ja" || language === "en") {
    applyLanguage(language);
} else {
    language = "ja";

    jaButton.classList.add("active");
    enButton.classList.remove("active");

    renderGrimoireState();
}
