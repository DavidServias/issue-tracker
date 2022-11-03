import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CreateAccount from './CreateAccount';
import { Box } from '@mui/system';
import { useNavigate} from "react-router-dom";
import { redirect } from "react-router-dom";

/*******************************************************
**Function Name: 
**Description: 
**Params: 
**Pre-Conditions: na
**Post-Conditions:na
**TODO:

********************************************************/

export function HomeView() {
  const FORM_WIDTH = "300px";
  const [loggedIn, setLoggedIn] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [data,setData] = useState({
    username:"",
    password:""
  });
  const [user, setUser] = useState({});
  const [formOpen, setFormOpen] = useState(false);

  const {username,password} = data;
  const navigate = useNavigate();
  
  console.log(loggedIn);
  // Need to understand this function
  const changeHandler = e => {
    setData({...data,[e.target.name]:[e.target.value]});
  };


  const submitHandler = e => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    login();
   
  };

  const handleCreateNewUser = function() {
    console.log("Create new user");
    setFormOpen(true);
  };
 
/*******************************************************
**Function Name: login 
**Description: Requests username and password. If username
does not exits or password does not match username, login 
is unsuccessful. If successful, user info is retrieved from
the database and used to construct ProfileView.
**Params: 
**Pre-Conditions: na
**Post-Conditions: state of loggedIn and LoginError
will change depending on the results of login attempt.
**TODO:

********************************************************/

  async function login() {
    // request user info from api
    const url = "http://localhost:8080/user/login";
    let reqBody = JSON.stringify({
      "username": username[0], 
      "password": password[0]
    });
    let options = {
      method: 'POST',
      headers: {'Content-Type':'application/json;charset=utf-8'},
      body: reqBody
    };
    let response = await fetch(url,options)
    response = await response.json();
    setUser(response);

    if (response.message === "user not found") {
      setUserNotFound(true);
      setIncorrectPassword(true);
      setData({username:"", password: ""});
      console.log(username);
      setLoggedIn(false);
     } else if (response.message === "invalid password") {
      setUserNotFound(true);
      setIncorrectPassword(true);
      setData({username:"", password: ""});
      setLoggedIn(false);
    } else if (response.username===username[0] && response.password===password[0]) {
      console.log("success");
      setLoggedIn(true);
      navigate("/profile", {state: {user: response}});
      // return (<Navigate to="/profile" replace="true"/> );
    }
      
  };


  return (
      
      <Box  sx={{ width: FORM_WIDTH, 
                  backgroundColor: 'transparent', 
                  margin: 'auto',
                  marginTop: '5ch' 
      }}>
        <CreateAccount open={formOpen} setFormOpen={setFormOpen}/>
        <h4>Please Login</h4>
        <form className='form'>    
          {/* {loginError ? 
          null} */}
          <TextField
            fullWidth
            className="textField"
            noValidate
            error={userNotFound?true:false}
            id="username"
            label={userNotFound?"enter valid username":"username"}
            name = 'username'
            value = {username}
            placeholder="username"   
            onChange={changeHandler}
            type="text"
          />

          <TextField
            fullWidth
            className="textField"
            noValidate
            error={incorrectPassword?true:false}
            id="password"
            label={incorrectPassword?"enter valid password":"password"}
            type="password"
            name='password'
            value={password} 
            placeholder="password"
            onChange={changeHandler}
          />

          <Button   
            type="button"
            className="form_custom-button"
            onClick={submitHandler}
          >SUBMIT</Button>
          
        </form>
        
      <Button
        type="button"
        onClick={handleCreateNewUser}
        >CREATE ACCOUNT</Button>
      </Box> 
          
    );
        
}


export default HomeView;
