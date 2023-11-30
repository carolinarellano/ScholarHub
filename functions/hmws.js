// Agregar tarea
document.addEventListener('DOMContentLoaded', function () {
    // Obtén el botón por su ID
    var abrirModalBtn = document.getElementById('abrirModalAgregarTarea');

    // Agrega un manejador de eventos al hacer clic en el botón
    abrirModalBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que se envíe el formulario automáticamente
        abrirModalAgregarTarea();
    });
    getTareas();
});

function abrirModalAgregarTarea() {
    const modal = new bootstrap.Modal(document.getElementById('modalAgregarTarea'));
    modal.hide();
}

function obtenerCardIdDinamico(nombre) {
    console.log(nombre);
    // Aquí generas dinámicamente el ID del modal basado en el nombre
    return `card-${nombre.replace(/\s+/g, '-').toLowerCase()}`;
}

async function agregarTarea() {
    const colores = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    const indiceAleatorio = Math.floor(Math.random() * colores.length);
    const badgeColor = colores[indiceAleatorio];

    // Obtén los valores del formulario de tareas
    const nombreActividadInput = document.querySelector('#modal-agregar-nombreActividad');
    const opcionesMateriaInput = document.querySelector('#modal-agregar-opcionesMateria');
    const opcionesCategoriaInput = document.querySelector('#modal-agregar-categoria');
    const fechaEntregaInput = document.querySelector('#modal-agregar-fechaEntrega');
    const detallesExtraInput = document.querySelector('#modal-agregar-detallesExtra');

    // Verifica si los elementos existen antes de intentar acceder a sus propiedades
    if (!nombreActividadInput || !opcionesMateriaInput || !opcionesCategoriaInput || !fechaEntregaInput || !detallesExtraInput) {
        console.error("No se pueden obtener todos los elementos del formulario.");
        return;
    }

    const nombreActividad = nombreActividadInput.value;
    const opcionesMateria = opcionesMateriaInput.options[opcionesMateriaInput.selectedIndex]?.value;
    const opcionesCategoria = opcionesCategoriaInput.value;
    const fechaEntrega = fechaEntregaInput.value;
    const detallesExtra = detallesExtraInput.value;

    const cardActividadId = obtenerCardIdDinamico(nombreActividad);
    crearModalActividad(cardActividadId, nombreActividad, opcionesMateria, opcionesCategoria, fechaEntrega, detallesExtra, badgeColor);

    // Cierra el modal después de agregar la tarea
    const modalAgregarTarea = new bootstrap.Modal(document.getElementById('modalAgregarTarea'));
    modalAgregarTarea.hide();

    const tarea = {
        nombre: nombreActividad,
        materia: opcionesMateria,
        categoria: opcionesCategoria,
        fechaEntrega: fechaEntrega,
        descripcion: detallesExtra
    }

    // Send a POST request to the server
    const response = await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
    });

    if (!response.ok) {
        console.error('Error al agregar tarea:', response.statusText);
    }
    
}

function crearModalActividad(id, nombreActividad, materiaSeleccionada, categoriaSeleccionada, fechaEntrega, detallesExtra, color) {
    const nuevaTarea = document.createElement('div');
    nuevaTarea.id = id;
    nuevaTarea.className = 'col-md-6 col-lg-4 mb-3';
    nuevaTarea.innerHTML = `
        <div class="card">
            <div class="card-header">
                <span class="badge bg-label-${color} me-1">${materiaSeleccionada}</span>
            </div>
            <div class="card-body">
                <p><small>${categoriaSeleccionada}</small></p>
                <h5 class="card-title">${nombreActividad}</h5>
                <p class="card-text">${detallesExtra}</p>
                <small>
                    <p id="fechaEntrega"><b>Fecha: </b>${fechaEntrega}</p>
                </small>
                <button class="btn btn-warning-outline float-right" onclick="editCard(this)" data-bs-toggle="modal" data-bs-target="#modalEditarTarea">
                    <i class='bx bx-edit'></i> Editar
                </button>
                <button class="btn btn-danger-outline float-right" onclick="deleteCard(this)">
                    <i class="bx bx-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `;

    // Agrega la nueva tarea al contenedor de tareas
    const containerTareas = document.getElementById('container-tareas');
    containerTareas.appendChild(nuevaTarea);

    return nuevaTarea;
}

function editarTarea() {
    let nombreActividad = nombreActividad.value;
    let opcionesMateria = opcionesMateria.options[opcionesMateriaInput.selectedIndex]?.value;
    let opcionesCategoria = opcionesCategoria.value;
    let fechaEntrega = fechaEntrega.value;
    let detallesExtra = detallesExtra.value;

    if (nombreActividad === '' || opcionesMateria === null || opcionesCategoria === '' || fechaEntrega === '' || detallesExtra === '') {
        alert('Todos los campos son obligatorios');
        return;
    }

    const cardActividadId = obtenerCardIdDinamico(nombreActividad);
    crearModalActividad(cardActividadId, nombreActividad, opcionesMateria, opcionesCategoria, fechaEntrega, detallesExtra, badgeColor);
    if (cardActividadId === null) {
        alert('No se ha encontrado la tarea');
        return;
    }

    // Cierra el modal después de agregar la tarea
    const modalEditarTarea = new bootstrap.Modal(document.getElementById('modalEditarTarea'));
    modalEditarTarea.hide();
}

function getTareas() {
    // GET the elements from /tareas and display them in the HTML
    fetch('http://localhost:3000/tareas')
        .then(response => response.json())
        .then(data => {
            data.forEach(tarea => {
                const cardActividadId = obtenerCardIdDinamico(tarea.nombre);
                // Format the date
                const fechaEntrega = new Date(tarea.fechaEntrega);
                const formattedDate = `${fechaEntrega.getDate()}/${fechaEntrega.getMonth() + 1}/${fechaEntrega.getFullYear()}`;
                // Display the subject name instead of the ID
                crearModalActividad(cardActividadId, tarea.nombre, tarea.materia.nombre, tarea.categoria, formattedDate, tarea.descripcion, 'primary');
                console.log(tarea.materia.nombre)
            });
        })
        .catch(error => console.error('Error al obtener tareas:', error));
}