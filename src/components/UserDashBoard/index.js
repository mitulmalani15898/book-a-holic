import "./userdashboard.css";
import Gift1 from "./gift-1.png";
import bday from './bday.jpg';
import anniversary from './anniversary.jpg';
import travel from './travel.jpg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
function UserDashBoard() {
  const [userName, setuserName] = useState();
  const [orderData, setorderData] = useState([]);
  const [orderDetails, setorderDetails] = useState([]);
  let orderProducts = [];
  let productsArray = [];

  const getuserName=() => {
    Axios.get('http://localhost:8080/api/userdashboard/getname/624176615650470f069854f7').then((data)=>{
           setuserName(data.data);
           console.log(data.data);
   })
  }
  
  const getOrdersList=() => {
    Axios.get('http://localhost:8080/api/userdashboard/borrowedbooks/624176615650470f069854f7').then((data)=>{
           setorderDetails(data.data);
           console.log(orderDetails.length);
   })
  }
  getuserName();    
    useEffect(() =>{
      Axios.get('http://localhost:8080/api/userdashboard/borrowedbooks/624331b48088012ce154a51d').then((data)=>{
           setorderDetails(data.data);
           console.log(orderDetails.length);
   })
     
    },[])
    return (<>
    <div className="User-Dashboard">
       <div id="main">   
                <h1 className="head">User Dashboard</h1>
            </div>
        <br></br>
            <section className="container_profile_user">


                  <h2> Hello {userName}! Welcome to the magical world of books</h2>

            </section>  
          <br></br>
          <section id="container-about-us" className="container-about-us">
                    <h1>About Us</h1> 

                    <p>We are an internet company that brings library experience to your fingertips. We were estrablished in COVID for all the book-o-holics.
                        who missed going to library but also do not want to spend huge amounts in buying books. So instead you borrow the books
                        in our very affordable subscirptions. 
                    </p>
                
            </section>  
            <hr />
                    <h1 className="dashboard-header">My Favorite Books</h1>
            <hr />
            
            <section id="dashboard-header" className="favorite-book-container">
            {orderDetails.map(order => (
              <div>{order.title},{order.category}
              <img src={BASE_URL + order.imageUrl} width="100" height="100" alt="harry"/></div>
              
            ))};
                    
                
            </section>

        </div>
      </>
  );
  }


export default UserDashBoard;