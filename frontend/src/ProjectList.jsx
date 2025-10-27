import { gql, useMutation, useQuery } from "@apollo/client";
import './ProjectList.css';
import { useState } from "react";
import ProjectModal from "./ProjectModal.jsx";

export const GET_PROJECTS = gql`
  query GetProjectsList {
    getProjects {
      id
      name
      description
      timeTaken
      completed
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      description
      completed
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $name: String!, $description: String, $completed: Boolean!) {
    updateProject(id: $id, name: $name, description: $description, completed: $completed) {
      id
      name
      description
      completed
    }
  }
`;

const ProjectList = ({ showCompleted }) => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  const [editingId, setEditingId] = useState(null);
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Network Error: {error.message}</p>;

  const filteredProjects = data.getProjects.filter(project => project.completed === showCompleted);

  const handleDelete = (id) => {
    try {
      deleteProject({ variables: { id } });
    } catch (err) {
      console.error('Error deleting project:', error);
    }
  };

  const handleSaveEdit = async (updatedProject) => {
    try {
      await updateProject({
        variables: {
          id: updatedProject.id,
          name: updatedProject.name,
          description: updatedProject.description,
          completed: updatedProject.completed,
        },
      });
      setEditingId(null); // close modal
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };




  return (
    <div className="project-list">
      <ul>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <li key={project.id} className="project-item">
              {project.name}{" "}
              {project.description ? `(${project.description})` : ""}
              <div id = "button-container">
                <button className = "delete-button" onClick={() => setEditingId(project.id)}>Edit</button>
                <button className = "delete-button" onClick={() => handleDelete(project.id)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>
            {showCompleted
              ? "No completed projects."
              : "No in-progress projects."}
          </p>
        )}
      </ul>
      {editingId && (
        <ProjectModal
          projectId={editingId}
          onClose={() => setEditingId(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ProjectList;
