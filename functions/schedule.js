document.addEventListener('DOMContentLoaded', function () {
    cargarMateriasAlmacenadas();
    cargarMateriasEnHorario();

    var guardarMateriaBtn = document.getElementById('guardarMateriaBtn');

    guardarMateriaBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const nombreMateria = document.getElementById('nombreMateria').value;
        const modalId = 'modal1';
        agregarMateria(modalId);
        cargarMateriasEnHorario();
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
                let tarjetaMateria = crearTarjetaMateria(nombre, periodo, creditos, color, modalId, profesor);
                let container = document.getElementById('container-materias');
                container.append(tarjetaMateria);
                cargarMateriasEnHorario();
            } catch (error) {
                console.error('Error al crear la tarjeta de materia:', error);
            }
        });

        let horarioMaterias = JSON.parse(sessionStorage.getItem('horarioMaterias')) || {};
        Object.keys(horarioMaterias).forEach(idPillHorario => {
            const { pillId, materiaData } = horarioMaterias[idPillHorario];
            const cellToAdd = document.getElementById(idPillHorario);

            if (cellToAdd) {
                const materiaHorario = document.createElement('div');
                materiaHorario.className += " materia-button";
                materiaHorario.id = pillId;
                materiaHorario.innerHTML = `
                    <span class="materia-button-info">
                        Créditos: ${materiaData.creditos}<br>
                        Profesor: ${materiaData.profesor}
                    </span>
                    <span>
                        <a href="#" class="btn btn-sm rounded-pill btn-${materiaData.colorBtn}">
                            ${materiaData.nombre}
                        </a>
                    </span>`;
                cellToAdd.appendChild(materiaHorario);
            } else {
                console.error('Container de pills de materias no encontrado para la información almacenada.');
            }
        });


        cargarMateriasEnSelectHorario();
        cargarMateriasEnSelectActividad();
        cargarMateriasEnHorario();
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
    return `materia-${nombre.replace(/\s+/g, '-').toLowerCase()}`;
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

    // Check if the materia already exists in the materiasList object
    if (materiasList[nombre]) {
        // If the materia already exists, push the new materiaInfo to the array
        materiasList[nombre].push(materiaInfo);
    } else {
        // If the materia doesn't exist, create a new array with the materiaInfo
        materiasList[nombre] = [materiaInfo];
    }

    sessionStorage.setItem('materiasList', JSON.stringify(materiasList));
    sessionStorage.setItem('modalId', modalId);

    let modal = document.getElementById('modal1');
    if (!modal) {
        console.error('Modal no encontrado.');
        return;
    }

    console.log("Se accedio al modal1")

    if (!nombre || !periodo || !creditos) {
        alert("Por favor, complete todos los campos antes de guardar.");
        modalInstance.hide();
    }

    document.getElementById('materiaForm').reset();
    const nuevoRubroBtn = document.getElementById('nuevoRubrobtn');
    nuevoRubro(nuevoRubroBtn);

    const rubrosArray = obtenerRubrosDesdeLocalStorage(modalId);
    crearTarjetaMateria(nombre, periodo, creditos, btnColor, modalId, profesor);
    cargarMateriasAlmacenadas();
    cargarMateriasEnSelectHorario();
    cargarMateriasEnSelectActividad();
}



// Nueva función para obtener los rubros desde sessionStorage
function obtenerRubrosDesdeLocalStorage(modalId) {
    const rubrosMaterias = JSON.parse(sessionStorage.getItem('rubrosMaterias')) || {};
    return rubrosMaterias[modalId] || [];
}

