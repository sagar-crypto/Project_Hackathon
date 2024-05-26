import React, { useState, useEffect} from "react";
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
  const [country, setCountry ] = useState("");
  const [date, setDate] = useState("");
  const [transport, setTransport] = useState("");
  const [carbonEmission, setcarbonEmission] = useState("");
  const [compliance, setCompliance] = useState("");
  const [proof_certificate_1, setProof1] = useState("");
  const [proof_certificate_2, setProof2] = useState("");
  const [self_confirmation, setSelfconfirmation] = useState("");
  const [signature, setSignature] = useState("");
  const [designation, setDesignation] = useState("");
  const [form_submited_date, setFormSubmissionDate] = useState("");
  const [geolocation, setGeolocation] = useState("");
  const [start_location, setStartLoaction] = useState("");
  const [destination_location, setDestinationLocation] = useState("");
  const [product_category, setProductCategory] = useState("");
  const [certificate_id, setCertificateId] = useState("");
  const [units, setUnits] = useState("");

  const [signupcolor, setSignupColor] = useState("warning");
  const [message, setMessage]= useState("");
  const [loginFal , setLoginFal] = useState(false);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const shipmentIdlist = [1,2,3,4,5,6]
  let user_id = sessionStorage.getItem("User_id");
  let display = "none";
  console.log(user_id);
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const { classes } = useStyles();
  const { ...rest } = props;

  useEffect(() => {
    // Replace with your API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getshipmentdetails/'+ user_id + '/');
        console.log(response.data.shipments_details);
        if(response.data){
          display = "inline"
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function handleSubmit(e){
    axios({
        method: 'post',
        url: "http://localhost:8000/api/submitform/",
        headers: {}, 
        data: {
            userId: user_id,
            shipment_id: shipmentid,  
            product_name: product,
            price: price,
            country: country,
            date: date,
            transport: transport,
            carbonEmission: carbonEmission,
            compliance: compliance,
            proof_certificate_1: proof_certificate_1,
            proof_certificate_2 : proof_certificate_2,
            certificate_id: certificate_id,
            self_confirmation : self_confirmation,
            signature: signature,
            designation : designation,
            form_submited_date : form_submited_date,
            units: units,
            geolocation: geolocation,
            start_location: start_location,
            product_category : product_category,
            destination_location: destination_location
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
                    <div style={{display: display}}>
                  <InputLabel id="demo-simple-select-autowidth-label" >Shipment ID</InputLabel>
                
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
                </div>

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
                      label="product_category"
                      id="product_category"
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
                    
                      value ={product_category}
                      onChange={e =>{setProductCategory(e.target.value)}}  
                    />
                    <TextField
                      label="designation"
                      id="designation"
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
                    
                      value ={designation}
                      onChange={e =>{setDesignation(e.target.value)}}  
                    />
                    <TextField
                      label="form_submited_date"
                      id="form_submited_date"
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
                    
                      value ={form_submited_date}
                      onChange={e =>{setFormSubmissionDate(e.target.value)}}  
                    />
                    <TextField
                      label="geolocation"
                      id="geolocation"
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
                    
                      value ={geolocation}
                      onChange={e =>{setGeolocation(e.target.value)}}  
                    />
                    <TextField
                      label="start_location"
                      id="start_location"
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
                    
                      value ={start_location}
                      onChange={e =>{setStartLoaction(e.target.value)}}  
                    />
                    <TextField
                      label="destination_location"
                      id="destination_location"
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
                    
                      value ={destination_location}
                      onChange={e =>{setDestinationLocation(e.target.value)}}  
                    />
                    <TextField
                      label="certificate_id"
                      id="certificate_id"
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
                    
                      value ={certificate_id}
                      onChange={e =>{setCertificateId(e.target.value)}}  
                    />

<TextField
                      label="proof_certificate_1"
                      id="proof_certificate_1"
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
                    
                      value ={proof_certificate_1}
                      onChange={e =>{setProof1(e.target.value)}}  
                    />
                  <TextField
                      label="proof_certificate_2"
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
                    
                      value ={proof_certificate_2}
                      onChange={e =>{setProof2(e.target.value)}}  
                    />
                    


<TextField
                      label="Compliance"
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
                      label="self_confirmation"
                      id="self_confirmation"
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
                    
                      value ={self_confirmation}
                      onChange={e =>{setSelfconfirmation(e.target.value)}}  
                    />
                    <TextField
                      label="signature"
                      id="signature"
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
                    
                      value ={signature}
                      onChange={e =>{setSignature(e.target.value)}}  
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
