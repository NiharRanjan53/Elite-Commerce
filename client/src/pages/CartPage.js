import Layout from "../components/Layout/Layout";
import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  // Total Price

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  // delete items
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-4">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h4 className="text-center bg-light p-2 mb-4">Cart Items</h4>
            {cart?.map((p) => (
              <div className="row mt-2 mb-4 p-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description}</p>
                  <h5>₹ {p.price}</h5>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center ">
            <h4 className="bg-light p-2 mb-4">Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : ₹ {totalPrice()} </h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
