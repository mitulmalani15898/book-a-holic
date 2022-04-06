/*Author: Ninad Nitin Shukla(B00863694)
Purpose of the file:This file is responsible 
for giving the recently ordered items as ouput 
for the user.
*/
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecentOrders.css";

import { useCookies } from "react-cookie";
import axios from "../../axios";
import { BASE_URL } from "../../utils/constants";
function RecentOrders(){
    const [bookimg, setbookimg] = useState([]);
    const [cookies, setCookies] = useCookies("user");
    const emailID = cookies.Email;
    console.log(cookies.Email);
    const getRecent=() => {
        console.log(bookimg);
        axios.get(`/recentpurchases/${emailID}`).then((data)=>{
            setbookimg(data.data.data);
               console.log(data.data.data);
       }).catch((error) => {
        console.log(error.message);});
      }
      
    useEffect(()=>{
        getRecent(); 
       
      },[])


    return(
        
        <section id="recent-order" className="recent-book-container">
             <h1 className="head1">Recently visited books</h1>
                        {bookimg.map(order => (
             <div><img src={BASE_URL + order.imageUrl} width="162" height="250" alt="harry" /></div>

              
            ))};
                    
                
            
            
     </section>);

 

}
export default RecentOrders;
