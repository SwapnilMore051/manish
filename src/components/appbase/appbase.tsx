import Appheader from "../appheader/appheader"
// import { Outlet } from 'react-router-dom';
import './app-base.scss';
import MainPage from "../../pages/mainpage/mainpage";

const Appbase = () => {
    return (
        <div className="app-container">
            <Appheader />
            <div className="outlet-wrapper">
                <MainPage />
            </div>
        </div>
    )
}

export default Appbase