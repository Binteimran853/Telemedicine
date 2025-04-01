import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { doctorLogin } from "../../api/Authenthication/doctorAuth";
import { AuthContext } from "../../context/AuthContext.jsx";
import DoctorAuthForm from "../../components/Authenthication/DoctorAuthForm.jsx";

const DoctorLogin = () => {
    const { login: saveUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        try {
            const response = await doctorLogin(formData.email, formData.password);
    
            // Ensure role is stored correctly
            const doctorData = { ...response.user, role: "doctor" };
            saveUser(doctorData);
    
            // Redirect to specific doctor's profile using ID
            navigate(`/doctor/${response.user.id}`);
        } catch (err) {
            alert(err.message || "Login failed.");
        }
    };
    

    return (
        <div>
            <DoctorAuthForm isLogin={true} onSubmit={handleLogin} />
        </div>
    );
};

export default DoctorLogin;
