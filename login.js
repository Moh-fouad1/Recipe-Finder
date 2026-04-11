document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const errorDiv = document.getElementById('error-message');

    const urlParams = new URLSearchParams(window.location.search);
    const errorMsg = urlParams.get('error');
    if (errorMsg && errorDiv) {
        errorDiv.textContent = decodeURIComponent(errorMsg);
    }

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (errorDiv) errorDiv.textContent = '';
        });
    });

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            if (!username || !password) {
                if (errorDiv) errorDiv.textContent = 'Please enter both username and password.';
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const validUser = users.find(user => user.username === username && user.password === password);

            if (validUser) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('accountType', validUser.accountType);
                alert(`Login successful! Welcome back, ${validUser.firstname}!`);
                window.location.href = 'index.html';
            } else {
                if (errorDiv) errorDiv.textContent = 'Invalid username or password.';
            }
        });
    }
});