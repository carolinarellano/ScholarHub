// Crear materia

document.addEventListener('DOMContentLoaded', function () {
    var guardarMateriaBtn = document.getElementById('guardarMateriaBtn');
    guardarMateriaBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que se envíe el formulario automáticamente
        const nombreMateria = document.getElementById('nombreMateria').value;
        const modalId = obtenerModalIdDinamico(nombreMateria);
        agregarMateria(modalId);
    });
});

function obtenerModalIdDinamico(nombre) {
    return `modal-${nombre.replace(/\s+/g, '-').toLowerCase()}`;
}

function guardarNombreMateria(button) {
    const nombre = document.getElementById('nombreMateria').value;
    if (!nombre) {
        alert("Por favor, ingrese el nombre de la materia antes de guardar.");
        return;
    }

    const modalId = obtenerModalIdDinamico(nombre);
    sessionStorage.setItem('modalId', modalId);
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
        modalId: modalId,
        nombre: nombre,
        periodo: periodo,
        creditos: creditos,
        promedio: promedio
    };

    let materiasList = JSON.parse(sessionStorage.getItem('materiasList')) || {};

    materiasList[nombre] = materiasList[nombre] || [];
    materiasList[nombre].push(materiaInfo);

    sessionStorage.setItem('materiasList', JSON.stringify(materiasList));
    sessionStorage.setItem('modalId', modalId);

    let modal = document.getElementById(modalId);
    let modalID = sessionStorage.getItem('modalId');
    if (!modal) {
        modal = crearModal(nombre, modalID, promedio);
        document.body.appendChild(modal);
        agregarRubrosDesdeSessionStorage(modalId);
    }

    var modalInstance = new bootstrap.Modal(document.getElementById(modalId));
    modalInstance.show();

    if (!nombre || !periodo || !creditos) {
        alert("Por favor, complete todos los campos antes de guardar.");
        modalInstance.hide();
    } else {
        const nuevaMateria = crearTarjetaMateria(nombre, periodo, creditos, btnColor, modalId);
        document.getElementById('container-materias').appendChild(nuevaMateria);
    }

    document.getElementById('materiaForm').reset();
    const nuevoRubroBtn = document.getElementById('nuevoRubrobtn');
    nuevoRubro(nuevoRubroBtn);
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

    let rubrosObject = JSON.parse(sessionStorage.getItem('rubrosObject')) || {};

    rubrosObject[modalId] = rubrosObject[modalId] || [];
    rubrosObject[modalId].push(rubroActual);

    sessionStorage.setItem('rubrosObject', JSON.stringify(rubrosObject));

    document.getElementById('rubro-0').value = '';
    document.getElementById('valor-rubro-0').value = '';
}

function agregarRubrosDesdeSessionStorage(modalId) {
    const rubrosObject = JSON.parse(sessionStorage.getItem('rubrosObject')) || {};
    const rubrosArray = rubrosObject[modalId] || [];

    let modalID = sessionStorage.getItem('modalId');
    const modal = document.getElementById(modalID);

    if (modal) {
        const modalRubros = modal.querySelector('.modal-body');

        if (modalRubros) {
            modalRubros.innerHTML = '';

            rubrosArray.forEach(rubro => {
                const pElement = document.createElement('p');
                const rubroText = rubro.rubro ? `<strong>${rubro.rubro}: </strong>` : 'no agregado';
                const valorText = rubro.valor ? `${rubro.valor}%<br>` : 'no agregado';
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

function calculatePromedio() {
    let promedio = "Aqui va el promedio"

    return promedio;
}

// agregar materia y toda la info al inicio de la pagina 
// agregar materia al menu de editar horario (para poder agregarlo a este)




// 