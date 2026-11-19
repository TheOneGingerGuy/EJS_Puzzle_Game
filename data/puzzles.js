const content = {
    wordLadder: {
        word1:{
            firstWord: "tear",
            goalWord: "deep"
        },word2:{
            firstWord: "luck",
            goalWord: "dark"
        },word3:{
            firstWord: "mall",
            goalWord: "sink"
        },word4:{
            firstWord: "bull",
            goalWord: "tide"
        },word5:{
            firstWord: "full",
            goalWord: "bait"
        },
    },
    ezRiddles: {
        riddle1: {
            text: "I'm in the heavens, I illuminate the sky, I turn the tides when I pass by. What am I?",
            answer: ["the moon", "moon"]
            // This is a list in case you want 'the moon' and 'the big rock in space' to both be right
            // The list is not to accept 'The MoON' and "the moon" as acceptable. answers.js already normalizes the responses for you!
        },
        riddle2: {
            text: "I lurk in the deep dark, I attract those who search for light, and I have nothing worth throwing away. What am I?",
            answer: ["angler fish", "an angler fish"]
        },
        riddle3: {
            text: "I am essential to all, in the water, in life. I have both a solid and powdered form. What am I?",
            answer: ["salt"]
        }
        // Possibility for even more randomly selected!
    },
    caesar: {
        // word1: ["blobfish", "coral", "blue whale", "bikini bottom", "water"]
        word1: {
            encoded: "eoreilvk",
            answer: "blobfish"
        },
        word2: {
            encoded: "frudo",
            answer: "coral"
        },
        word3: {
            encoded: "eoxh zkdoh",
            answer: "blue whale"
        },
        word4: {
            encoded: "elnlql erwwrp",
            answer: "bikini bottom"
        },
        word5: {
            encoded: "zdwhu",
            answer: "water"
        }
    },
    anagram: {
        word1: {
            mixedText: "poisoned",
            answer: "poseidon"
        },
        word2: {
            mixedText: "canoe",
            answer: ["ocean", "the ocean"]
        },
        word3: {
            mixedText: "harks",
            answer: ["shark", "a shark"]
        }
    },
    morse: {
        word1: {
            encoded: "-- .- .-. .. .- -. .- / - .-. . -. -.-. ....",
            answer: "mariana trench"
        },
        word2: {
            encoded: "- .... . / .- -... -.-- ... ...",
            answer: ["the abyss", "abyss"]
        },
        word3: {
            encoded: "--. .. .- -. - / ... --.- ..- .. -..",
            answer: ["giant squid", "a giant squid"]
        }
    },
    finalRiddle: {
        text: "I'm trapped inside this hollow shell, I gasp for air but cannot yell. Determined, driven, compelled, to kill this beast, this spawn of hell. What am I?",
        answer: ["player", "me", "the player"]
    },
}
const puzzles = [
    {
        slug: 'ad4a9b73-b992-4ea4-8b89-294bec2370d5',
        title: 'Rungs of the Reef',
        type: 'wordLadder',
        prompt: 'Change the starting word one letter at a time to get the final word. Every step must be a real word. Type the steps in between, separated by spaces.',
        hint: 'Change exactly one letter per step. Every ladder here can be solved in three steps or fewer.',
        story: ''
    },
    {
        slug: '8a56be78-103a-473c-a337-1b524e9a69a3',
        title: 'Deep Riddle',
        type: 'riddle',
        prompt: 'Answer the riddle:',
        hint: 'The answer is something you could find in the sky, the sea, or the kitchen.',
        story: ''
    },
    {
        slug: '0835e403-9636-42b1-bb73-9c5a8b0f3472',
        title: 'Shifted Words',
        type: 'caesar',
        prompt: 'Each letter has been shifted down the alphabet. Decode this:',
        hint: 'Every letter moved the same number of places. Julius Caesar liked to shift by three.',
        story: ''
    },
    {
        slug: 'f0e4bee8-88b8-4022-aef6-dd9f62522df8',
        title: 'Tangled Name',
        type: 'anagram',
        prompt: 'Rearrange the letters to find something from the deep:',
        hint: 'Use every letter exactly once. Think of creatures, places, and gods of the sea.',
        story: ''
    },
    {
        slug: '9112a096-a62e-4960-bb64-be0fbc1d4dd3',
        title: 'Signals from Below',
        type: 'morse',
        prompt: 'A signal is coming up from the depths. Decode it:',
        hint: 'Dots and dashes were used to send messages by telegraph. A slash marks the gap between words.',
        story: ''
    },
    {
        slug: 'a763da16-80f1-4540-bf18-62c991567deb',
        title: 'The Final Riddle',
        type: 'finalRiddle',
        prompt: 'One last riddle stands between you and the surface:',
        hint: 'Who has been descending this whole time?',
        story: ''
    },
]
const victorySlug = '28661586-c7f3-443f-ab98-ea797f6a886f'

module.exports = { content, puzzles, victorySlug }