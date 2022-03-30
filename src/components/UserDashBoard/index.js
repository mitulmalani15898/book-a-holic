import "./userdashboard.css";

import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
function UserDashBoard() {
  const [userName, setuserName] = useState();
  const [orderData, setorderData] = useState([]);
  const [orderDetails, setorderDetails] = useState([]);
  const [borrowedDetails, setborrowedDetails] = useState([]);
  let orderProducts = [];
  let productsArray = [];
    const nav = useNavigate();
  function xyz(){
    nav(`/profiledetail/`);
  }
  const getuserName=() => {
    Axios.get('http://localhost:8080/api/userdashboard/getname/624176615650470f069854f7').then((data)=>{
           setuserName(data.data);
           console.log(data.data);
   })
  }
  
  const getFavoriteList=() => {
    Axios.get('http://localhost:8080/api/userdashboard/borrowedbooks/624331b48088012ce154a51d').then((data)=>{
           setorderDetails(data.data);
           console.log(orderDetails.length);
   })
  }

  const getBorrowedList=() => {
    Axios.get('http://localhost:8080/api/userdashboard/favoritebooks/624331b48088012ce154a51d').then((data)=>{
      setborrowedDetails(data.data);
           console.log(borrowedDetails.length);
   })
  }
  getuserName();    

  //const history=useHistory();
    useEffect(() =>{
      getFavoriteList(); 
      getBorrowedList();
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
              <div><img src={BASE_URL + order.imageUrl} width="170" height="170" alt="harry" onClick={() => xyz()}/></div>

              
            ))};
                    
                
            </section>
            <br></br>
            <h1 className="borrowedtitle">Borrowed Books</h1>
            
            <section id="dashboard-header" className="favorite-book-container">
            {borrowedDetails.map(book => (
              <div><img src={BASE_URL + book.imageUrl} width="170" height="170" alt="harry"/></div>
              
            ))};
                    
                
            </section>


        </div>
      </>
  );
  }


export default UserDashBoard;