// Event listener para que al pulsar un boton se corra la funcion 'iniciar sesion'
document.getElementById('formAuthentication').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    iniciarSesion(); // Call your login function
});

function iniciarSesion() {
    console.log('Iniciando sesión...');

    const usuario = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(usuario);
    console.log(password);

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario,
            password
        }),
    })
        .then(res => res.json())
        .then(data => {
            console.log("Inicio de sesion correcto", data);
            if (!data.error) {
                //mostrarAlerta("success", "Inicio de sesión correcto.");
                const usuario = data.usuario;
                document.getElementById('username').innerText = usuario;
                window.location.href = '/inicio';
            }
        })
        .catch(err => console.log(err));
}

function registro() {
    console.log('Registrando usuario...');

    const usuario = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/registro', {
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
                //mostrarAlerta("success", "Registro correcto.");
                const usuario = data.usuario;
                document.getElementById('username').innerText = usuario;
            }
        })
        .catch(err => console.log(err));
}