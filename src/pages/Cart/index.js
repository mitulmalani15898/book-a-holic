/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * This component works as a wrapper for Cart page
 */
import Container from "react-bootstrap/Container";

import CartComponent from "../../components/CartComponent";

const Cart = () => {
  return (
    <Container className="cart-container">
      <CartComponent />
    </Container>
  );
};

export default Cart;
