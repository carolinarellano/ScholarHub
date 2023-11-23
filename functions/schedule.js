// Crear una materia
// Generar un modal nuevo para editar materia

function agregarMateria() {
    let colores = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
    ]

    const indiceAleatorio = Math.floor(Math.random() * colores.length);
    let btnColor = colores[indiceAleatorio];

    // Crea una nueva tarjeta
    var nuevaMateria = document.createElement('div');
    nuevaMateria.className = 'card p-0';
    nuevaMateria.style.margin = '10px';

    var nombre = document.getElementById('nombreMateria');
    var periodo = document.getElementById('creditos');
    var creditos = document.getElementById('porcentajes');
    var porcentajes = document.getElementById('periodo');

    var modalId = 'modal-' + nombre;
    var modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal';

    nuevaMateria.innerHTML = `
      <div class="card-header">
        <h5 class="my-0 font-weight-normal">${nombre}</h5>
      </div>
      <div class="card-body">
        <h6 class="card-text"><strong>Periodo: </strong><span>${periodo}</span></h6>
        <h6 class="card-text"><strong>Créditos: </strong><span>${creditos}</span></h6>
      </div>
      <div class="card-footer">
        <a href="#" class="btn btn-${btnColor}" data-bs-toggle="modal" data-bs-target="${modalId}">Ver detalles</a>
      </div>
    `;

    // Agrega la nueva tarjeta al contenedor
    document.getElementById('container-materias').appendChild(nuevaMateria);
}

// Manejador de eventos para el envío del formulario
document.getElementById('materiaForm').addEventListener('submit', function (event) {
    // Evita que el formulario se envíe de forma predeterminada
    event.preventDefault();

    // Obtiene los valores del formulario
    var nombre = document.getElementById('nombreMateria').value;
    var periodo = document.getElementById('periodo').value;
    var creditos = document.getElementById('creditos').value;

    // Cierra el modal
    $('#agregarmateria').modal('hide');


    // Limpia el formulario si es necesario
    document.getElementById('materiaForm').reset();

});


// Editar la materia seleccionada
function abrirModalEdicion(nombre, periodo, creditos, porcentajes) {
    // Cargar datos en el formulario de edición
    document.getElementById('editarNombreMateria').value = nombre;
    document.getElementById('editarPeriodo').value = periodo;
    document.getElementById('editarCreditos').value = creditos;
    document.getElementById('editarPorcentajes').value = porcentajes;

    // Abrir el modal de edición
    $('#editarMateria').modal('show');
}

// Agrega un evento de clic a las tarjetas existentes para abrir el modal de edición
document.getElementById('container-materias').addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-editar-materia')) {
        var card = event.target.closest('.card');
        var nombre = card.querySelector('.card-title').textContent.trim();
        var periodo = card.querySelector('.card-periodo').textContent.trim();
        var creditos = card.querySelector('.card-creditos').textContent.trim();
        var porcentajes = card.querySelector('.card-porcentajes').textContent.trim();

        abrirModalEdicion(nombre, periodo, creditos, porcentajes);
    }
});

// Función para eliminar una materia

function eliminarMateria(event) {
    if (event.target.classList.contains('btn-eliminar-materia')) {
        var card = event.target.closest('.card');
        document.getElementById('container-materias').removeChild(card);
    }
}

document.getElementById('container-materias').addEventListener('click', eliminarMateria);


// Agregar materia al horario
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos del formulario y el botón de guardar cambios
    const selectMaterias = document.getElementById('selectMaterias');
    const html5TimeInput = document.getElementById('html5-time-input');
    const diasCheckbox = document.getElementById('diasCheckbox');
    const btnGuardarCambios = document.getElementById('btnGuardarCambios');

    // Evento para mostrar los detalles de la materia seleccionada al cambiar la selección
    selectMaterias.addEventListener('change', function () {
        // Aquí puedes cargar los detalles de la materia seleccionada en el formulario
        // Puedes obtener los detalles de la materia desde tu base de datos o cualquier otra fuente de datos
        const selectedMateria = obtenerDetallesMateria(selectMaterias.value);

        // Actualizar el formulario con los detalles de la materia seleccionada
        html5TimeInput.value = selectedMateria.hora;
        // (Actualizar otros campos según sea necesario)

        // Actualizar los checkboxes de días
        actualizarCheckboxesDias(selectedMateria.dias);
    });

    // Evento para guardar cambios al hacer clic en el botón "Guardar cambios"
    btnGuardarCambios.addEventListener('click', function () {
        // Aquí puedes implementar la lógica para guardar los cambios en tu base de datos
        const materiaSeleccionada = selectMaterias.value;
        const nuevaHora = html5TimeInput.value;
        const nuevosDias = obtenerDiasSeleccionados();

        // Guardar los cambios utilizando fetch, AJAX, o enviar una solicitud al servidor
        // ...

        // Cerrar el modal después de guardar los cambios
        $('#editScheduleModal').modal('hide');
    });

    // Función para obtener los detalles de la materia seleccionada (simulación)
    function obtenerDetallesMateria(materiaId) {
        // Puedes obtener los detalles de la materia desde tu base de datos o cualquier otra fuente de datos
        // Aquí solo se simula una función que devuelve datos de prueba
        return {
            hora: '09:30:00',
            dias: ['Lunes', 'Miércoles']
            // (Otros detalles de la materia)
        };
    }

    // Función para actualizar los checkboxes de días según la información de la materia seleccionada
    function actualizarCheckboxesDias(diasSeleccionados) {
        // Desmarcar todos los checkboxes primero
        diasCheckbox.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
            checkbox.checked = false;
        });

        // Marcar los checkboxes según los días seleccionados
        diasSeleccionados.forEach(function (dia) {
            const checkbox = diasCheckbox.querySelector(`input[value="${dia}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

    // Función para obtener los días seleccionados en el formulario
    function obtenerDiasSeleccionados() {
        const checkboxes = diasCheckbox.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(function (checkbox) {
            return checkbox.value;
        });
    }
});
