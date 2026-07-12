import { grimoirePages } from "./grimoirePages.js";

let language = localStorage.getItem("language");

if (language !== "ja" && language !== "en") {
    language = null;
}

const pageList = document.getElementById("pageList");
const pageContent = document.getElementById("pageContent");
const pageTitle = document.getElementById("pageTitle");
const backButton = document.getElementById("backButton");
const jaButton = document.getElementById("jaButton");
const enButton = document.getElementById("enButton");

const mobilePageSelect = document.getElementById("mobilePageSelect");
const mobilePageLabel = document.getElementById("mobilePageLabel");

function applyLanguage(selectedLanguage) {
    language = selectedLanguage;
    localStorage.setItem("language", selectedLanguage);

    jaButton.classList.toggle(
        "active",
        selectedLanguage === "ja"
    );

    enButton.classList.toggle(
        "active",
        selectedLanguage === "en"
    );

    pageTitle.textContent =
        language === "ja"
            ? "魔導書"
            : "Grimoire";

    backButton.textContent =
        language === "ja"
            ? "← 戻る"
            : "← Back";

    mobilePageLabel.textContent =
        language === "ja"
            ? "頁を選ぶ"
            : "Select a Page";

    renderPageList();

    if (grimoirePages.length > 0) {
        selectPage(0);
    }
}

function renderPageList() {
    pageList.innerHTML = "";
    mobilePageSelect.innerHTML = "";

    grimoirePages.forEach((page, pageIndex) => {
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
    const page = grimoirePages[pageIndex];

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

    pageTitle.textContent = "Grimoire / 魔導書";
    backButton.textContent = "← Back / 戻る";
    mobilePageLabel.textContent = "Select a Page / 頁を選ぶ";

    renderPageList();

    if (grimoirePages.length > 0) {
        selectPage(0);
    }
}
