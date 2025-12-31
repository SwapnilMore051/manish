import { useNavigate } from "react-router-dom";
import './admin-header.scss'
import LogoutModal from "./logout-modal/logout-modal";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const AdminHeader = () => {
    const [logoutModal, setLogoutModal] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const onLogoutToggle = () => setLogoutModal(true);
    const onCloseLogoutModal = () => setLogoutModal(false);

    const onLogoutClick = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-header-wrapper">
            <div className="admin-profile">
                <img src="/assets/logo.png" alt="Logo" width={30} />
                <div className="admin-name">Manish More</div>
            </div>
            <div className="admin-title">Admin Panel</div>
            <div className="admin-logout" onClick={onLogoutToggle}>
                <img src="/assets/icons/logout.svg" alt="" />
                <div className="logout">Logout</div>
            </div>

            {logoutModal &&
                <LogoutModal
                    onClose={onCloseLogoutModal}
                    onConfirmLogout={onLogoutClick}
                />
            }
        </div>
    );
}

export default AdminHeader;
