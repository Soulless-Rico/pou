// Make pupils follow the mouse
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.pupil').forEach(pupil => {
        const rect = pupil.parentElement.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        const angle = Math.atan2(y, x);
        const distance = 8;

        pupil.style.transform = `translate(
            ${Math.cos(angle) * distance}px,
            ${Math.sin(angle) * distance}px
        )`;
    });
});
