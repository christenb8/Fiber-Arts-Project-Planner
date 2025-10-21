// this file is the blueprint for the data stored in the obj's collection

const {model, Schema } = require('mongoose');


/*const TypeNameSchema = new Schema({
    field1: String,
    field2: String
});*/

const UsersSchema = new Schema( {
    name: String,
    age: Number
})

// Create and export the model.
// automatically creates a collection named whatever the TypeNameSchema is called
// module.exports = model('Type Name', TypeNameSchema);

const ProjectsSchema = new Schema( {
    name: String,
    description: String,
    timeTaken: Number
})

const User = model('User', UsersSchema);
const Project = model('Project', ProjectsSchema);

module.exports = {User, Project};