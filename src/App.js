import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/footer/Footer";
import NavCase from "./components/Header/nav/navCase";
import Main from "./components/main/Main";
function App() {
  let flag = true;
  if (
    window.location.pathname === "/signup" ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/" ||
    window.location.pathname === ""
  ) {
    flag = true;
  }
  return (
    <div className="App">
      <Header flag={flag} />
      <Main />
      <Footer />
    </div>
  );
}
export default App;
