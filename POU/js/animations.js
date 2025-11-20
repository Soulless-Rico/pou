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