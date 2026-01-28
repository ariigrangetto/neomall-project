import { Link } from "react-router";
import { useUrl } from "../Hooks/useUrl.tsx";
import SearchProducts from "./SearchProducts.tsx";
import Pagination from "./Pagination.tsx";
import Header from "./Header.tsx";
import "./ListOfProducts.css";
import useCartActions from "../hooks/cartActions.tsx";
import useAuth from "../hooks/useAuth.tsx";
import { MousePointerClick } from "lucide-react";

export default function ListOfProducts() {
  const { cart, addProduct } = useCartActions();
  const { isAuthenticated } = useAuth();
  const {
    handleChangePage,
    totalPages,
    handleUpdateInputSearch,
    totalResult,
    setFilters,
    loading,
    currentPage,
  } = useUrl();

  const findItem = (id: number | string) => {
    const findedProduct = cart.some((item) => item?.product_id === id);
    let text = findedProduct ? "Agregado al carrito" : "Agregar al carrito";
    let className = findedProduct ? "btn-added" : "btn-add";
    return { text, className };
  };

  return (
    <>
      <Header />

      <SearchProducts
        setFilter={setFilters}
        onChangeInputValue={handleUpdateInputSearch}
      />
      {loading ? (
        <p>Loading filtered products</p>
      ) : totalResult?.length > 0 ? (
        <>
          <ul className='ul-products'>
            {totalResult.map((product) => (
              <li key={product.id} className='li-products'>
                <img src={product.image} alt={product.title} />
                <div className='description'>
                  <h2>{product.title}</h2>
                  <h3>{product.category}</h3>
                  <strong>${product.price}</strong>
                  <p>{product.description}</p>
                  {isAuthenticated ? (
                    <button
                      onClick={() => addProduct(product.id)}
                      className={findItem(product.id).className}
                    >
                      {findItem(product.id).text}
                      <MousePointerClick />
                    </button>
                  ) : (
                    <Link to='/login' className='btn-link'>
                      <div className='btn-link-text'>
                        <p>Agregar al carrito</p>
                        <i>
                          <MousePointerClick size={22} />
                        </i>
                      </div>
                    </Link>
                  )}
                </div>

                <Link to={`/products/details/${product.id}`}>Ver detalle</Link>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handleChangePage}
          />
        </>
      ) : (
        <h1 className='search-not-found'>Not search found, try again!</h1>
      )}
    </>
  );
}
