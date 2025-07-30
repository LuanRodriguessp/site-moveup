// --- CAROUSEL ---
function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const carouselIndicatorsContainer = document.querySelector('.carousel-indicators');
    let carouselIndicators = document.querySelectorAll('.carousel-indicator');
    const visibleImages = 3;
    let counter = 0;
    let slideWidth = carouselContainer ? carouselContainer.offsetWidth : 0;
    let autoSlideInterval;
    function updateIndicators() {
        carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
        const activeIndex = Math.floor(counter / visibleImages);
        if (carouselIndicatorsContainer && carouselIndicatorsContainer.children.length > activeIndex) {
            carouselIndicatorsContainer.children[activeIndex]?.classList.add('active');
        }
    }
    function goToSlide(slideIndex) {
        counter = slideIndex * visibleImages;
        carouselSlide.style.transform = `translateX(${-slideWidth * counter / visibleImages}px)`;
        updateIndicators();
        resetAutoSlide();
    }
    function nextSlide() {
        if (counter >= carouselImages.length - visibleImages) {
            counter = 0;
        } else {
            counter += visibleImages;
        }
        carouselSlide.style.transform = `translateX(${-slideWidth * counter / visibleImages}px)`;
        updateIndicators();
    }
    function prevSlide() {
        if (counter <= 0) {
            counter = Math.floor((carouselImages.length - 1) / visibleImages) * visibleImages;
        } else {
            counter -= visibleImages;
        }
        carouselSlide.style.transform = `translateX(${-slideWidth * counter / visibleImages}px)`;
        updateIndicators();
    }
    function autoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlide();
    }
    if (carouselIndicatorsContainer) {
        if (carouselIndicatorsContainer.children.length === 0 && carouselImages.length > 0) {
            const numberOfSlides = Math.ceil(carouselImages.length / visibleImages);
            for (let i = 0; i < numberOfSlides; i++) {
                const indicator = document.createElement('span');
                indicator.classList.add('carousel-indicator');
                indicator.setAttribute('data-slide', i);
                indicator.addEventListener('click', (event) => {
                    const slideIndex = parseInt(event.target.getAttribute('data-slide'));
                    goToSlide(slideIndex);
                });
                carouselIndicatorsContainer.appendChild(indicator);
            }
            carouselIndicators = document.querySelectorAll('.carousel-indicator');
            carouselIndicators[0]?.classList.add('active');
        } else if (carouselImages.length > 0) {
            carouselIndicators.forEach(indicator => {
                indicator.addEventListener('click', (event) => {
                    const slideIndex = parseInt(event.target.getAttribute('data-slide'));
                    goToSlide(slideIndex);
                });
            });
            updateIndicators();
        }
    }
    if (carouselImages.length > 0) {
        autoSlide();
    }
    window.addEventListener('resize', () => {
        slideWidth = carouselContainer.offsetWidth;
        carouselSlide.style.transform = `translateX(${-slideWidth * counter / visibleImages}px)`;
    });
}
