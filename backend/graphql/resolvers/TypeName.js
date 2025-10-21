// the resolvers folder create a file for each of your data types
// this is the actual code that fetches data from and sends data to our database.

//const TypeName = require('../../models/TypeName');

const User = require('../../models/User');
const Project = require('../../models/Project');

module.exports = {
    
    /*
    Query: {
        //inside here would go all your queries
    },

    Mutation: {
        // inside here would go all your mutations
    }
    */

    Query: {
        getUsers: async () => {
            return await User.find();
        },
        getProjects: async () => {
            return await Project.find();
        },

    },

    Mutation: {
        createUser: async (_, {name, age}) => {
            const newUser = new User({name, age});
            await newUser.save();
            return newUser;
        },

        addProject: async (_, {name, description, timeTaken}) => {
            const newProject = new Project({name, description, timeTaken});
            await newProject.save();
            return newProject;
        },
    },
};