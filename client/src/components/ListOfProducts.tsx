import { Link } from "react-router";
import { useUrl } from "../hooks/useUrl.tsx";
import Pagination from "./Pagination.tsx";
import useCartActions from "../hooks/cartActions.tsx";
import useAuth from "../hooks/useAuth.tsx";
import { MousePointerClick } from "lucide-react";

export default function ListOfProducts() {
  const { cart, addProduct } = useCartActions();
  const { isAuthenticated } = useAuth();
  const { totalResult, loading } = useUrl();

  const findItem = (id: number | string) => {
    const findedProduct = cart.some((item) => item?.product_id === id);
    let text = findedProduct ? "Added to cart" : "Add to cart";
    let className = findedProduct ? "btn-added" : "flex m-auto bg-red-400";
    return { text, className };
  };

  return (
    <>
      {loading ? (
        <p>Loading filtered products</p>
      ) : totalResult?.length > 0 ? (
        <>
          <ul className='ul-products mt-20 flex flex-col min-h-screen'>
            {totalResult.map((product) => (
              <li key={product.id} className='li-products flex'>
                <img src={product.image} alt={product.title} />
                <div className='description text-white m-auto'>
                  <h2 className='font-bold text-xl'>{product.title}</h2>
                  <h3 className='text-blue-900'>{product.category}</h3>
                  <strong className='mt-4'>${product.price}</strong>
                  <p className='text-justify mt-2 '>{product.description}</p>
                  {isAuthenticated ? (
                    <button
                      onClick={() => addProduct(product.id)}
                      className={findItem(product.id).className}
                    >
                      {findItem(product.id).text}
                      <MousePointerClick />
                    </button>
                  ) : (
                    <Link
                      to='/login'
                      className='btn-link flex aling-center m-auto '
                    >
                      <div className='btn-link-text bg-blue-800 rounded-3xl justify-center py-1.25 px-3 w-45 mt-5 flex hover:bg-blue-900 hover:duration-300'>
                        <p className='flex aling-center'>Add to cart</p>
                        <i className='ml-1'>
                          <MousePointerClick size={22} />
                        </i>
                      </div>
                    </Link>
                  )}
                </div>

                <Link
                  className='w-60 text-blue-400 underline h-6  hover:text-blue-500'
                  to={`/products/details/${product.id}`}
                >
                  See details
                </Link>
              </li>
            ))}
          </ul>
          <Pagination />
        </>
      ) : (
        <h1 className='search-not-found'>Not search found, try again!</h1>
      )}
    </>
  );
}
