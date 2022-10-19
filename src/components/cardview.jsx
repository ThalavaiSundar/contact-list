import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../css/card.css"
// import contact from '../Assets/Images/contactImage.jpg'



const CardView = () => {
    const [cardView, setCardView] = useState([])
    const navigate = useNavigate()



    useEffect(() => {
        getUserList()
        console.log(cardView, "hi")
        console.log(deleteUser, "delete")
    }, [])



    //Get user data//
    const getUserList = () => {
        axios.get("http://localhost:5000/contacts")
            .then((res) => {
                console.log(res, "hlo");
                setCardView(res.data);


            }).catch((err) => {
                console.log(err);
                alert(err)
            })
    }



    //Edit user data
    const setData = (data) => {
        console.log(data);
        navigate('/Edit', { state: data })
    }



    //Delete user data 
    const deleteUser = (data) => {

        console.log(data.id);

        axios.delete(`http://localhost:5000/contacts/${data.id}`)
            .then((res) => {
                alert("Deleted")
                // getUserList()
                window.location.reload(false)
            })
            .catch((err) => {
                console.log(err);
                alert("Not Deleted")
            })
    }

    return (
        <>
            <h1 className="head">SAVED CONTACT DETAILS</h1>

            <div className="Header">
                {/* <img src={contact} alt="" /> */}

                {
                    cardView.map((elmt, index) => {
                        console.log(elmt, "hi")
                        return (

                            <Card className="Card">

                                <CardContent>
                                    <Typography>FIRST NAME:{elmt.FirstName}</Typography>
                                    <Typography>LAST NAME:{elmt.LastName}</Typography>
                                    <Typography>MOBILE:{elmt.Mobile}</Typography>
                                    <Typography>E-MAIL:{elmt.Email}</Typography>
                                    <Typography>ADDRESS:{elmt.Address}</Typography>
                                </CardContent>


                                <button className="button" onClick={() => setData(elmt)}>EDIT</button>
                                <button className="button" onClick={() => deleteUser(elmt)}>DELETE</button>

                            </Card>
                        )
                    })
                }
            </div>
        </>
    )

}

export default CardView;