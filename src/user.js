import React, { useState, useEffect } from 'react';
import axios from 'axios';
import validator from 'validator';
import isEmail from 'validator/lib/isEmail';

const User = ()=>{

    const [user,setUser] = useState({user_name:"",email:"",phone:""})
    const [error,setError] = useState({user_name:"please enter",email:"",phone:""})
    const [userList, setUserList] = useState([])

    useEffect(()=>{
        getUserList()
    },[])

    const validateUser = (data)=>{
        const {name,value} = data;
        // if(value.length <4){
        //     setError({...error,[name]:"Please enter minimum 4 characters"})
        // }else{
        //     setError({...error,[name]:""})
        // }
       
        switch(name)
          {

            case "user_name": 
            let isvalid = validator.isAlpha(value)
            if(value.length<5){
                setError({...error,[name]:"Please enter minimum 5 characters"})
            }
            else if(!isvalid){
                setError({...error,[name]:"Please enter alphabets only"})

            }
            else{
                setError({...error,[name]:""})
            }
            break;
            case "email" :
                let validemail = validator.isEmail(value)
                  
                    if(!validemail){

                        setError({...error,[name]:"Please enter email"}) 
                    }
                    else{
                        setError({...error,[name]:""})
                    }
                    break;
                    
                    
            case "phone" :
                let validnum = validator.isNumeric(value)
                console.log(validnum)
                if(value.length!=10){
                    setError({...error,[name]:"Please enter 10 digit phone number"})
                }
                else if(!validnum){
                    console.log("Inside if")
                    setError({...error,[name]:"Please enter number only"})
    
                }
                else{
                    setError({...error,[name]:""})
                }
            }
                
    }

    const handleChange = (e)=>{

        const {name,value} = e.target
        setUser({...user,[name]:value})
        validateUser(e.target)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        addUser()
    }

    const addUser = ()=>{

        axios.post("http://localhost:5000/users",user)
            .then((res)=>{
                alert("Data Inserted")
                window.location.reload(false)
            }).catch((err)=>{
                alert("Data Not Inserted")
            })       
    }

    const getUserList = ()=>{
        axios.get("http://localhost:5000/users")
            .then((res)=>{
                console.log(res.data);
                setUserList(res.data);
                
            }).catch((err)=>{
               console.log(err);
               alert(err)
            }) 
    }

    const deleteUser = (id)=>{
        
        console.log(id);
        
        axios.delete(`http://localhost:5000/users/${id}`)
            .then((res)=>{
                alert("Deleted")
                // getUserList()
                window.location.reload(false)
            }).catch((err)=>{
                console.log(err);                
                alert("Not Deleted")
            })
    }

    const displayUser = (user_data)=>{
        console.log(user_data);
        setUser(user_data)
    }

    const editUser = ()=>{
        console.log("USER-->",user)
        axios.put(`http://localhost:5000/users/${user.id}`,user)
            .then((res)=>{
                console.log(res);
                getUserList()
                // window.location.reload(false)
            }).catch((err)=>{
                console.log(err);
                
            })

    }

    const checkDiable = ()=>{
        const {user_name,email,phone} = error
        return !(user_name=="" && email=="" && phone == "")
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"                    
                    name = "user_name"
                    pattern='[A-Z]'
                    required
                    value = {user.user_name}
                    onChange = {handleChange}/>

                <span style={{color:"red"}}>{error.user_name}</span>
                
                
                <input
                    type="email"
                    name = "email" 
                    placeholder='ex:aaa@gmail.com'               
                    value = {user.email}
                    onChange = {handleChange}/>
               <span style={{color:"red"}}>{error.email}</span>
                
                <input
                    type="text"                    
                    name = "phone"
                    minLength = "10"
                    maxLength = "10"
                    value = {user.phone}
                    onChange = {handleChange}/>
                  <span style={{color:"red"}}>{error.phone}</span>
                
                <input
                    type="submit"
                    value = "Submit"
                    disabled={!(error.user_name=="" && error.email=="" && error.phone == "")}/>

                <input
                    type="button"
                    value = "Save"
                    onClick = {editUser}/>
                          
            </form>

             <h1>{JSON.stringify(user)}</h1>

            <hr></hr>

            <input
                type = "button"
                value = "List User"
                onClick = {getUserList}/>

            <ul>
                {
                    userList.map((elmt,index)=>{
                        return (
                            <div key={index}>
                                <li >{elmt.user_name} {elmt.email} {elmt.phone}</li>
                                <input
                                    type="button"
                                    value = "Delete"
                                    onClick = {()=>deleteUser(elmt.id)}/>
                                <input
                                    type="button"
                                    value = "Edit"
                                    onClick = {()=>displayUser(elmt)}/>
                            </div>
                        )
                    })
                }
            </ul>

        </div>
    )
}


export default User;
