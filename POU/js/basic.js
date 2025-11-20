const THIRST_EL = document.getElementById("thirst");
const HUNGER_EL = document.getElementById("hunger");
const ENERGY_EL = document.getElementById("energy");
const FUN_EL = document.getElementById("fun");
const HYGIENE_EL = document.getElementById("hygiene");
const COINS_EL = document.getElementById("coins");
const STRESS_EL = document.getElementById("stress");
const LEVEL_EL = document.getElementById("level");
const XP_BAR = document.getElementById('main-xp-bar');
const HEALTH_BAR = document.getElementById('main-health-bar');
const HEALTH_EL = document.getElementById('pouHealth');

function initializingStats() {
    return {
        thirst: 100,
        hunger: 100,
        energy: 100,
        fun: 100,
        hygiene: 100,
        coins: 100,
        stress: 0,
        level: 1,
        xpToNext: 100,
        xp: 0,
        health: 100,
        xpMultiplier: 1,
        hungerGainMultiplier: 1,
        foodCostMultiplier: 1,
    };
};

let pou = initializingStats();

const savedPou = localStorage.getItem("pouData");
if (savedPou) {
    pou = JSON.parse(savedPou);
        pou.thirst = Number(pou.thirst) || 100;
        pou.hunger = Number(pou.hunger) || 100;
        pou.energy = Number(pou.energy) || 100;
        pou.fun = Number(pou.fun) || 100;
        pou.hygiene = Number(pou.hygiene) || 100;
        pou.coins = Number(pou.coins) || 100;
        pou.stress = Number(pou.stress) || 0;
        pou.level = Number(pou.level) || 1;
        pou.xpToNext = Number(pou.xpToNext) || 100;
        pou.xp = Number(pou.xp) || 0;
        pou.health = Number(pou.health) || 100;

        pou.xpMultiplier = pou.xpMultiplier || 1;
        pou.hungerGainMultiplier = pou.hungerGainMultiplier || 1;
        pou.foodCostMultiplier = pou.foodCostMultiplier || 1;
} 
else
{
    savePou();
};

setInterval(() => {
    pou.thirst--;
    pou.hunger--; 
    pou.energy--;
    pou.fun--;
    pou.hygiene--;
    pou.stress++;

    clampStats();
    savePou();
    render();
}, 30000); // 30 sec

function updateHealth(value) {
    HEALTH_BAR.style.width = value + '%';  // value = 0 to 100
}

function feed() {
    const baseCost = 5 * Number(pou.foodCostMultiplier);

    if (Number(pou.coins) < baseCost) {
        console.log("Nedostatok coinov.");
        return;
    }

    pou.coins -= baseCost;

    const baseGain = 20 * pou.hungerGainMultiplier;
    pou.hunger += baseGain;

    addXP(10 * pou.xpMultiplier);
    clampStats();
    savePou();
    render();
}

function drink() {
    if (Number(pou.coins) < 3) {  //pitie stojí 3 coiny
        alert("Need 3 coins u brokie");
        return;
    }

    pou.thirst += 15;
    pou.coins -= 3;

    addXP(6);
    clampStats();
    savePou();
    render();
}

function smokeWeedEveryday() {
    if (Number(pou.coins) < 20) {
        alert("Need 20 coins u brokie");
        return;
    }
    pou.stress -= 50;
    pou.coins -= 20;

    addXP(10);
    clampStats();
    savePou();
    render()
}

function washYourBalls() {
    if (Number(pou.coins) < 8) {
        alert("Need 8 coins u brokie");
        return;
    }
    pou.hygiene += 100;
    pou.coins -= 8;

    addXP(10);
    clampStats();
    savePou();
    render();
}

function sleep() {
        if (Number(pou.hygiene) < 50) {
        alert("You cant go to bed smelling like that!");
        return;
    }

    pou.hygiene -= 50;
    pou.energy = 100;

    clampStats();
    savePou();
    render();
}

function collectProfits() {
    if (Number(pou.hygiene) < 30) {
        alert("You cant go collect profits smelling like that !");
        return;
    }

    rainMoney();
    pou.hygiene -= 30;
    pou.coins += 20;
    render();
}

function playGTA() {
    if (pou.hunger < 50 || pou.energy < 50 || pou.thirst < 50 || pou.hygiene < 50) {
        alert('Clean your ass, eat some food, drink some water and for gods sake take a shower !')
        return;
    }

    pou.fun += 100;
    pou.hygiene -= 20;
    pou.hunger -= 20;
    pou.energy -= 20;
    pou.thirst -= 20;

    addXP(30);
    savePou();
    render();
}

function savePou() {
    localStorage.setItem("pouData", JSON.stringify(pou));
}

function checkPouStatus() {
    if (pou.fun <= 0) {
        alert('Pou is dying of depression')
        pou.health -= 5;
    }
    if (pou.energy <= 0) {
        alert('Pou is dying of exhaustion')
        pou.health -= 5;
    }
    if (pou.hunger <= 0) {
        alert('Pou is dying of hunger')
        pou.health -= 5;
    }
    if (pou.thirst <= 0) {
        alert('Pou is dying of thirst')
        pou.health -= 5;
    }
    if (pou.stress <= 0) {
        alert('Pou is dying of anxiety')
        pou.health -= 5;
    }
    if (pou.hygiene <= 0) {
        alert('Pou is dying from the smell of his own armpits')
        pou.health -= 5;
    }

    if (pou.health <= 0) {
        alert('Pou is dead, you are indeed one hell of a failure, reseting game')
        localStorage.clear();
        initializingStats();
    }
}

function autoRender() {
    
    THIRST_EL.innerText = pou.thirst;
    HUNGER_EL.innerText = pou.hunger;
    ENERGY_EL.innerText = pou.energy;
    FUN_EL.innerText = pou.fun;
    HYGIENE_EL.innerText = pou.hygiene;
    COINS_EL.innerText = pou.coins;
    LEVEL_EL.innerText = pou.level;
    STRESS_EL.innerText = pou.stress;
    HEALTH_EL.innerText = pou.health;
    updateHealth(pou.health);

    setInterval(autoRender, 1000);
}

function safeDisplay(value) {
    return (typeof value === "number" && !isNaN(value)) ? value : 0;
}

function render() {
    
    THIRST_EL.innerText = safeDisplay(pou.thirst);
    HUNGER_EL.innerText = safeDisplay(pou.hunger);
    ENERGY_EL.innerText = safeDisplay(pou.energy);
    FUN_EL.innerText = safeDisplay(pou.fun);
    HYGIENE_EL.innerText = safeDisplay(pou.hygiene);
    COINS_EL.innerText = safeDisplay(pou.coins);
    LEVEL_EL.innerText = safeDisplay(pou.level);
    STRESS_EL.innerText = safeDisplay(pou.stress);
    HEALTH_EL.innerText = safeDisplay(pou.health);
    updateHealth(pou.health);
}

autoRender();
