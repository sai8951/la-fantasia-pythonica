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
                ja: "先ほど、世界にあなたの魔力が観測されました。",
                en: "I just detected your magical power in this world."
            }
        },
        {
            speaker: { ja: "少女", en: "Girl" },
            text: {
                ja: "その魔法は現代では失われています。",
                en: "That magic has been lost in modern times."
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