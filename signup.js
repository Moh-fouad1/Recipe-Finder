document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    let errorDiv = document.getElementById('error-message');

    if (!errorDiv && form) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        form.insertBefore(errorDiv, form.firstChild);
    }

    function showError(msg) {
        if (errorDiv) errorDiv.textContent = msg;
    }

    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(el => {
        el.addEventListener('input', () => showError(''));
    });

    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm_password');
    const matchCheckbox = document.getElementById('checkpasswordmatch');

    function checkMatch() {
        if (password && confirm && password.value !== confirm.value && matchCheckbox?.checked) {
            showError('Passwords do not match');
        } else if (errorDiv && errorDiv.textContent === 'Passwords do not match') {
            showError('');
        }
    }
    password?.addEventListener('input', checkMatch);
    confirm?.addEventListener('input', checkMatch);

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            showError('');

            const firstname = document.getElementById('firstname')?.value.trim() || '';
            const lastname = document.getElementById('lastname')?.value.trim() || '';
            const username = document.getElementById('username')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const phone = document.getElementById('phonenumber')?.value.trim() || '';
            const pwd = password?.value || '';
            const confirmPwd = confirm?.value || '';
            const terms = document.getElementById('terms')?.checked || false;

            if (!firstname || !lastname || !username || !email || !pwd || !confirmPwd) {
                showError('All fields are required.');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showError('Enter a valid email address (e.g., name@example.com).');
                return;
            }

            if (phone && !/^\d{10,}$/.test(phone.replace(/\D/g, ''))) {
                showError('Phone number must contain at least 10 digits (numbers only).');
                return;
            }

            if (pwd !== confirmPwd) {
                showError('Passwords do not match.');
                return;
            }

            if (pwd.length < 6) {
                showError('Password must be at least 6 characters.');
                return;
            }

            if (!terms) {
                showError('You must accept the Terms and Conditions.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.some(user => user.username === username)) {
                showError('Username already taken. Please choose another.');
                return;
            }

            const newUser = {
                username: username,
                password: pwd,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                accountType: document.getElementById('AccountType')?.value || 'user'
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Account created successfully! Please log in.');
            window.location.href = 'login.html';
        });
    }
});