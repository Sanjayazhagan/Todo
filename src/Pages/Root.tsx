import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
function root(){
    return <div className="h-full">
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
}
export default root;