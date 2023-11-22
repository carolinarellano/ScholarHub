const utils = require('./utils');

class SchClassException {
    constructor(errorMessage) {
        this._errorMessage = errorMessage;
    }

    sendErrorMessage() {
        console.log(this._errorMessage);
    }
}

class SchClass {
    constructor(nombre, creditos, periodo, profesor, ponderaciones) {
        this._id = utils.generateSchClassID();
        this._nombre = nombre;
        this._creditos = creditos;
        this._periodo = periodo;
        this._profesor = profesor;
        this._ponderaciones = ponderaciones;
    }

    set nombre(nombre) {
        if (nombre == "" || nombre == undefined) {
            const error = new SchClassException("El nombre de la materia es obligatorio");
            error.sendErrorMessage();
            return;
        }
        this._nombre = nombre;
    }

    set creditos(creditos) {
        if (!Number.isInteger(creditos) && creditos < 1) {
            const error = new SchClassException("La materia debe valer al menos 1 credito");
            error.sendErrorMessage();
            return;
        }
        this._creditos = creditos;
    }

    set periodo(periodo) {
        if (periodo == "" || periodo == undefined) {
            const error = new SchClassException("Debe indicar el periodo en que se imparte la clase");
            error.sendErrorMessage();
            return;
        }
        this._periodo = periodo;
    }

    set profesor(profesor) {
        if (profesor == "" || profesor == undefined) {
            const error = new SchClassException("Es necesario asignar un profesor a esta clase");
            error.sendErrorMessage();
            return;
        }
        this._profesor = profesor;
    }

    set ponderaciones(ponderaciones) {
        if (ponderaciones == "" || ponderaciones == undefined) {
            const error = new SchClassException("Por favor ingresa las ponderaciones de los exámenes y proyectos");
            error.sendErrorMessage();
            return;
        }
        this._ponderaciones = ponderaciones;
    }
    
    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get periodo() {
        return this._periodo;
    }
    
    get creditos() {
        return this._creditos;
    }

    get profesor() {
        return this._profesor;
    }

    get ponderaciones() {
        return this._ponderaciones;
    }

}

exports.SchClass = SchClass;
