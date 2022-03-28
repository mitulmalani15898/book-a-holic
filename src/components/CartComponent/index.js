// Author: Mitul Pravinbhai Malani (B00869519)
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
