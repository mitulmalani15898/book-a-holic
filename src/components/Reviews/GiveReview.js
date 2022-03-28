import { useState, React } from "react";
import Form from "react-bootstrap/Form";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GiveReview({
  onClose,
  show,
  order
}) {
  const [holdReview, setReview] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:8080/api/book/addReview", {
          bookId: order.bookId,
          email: order.email,  
          review: holdReview,
        })
        .then((res) => {
          alert("Review added successfully");
          navigate("/")
        })
        .catch((error) => {
          alert("Could not add the review. Please try again later!");
        });
    } catch (err) {
      alert("Server error.Could not add the review. Please try again later!");
      navigate("/")
    }
  };
  return (
    <>
      <Modal show={show} onHide={onClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Review the book!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            
            style={{ width: "330px", textAlign: "left", marginTop: "2" }}
          >
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                name="review"
                value={holdReview}
                placeholder="Please enter your review here"
                onChange={(e) => setReview(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleSubmit} variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GiveReview;