// --- INICIALIZAÇÃO GLOBAL ---
document.addEventListener('DOMContentLoaded', function () {
    if (typeof initMenuToggle === 'function') initMenuToggle();
    if (typeof initFormOrcamento === 'function') initFormOrcamento();
    if (typeof initCarousel === 'function') initCarousel();
});
