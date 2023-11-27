const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new Schema ({
    usuario: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        unique: true, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }
});

usuarioSchema.methods.cryptPassword = (password) => {
    let crypted = bcrypt.hashSync(password, 10);
    return crypted;
}

usuarioSchema.methods.compare = (password) => {
    return bcrypt.compareSync(password, this.password);
}

module.exports = model('Usuarios', usuarioSchema);
