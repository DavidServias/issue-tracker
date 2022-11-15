import Button from '@mui/material/Button';
import { useNavigate, useLocation, Link } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import NewIssue from './NewIssue.js';


export function ProjectView(props) {
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(location.state.user);
  const [formOpen, setFormOpen] = useState(false);
  const projectId = location.state.projectId;

  const fetchProject = async () => {
    const url = `http://localhost:8080/project/${projectId}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log("data: " + data);
    setProject(data);
    
  };

  useEffect( () => {    
    fetchProject();

  },[]);
  
  const navigate = useNavigate();
  const handleNewIssue = function() {
    setFormOpen(true);
    console.log("Create Issue");
  };
  const handleClickMyProjects = async () => {
    console.log("My Projects");
    const url = `http://localhost:8080/user/${user._id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data: " + data);
    setUser(data);
    navigate("/profile", { replace: true, state: {user: data}});

  };

  return (
   
    project ? 
    <div>
      <NewIssue open={formOpen} setFormOpen={setFormOpen} />
      <h2>Project Title: {project.project_title}</h2>
      <p>Description: {project.project_description}</p>
      <h3>Issues:</h3>
      <ul>
      {project.issue_list.map(issue=>{
        return(
          <li key={issue._id.toString()}>
            <Link to="/issue" 
                  state={{
                    user: location.state.user, 
                    project: location.state.project, 
                    issue: issue}}
            >{issue.issue_title}</Link>
          </li>
        );
      })}
      </ul>
      <Button onClick={handleNewIssue}>NEW ISSUE</Button>
      <Button onClick={handleClickMyProjects}>MY OTHER PROJECTS</Button>
    </div>: <div>loading</div>
  )
};

export default ProjectView;