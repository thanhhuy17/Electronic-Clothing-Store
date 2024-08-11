import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import ProductDetailPage from "../Pages/ProductDetailPage";
import Login from "../components/Users/Login";
import Register from "../components/Users/Register";
import PageNotFound from "../components/Products/PageNotFound";
import WelcomeMyStore from "../components/Products/WelcomeMyStore";
import ShowUsers from "../components/Users/ShowUsers";
import ShowProductsCart from "../components/Products/ShowProductsCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <WelcomeMyStore />,
      },

      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/users",
        element: <ShowUsers />,
      },
      {
        path: "/cart",
        element: <ShowProductsCart />,
      },
    ],
  },
]);
export default router;