function crearTarjetaMateria(nombre, periodo, creditos, btnColor, modalId, profesor) {
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
            <p class="card-text"><strong>Profesor: </strong>${profesor}</p>
        </div>
        <div class="card-footer"></div>
    `;

    document.getElementById('container-materias').appendChild(nuevaMateria);

    agregarRubrosDesdeLocalStorage(modalId);
    cargarMateriasEnHorario();

    return nuevaMateria;
}

function obtenerRubrosComoTexto(rubrosArray) {
    if (!rubrosArray || rubrosArray.length === 0) {
        return 'Ningún rubro agregado';
    }
    return rubrosArray.map(rubro => `${rubro.rubro}: ${rubro.valor}%`).join(', ');
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

    if (!modal) {
        console.error('Modal not found.');
        return;
    }

    const modalRubros = modal.querySelector('.modal-body');

    if (!modalRubros) {
        console.error('Rubros container not found.');
        return;
    }

    limpiarContenido(modalRubros);

    rubrosArray.forEach(rubro => {
        console.log("agregando rubro ", rubro);
        const pElement = crearElementoRubro(rubro);
        modalRubros.appendChild(pElement);
        console.log("Se agrego: ", rubro)
    });

}

function limpiarContenido(contenedor) {
    contenedor.innerHTML = '';
}

function crearElementoRubro(rubro) {
    const pElement = document.createElement('p');
    const rubroText = rubro.rubro ? `<strong>${rubro.rubro}: </strong>` : 'no agregado';
    const valorText = rubro.valor ? `${rubro.valor}%<br>` : 'no agregado';
    pElement.innerHTML = `${rubroText}${valorText}`;
    return pElement;
}


function cargarMateriasEnSelectHorario() {
    const selectMaterias = document.getElementById('defaultSelectMaterias');
    selectMaterias.innerHTML = '';

    const opcionPredeterminada = document.createElement('option');
    opcionPredeterminada.text = 'Selecciona la materia que deseas editar';
    selectMaterias.add(opcionPredeterminada);

    const materiasList = JSON.parse(sessionStorage.getItem('materiasList'));
    if (materiasList) {
        Object.keys(materiasList).forEach(nombre => {
            const option = document.createElement('option');
            option.value = nombre;
            option.text = nombre;
            selectMaterias.add(option);
        });
    }
}

function cargarMateriasEnSelectActividad() {
    const selectMaterias = document.getElementById('opcionesMateriaActividad');
    selectMaterias.innerHTML = '';

    const opcionPredeterminada = document.createElement('option');
    opcionPredeterminada.text = 'Selecciona la materia';
    selectMaterias.add(opcionPredeterminada);

    const materiasList = JSON.parse(sessionStorage.getItem('materiasList'));
    if (materiasList) {
        Object.keys(materiasList).forEach(nombre => {
            const option = document.createElement('option');
            option.value = nombre;
            option.text = nombre;
            selectMaterias.add(option);
        });
    }

    const selectEditarMaterias = document.getElementById('opcionesMateriaEditarActividad');
    selectEditarMaterias.innerHTML = '';

    const opcionPredeterminadaEditar = document.createElement('option');
    opcionPredeterminadaEditar.text = 'Selecciona la materia';
    selectEditarMaterias.add(opcionPredeterminadaEditar);

    if (materiasList) {
        Object.keys(materiasList).forEach(nombre => {
            const option = document.createElement('option');
            option.value = nombre;
            option.text = nombre;
            selectEditarMaterias.add(option);
        });
    }
}

function cargarMateriasEnHorario() {
    const selectedMateria = document.getElementById('defaultSelectMaterias').value;
    const selectedHora = document.getElementById('defaultSelectHora').value;
    let materiasList = JSON.parse(sessionStorage.getItem('materiasList')) || {};
    let horarioMaterias = JSON.parse(sessionStorage.getItem('horarioMaterias')) || {};

    const selectedMateriaData = materiasList[selectedMateria];

    if (selectedMateriaData && selectedMateriaData.length > 0) {
        const materiaData = selectedMateriaData[0];

        console.log('Modal ID:', materiaData.modalId);
        console.log('Nombre:', materiaData.nombre);
        console.log('Profesor:', materiaData.profesor);
        console.log('Color Button:', materiaData.colorBtn);
        console.log('Rubros:', materiaData.rubros);

        const pillId = `pill-${selectedMateria.replace(/\s+/g, '-').toLowerCase()}`;

        const selectedDias = [];
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            selectedDias.push(checkbox.value);
        });

        console.log(selectedDias);

        selectedDias.forEach(dia => {
            console.log(`${dia}`);
            const idPillHorario = 'horario-' + `${dia}-` + `${selectedHora}`;
            console.log(idPillHorario);
            const cellToAdd = document.getElementById(`${idPillHorario}`);
            const materiaHorario = document.createElement('div');
            materiaHorario.className += " materia-button";
            materiaHorario.id = pillId;
            materiaHorario.innerHTML = `
                <span class="materia-button-info">
                    Créditos: ${materiaData.creditos}<br>
                    Profesor: ${materiaData.profesor}
                </span>
                <span>
                    <a href="#" class="btn btn-sm rounded-pill btn-${materiaData.colorBtn}">
                        ${materiaData.nombre}
                    </a>
                </span>`;

            // Vaciar la celda antes de agregar la nueva materia
            if (cellToAdd) {
                cellToAdd.innerHTML = '';
            } else {
                console.error('Container de pills de materias no encontrado para la información almacenada.');
            }

            if (cellToAdd) {
                cellToAdd.appendChild(materiaHorario);

                horarioMaterias[idPillHorario] = {
                    pillId: pillId,
                    materiaData: materiaData,
                };
                sessionStorage.setItem('horarioMaterias', JSON.stringify(horarioMaterias));
            } else {
                console.error('Container de pills de materias no encontrado.');
            }
        });

    } else {
        console.error('No se encontraron datos para la materia seleccionada.');
    }

}

