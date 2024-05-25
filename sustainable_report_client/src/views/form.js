import React, { useState } from "react";
import axios from 'axios';
import Chat from 'views/chatbot';
// @mui/material components
import { makeStyles } from 'tss-react/mui';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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

export default function Form(props) {
  const [shipmentid , setShipmentid] = useState("");
  const [product, setProduct] = useState("");
  const [category, setCategory ] = useState("");
  const [price, setPrice ] = useState("");
  const [units, setUnits ] = useState("");
  const [country, setCountry ] = useState("");
  const [date, setDate] = useState("");
  const [transport, setTransport] = useState("");
  const [carbonEmission, setcarbonEmission] = useState("");
  const [compliance, setCompliance] = useState("");
  const [proof, setProof] = useState("");

  const [signupcolor, setSignupColor] = useState("warning");
  const [message, setMessage]= useState("");
  const [loginFal , setLoginFal] = useState(false);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const shipmentIdlist = [1,2,3,4,5,6]
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
  
  function handleSubmit(e){
    axios({
        method: 'post',
        url: "http://localhost:8000/api/signup/basic/",
        headers: {}, 
        data: {
            // username: name,  
            // email: email,
            // password: password
        }
      }).then(res =>{
            setMessage(res.data.message);
            if((res.data.status) === 200){
                setSignupColor("success");
             }
             else{
              setSignupColor("danger");
             }
           window.location.href = "/profile";
        })
}
const handleChange = (event) => {
  setShipmentid(event.target.value);
};

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
        <div justify = "center" className={classes.container}>
          <GridContainer justify="center">
            <GridItem style={{ left: '50%',transform: 'translateX(-50%)'}} xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader style ={{backgroundColor: "#4caf50"}} className={classes.cardHeader}>
                    <h4>Compliance Details</h4>
                  </CardHeader>
                  <p className={classes.divider}></p>
                  <CardBody>
                  <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
                
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={shipmentid}
                  onChange={handleChange}
                  autoWidth
                  label="ShipmentI ID"
                >
                  {shipmentIdlist.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>

                  <TextField
                      label="ShipmentId"
                      id="shipid"
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
                    
                      value ={shipmentid}
                      onChange={e =>{setShipmentid(e.target.value)}}  
                    />

                  <TextField
                      label="Product"
                      id="product"
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
                    
                      value ={product}
                      onChange={e =>{setProduct(e.target.value)}}  
                    />

                  <TextField
                      label="Category"
                      id="category"
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
                    
                      value ={category}
                      onChange={e =>{setCategory(e.target.value)}}  
                    />

                  <TextField
                      label="Price"
                      id="price‚"
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
                    
                      value ={price}
                      onChange={e =>{setPrice(e.target.value)}}  
                    />
                  <TextField
                      label="Units"
                      id="units"
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
                    
                      value ={units}
                      onChange={e =>{setUnits(e.target.value)}}  
                    />


<TextField
                      label="Country"
                      id="country"
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
                    
                      value ={country}
                      onChange={e =>{setCountry(e.target.value)}}  
                    />

<TextField
                      label="Date"
                      id="date"
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
                    
                      value ={date}
                      onChange={e =>{setDate(e.target.value)}}  
                    />

<TextField
                      label="Means of Transport"
                      id="transport"
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
                    
                      value ={transport}
                      onChange={e =>{setTransport(e.target.value)}}  
                    />


<TextField
                      label="Carbon Emissions"
                      id="carbonemission"
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
                    
                      value ={carbonEmission}
                      onChange={e =>{setcarbonEmission(e.target.value)}}  
                    />


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
                    
                      value ={compliance}
                      onChange={e =>{setCompliance(e.target.value)}}  
                    />

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
                    
                      value ={proof}
                      onChange={e =>{setProof(e.target.value)}}  
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
          <div style={{top:'11%', left:'80%',
    position: 'absolute', width: '30%'}} ><Chat/>
          </div>
        </div>

        <Footer whiteFont />
      </div>
    </div>
  );
}
