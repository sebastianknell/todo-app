import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { FiCircle } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import TitleInput from "./shared/TitleInput";
import NotesArea from "../Notes/NotesArea";

function ProjectView() {
  const { projectId } = useParams();
  console.log(projectId);
  const project = useSelector((state) =>
    state.area.projects.find((project) => project.id === Number(projectId))
  );
  console.log(project);
  const todos = useSelector((state) =>
    state.todo.todos.filter((todo) => todo.projectId === project.id)
  );

  const notesRef = useRef();

  return (
    <div className="view-wrapper">
      <div className="view-header">
        <FiCircle />
        <TitleInput name={project.name} placeholder="New Project" />
        <BsThreeDots className="btn no-shrink" />
      </div>
      <div style={{margin: "0 0.5rem"}}>
        <NotesArea ref={notesRef} notes={project.notes} />
      </div>
      <div className="view-body"></div>
    </div>
  );
}

export default ProjectView;
