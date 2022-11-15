import * as React from 'react';
import {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) { 
  const [newProjectData,setData] = useState({
    title:"",
    description:""
  });

  const location = useLocation();
  const user = location.state.user;
  
  const navigate = useNavigate();
  const {title, description} = newProjectData;

  const changeHandler = e => {
    setData({...newProjectData,[e.target.name]:[e.target.value]});
  };

  const handleClose = () => {
    props.setFormOpen(false);
  };

  const handleSubmit = async () => {
    props.setFormOpen(false);
    console.log("handleSubmit");
    let result = await createProject(title[0], description[0], props.user_id);
    console.log(result);
    console.log("project id: " + result._id);
    const projectId = result._id;
    const updatedUserData = await fetch(`http://localhost:8080/user/${user._id}`);
    navigate("/project", {state: {user: props.user, projectId: projectId}});


  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <TextField
              sx={{marginTop: '3ch'}}
              fullWidth
              noValidate
              // TODO handle errors 
              //error={errorState?true:false}
              id="title"
              label="title"
              name = 'title'
              value = {title}
              placeholder="title"   
              onChange={changeHandler}
          />
          <TextField
             sx={{marginTop: '3ch'}}
             fullWidth
             noValidate
             // TODO handle errors 
             //error={errorState?true:false}
             id="description"
             label="description"
             name = 'description'
             value = {description}
             placeholder="description"   
             onChange={changeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}


const createProject = async (title, description, user_id) => {
  let baseUrl = "http://localhost:8080";
  let url = baseUrl + "/project/create_project";
  url += "/" +  user_id;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      project_title: title, 
      project_description: description,
      project_owner: user_id
    }),
  });
  const data = await response.json();
  return data;

  // const body = await response.text();
  // console.log(body);
  // if (body === 'success') {
  //   return ['success'];
  // } else {
  //   return ['error', body];
  // }
}
