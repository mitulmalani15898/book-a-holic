//Ninad Nitin Shukla
//B00863694
//Purpose of the file: This is the homepage of the application .
//When a user is logged out he will see the trending books list only
//However when he is logged in he will be able to see the most recent
//purchases too.
import "./userdashboard.css";

import Axios from "../../axios";
import React, { useState, useEffect } from "react";

import { useCookies } from "react-cookie";
import { BASE_URL } from "../../utils/constants";
import { Container } from "react-bootstrap";

function UserDashBoard() {
  const [booking, setbooking] = useState([]);
  let [cookies, setCookies] = useCookies(["Token", "Email"]);
  const [borrowedDetails, setborrowedDetails] = useState([]);

  const getTrendingList = () => {
    Axios.get("/trendingpurchases/").then((data) => {
      setborrowedDetails(data.data.data);
    });
  };

  useEffect(() => {
    getTrendingList();
  }, []);

  const getRecent = () => {
    Axios.get(`/recentpurchases/${cookies.Email}`)
      .then((data) => {
        setbooking(data.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (cookies.Email != null) {
      getRecent();
    }
  }, []);

  return (
    <Container>
      <div className="User-Dashboard">
        <div id="main">
          <h1 className="head">About Us</h1>
        </div>
        <br></br>
        <section className="container_profile_user">
          <span className="brand-name">Book-a-holic </span>
          <span>
            is digital library built with love and a vision to empower the
            community by connecting people to spread the ideas of innovation and
            inspire learning. Intellectual freedom, equitable access and
            community-driven forms the roots of our values with our commitment
            to provide the widest range of books available to enthusiasts in all
            accessible forms.
          </span>
        </section>
        <br></br>

        {!!borrowedDetails.length && (
          <>
            <h1 className="dashboard-header">Trending Books</h1>
            <section id="dashboard-header" className="favorite-book-container">
              {borrowedDetails.map((order) => (
                <div key={order._id}>
                  <div>
                    <img
                      src={BASE_URL + order.imageUrl}
                      width="162"
                      height="250"
                      alt="harry"
                    />
                  </div>
                  <div className="book-title">
                    <p>{order.title}</p>
                  </div>
                  <div className="book-author">
                    <p>{order.author}</p>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {cookies.Token != null && !!booking.length && (
          <>
            <br></br>
            <section id="recent-order" className="favorite-book-container">
              <h1 className="dashboard-header">Recently ordered books</h1>
              {booking.map((order) => (
                <div key={order._id}>
                  <img
                    src={BASE_URL + order.imageUrl}
                    width="162"
                    height="250"
                    alt="harry"
                  />
                </div>
              ))}
            </section>
          </>
        )}

        <h1 className="Contact">Contact Us</h1>
        <section className="container-1">
          <h5>Email: contact@bookaholic.com</h5>
          <h5>Contact: +1 123-456-7890</h5>
        </section>
      </div>
    </Container>
  );
}

export default UserDashBoard;
