document.addEventListener('DOMContentLoaded', function() {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (isAdminLoggedIn) {
        window.location.href = 'adminProdutos.html';
        return;
    }
    
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', handleAdminLogin);
    }
    
    const passwordInput = document.getElementById('adminPassword');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleAdminLogin();
            }
        });
    }
});

function handleAdminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const loginError = document.getElementById('loginError');
    
    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        window.location.href = 'adminProdutos.html';
    } else {
        if (loginError) {
            loginError.style.display = 'block';
            
            setTimeout(() => {
                loginError.style.display = 'none';
            }, 3000);
        }
    }
}