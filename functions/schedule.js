document.addEventListener('DOMContentLoaded', function () {
    // Obtén el botón por su ID
    var guardarMateriaBtn = document.getElementById('guardarMateriaBtn');

    // Agrega un manejador de eventos al hacer clic en el botón
    guardarMateriaBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que se envíe el formulario automáticamente
        agregarMateria();
    });
});

function agregarMateria() {
    const colores = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    const indiceAleatorio = Math.floor(Math.random() * colores.length);
    const btnColor = colores[indiceAleatorio];

    const nombreInput = document.getElementById('nombreMateria');
    const periodoInput = document.getElementById('periodo');
    const creditosInput = document.getElementById('creditos');

    const nombre = nombreInput.value;
    const periodo = periodoInput.value;
    const creditos = creditosInput.value;
    const promedio = calculatePromedio();

    const modalId = `modal-${nombre.replace(/\s+/g, '-').toLowerCase()}`;
    const modal = crearModal(nombre, modalId, promedio);

    // Agrega el modal al final del body
    document.body.appendChild(modal);

    // Inicializa el modal
    var modalInstance = new bootstrap.Modal(document.getElementById(modalId));

    // Muestra el modal
    modalInstance.show();

    if (!nombre || !periodo || !creditos) {
        alert("Por favor, complete todos los campos antes de guardar.");
        // Puedes ocultar el modal si los campos no están completos
        modalInstance.hide();
    } else {
        const nuevaMateria = crearTarjetaMateria(nombre, periodo, creditos, btnColor, modalId);
        document.getElementById('container-materias').appendChild(nuevaMateria);
    }

    document.getElementById('materiaForm').reset();
    nuevoRubro(modalId);
}


function crearModal(nombre, modalId, promedio) {
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal fade';
    modal.tabIndex = "-1";
    modal.ariaHidden = "true";
    modal.setAttribute("aria-labelledby", "exampleModalLabel");
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="${modalId}">${nombre}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id="modal-rubros" class="modal-body"></div>
                <div class="modal-footer justify-content-start">
                    <p><strong>Promedio: </strong>${promedio}</p><br>
                    <button class="btn btn-warning-outline float-right" data-bs-toggle="modal" data-bs-target="#editarMateria" onclick=abrirModalEdicion()>
                    <i class='bx bx-edit'></i> Editar
                    </button>
                    <button class="btn btn-danger-outline float-right btn-eliminar-materia" onclick=eliminarMateria(this)>
                        <i class="bx bx-trash"></i> Eliminar
                    </button>
                    <button type="button" class="btn btn-secondary ms-auto" data-bs-dismiss="modal">Cerrar</button>
                </div>
        </div>
     </div>
    `;
    return modal;
}

function crearTarjetaMateria(nombre, periodo, creditos, btnColor, modalId) {
    const nuevaMateria = document.createElement('div');
    nuevaMateria.className = 'card p-0';
    nuevaMateria.style.margin = '10px';

    nuevaMateria.innerHTML = `
        <div class="card-header">
            <h5 class="my-0 font-weight-normal">${nombre}</h5>
        </div>
        <div class="card-body">
            <h6 class="card-text"><strong>Periodo: </strong><span>${periodo}</span></h6>
            <h6 class="card-text"><strong>Créditos: </strong><span>${creditos}</span></h6>
        </div>
        <div class="card-footer">
            <a href="#" class="btn btn-${btnColor} btn-editar-materia" data-bs-toggle="modal" data-bs-target="#${modalId}">Ver detalles</a>
        </div>
    `;

    return nuevaMateria;
}


// Contador para el id de los rubros
let rubroCounter = 1;
let rubroContent;

// Agregar nuevos rubros
function nuevoRubro(modalId) {
    var newRubroDiv = document.createElement("div");
    newRubroDiv.className = "row rubro-set";

    var rubroInput = document.createElement("div");
    rubroInput.className = "col-md-7";
    rubroInput.innerHTML =
        '<br><input type="text" class="form-control" name="rubro-evaluacion" id="rubro-' + rubroCounter + '" placeholder="Ejemplo: Proyecto, Tareas, Asistencia, ..." required>';
    newRubroDiv.appendChild(rubroInput);

    var valorInput = document.createElement("div");
    valorInput.className = "col-md-3";
    valorInput.innerHTML =
        '<br><input type="number" class="form-control" name="valor-rubro-evaluacion" id="valor-rubro-' + rubroCounter + '" placeholder="Ingresa el valor del porcentaje como entero" min="0" max="100" required>';
    newRubroDiv.appendChild(valorInput);

    var removeButton = document.createElement("div");
    removeButton.className = "col-md-2";
    removeButton.innerHTML = '<br><button class="btn btn-danger" onclick="eliminarRubro(this)"> - </button>';
    newRubroDiv.appendChild(removeButton);

    rubroCounter++;

    let containerRubros = document.getElementById("rubros-container");
    containerRubros.appendChild(newRubroDiv);

    // Ahora obtenemos los valores de los inputs correctamente
    let rubroInputValue = newRubroDiv.querySelector('[name="rubro-evaluacion"]').value;
    let valorInputValue = newRubroDiv.querySelector('[name="valor-rubro-evaluacion"]').value;

    rubroContent = `<strong>${rubroInputValue}: </strong>${valorInputValue}<br>`;
    agregarRubroModal(modalId, rubroContent);

}

// Agregar rubro al modal
function agregarRubroModal(modalId, rubroContent) {
    const modal = document.getElementById(modalId);

    if (modal) {
        const modalRubros = modal.querySelector('.modal-body #modal-rubros');

        if (modalRubros) {
            const pElement = document.createElement('p');
            pElement.innerHTML = rubroContent;

            modalRubros.appendChild(pElement);
        } else {
            console.error('Rubros container not found.');
        }
    } else {
        console.error('Modal not found.');
    }
}



// Eliminar espacio de nuevo rubro
function eliminarRubro(button) {
    var rubroSetToRemove = button.parentNode.parentNode;
    rubroSetToRemove.parentNode.removeChild(rubroSetToRemove);
}


// Agregar materia al horario
function calculatePromedio(){
    var promedio = "calculated by a function"
    return promedio;
}