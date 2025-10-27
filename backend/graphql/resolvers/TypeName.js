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
        getProject: async (_, {id}) => {
            return await Project.findById(id);
        },
        getUsername: async (_, __, context) => {
            if (!context.token) {
                throw new Error("No token provided");
            }

            // Remove 'Bearer ' prefix if it exists
            const token = context.token.startsWith("Bearer ") 
                ? context.token.slice(7) 
                : context.token;

            const decodedUsername = Buffer.from(token, 'base64').toString('utf8');
            const user = await User.findOne({ username: decodedUsername });
            if (!user) throw new Error("User not found");

            console.log("Token received:", context.token);
            console.log("Decoded username:", decodedUsername);

            return user.username;
        }

    },

    Mutation: {
        signupUser: async (_, {username, password}) => {
            // Check if user already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new Error('Username already taken');
            }
            
            // Create new user
            const newUser = new User({
                username,
                password, // In a real app, hash the password before saving
            });
            await newUser.save();
            
            // Generate token (in a real app, use JWT or similar)
            const token = Buffer.from(username).toString('base64');
            
            return {
                token,
                user: newUser
            };
        },
        loginUser: async (_, {username, password}) => {
            // Find user by username
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }
            
            // Check password (in a real app, compare hashed passwords)
            if (user.password !== password) {
                throw new Error('Invalid password');
            }
            
            // Generate token (in a real app, use JWT or similar)
            const token = Buffer.from(username).toString('base64');
            
            return {
                token,
                user
            };
        },

        addProject: async (_, {name, description, timeTaken, completed}) => {
            const newProject = new Project({name, description, timeTaken, completed});
            await newProject.save();
            return newProject;
        },

        deleteProject: async (_, {id}) => {
            const deletedProject = await Project.findByIdAndDelete(id);
            return deletedProject;
        },

        updateProject: async (_, { id, name, description, completed }) => {
            const updated = await Project.findByIdAndUpdate(
                id,
                { name, description, completed },
                { new: true }
            );
            return updated;
        },

    },
};