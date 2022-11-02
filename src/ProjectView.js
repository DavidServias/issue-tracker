import Button from '@mui/material/Button';
import { useNavigate, useLocation, Link } from "react-router-dom";
import React, {useState, useEffect} from 'react';


export function ProjectView(props) {

  const location = useLocation();
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(location.state.user);
  const projectSummary = location.state.project;
  const projectSummaryId = projectSummary.project_id;

  
  const fetchProject = async () => {
    const url = `http://localhost:8080/project/${projectSummaryId}`;
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
  console.log(project);
  const handleNewIssue = function() {
    console.log("Create Issue");
  };
  const handleClickMyProjects = () => {
    navigate("/profile", {state: {user: user}});
  };

  return (
   
    project ? 
    <div>
      <h2>Project Title: {project.project_title}</h2>
      <h3>Issues:</h3>
      <ul>
      {project.issue_list.map(issue=>{
        return(
          // <li>issue.issue_title</li>
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
      <Button onClick={handleClickMyProjects}>My Projects</Button>
    </div>: <div>loading</div>
  )
};

export default ProjectView;