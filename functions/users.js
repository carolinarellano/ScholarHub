// Event listener para que al pulsar un boton se corra la funcion 'iniciar sesion'
document.getElementById('formAuthentication').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    iniciarSesion(); // Call your login function
});

document.getElementById('formAuthenticationReg').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    registro(); // Call your login function
});

function iniciarSesion() {
    console.log('Iniciando sesión...');

    const usuario = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!usuario || !password) {
        alert("Ingresa tus datos correctamente.");
        return;
    }

    console.log(usuario);
    console.log(password);

    fetch('http://localhost:3000/html/ingresar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario: usuario,
            password: password
        }),
    })
    .then(res => {
        if (res.status == 200) {
            window.location.href = '/html/inicio';
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    })
    .catch(err => console.log(err));
}

function registro() {
    console.log('Registrando usuario...');

    const usuario = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/html/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario,
            email,
            password
        }),
    })
    .then(res => res.json())
    .then(data => {
        console.log("Registro correcto", data);
        if (!data.error) {
            window.location.href = '/inicio';
        }
    })
    .catch(err => console.log(err));
}

/*document.getElementById('cerrarSesion').addEventListener('click', function() {
    window.location.href = '/html/ingresar';
})*/