import Button from '@mui/material/Button';
import { useNavigate, useLocation, Link } from "react-router-dom";
import React, {useState} from 'react';
import CreateProject from './CreateProject.js';

export function ProfileView(props) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const CreateProjectHandler = function() {
    setFormOpen(true);
    console.log("Create Project");
  };
  const logoutHandler = () => {
    setLoggedIn(false);
    navigate("/", { replace: true });
    
  };
  const user = location.state.user;
  return (
    <div>
      <CreateProject open={formOpen} setFormOpen={setFormOpen} />
      <p>Hello {user.username}, you are Logged In! </p>
      <h3>Projects You Own</h3>
      <ul>{location.state.user.projects_owner.map(project=>{
          return(
            <li key={project.project_id.toString()}>
            <Link to="/project" state={{user:user, project: project}}>{project.project_title}</Link>
          </li>
          );
        })}</ul>  
      <br></br>
      <h3>Projects</h3>
      <ul>{location.state.user.projects_participant.map(project=>{
          return(
            <li key={project.project_id.toString()}>
              <Link to="/project" state={{user:user, project: project}}>{project.project_title}</Link>
            </li>
          );
        })}</ul>  

      <Button
        type="button"
        onClick = {CreateProjectHandler}
      >CREATE PROJECT</Button>
      <Button
        type="button"
        onClick = {logoutHandler}
      >LOGOUT</Button>
    </div>

  );
    
}


export default ProfileView;