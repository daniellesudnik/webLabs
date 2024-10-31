(function() {
    const startTime = performance.now();

    window.addEventListener('load', function() {
        const loadTime = (performance.now() - startTime) / 1000;
        const footer = document.querySelector('footer');
        if (footer) {
            const loadInfo = document.createElement('p');
            loadInfo.textContent = `Время загрузки страницы: ${loadTime.toFixed(2)} сек.`;
            footer.appendChild(loadInfo);
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        const menuLinks = document.querySelectorAll('.menu__link');
        const currentLocation = document.location.href;
        menuLinks.forEach(link => {
            if (link.href === currentLocation) {
                link.classList.add('active');
            }
        });
    });
})();