import './App.css';
import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import ProfileView from './ProfileView.js';
import ProjectView from './ProjectView.js';
import IssueView from './IssueView.js';         
import HomeView from './HomeView.js';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/*******************************************************
**Function Name: 
**Description: 
**Params: 
**Pre-Conditions: na
**Post-Conditions:na
**TODO:

********************************************************/

export function App() {
  return(
    <div>
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<HomeView />}/>
          <Route path="/profile" element={<ProfileView />}/> 
          <Route path="/project" element={<ProjectView />}/>
          <Route path="/issue" element={<IssueView />}/>
        
       </Routes>
     </BrowserRouter> 
    {/* <HomeView/> */}
    </div>
  );
//   const FORM_WIDTH = "300px";
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [userNotFound, setUserNotFound] = useState(false);
//   const [incorrectPassword, setIncorrectPassword] = useState(false);
//   const [data,setData] = useState({
//     username:"",
//     password:""
//   });
//   const [user, setUser] = useState({});
 

// const {username,password} = data;
  
//   // Need to understand this function
//   const changeHandler = e => {
//     setData({...data,[e.target.name]:[e.target.value]});
//   };

   
//   const submitHandler = e => {
//     e.preventDefault();
//     console.log(username);
//     console.log(password);
//     login();
   
//   };
// /*******************************************************
// **Function Name: login 
// **Description: Requests username and password. If username
// does not exits or password does not match username, login 
// is unsuccessful. If successful, user info is retrieved from
// the database and used to construct ProfileView.
// **Params: 
// **Pre-Conditions: na
// **Post-Conditions: state of loggedIn and LoginError
// will change depending on the results of login attempt.
// **TODO:

// ********************************************************/

//   async function login() {
//     const url = "http://localhost:8080/user/login";

//     let reqBody = JSON.stringify({
//       "username": username[0], 
//       "password": password[0]
//     });

//     let options = {
//       method: 'POST',
//       headers: {'Content-Type':'application/json;charset=utf-8'},
//       body: reqBody
//     };

//     let response = await fetch(url,options)
//     response = await response.json();
//     setUser(response);

        

//     if (response.message === "user not found") {
//       setUserNotFound(true);
//       setIncorrectPassword(true);
//       setData({username:"", password: ""});
//       console.log(username);
//      } else if (response.message === "invalid password") {
//       setUserNotFound(true);
//       setIncorrectPassword(true);
//       setData({username:"", password: ""});
//     } else if (response.username===username[0] && response.password===password[0]) {
//       console.log("success");
//       setLoggedIn(true);
//     }

   
//   };
//   return (
  
//     /* <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           { <Route index element={<App />} />
//           /*<Route path="blogs" element={<Blogs />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="*" element={<NoPage />} /> 
//         </Route>
//       </Routes>
//     </BrowserRouter> */
//     loggedIn === false ? (
//     <Box  sx={{ width: FORM_WIDTH, 
//                 backgroundColor: 'transparent', 
//                 margin: 'auto',
//                 marginTop: '5ch' 
//     }}>
//       <h4>Please Login</h4>
//       <form className='form'>    
//         {/* {loginError ? 
//         null} */}
//         <TextField
//           fullWidth
//           className="textField"
//           noValidate
//           error={userNotFound?true:false}
//           id="username"
//           label={userNotFound?"enter valid username":"username"}
//           name = 'username'
//           value = {username}
//           placeholder="username"   
//           onChange={changeHandler}
//           type="text"
//         />

//         <TextField
//           fullWidth
//           className="textField"
//           noValidate
//           error={incorrectPassword?true:false}
//           id="password"
//           label={incorrectPassword?"enter valid password":"password"}
//           type="password"
//           name='password'
//           value={password} 
//           placeholder="password"
//           onChange={changeHandler}
//         />

//         <Button   
//           type="button"
//           className="form__custom-button"
//           onClick={submitHandler}
//         >SUBMIT</Button>
        
//       </form>
//     </Box>):
//     <ProfilePage  user = {user}/> 
        
//    );
}


export default App;
