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
} else {
    savePou();
}

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

    const thirstEl = document.getElementById("thirst");
    const hungerEl = document.getElementById("hunger");
    const energyEl = document.getElementById("energy");
    const funEl = document.getElementById("fun");
    const hygieneEl = document.getElementById("hygiene");
    const coinsEl = document.getElementById("coins");
    const stressEl = document.getElementById("stress");
    const levelEl = document.getElementById("level");
    const healthBar = document.getElementById('main-health-bar');
    const xpBar = document.getElementById('main-xp-bar');
    const healthEl = document.getElementById('pouHealth');

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
    healthBar.style.width = value + '%';  // value = 0 to 100
}

// Example:
updateHealth(75);  // Sets health bar to 75%

function addXP(amount) {
    pou.xp += amount;

    // Check level up
    while (pou.xp >= pou.xpToNext) {
        pou.xp -= pou.xpToNext;
        pou.level++;

        // každým levelom potrebné XP mierne rastú
        pou.xpToNext = Math.floor(pou.xpToNext * 1.25);

        console.log(`LEVEL UP! Teraz máš level ${pou.level}.`);
    }
    
    renderSkillTree();
    clampStats();
    savePou();
    render();
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

function rainMoney() {
    const container = document.getElementById('money-rain');

    for (let i = 0; i < 100; i++) {  // amount of bills
        const money = document.createElement('div');
        money.classList.add('money');

        // random horizontal start
        money.style.left = Math.random() * 100 + 'vw';
        // random animation duration
        money.style.animationDuration = (2 + Math.random() * 2) + 's';
        // random size
        money.style.width = money.style.height = (20 + Math.random() * 20) + 'px';
        money.innerText = "💵"; // makes it visually money

        container.appendChild(money);

        // remove element after animation
        money.addEventListener('animationend', () => {
            money.remove();
        });
    }
}

function unlockSkill(id) {
    const skill = skills[id];
    if (!skill) return;

    if (skill.unlocked) {
        console.log("Skill už je odomknutý.");
        return;
    }

    if (pou.level < skill.requiredLevel) {
        console.log(`Potrebný level: ${skill.requiredLevel}`);
        return;
    }

    skill.unlocked = true;
    skill.effect(); // aktivuje perk
    console.log(`Skill '${skill.name}' odomknutý!`);
}

function clampStats() {
    for (let key in pou) {
        if (typeof pou[key] === "number") { // zabezpečí, aby v objekte pou boli iba čísla
            if (pou[key] < 0) pou[key] = 0;
            if (pou[key] > 100) pou[key] = 100;
        }
    }
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

function renderSkillTree() {
    const div = document.getElementById("skills");
    div.innerHTML = "";

    Object.values(skills).forEach(skill => {
        const btn = document.createElement("button");
        btn.textContent = `${skill.name} (lvl ${skill.requiredLevel})`;
        btn.disabled = skill.unlocked || pou.level < skill.requiredLevel;

        btn.onclick = () => unlockSkill(skill.id);

        div.appendChild(btn);
    });
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
    
    thirstEl.innerText = pou.thirst;
    hungerEl.innerText = pou.hunger;
    energyEl.innerText = pou.energy;
    funEl.innerText = pou.fun;
    hygieneEl.innerText = pou.hygiene;
    coinsEl.innerText = pou.coins;
    levelEl.innerText = pou.level;
    stressEl.innerText = pou.stress;
    healthEl.innerText = pou.health;
    updateHealth(pou.health);

    setInterval(autoRender, 1000);
}

function safeDisplay(value) {
    return (typeof value === "number" && !isNaN(value)) ? value : 0;
}

function render() {
    
    thirstEl.innerText = safeDisplay(pou.thirst);
    hungerEl.innerText = safeDisplay(pou.hunger);
    energyEl.innerText = safeDisplay(pou.energy);
    funEl.innerText = safeDisplay(pou.fun);
    hygieneEl.innerText = safeDisplay(pou.hygiene);
    coinsEl.innerText = safeDisplay(pou.coins);
    levelEl.innerText = safeDisplay(pou.level);
    stressEl.innerText = safeDisplay(pou.stress);
    healthEl.innerText = safeDisplay(pou.health);
    updateHealth(pou.health);
}

autoRender();
