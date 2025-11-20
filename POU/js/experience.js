

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