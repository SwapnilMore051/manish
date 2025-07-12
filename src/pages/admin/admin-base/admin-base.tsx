import { Outlet } from "react-router-dom";
import AdminHeader from "../admin-header/admin-header";
import './admin-base.scss';

const AdminBase = () => {
    return (
        <div className="admin-container">
            <AdminHeader />
            <div className="admin-outlet">
                <Outlet />  {/* This is the right way */}
            </div>
        </div>
    );
}

export default AdminBase;
