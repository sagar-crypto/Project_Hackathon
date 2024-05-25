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
import image from "assets/img/bg7.jpg";

const useStyles = makeStyles()(styles);

export default function SupplierDetail(props) {
  const [supplierName, setSupplierName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [contactPersonnm, setContactPersonnm] = useState("");
  const [signupcolor, setSignupColor] = useState("warning");
  const [message, setMessage]= useState("");
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  
  function handleSubmit(e){
    axios({
        method: 'post',
        url: "http://localhost:8000/api/signup/additional/",
        headers: {}, 
        data: {
            supplier_name: supplierName,  
            country: country,
            contact_name: contactPersonnm,
            phone: phone
        }
      }).then(res =>{
            setMessage(res.data.message);
            if((res.data.status) === 200){
                setSignupColor("success");
             }
             else{
              setSignupColor("danger");
             }
            const user_id = res.data.user_id;
            console.log(user_id);
            sessionStorage.setItem('User_id', user_id);
            window.location.href = "/form";
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
            <GridItem  style={{ position: 'fixed', left: '50%',transform: 'translateX(-50%)'}}  xs={12} sm={12} md={4}>
              <Card justify = "center" className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader style ={{backgroundColor: "#4caf50"}} className={classes.cardHeader}>
                    <h4>Just a few more questions</h4>
                  </CardHeader>
                  <p className={classes.divider}></p>
                  <CardBody>
                  <p className={classes.divider}></p>
                  <TextField
                      label="SupplierName"
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
                    
                      value ={supplierName}
                      onChange={e =>{setSupplierName(e.target.value)}}  
                    />

                  <TextField
                      label="Country of Operation" 
                      id="country"
                      type="text"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email  style={{color:"purple"}} />
                          </InputAdornment>
                        )
                      }}
                    
                      value ={country}
                      onChange={e =>{setCountry(e.target.value)}}  
                    />
                <TextField
                      label="Phone No."
                      id="phone"
                      type="text"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon style={{color:"purple"}}/>
                          </InputAdornment>
                        )
                      }}
                      value ={phone}
                      onChange={e =>{setPhone(e.target.value)}}  
                    />

                <TextField
                      label="Name of Contact Person"
                      id="contact_person_name"
                      type="text"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon style={{color:"purple"}}/>
                          </InputAdornment>
                        )
                      }}
                      value ={contactPersonnm}
                      onChange={e =>{setContactPersonnm(e.target.value)}}  
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
      </div>
    </div>
  );
}
