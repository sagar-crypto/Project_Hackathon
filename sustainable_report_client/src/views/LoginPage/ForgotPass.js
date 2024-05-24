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

export default function ForgotPass(props) {

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const [email , setEmail] = useState("");
  
  function handleSubmit(e){
    
    axios({
        method: 'post',
        url: "http://localhost:5000/users/forgotpass/",
        headers: {}, 
        data: {
            email: email
        }
      }).then(res =>{
            alert(res.data.message);
           window.location.href = "/";
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
                    <h4>Forgot Password</h4>
                  </CardHeader>
                  <CardBody>
                  <TextField
                      label="Your Email"
                      id="email"
                      type="email"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      endadornment= {
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      }
                      value ={email}
                      onChange={e =>{setEmail(e.target.value)}}  
                    />
                   
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={handleSubmit}>
                     Submit
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
