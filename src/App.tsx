import { Outlet } from "react-router-dom";
import Footer from "./components/Products/Footer";
import Header from "./components/Products/Header";
import { fetchProductData } from "./reducer/action";
import { useDispatch } from "react-redux";
import { setProduct } from "./reducer/productReducer";
import { useEffect } from "react";

function App() {
  // Lấy data và dispatch qua reducer , khi muốn dùng thì lấy từ Store của redux ra
  const dispatch = useDispatch();
  // When Login dispatch data
  useEffect(() => {
    fetchProductData().then((res) => dispatch(setProduct(res?.data)));
  }, []);

  return (
    <>
      <main className="pb-14 lg:pb-0">
        <Header />
        <div className="min-h-[90vh] mx-5">
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
