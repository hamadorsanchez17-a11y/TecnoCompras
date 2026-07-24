document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const logout = document.getElementById("logout");

    if (logout) {

        logout.addEventListener("click", (e) => {

            e.preventDefault();

            localStorage.removeItem("token");

            window.location.href = "login.html";

        });

    }

});