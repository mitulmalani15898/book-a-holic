//Ninad Nitin Shukla
//B00863694
//Purpose of the file: This is the homepage of the application .
 //When a user is logged out he will see the trending books list only 
 //However when he is logged in he will be able to see the most recent 
 //purchases too. 
import "./userdashboard.css";

import Axios from "../../axios";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import { useCookies } from "react-cookie";
import { BASE_URL } from "../../utils/constants";
import contact from "../../static/images/contactlogo.png";
function UserDashBoard() {
  const [userName, setuserName] = useState();
  const [bookimg, setbookimg] = useState([]);
  let [cookies, setCookies] = useCookies(["Token", "Email"]);
  const [orderData, setorderData] = useState([]);
  const [orderDetails, setorderDetails] = useState([]);
  const [borrowedDetails, setborrowedDetails] = useState([]);
  
  let orderProducts = [];
  let productsArray = [];

  const getTrendingList=() => {
    Axios.get('/trendingpurchases/').then((data)=>{
      setborrowedDetails(data.data.data);
           console.log(data.data.data);
   })
  }

    useEffect(() =>{
     
      getTrendingList();
    },[])
    const getRecent=() => {
      console.log(bookimg);
      Axios.get(`/recentpurchases/${cookies.Email}`).then((data)=>{
          setbookimg(data.data.data);
             console.log(data.data.data);
     }).catch((error) => {
      console.log(error.message);});
    }
    
    useEffect(()=>{
      if(cookies.Email!=null){
        getRecent(); 
      }
        
      
      
     
    },[])
    if(cookies.Token != null){
      // some code....
        console.log(cookies.Token);
        
        
        console.log(cookies.Email);
        
          return (<>
            <div className="User-Dashboard">
               <div id="main">   
                        <h1 className="head">About Us</h1>
                    </div>
                <br></br>
                    <section className="container_profile_user">
                   
                            <p>We are an internet company that brings library experience to your fingertips. We were estrablished in COVID for all the book-o-holics.
                                who missed going to library but also do not want to spend huge amounts in buying books. So instead you borrow the books
                                in our very affordable subscirptions. 
                            </p>
                    
        
                    </section>  
                  <br></br>

                    
                            <h1 className="dashboard-header">Trending books</h1>
                    
                    
                    
                    { <section id="dashboard-header" className="favorite-book-container">
                    {borrowedDetails.map(order => (
                     <div><div><img src={BASE_URL + order.imageUrl} width="162" height="250" alt="harry" /></div><div className="book-title"><p>{order.title}</p></div><div className="book-author"><p >{order.author}</p></div> </div>
        
                      
                    ))};
                            
                    
                     </section> }
                     <br></br>
                     <section id="recent-order" className="recent-book-container">
             <h1 className="head1">Recently ordered books</h1>
                        {bookimg.map(order => (
             <div><img src={BASE_URL + order.imageUrl} width="162" height="250" alt="harry" /></div>

              
            ))};
                    
                
            
            
     </section>
                     <br></br>
                     <h1 className="Contact">Contact-us</h1>
                     <br></br>
                     <br></br>
                     <section className="container-1">
        
                      
                        <h4>Email Id: contact@book-o-holic.com</h4>
        
                        <h4>Contant Info: 1XXXXXX9902</h4>
        
                        </section>
        
        
                </div>
              </>
          );
    
    }else{
    
        console.log("Logout checker")
        return (<>
          <div className="User-Dashboard">
             <div id="main">   
                      <h1 className="head">About Us</h1>
                  </div>
              <br></br>
                  <section className="container_profile_user">
                 
                          <p>We are an internet company that brings library experience to your fingertips. We were estrablished in COVID for all the book-o-holics.
                              who missed going to library but also do not want to spend huge amounts in buying books. So instead you borrow the books
                              in our very affordable subscirptions. 
                          </p>
                  
      
                  </section>  
                <br></br>
                
                          <h1 className="dashboard-header">Trending books</h1>
                  
                  
                  
                  { <section id="dashboard-header" className="favorite-book-container">
                  {borrowedDetails.map(order => (
                   <div><div><img src={BASE_URL + order.imageUrl} width="162" height="250" alt="harry" /></div><div className="book-title"><p>{order.title}</p></div><div className="book-author"><p >{order.author}</p></div> </div>
      
                    
                  ))};
                          
                  
                   </section> }
                   <br></br>
                   <br></br>
                   <h1 className="Contact">Contact-us</h1>
                   <br></br>
                   <br></br>
                   <section className="container-1">
      
                    
                      <h4>Email Id: contact@book-o-holic.com</h4>
      
                      <h4>Contant Info: 1XXXXXX9902</h4>
      
                      </section>
      
      
              </div>
            </>
        );
    }
    
  }


export default UserDashBoard;