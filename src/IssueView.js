import Button from '@mui/material/Button';
import { useNavigate, useLocation, Link} from "react-router-dom";
import React, {useState, useEffect} from 'react';

export function IssueView() {
  const location = useLocation();
  const navigate = useNavigate();
  const logoutHandler = function()  {
    navigate("/", { replace: true });
  };
  const handleNewUpdate = function() {
    console.log("Create Update");
  };
  const handleBackToProject = function() {
    navigate("/project", {
      state: {user: location.state.user, 
      project: location.state.project}});
  };

  return (
    <div>
      <Link to="/issue" 
        state={{
          user: location.state.user, 
          project: location.state.project}}
      >Issue Title: {location.state.issue.issue_title}<br></br></Link>
      
      <Button onClick={handleNewUpdate}>ADD UPDATE</Button><br></br>
      <Button onClick={handleBackToProject}>BACK TO PROJECT</Button><br></br>
      <Button
        type="button"
        className = "logout_button"
        onClick = {logoutHandler}
      >LOGOUT</Button>
    </div>
    
  );
}


export default IssueView