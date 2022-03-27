import { useState, React } from "react";
import Form from "react-bootstrap/Form";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function ReviewModal({
  buttonActionText = "",
  heading,
  desc,
  onClose,
  show,
  onActionClick,
  showActionButton,
}) {
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("", {
          email: review,
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
            onSubmit={handleSubmit}
            style={{ width: "330px", textAlign: "left", marginTop: "2" }}
          >
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                name="review"
                value={review}
                placeholder="Please enter your review here"
                onChange={(e) => setReview(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReviewModal;