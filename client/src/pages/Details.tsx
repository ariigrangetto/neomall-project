import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Product } from "../utils/types.d.ts";
import { Helmet } from "react-helmet";
import { getProductById } from "../api/product.js";
import useCartActions from "../hooks/cartActions.tsx";

export default function Details() {
  let params = useParams();
  const { cart, addProduct } = useCartActions();

  const [product, setProduct] = useState<Product | null>(null);

  const { id } = params;

  //TODO: termina de corregir la peticion del producto por su id
  // terminar de mostrar los productos en carrito y agregar las funcionalidades
  // de agregar o decrementar la cantidad del producto pedido
  //terminar con los estilos para todas las paginas

  useEffect(() => {
    async function getProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data.data);
      } catch (e) {
        console.error("Error fetching", e);
      }
    }

    getProduct();
  }, [id]);

  const title = `${product?.title} details`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <header>
        <Link to='/products'>Return to products</Link>
      </header>
      <h1>Detalle del producto:</h1>

      <div>
        <img src={product?.image} alt={product?.title} />
        <h1>{product?.title}</h1>
        <h2>{product?.brand}</h2>
        <p>Description: {product?.description}</p>
        <p>
          Price: {product?.price} Discount: {product?.discountPercentage}
        </p>
        <p>{product?.stock}</p>
        <p>{product?.warrantyInformation}</p>
        <p>{product?.shippingInformation}</p>
        <p>{product?.availabilityStatus}</p>
      </div>

      <button onClick={() => addProduct(product?.id)}>
        {cart.some((item) => item.id === Number(params.id))
          ? "Agregado al carrito"
          : "Agregar al carrito"}
      </button>

      <div className='reviews'>
        {product?.comments.map((comment, i) => (
          <div key={i}>
            <h4>
              {comment.reviewerName} {comment.rating}
            </h4>
            <p>{comment.reviewerEmail}</p>
            <p>{new Date(comment.date).toLocaleDateString()}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}
