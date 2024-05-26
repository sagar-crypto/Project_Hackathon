import React,{useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Switch } from '@material-ui/core';
import axios from 'axios';

export default function Categories(props) {
  const [categories, setCategories]= useState([]);
    const {value} = props;
  const [val, setVal] = useState(value);
 useEffect(()=>{
   axios.get("http://localhost:5000/categories")
   .then((result)=>{
     console.log(result);
      setCategories(result.data.categories)
   })
 },[])


  const handleChange = (event, newValue) => {
    // console.log(value) ;
    // console.log(newValue)
    let category = "" ;
    if( event.target.innerHTML[0] === '<' ){
      let temp = event.target.innerHTML.toString().split(">")[1].split("<")[0] ;
      // console.log(temp) ;
      category = temp ;
    } else {
      category = event.target.innerHTML ;
    }
    window.location.href = "/categories/"+ category +"/" + newValue ;
  }

  return (
    <>
   
    <Paper square>
      <Tabs
        value={val}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label=" tabs "
        centered
        orientation="horizontal"
      >
         {categories.map(cat=>(
        <Tab key={cat._id} label={cat.category} style={{fontSize:"1.1em"}} />
        ))}
        {/* <Tab label="Health"  />
        <Tab label="Toys" />
        <Tab label="Fashion"  />
        <Tab label= "Entertainment" /> */}
      </Tabs>
    </Paper>
    
    </>
  );
}