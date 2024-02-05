import "./App.css";
import { HashRouter } from "react-router-dom";
import Guest from "./pages/Guest";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./providers/authProvider";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "@fontsource/inter"; // Defaults to weight 400
import Seller from "./pages/Seller";
import Renter from "./pages/Renter";

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <HashRouter>
      {authUser ? authUser.role === "1" ? <Renter /> : <Seller /> : <Guest />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop={true}
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable
        style={{ textAlign: "left" }}
      />
    </HashRouter>
  );
}

export default App;
