import axios from "axios";
import { useEffect, useState } from "react";
import "./Listings.css";



export default function GetReview() {
  const [array, setArray] = useState([]);

//   useEffect(() => {
//     try {
//       axios
//         .get("http://localhost:8080/api/book/getReviews", {
//           bookId: "121",
//         })
//         .then((res) => {
//             setArray(res.data.data)
//             console.log(res)
//         //   setReview(data.data);
//         //   setDisplayReviews(data.data);
//         })
//         .catch((error) => {
//           alert("Backend issue!");
//         });
//     } catch (err) {
//       alert("Could not send the Request. Please try again!");
//     }
//   }, []);

useEffect(() => {
    axios
      .get("http://localhost:8080/api/book/getReviews", {
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
