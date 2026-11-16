module.exports = {
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
    ceasar: {
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
        mixedText: "poisoned",
        answer: "poseidon"
    },
    morse: {
        encoded: "-- .- .-. .. .- -. .- / - .-. . -. -.-. ....",
        answer: "mariana trench"
    },
    finalRiddle: {
        text: "I'm trapped inside this hollow shell, I gasp for air but cannot yell. Determined, driven, compelled, to kill this beast, this spawn of hell. What am I?",
        answer: ["player", "me", "the player"]
    },
}