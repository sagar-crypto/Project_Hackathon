import React, { useState } from "react";
import axios from 'axios';
// @material-ui/core components
import { makeStyles } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
// @material-ui/icons
import Email from "@mui/icons-material/Email";
import People from "@mui/icons-material/People";
// core components

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@mui/material/TextField';
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function ResetPass(props) {

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const token= props.match.params.token;
  const [password, setPassword] = useState("");

  function handleSubmit(e){
    
    axios({
        method: 'post',
        url: "http://localhost:5000/users/resetPass/",
        headers: {}, 
        data: {
            token: token,
            password: password
        }
      }).then(res =>{
            alert(res.data.message);
           window.location.href = "/login-page";
        })
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
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Change Password</h4>
                  </CardHeader>
                  <CardBody>
                <TextField
                      label="New password"
                      id="pass"
                      type="password"
                      fullWidth
                      style={{paddingBottom:'5%'}}
                      endadornment= {
                        <InputAdornment position="end">
                           <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                        </InputAdornment>
                      }
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
                    <Button simple color="primary" size="lg" onClick={handleSubmit}>
                     Change Password
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
