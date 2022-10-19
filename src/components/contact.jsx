import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import "../css/contact.css"
import {Link} from "react-router-dom"




const Form = ()=>{

        const [formData, setFormData] = useState(
        {  FirstName:"",
            LastName:"",
            Address:"",
            Mobile:"",
            Email:""}   
        )



         const[wholeData , setWholeData] = useState([])
             useEffect(()=>{
            console.log(wholeData,"dataaa")
                },[wholeData])




                const validateUser = (data)=>{
                    const {name,value} = data;
                }



        
                const handleChange = (e)=>{
                    console.log("event",e.target.name,e.target.value)
                    const {name,value} = e.target
                    setFormData({...formData,[name]:value})
                    validateUser(e.target)
                }




                const handleSubmit = (e)=>{
                    console.log("heree")
                    e.preventDefault()
                    addUser(formData)
                }



                //add user data//
                const addUser = (data)=>{

                    axios.post("http://localhost:5000/contacts",data)

                        .then((res)=>{
                            alert("Data Inserted")
                            window.location.reload(false)
                        }).catch((err)=>{
                            alert("Data Not Inserted")
                        })       
                }

    
    

    return (
        <section className="contact">

            <h1 className="topnav" style={{color:"white"}}>contacts</h1>
            
            <li><Link to="/CardView" style={{color:"white"}}> CARD VIEW</Link></li>
            <li><Link to="/TableView" style={{color:"white"}}>TABLE VIEW</Link></li>

            
        <div>
            <Card className="card">
                <CardContent>
                    
                 <form onSubmit={handleSubmit}>

                 <Typography><label> First Name:
                    <input
                    type="text"                    
                    name = "FirstName"
                    placeholder="Enter First Name"
                    value = {formData.FirstName}
                    onChange = {handleChange}/>
                    </label>
                </Typography>

                <Typography><label> Last Name:
                    <input
                    type="text"                    
                    name = "LastName"
                    placeholder="Enter Last Name"
                    value = {formData.LastName}
                    onChange = {handleChange}/>
                    </label>
                </Typography>

                <Typography><label>Email:
                    <input
                    type="email"
                    name = "Email" 
                    placeholder='ex:abcd@gmail.com'               
                    value = {formData.Email}
                    onChange = {handleChange}/>
                    </label>
                </Typography>

                <Typography><label> Mobile:
                    <input
                    type="text"                    
                    name = "Mobile"
                    placeholder="Enter Number"
                    minLength = "10"
                    maxLength = "10"
                    value = {formData.Mobile}
                    onChange = {handleChange}/>
                    </label>
                </Typography>

                <Typography><label> Address:
                    <input 
                    type="text"
                    name="Address"
                    placeholder="Enter Address"
                    value = {formData.Address} 
                    onChange = {handleChange} />
                    </label>
                </Typography>  

                <Typography>
                    <button className="submit">submit</button>
                </Typography>

                    </form>
                    </CardContent>
                    </Card>

        </div>
        </section>
    );
}

export default Form;