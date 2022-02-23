import Container from "react-bootstrap/Container";

import CartComponent from "../../components/CartComponent";
import "./cart-main.css";

const Cart = () => {
  return (
    <Container className="cart-container">
      <CartComponent />
    </Container>
  );
};

export default Cart;
