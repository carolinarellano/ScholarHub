document.addEventListener('DOMContentLoaded', function () {
    // Obtén el botón por su ID
    var guardarMateriaBtn = document.getElementById('guardarMateriaBtn');

    // Agrega un manejador de eventos al hacer clic en el botón
    guardarMateriaBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que se envíe el formulario automáticamente
        const nombreMateria = document.getElementById('nombreMateria').value;
        const modalId = obtenerModalIdDinamico(nombreMateria);
        agregarMateria(modalId);
    });
});

function obtenerModalIdDinamico(nombre) {
    // Aquí generas dinámicamente el ID del modal basado en el nombre
    return `modal-${nombre.replace(/\s+/g, '-').toLowerCase()}`;
}


function guardarNombreMateria(button) {
    const nombre = document.getElementById('nombreMateria').value;

    if (!nombre) {
        alert("Por favor, ingrese el nombre de la materia antes de guardar.");
        return;
    }

    const modalId = obtenerModalIdDinamico(nombre);
    // Guarda el modalId en sessionStorage
    sessionStorage.setItem('modalId', modalId);
    console.log('ModalId guardado en sessionStorage:', modalId);
}


function agregarMateria(modalId) {
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

    const materiaInfo = {
        nombre: nombre,
        periodo: periodo,
        creditos: creditos,
        promedio: promedio,
        modalId: modalId
    };

    let materiasList = JSON.parse(sessionStorage.getItem('materiasList')) || [];

    // Agrega la información de la materia a la lista
    materiasList.push(materiaInfo);

    // Guarda la lista de materias actualizada en sessionStorage
    sessionStorage.setItem('materiasList', JSON.stringify(materiasList));


    // Guarda el modalId en sessionStorage
    sessionStorage.setItem('modalId', modalId);
    console.log('ModalId guardado en sessionStorage:', modalId);

    // Verifica si el modal ya está en el DOM
    let modal = document.getElementById(modalId);
    if (!modal) {
        // Si no está en el DOM, crea el modal y lo agrega al final del body
        modal = crearModal(nombre, modalId, promedio);
        document.body.appendChild(modal);
    }

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

    const nuevoRubroBtn = document.getElementById('nuevoRubrobtn');

    nuevoRubro(nuevoRubroBtn, modalId);
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
                <div class="modal-body"></div>
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

    agregarRubrosDesdeSessionStorage(modalId);
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


function nuevoRubro(button) {
    const nombreMateriaInput = document.getElementById('nombreMateria');
    const nombreMateria = nombreMateriaInput.value;

    const modalId = obtenerModalIdDinamico(nombreMateria);

    const rubroInputValue = document.getElementById('rubro-0').value;
    const valorInputValue = document.getElementById('valor-rubro-0').value;

    const rubroActual = { rubro: rubroInputValue, valor: valorInputValue };

    // Obtiene el objeto de rubros del sessionStorage o crea uno nuevo si no existe
    let rubrosObject = JSON.parse(sessionStorage.getItem('rubrosObject')) || {};

    // Agrega el rubro actual al objeto de rubros utilizando modalId como clave
    rubrosObject[modalId] = rubrosObject[modalId] || [];
    rubrosObject[modalId].push(rubroActual);

    // Guarda el objeto de rubros en sessionStorage
    sessionStorage.setItem('rubrosObject', JSON.stringify(rubrosObject));

    console.log("Objeto de rubros actualizado:", rubrosObject);
    console.log("Modal ID para agregar rubros: ", modalId);

    // Resetea los valores del input
    document.getElementById('rubro-0').value = '';
    document.getElementById('valor-rubro-0').value = '';
}


function agregarRubrosDesdeSessionStorage(modalId) {
    const rubrosObject = JSON.parse(sessionStorage.getItem('rubrosObject')) || {};
    const rubrosArray = rubrosObject[modalId] || [];

    const modal = document.getElementById(modalId);

    if (modal) {
        console.log('Modal encontrado en el DOM.');

        const modalRubros = modal.querySelector('.modal-body');

        if (modalRubros) {
            console.log('Rubros container encontrado.');

            modalRubros.innerHTML = '';

            rubrosArray.forEach(rubro => {
                const pElement = document.createElement('p');
                const rubroText = rubro.rubro ? `<strong>${rubro.rubro}: </strong>` : 'no agregado';
                const valorText = rubro.valor ? `${rubro.valor}<br>` : 'no agregado';
                pElement.innerHTML = `${rubroText}${valorText}`;
                modalRubros.appendChild(pElement);
            });
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
function calculatePromedio() {
    var promedio = "calculated by a function"
    return promedio;
}
