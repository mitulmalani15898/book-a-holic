/**
 * Filename : GetReview.js
 * Author: Abhinav Rawat (B00895691)
 * File Purpose: To get book reviews
 */

import { useEffect, useState } from "react";
import "./Listings.css";
import axios from "../../axios";

export default function GetReview() {
  const [array, setArray] = useState([]);

// Backend Code to retrieve book reviews from database
useEffect(() => {
    axios
      .get("/book/getReviews", {
        params: { bookId: "121" }
      })
      .then((res) => {
          setArray(res.data.data)
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div className="box">
      <h1>
        <center>Reviews</center>
      </h1>

      {/* Displaying reviews dynamically in Card */}
      <div className="listings">
        {array && array.map((review) => (
          <div className="card hover-effect">
            <h6>{review.review}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}
