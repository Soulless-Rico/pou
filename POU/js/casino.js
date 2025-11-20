    const lever = document.getElementById("lever");
    const spinBtn = document.getElementById("spinBtn");
    const slotResult = document.getElementById("slot-result");
    const reelEls = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
    ];

const symbols = ["🍒", "🍋", "⭐", "🍉", "🔔", "7️⃣"];

function spinReel(reel, delay) {
    return new Promise(resolve => {
        reel.classList.add("spin-animation");
        reel.innerText = "🎲"; // spinning placeholder

        const result = symbols[Math.floor(Math.random() * symbols.length)];

        setTimeout(() => {
            reel.classList.remove("spin-animation");
            reel.innerText = result;
            resolve(result);
        }, delay);
    });
}

function pullLeverAnimation() {
    lever.classList.add("lever-down");

    setTimeout(() => {
        lever.classList.remove("lever-down");
    }, 300);
}

async function playSlots() {
    if (pou.coins < 15) {
        alert("Need 15 coins u brokie.");
        return;
    }

    pou.coins -= 15;
    savePou();
    render();

    pullLeverAnimation();
    spinBtn.disabled = true;

    const result1 = await spinReel(reelEls[0], 800);
    const result2 = await spinReel(reelEls[1], 1100);
    const result3 = await spinReel(reelEls[2], 1400);

    let reward = 0;

    if (result1 === result2 && result2 === result3) {
        reward = 50;
        slotResult.innerText = "JACKPOT! +50 coins!";
        addXP(50);
    }
    else if (result1 === result2 || result2 === result3 || result1 === result3) {
        reward = 15;
        slotResult.innerText = "Nice! +15 coins!";
        addXP(20);
    }
    else {
        slotResult.innerText = "L you lost.";
    }

    pou.coins += reward;
    savePou();
    render();

    spinBtn.disabled = false;

        setTimeout(() => {
        reelEls.forEach(reel => reel.innerText = ""); // empty reels
        slotResult.innerText = ""; // clear result
    }, 15000);
}

spinBtn.addEventListener("click", playSlots);