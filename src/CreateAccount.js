import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) { 
  const [newUserData,setData] = useState({
    username:"",
    password:""
  });
  
  const {username,password} = newUserData;
  const [errorMessage, setErrorMessage] = useState(""); 
  const [errorState, setErrorState] = useState(false);

  const handleCancel = () => {
    setErrorState(false);
    setErrorMessage("");
    setData({username:"",password:""});
   
    props.openForm(false);
  };

  const changeHandler = e => {
    setErrorState(false);
    setErrorMessage("");
    setData({...newUserData,[e.target.name]:[e.target.value]});
  };

  const handleSubmit = async () => {
    console.log("handleSubmit");
    let result = await createAccount(username[0], password[0]);
    console.log(result);
    if (result[0] === "success") {
      
      props.openForm(false);
    }
    else if (result[0] === "error") {
      setErrorState(true);
      setErrorMessage(result[1]);
    }
    setData({username:"",password:""});
   
  };

  return (
    <div>
      <Dialog open={props.open}>
        <DialogTitle >Create Account</DialogTitle>
        <DialogContent>   
          <form className='form'>    
            <TextField
              // I don't fully understand why 'new-password' works,
              // but it seems to prevent the browser from trying to
              // save the password.
              autoComplete='new-password'
              sx={{marginTop: '3ch'}}
              fullWidth
              noValidate
              // TODO handle error if username is already taken
              error={errorState?true:false}
              id="username"
              label={errorState ? errorMessage : "username"}
              name = 'username'
              value = {username}
              placeholder="username"   
              onChange={changeHandler}
              
            />

            <TextField
              autoComplete='new-password'
              sx={{marginTop: '3ch'}}
              fullWidth
              noValidate
              //error={incorrectPassword?true:false}
              id="password"
              label="password"
              type="password"
              name='password'
              value={password} 
              placeholder="password"
              onChange={changeHandler}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}


async function createAccount(username, password) {
  const url = "http://localhost:8080/user/create_user";
  const requestBody = JSON.stringify({
    "username": username,
    "password": password
  });
  let options = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json;charset=utf-8'
    },
    body: requestBody
  };  
  let response = await fetch(url,options);
  response = await response.json();
  if (response.message === "username already taken") {
    return ["error", "username already taken"];
  }
  else {
    return ["success", response];
  };
};
