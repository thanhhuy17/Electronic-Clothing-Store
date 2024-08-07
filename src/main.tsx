import ReactDOM from "react-dom/client";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routing.tsx";

//Setup axios 1
// export const API_Products = axios.defaults.baseURL = "https://fakestoreapi.com"; // base url
export const API_Products = axios.create({
  baseURL: "https://fakestoreapi.com",
});

//Setup axios 2
// export const API_Authenticated = (axios.defaults.baseURL = "http://localhost:8000"); // base url

export const API_Authenticated = axios.create({
  baseURL: "http://localhost:8000",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
