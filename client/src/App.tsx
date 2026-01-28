import { Routes, Route } from "react-router";
import Loading from "./pages/Loading.tsx";
import Home from "./pages/Home.tsx";
import { lazy, Suspense } from "react";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ProtectedPath from "./components/ProtectedPath.tsx";
import Profile from "./pages/Profile.tsx";

const Details = lazy(() => import("./pages/Details.tsx"));
const NotFound = lazy(() => import("./pages/404.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const Products = lazy(() => import("./pages/Products.tsx"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/products' element={<Products />} />
          <Route path='/products/details/:id' element={<Details />} />
          <Route element={<ProtectedPath />}>
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
