import { sendVerificationCode } from "../../api/Authenthication/auth";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/Authenthication/PatientAuthForm";

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        try {
            console.log("Attempting register with:", formData);
            await sendVerificationCode(formData.email, formData.name, formData.password);
            console.log("Verification code sent!");
            alert("Verification code sent to your email. Please verify.");
            navigate("/verify");  // Redirect to verification page
        } catch (error) {
            console.error("Registration failed:", error);
            alert(error.message || "Registration failed");
        }
    };

    return <AuthForm isLogin={false} onSubmit={handleRegister} />;
};

export default Register;
