function register() {
    let username = document.getElementById("reg-username").value;
    let password = document.getElementById("reg-password").value;

    if (!username || !password) {
        alert("Fill all fields");
        return;
    }

    let user = { username, password };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful!");
    window.location.href = "login.html";
}

function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        alert("No user found. Please register first.");
        return;
    }

    if (username === savedUser.username && password === savedUser.password) {
        alert("Login successful!");
        window.location.href = "home.html";
    } else {
        alert("Invalid login details");
    }
}
