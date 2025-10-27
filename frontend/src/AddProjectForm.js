import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_PROJECTS } from "./ProjectList.jsx";

const ADD_PROJECT = gql`
  mutation AddProject($name: String!, $description: String, $timeTaken: Int, $completed: Boolean!) {
    addProject(name: $name, description: $description, timeTaken: $timeTaken, completed: $completed) {
      id
      name
      description
      timeTaken
      completed
    }
  }
`;

function AddProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [completed, setCompleted] = useState(false);
  const [addProject] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      const existing = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { 
          getProjects: [...existing.getProjects, addProject],
        },
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProject({
      variables: { name: name, description: description, timeTaken: parseInt(timeTaken), completed: completed },
    });
    setName("");
    setDescription("");
    setTimeTaken("");
    setCompleted("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "5px"}} >
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>
        <b>Completed? </b>
        <select
          value={completed ? "yes" : "no"}
          onChange={(e) => setCompleted(e.target.value === 'yes')}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      
      <button className="add-project-button" type="submit">Add Project</button>
    </form>
  );
}

export default AddProjectForm;
