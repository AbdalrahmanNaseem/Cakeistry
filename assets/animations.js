// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 50,
    });

    initHeroAnimation();
});

// GSAP 3D Hero Animation
function initHeroAnimation() {
    const heroContainer = document.querySelector('#hero-3d-container');
    const heroImage = document.querySelector('#hero-3d-image');

    if (!heroContainer || !heroImage) return;

    // Initial Floating Animation (Y-axis bobbing)
    gsap.to(heroImage, {
        y: 15,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // Mouse Move Parallax Effect
    heroContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = heroContainer.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(heroImage, {
            rotationY: x * 20, // Rotate based on X position
            rotationX: -y * 20, // Rotate based on Y position
            x: -x * 30, // Move opposite to cursor
            y: -y * 30, // Move opposite to cursor
            duration: 1,
            ease: "power2.out"
        });
    });

    // Reset on mouse leave
    heroContainer.addEventListener('mouseleave', () => {
        gsap.to(heroImage, {
            rotationY: 0,
            rotationX: 0,
            x: 0,
            y: 0, // Will blend back into the yoyo tween
            duration: 1,
            ease: "power2.out"
        });
    });
}
