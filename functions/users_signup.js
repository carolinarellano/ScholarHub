document.getElementById('formAuthenticationReg').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    registro(); // Call your signup function
});

function registro() {
    console.log("Registrando usuario...");

    const usuario = document.getElementById('usernameReg').value;
    const email = document.getElementById('emailReg').value;
    const password = document.getElementById('passwordReg').value;

    if (!usuario || !email || !password) {
        alert("Ingresa tus datos correctamente.");
        return;
    }

    console.log(usuario);
    console.log(email);
    console.log(password);

    fetch('http://localhost:3000/html/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario: usuario,
            email: email,
            password: password
        }),
    })
    .then(res => {
        if (res.status == 201) {
            window.location.href = '/html/inicio';
        } else {
            alert("Error al registrar usuario.");
        }
    })
    .catch(err => console.log(err));
}