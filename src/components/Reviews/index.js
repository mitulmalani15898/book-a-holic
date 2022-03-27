import { React, useState } from "react";
import ReviewModal from "./GiveReview";

function Dummy() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleReviewModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleReview = (e) => {
    e.preventDefault();
    // setModalVisible(true)
  };

  return (
    <div>
      <div onClick={toggleReviewModal}>click me!</div>
      <ReviewModal onClose={toggleReviewModal} show={modalVisible} />
      {/* <Button variant="primary" onClick={handleReview}>
        Hi
      </Button> */}
    </div>
  );
}

export default Dummy;