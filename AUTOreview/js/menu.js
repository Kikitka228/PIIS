document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 1;
    const totalSlides = 5;
    const intervalTime = 5000;

    function nextSlide() {
        currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1;
        document.getElementById(`s${currentSlide}`).click();
    }

    let sliderInterval = setInterval(nextSlide, intervalTime);

    // Останавливаем авто-переключение при ручном выборе
    document.querySelectorAll('.slider-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            clearInterval(sliderInterval);
            sliderInterval = setInterval(nextSlide, intervalTime);
        });
    });
});