import { Link } from "react-router";
import { useLocation } from "react-router";
import useAuth from "../hooks/useAuth.tsx";

export default function Header() {
  const path = useLocation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className='header-header flex m-auto'>
      <div className='header-nav-section flex p-3'>
        <img src='/icon.svg' alt='icon' className='w-10' />
      </div>
      {path.pathname === "/products" ? (
        isAuthenticated === false ? (
          <div className='flex justify-center m-auto'>
            <Link
              to='/login'
              className='text-white aling-text m-auto text-[18px]'
            >
              Login
            </Link>
          </div>
        ) : (
          <>
            <div className='flex m-auto'>
              <Link to='/profile'>Profile</Link>
              <button onClick={logout}>Logout</button>
              <Link to='/cart'>Cart</Link>
            </div>
          </>
        )
      ) : (
        ""
      )}
    </header>
  );
}
