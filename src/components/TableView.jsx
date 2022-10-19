import React,{useState,useEffect} from "react";
import axios from "axios";
import "../css/table.css"
import { useNavigate } from "react-router-dom";



const TableView =()=>{
    const [tableView , setTableView] = useState([])
    const navigate = useNavigate()


   
    useEffect(()=>{
        getUserList()
    },[])



            //Get user data//
            const getUserList = ()=>{
                axios.get("http://localhost:5000/contacts")
                    .then((res)=>{
                        console.log(res.data);
                        setTableView(res.data);
                        
                    }).catch((err)=>{
                    console.log(err);
                    alert(err)
                    }) 
            }



            //Edit user data//
            const setData =(data)=>{
                console.log(data);
                navigate('/Edit',{state:data})
            }



            //Delete user data//
            const deleteUser = (data)=>{
                
                console.log(data.id);
                
                axios.delete(`http://localhost:5000/contacts/${data.id}`,tableView)
                    .then((res)=>{
                        alert("Deleted")
                    
                        window.location.reload(false)
                    })
                
            }



    
    return(


        <div className="table">


            <h1 className="head">SAVED CONTACT DETAILS</h1>


            <table className="table">


                <thead>
                        <tr>
                            <th>FIRST NAME</th>
                            <th>LAST NAME</th>
                            <th>MOBILE</th>
                            <th>E-Mail</th>
                            <th>ADDRESS</th>
                            <th>OPTIONS</th>
                        </tr>
                </thead>


                <tbody>
                    {
                        tableView.map((elmt,index)=>{
                            return(
                                <tr>
                                    <td>{elmt.FirstName}</td>
                                    <td>{elmt.LastName}</td>
                                    <td>{elmt.Mobile}</td>
                                    <td>{elmt.Email}</td>
                                    <td>{elmt.Address}</td>

                                    <td>
                                        <button onClick={()=>setData(elmt)} className="Button">EDIT</button><button onClick={()=>deleteUser(elmt)}  className="Button">DELETE</button>
                                        
                                    </td>
                                </tr>
                                 )
                                 })
                    }
                </tbody>

            </table>

        </div>
    )
}
export default TableView;