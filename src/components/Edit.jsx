import React from "react";
import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../css/contact.css"



const Edit = () => {
    const {state} = useLocation()
    const [updateData , setUpdateData] = useState({
        FirstName:"",
          LastName:"",
          Address:"",
          Mobile:"",
          Email:""
    })



    useEffect(()=>{
        console.log(updateData , "hello")
        setUpdateData(state)
    },[])


    
            // Post edited user data //
            const postUser = (e) => {
                e.preventDefault()
                console.log(updateData)
                axios.put(`http://localhost:5000/contacts/${updateData.id}`,updateData)
                .then(()=>{
                    alert("Edited Data inserted")
                    window.location.reload(false)
                })

            }



            const validateUser = (data)=>{
                const {name,value} = data;
            }



            const handleChange = (e)=>{
                console.log("event",e.target.name,e.target.value)
                const {name,value} = e.target
                setUpdateData({...updateData,[name]:value})
                // validateUser(e.target)
            }



return(


            <div className="contact">
                         <Card className="card">
                        <CardContent>
                        <form>
                        <Typography><label> First Name:
                            <input
                            type="text"                    
                            name = "FirstName"
                            placeholder="Enter First Name"
                            value = {updateData.FirstName}
                            onChange = {handleChange}
                            />
                            </label>
                        </Typography>


                        <Typography><label> Last Name:
                            <input
                            type="text"                    
                            name = "LastName"
                            placeholder="Enter Last Name"
                            value ={updateData.LastName}
                            onChange = {handleChange}
                            />
                            </label>
                        </Typography>


                        <Typography><label>Email:
                            <input
                            type="email"
                            name = "Email" 
                            placeholder='ex:abcd@gmail.com'               
                            value ={updateData.Email}
                            onChange = {handleChange}
                            />
                            </label>
                        </Typography>


                        <Typography><label> Mobile:
                            <input
                            type="text"                    
                            name = "Mobile"
                            placeholder="Enter Number"
                            minLength = "10"
                            maxLength = "10"
                            value = {updateData.Mobile}
                            onChange = {handleChange}
                            />
                            </label>
                        </Typography>


                        <Typography><label> Address:
                            <input 
                            type="text"
                            name="Address"
                            placeholder="Enter Address"
                            value = {updateData.Address} 
                            onChange = {handleChange}
                            />
                            </label>
                        </Typography>  


                        <Typography>
                            <button className="submit" onClick={postUser}>submit</button>
                        </Typography>

                         </form>
                        </CardContent>
                        </Card>

            </div>
)
}

export default Edit;