import React, { useState } from "react";
import axios from 'axios';

// @mui/material components
import { makeStyles } from 'tss-react/mui';

import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
// @mui/icons-material
import Email from "@mui/icons-material/Email";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "@mui/material/Button";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@mui/material/TextField';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
// import { GoogleLogin } from 'react-google-login';
import image from "assets/img/bg7.jpg";

const useStyles = makeStyles()(styles);

export default function SignUp(props) {
  const [email , setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signupcolor, setSignupColor] = useState("warning");
  const [message, setMessage]= useState("");
  const [loginFal , setLoginFal] = useState(false);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const { classes } = useStyles();
  const { ...rest } = props;
 
  const HandleLoginFaliure=()=>{
    if(loginFal === true){
      return(<SnackbarContent
        message={
          <span>
           Something went wrong with Google SignUp
          </span>
        }
        close
        color="danger"
        icon="info_outline"
      />);
    }
    else {
      return null;
    }
  }
  
  function handleSignup(e){
    axios({
        method: 'post',
        url: "http://localhost:8000/api/signup/basic/",
        headers: {}, 
        data: {
            username: name,  
            email: email,
            password: password
        }
      }).then(res =>{
            setMessage(res.data.message);
            if((res.data.status) === 200){
                setSignupColor("success");
             }
             else{
              setSignupColor("danger");
             }
        //    const token = res.data.token;
        //     console.log(token);
        //    localStorage.setItem('TokenKey', token);
           window.location.href = "/profile";
        })
}
const HandleSignupResponse=()=>{
if(message !== ""){
  return(<SnackbarContent
    message={
      <span>
       {message}
      </span>
    }
    close
    color={signupcolor}
    icon="info_outline"
  />);

}
else {
  return null;
}
}

  return (
    <div>
   
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <HandleSignupResponse/><HandleLoginFaliure/>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>SIGN UP</h4>
                    {/* <GoogleLogin
                          clientId="744225883265-ru7qj83bl7bqsfcarhbp6c6qqqo71e64.apps.googleusercontent.com"
                          buttonText="Login"
                          render={renderProps => (
                            <Button
                            justIcon
                            color="transparent"
                            onClick={renderProps.onClick}
                              >
                            <i className={"fab fa-google-plus-g"} />
                          </Button>
                          )}
                          onSuccess={responseSuccessGoogle}
                          onFailure={(e)=>{ 
                            setLoginFal(true);
                          }}
                          cookiePolicy={'single_host_origin'}
                        /> */}
                    {/* <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div> */}
                  </CardHeader>
                  <p className={classes.divider}></p>
                  <CardBody>
                  <TextField
                      label="Name"
                      id="name"
                      type="text"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonIcon style={{color:"purple"}} />
                          </InputAdornment>
                        )
                      }}
                    
                      value ={name}
                      onChange={e =>{setName(e.target.value)}}  
                    />

                  <TextField
                      label="Email..."
                      id="email"
                      type="email"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email  style={{color:"purple"}} />
                          </InputAdornment>
                        )
                      }}
                    
                      value ={email}
                      onChange={e =>{setEmail(e.target.value)}}  
                    />
                <TextField
                      label="Password"
                      id="pass"
                      type="password"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon style={{color:"purple"}}/>
                          </InputAdornment>
                        )
                      }}
                      value ={password}
                      onChange={e =>{setPassword(e.target.value)}}  
                    />
                    {/* <CustomInput
                      labelText="Email..."
                      id="email"
                      value ={email}
                      onChange={e =>{setEmail(e.target.value)}}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                   
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      value ={password}  
                      onChange={e =>{setPassword(e.target.value)}}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                         
                      }}

                    /> */}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={handleSignup}>
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
