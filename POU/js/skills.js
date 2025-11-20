const skills = {
    cheapFood: {
        id: "cheapFood",
        name: "Lacnejšie jedlo",
        requiredLevel: 3,
        unlocked: false,
        effect() {
            pou.foodCostMultiplier = 0.8; // 20% discount
        }
    },

    fastHunger: {
        id: "fastHunger",
        name: "Rýchlejšie sýtenie",
        requiredLevel: 5,
        unlocked: false,
        effect() {
            pou.hungerGainMultiplier = 1.3; // +30% hunger
        }
    },

    xpBoost: {
        id: "xpBoost",
        name: "XP Boost",
        requiredLevel: 7,
        unlocked: false,
        effect() {
            pou.xpMultiplier = 1.5; // +50% xp
        }
    }
};