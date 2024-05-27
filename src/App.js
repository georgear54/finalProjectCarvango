import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from './components/footer/Footer'
import AboutPage from "./components/aboutUs/AboutPage";
function App() {
	const projectName = "Test Project"
  return (
    <div className="App">
      <Header/>
		<div className="main">
      <Routes>
        
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        {/* <Route path="/" element={<MainPage data={projectName}/>} /> */}
      </Routes>
		</div>
		<Footer/>
    </div>
  );
}
export default App;