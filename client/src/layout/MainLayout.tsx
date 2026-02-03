import { Outlet } from "react-router";
import Header from "../components/Header";
import SearchProducts from "../components/SearchProducts";
export function MainLayout() {
  return (
    <>
      <Header />
      <SearchProducts />
      <main>
        <Outlet />
      </main>
    </>
  );
}
