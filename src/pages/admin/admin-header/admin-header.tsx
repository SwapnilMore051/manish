import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="profile" onClick={() => navigate("/")}>
                <img src="/assets/logo.jpg" alt="Logo" width={30} />
                <div className="artist-name">Manish More</div>
                <div className="artist-title">
                    Foley Artist / Assistant recordist / Boom Operator
                </div>
            </div>
            <div>Admin Panel</div>
            <div>
                <img src="/assets/icons/logout.svg" alt="" />
                <div>Logout</div>
            </div>
        </div>
    );
}

export default AdminHeader;
