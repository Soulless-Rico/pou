let pou = {
    thirst: 0,
    hunger: 0,
    energy: 100,
    fun: 100,
    hygiene: 100,
    coins: 100,
    stress: 0,
    level: 1,
    xp: 0
};

const savedPou = localStorage.getItem("pouData");
if (savedPou) {
    pou = JSON.parse(savedPou);
} else {
    savePou();
}

    const thirstEl = document.getElementById("thirst");
    const hungerEl = document.getElementById("hunger");
    const energyEl = document.getElementById("energy");
    const funEl = document.getElementById("fun");
    const hygieneEl = document.getElementById("hygiene");
    const coinsEl = document.getElementById("coins");
    const stressEl = document.getElementById("stress");
    const levelEl = document.getElementById("level");

    setInterval(() => {
    pou.thirst += 1;
    pou.hunger += 1; // hunger = hunger + 1
    pou.energy -= 1;
    pou.fun -= 1;
    pou.hygiene -= 1;
    pou.stress += 1;

    clampStats();
    savePou();
    //render();
}, 60000); // každú minútu

function feed() {
    if (pou.coins < 5) {
        console.warn("Nedostatok coinov!"); 
        return; 
    }
    pou.hunger -= 20;
    pou.coins -= 5;

    clampStats();
    savePou();
}

function drink() {
    if (pou.coins < 3) {  //pitie stojí 3 coiny
        console.warn("Nedostatok coinov na drink!");
        return;
    }

    pou.thirst += 15;
    pou.coins -= 3;

    clampStats();
    savePou();
   // renderStats();
}

function smokeWeedEveryday() {
    if (pou.coins < 20) {
        console.warn("Nedostatok coinov na weed!");
        return;
    }
    pou.stress -= 50;
    pou.coins -= 20;

    clampStats();
    savePou();
}

function washYourBalls() {
    if (pou.coins < 8) {
        console.warn("Nedostatok coinov na mydlo!");
        return;
    }
    pou.hygiene += 100;
    pou.coins -= 8;

    clampStats();
    savePou();

}

function sleep() {
    pou.energy = 100;
    clampStats();
    savePou();
}


function clampStats() {
    for (let key in pou) {
        if (typeof pou[key] === "number") { // zabezpečí, aby v objekte pou boli iba čísla
            if (pou[key] < 0) pou[key] = 0;
            if (pou[key] > 100) pou[key] = 100;
        }
    }
}

function savePou() {
    localStorage.setItem("pouData", JSON.stringify(pou));
}

function render() {
    
    thirstEl.innerText = pou.thirst;
    hungerEl.innerText = pou.hunger;
    energyEl.innerText = pou.energy;
    funEl.innerText = pou.fun;
    hygieneEl.innerText = pou.hygiene;
    coinsEl.innerText = pou.coins;
    levelEl.innerText = pou.level;
    console.log('rendering!');

    setTimeout(render, 1000);
}

render();

