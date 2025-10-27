// this file is the blueprint for the data stored in the obj's collection

const {model, Schema } = require('mongoose');


/*const TypeNameSchema = new Schema({
    field1: String,
    field2: String
});*/

// Create and export the model.
// automatically creates a collection named whatever the TypeNameSchema is called
// module.exports = model('Type Name', TypeNameSchema);

const ProjectsSchema = new Schema( {
    name: String,
    description: String,
    timeTaken: Number,
    completed: Boolean
})

module.exports = model('Project', ProjectsSchema);