const chapter2 = {
    id: "chapter2",
    chapterNumber: 2,
    title: {
        ja: "迎え",
        en: "The Reunion"
    },

    scenario: [
        {
            type: "chapterTitle"
        },
        {
            speaker: { ja: "少女", en: "Girl" },
            text: {
                ja: "やっと見つけました！{player}さんですね！？",
                en: "I found you! Are you {player}?"
            }
        },
        {
            speaker: { ja: "{player}", en: "{player}" },
            text: {
                ja: "......？？",
                en: "...??"
            }
        },
        {
            speaker: { ja: "少女", en: "Girl" },
            text: {
                ja: "世界中に響くあなたの魔力が観測されました。",
                en: "I just detected your magical power resonating throughout the world."
            }
        },
        {
            speaker: { ja: "少女", en: "Girl" },
            text: {
                ja: "それは現代では失われた魔法です。",
                en: "That magic has been lost in the modern era."
            }
        }
    ],

    question: {
        id: "print_name",
        instruction: {
            ja: "あなたの name を世界へ響かせてください。",
            en: "Echo your name into the world."
        },
        answer: "print(name)"
    }
};