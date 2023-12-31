import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Guest from "./pages/Guest";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "@fontsource/inter"; // Defaults to weight 400

function App() {
  return (
    <BrowserRouter>
      <Guest />
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
    </BrowserRouter>
  );
}

export default App;
