import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext.tsx";
import { FilterProvider } from "./context/FilterContext.tsx";
import { PaginationProvider } from "./context/PaginationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <FilterProvider>
        <PaginationProvider>
          <App />
        </PaginationProvider>
      </FilterProvider>
    </AuthProvider>
  </BrowserRouter>,
);
