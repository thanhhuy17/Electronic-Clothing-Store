import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import ProductDetailPage from "../Pages/ProductDetailPage";
import Login from "../components/Users/Login";
import Register from "../components/Users/Register";
import PageNotFound from "../components/Products/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound/>,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ],
  },
]);
export default router
