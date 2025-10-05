// graphql/TypeDefs.js
// specifies the types, queries, and mutations

const { gql } = require('apollo-server-express');

// The `gql` tag is used to parse the schema string.
// This is where you define the structure of your data.

//REMEMBER:

// An object type represents a kind of object you can fetch from your project.
//  which defines the fields and their data types.
// type Artist {
    //     id: ID!
    //     name: String!
    //     genre: String
 // }

 //The Query type defines all the available queries / data grabbing operations
    //  query GetHeroName {
    //   hero {
    //     name
    //   }
    // }

 // The Mutation type defines all the available mutations aka the changes the users can make to the data

//  type Mutation {
//   updateHumanName(id: ID!, name: String!): Human
// }

const typeDefs = gql`

    # write your code here!


    # You can add more types, queries, and mutations here.
    # For example, if you have a 'Post' and 'User' type:
    # type Post { ... }
    # type User { ... }
`;

module.exports = typeDefs;