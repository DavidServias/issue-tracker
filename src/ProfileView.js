import Button from '@mui/material/Button';
import { useNavigate, useLocation } from "react-router-dom";
import React, {useState} from 'react';

export function ProfileView(props) {

  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    setLoggedIn(false);
    navigate("/", { replace: true });
    
  };

  return (
    
    <div>
      <p>Hello {location.state.user.username}, you are Logged In! </p>
      <h3>Projects You Own</h3>
      <ul>{location.state.user.projects_owner.map(project=>{
          return(
            <li key={project.project_id.toString()}>
              {project.project_title}</li>
          );
        })}</ul>  
      <br></br>
      <h3>Projects</h3>
      <ul>{location.state.user.projects_participant.map(project=>{
          return(
            <li key={project.project_id.toString()}>
              {project.project_title}</li>
          );
        })}</ul>  

      <Button>to project view</Button> 
      <Button
        type="button"
        className = "logout_button"
        onClick = {logoutHandler}
      >LOGOUT</Button>

    </div>
  );
    

}



export default ProfileView;