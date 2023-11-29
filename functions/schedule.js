document.addEventListener('DOMContentLoaded', function () {
    cargarMateriasAlmacenadas();

    var guardarMateriaBtn = document.getElementById('guardarMateriaBtn');
    guardarMateriaBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const nombreMateria = document.getElementById('nombreMateria').value;
        const modalId = 'modal1';
        agregarMateria(modalId);
    });
});

function cargarMateriasAlmacenadas() {
    let materiasList = JSON.parse(sessionStorage.getItem('materiasList'));
    if (materiasList) {
        Object.keys(materiasList).forEach(nombre => {
            const materiaData = materiasList[nombre][0];
            const pillId = `pill-${nombre.replace(/\s+/g, '-').toLowerCase()}`;
            const creditos = materiaData.creditos;
            const profesor = materiaData.profesor;
            const color = materiaData.colorBtn;
            const modalId = materiaData.modalId;
            const periodo = materiaData.periodo;

            crearPill(nombre, pillId, creditos, profesor, color);

            console.log('Nombre:', nombre);
            console.log('Periodo:', periodo);
            console.log('Créditos:', creditos);
            console.log('Color:', color);

            try {
                let tarjetaMateria = crearTarjetaMateria(nombre, periodo, creditos, color, modalId);

                let container = document.getElementById('container-materias');
                container.append(tarjetaMateria);
            } catch (error) {
                console.error('Error al crear la tarjeta de materia:', error);
            }
        });

        cargarMateriasEnSelect();
    }
}


function crearPill(nombre, pillId, creditos, profesor, color) {
    const materiaPill = document.createElement('div');
    materiaPill.className += " materia-button";
    materiaPill.id = pillId;
    materiaPill.innerHTML = `
        <span class="materia-button-info">
            Créditos: ${creditos}<br>
            Profesor: ${profesor}
        </span>
        <span>
            <a href="#" class="btn btn-sm rounded-pill btn-${color}">
                ${nombre}
            </a>
        </span>`;

    const cardsMateriasInicio = document.getElementById('card-materias-inicio');
    if (cardsMateriasInicio) {
        cardsMateriasInicio.appendChild(materiaPill);
    } else {
        console.error('Container de pills de materias no encontrado.');
    }
}

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

function obtenerColorAleatorio() {
    const colores = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    const indiceAleatorio = Math.floor(Math.random() * colores.length);
    return colores[indiceAleatorio];
}


function agregarMateria(modalId) {
    const btnColor = obtenerColorAleatorio();

    const nombreInput = document.getElementById('nombreMateria');
    const periodoInput = document.getElementById('periodo');
    const creditosInput = document.getElementById('creditos');
    const profesorInput = document.getElementById('profesor');

    const nombre = nombreInput.value;
    const periodo = periodoInput.value;
    const creditos = creditosInput.value;
    const profesor = profesorInput.value;

    const materiaInfo = {
        modalId: modalId,
        nombre: nombre,
        periodo: periodo,
        creditos: creditos,
        profesor: profesor,
        colorBtn: btnColor,
        rubros: obtenerRubrosDesdeLocalStorage(modalId),
    };

    let materiasList = JSON.parse(sessionStorage.getItem('materiasList')) || {};
    materiasList[nombre] = materiasList[nombre] || [];
    materiasList[nombre].push(materiaInfo);
    sessionStorage.setItem('materiasList', JSON.stringify(materiasList));
    sessionStorage.setItem('modalId', modalId);

    let modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal no encontrado.');
        return;
    }

    // Actualiza el contenido del modal dinámicamente
    const infoMateria = modal.querySelector('#infoMateria');
    if (infoMateria) {
        infoMateria.innerHTML = `
            <p><strong>Nombre: </strong>${nombre}</p>
            <p><strong>Periodo: </strong>${periodo}</p>
            <p><strong>Créditos: </strong>${creditos}</p>
            <p><strong>Profesor: </strong>${profesor}</p>
            <!-- Agrega aquí cualquier otra información que desees mostrar -->
        `;
    } else {
        console.error('Elemento de información de materia no encontrado.');
    }

    var modalInstance = new bootstrap.Modal(document.getElementById(modalId));
    modalInstance.show();

    if (!nombre || !periodo || !creditos) {
        alert("Por favor, complete todos los campos antes de guardar.");
        modalInstance.hide();
    }

    document.getElementById('materiaForm').reset();
    const nuevoRubroBtn = document.getElementById('nuevoRubrobtn');
    nuevoRubro(nuevoRubroBtn);

    agregarRubrosDesdeLocalStorage(modalId);
    cargarMateriasEnSelect();
}


// Nueva función para obtener los rubros desde sessionStorage
function obtenerRubrosDesdeLocalStorage(modalId) {
    const rubrosMaterias = JSON.parse(sessionStorage.getItem('rubrosMaterias')) || {};
    return rubrosMaterias[modalId] || [];
}

function crearModal(nombre, modalId, profesor) {
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
                    <p><strong>Profesor: </strong>${profesor}</p><br>
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

    const modalMaterias = document.getElementById('modal-materias');
    modalMaterias.append(modal);

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
            <a href="#" class="btn btn-${btnColor} btn-editar-materia" data-bs-toggle="modal" data-bs-target="#modal1">Ver detalles</a>
        </div>
    `;

    document.getElementById('container-materias').appendChild(nuevaMateria);
    return nuevaMateria;
}

function nuevoRubro(button) {
    const nombreMateriaInput = document.getElementById('nombreMateria');
    const nombreMateria = nombreMateriaInput.value;

    const modalId = obtenerModalIdDinamico(nombreMateria);

    const rubroInputValue = document.getElementById('rubro-0').value;
    const valorInputValue = document.getElementById('valor-rubro-0').value;

    const rubroActual = { rubro: rubroInputValue, valor: valorInputValue };

    let rubrosMaterias = JSON.parse(sessionStorage.getItem('rubrosMaterias')) || {};
    rubrosMaterias[modalId] = rubrosMaterias[modalId] || [];
    rubrosMaterias[modalId].push(rubroActual);
    sessionStorage.setItem('rubrosMaterias', JSON.stringify(rubrosMaterias));

    document.getElementById('rubro-0').value = '';
    document.getElementById('valor-rubro-0').value = '';
}

function agregarRubrosDesdeLocalStorage(modalId) {
    const rubrosMaterias = JSON.parse(sessionStorage.getItem('rubrosMaterias')) || {};
    const rubrosArray = rubrosMaterias[modalId] || [];

    const modal = document.getElementById('modal1');

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

function cargarMateriasEnSelect() {
    const selectMaterias = document.getElementById('defaultSelectMaterias');
    selectMaterias.innerHTML = '';

    const opcionPredeterminada = document.createElement('option');
    opcionPredeterminada.text = 'Selecciona la materia que deseas editar';
    selectMaterias.add(opcionPredeterminada);

    const materiasList = JSON.parse(sessionStorage.getItem('materiasList'));
    if (materiasList) {
        Object.keys(materiasList).forEach(nombre => {
            const option = document.createElement('option');
            option.value = `${nombre.replace(/\s+/g, '-').toLowerCase()}`;
            option.text = nombre;
            selectMaterias.add(option);
        });
    }
}