// Event listener para que al pulsar un boton se corra la funcion 'iniciar sesion'
document.getElementById('formAuthentication').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    iniciarSesion(); // Call your login function
});

function iniciarSesion() {
    console.log('Iniciando sesión...');

    const usuario = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const animation = document.getElementById('login_animation');

    if (!usuario || !password) {
        alert("Ingresa tus datos correctamente.");
        return;
    }

    console.log(usuario);
    console.log(password);

    animation.style.display = 'block';

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

/*document.getElementById('cerrarSesion').addEventListener('click', function() {
    window.location.href = '/html/ingresar';
})*/