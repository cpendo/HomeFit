import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="h-screen w-screen max-w-full overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
