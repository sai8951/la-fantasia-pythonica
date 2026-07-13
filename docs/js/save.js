const SAVE_KEY = "laFantasiaPythonicaSave";

function createDefaultSaveData() {
    return {
        version: 1,

        currentChapter: 0,
        currentEventIndex: 0,

        player: {
            name: "",
            literal: ""
        },

        language: "ja",

        flags: {
            manuscriptObtained: false,
            grimoireAwakened: false
        },

        clearedChapters: [],
        unlockedGrimoirePages: []
    };
}

function loadGame() {
    const rawData = localStorage.getItem(SAVE_KEY);

    if (!rawData) {
        return createDefaultSaveData();
    }

    try {
        const loadedData = JSON.parse(rawData);

        return {
            ...createDefaultSaveData(),
            ...loadedData,
            player: {
                ...createDefaultSaveData().player,
                ...loadedData.player
            },
            flags: {
                ...createDefaultSaveData().flags,
                ...loadedData.flags
            }
        };
    } catch (error) {
        console.error("Failed to load save data:", error);
        return createDefaultSaveData();
    }
}

function saveGame(saveData) {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}

function deleteSaveData() {
    localStorage.removeItem(SAVE_KEY);
}

function hasSaveData() {
    return localStorage.getItem(SAVE_KEY) !== null;
}