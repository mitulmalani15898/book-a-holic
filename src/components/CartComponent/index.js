/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * Wrapper for cart books and cart order summary
 */
import CartBooks from "./CartBooks";
import CartOrderSummary from "./CartOrderSummary";
import "./cart.css";

const CartComponent = () => {
  return (
    <div className="cart-main-wrapper">
      <CartBooks />
      <CartOrderSummary />
    </div>
  );
};

export default CartComponent;
