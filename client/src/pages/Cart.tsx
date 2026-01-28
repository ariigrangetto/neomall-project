import { Link } from "react-router";
import { Helmet } from "react-helmet";
import useCartActions from "../hooks/cartActions.tsx";

export default function Cart() {
  const { cart, addProduct, decrementQuantity, deleteProductFromCart } =
    useCartActions();

  console.log(cart);

  return (
    <>
      <Helmet>
        <title>NeoMall cart</title>
      </Helmet>
      <h1>Aqui va el carrito</h1>
      <Link to='/products'>Return to products</Link>

      {cart.length > 0 ? (
        <ul>
          {cart.map((cart) => (
            <>
              <li key={cart.product_id}>
                <img src={cart.image} alt={cart.title} />
                <h2>
                  {cart.title} {cart.category}
                </h2>
                <strong>{cart.price}</strong>
                <p>{cart.description}</p>
                <p>{cart.quantity}</p>
                <Link to={`/products/details/${cart.product_id}`}>
                  Ver detalle
                </Link>
                <button onClick={() => addProduct(cart.product_id)}>+</button>
                <button onClick={() => decrementQuantity(cart.product_id)}>
                  -
                </button>
                <button onClick={() => deleteProductFromCart(cart.product_id)}>
                  Remove from cart
                </button>
              </li>
            </>
          ))}
        </ul>
      ) : (
        <h1>No cuenta con productos en el carrito aún</h1>
      )}
    </>
  );
}
