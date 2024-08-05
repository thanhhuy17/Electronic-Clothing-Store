import ReactDOM from "react-dom/client";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routing.tsx";

//Setup axios
axios.defaults.baseURL = "https://fakestoreapi.com"; // base url

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
