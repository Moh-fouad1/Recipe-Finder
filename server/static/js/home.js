document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    const heroBtns = document.querySelector('.hero-buttons');
    if (heroBtns && isLoggedIn) {
        const joinBtn = heroBtns.querySelector('a[href="signup.html"]');
        if (joinBtn) joinBtn.style.display = 'none';
    }
});