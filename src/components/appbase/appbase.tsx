import { Outlet } from "react-router-dom";
import Appheader from "../appheader/appheader";
import './app-base.scss';

const Appbase = () => {
    return (
        <div className="app-container">
            <Appheader />
            <div className="outlet-wrapper">
                <Outlet />
            </div>
        </div>
    );
};
export default Appbase;
