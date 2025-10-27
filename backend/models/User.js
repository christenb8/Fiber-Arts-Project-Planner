// this file is the blueprint for the data stored in the obj's collection

const {model, Schema } = require('mongoose');


/*const TypeNameSchema = new Schema({
    field1: String,
    field2: String
});*/

const UsersSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    age: Number
})

// Create and export the model.
// automatically creates a collection named whatever the TypeNameSchema is called
// module.exports = model('Type Name', TypeNameSchema);


module.exports = model('User', UsersSchema);