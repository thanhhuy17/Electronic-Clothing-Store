import { Outlet } from "react-router-dom";
import Footer from "./components/Products/Footer";
import Header from "./components/Products/Header";

function App() {
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
