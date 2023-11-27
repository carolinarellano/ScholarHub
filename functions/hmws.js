document.addEventListener('DOMContentLoaded', function () {
    // Obtén el botón por su ID
    var abrirModalBtn = document.getElementById('abrirModalAgregarTarea');

    // Agrega un manejador de eventos al hacer clic en el botón
    abrirModalBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que se envíe el formulario automáticamente
        abrirModalAgregarTarea();
    });
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

function agregarTarea() {
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

// Funciones editCard y deleteCard no proporcionadas en tu código original
function editCard(button) {
    // Implementa la lógica para editar la tarjeta
}

function deleteCard(button) {
    // Implementa la lógica para eliminar la tarjeta
}
