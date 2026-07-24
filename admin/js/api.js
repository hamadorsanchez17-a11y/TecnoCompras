async function login(email, password) {

    const response = await fetch(`${API_URL}/auth/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            correo: email,
            password: password
        })

    });

    return await response.json();

}