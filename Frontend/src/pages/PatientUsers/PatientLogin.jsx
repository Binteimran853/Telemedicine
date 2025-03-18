import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from "../../api/Authenthication/auth.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import AuthForm from "../../components/Authenthication/AuthForm.jsx"; // Import AuthForm

const Login = () => {
    const { login: saveUser } = useContext(AuthContext); // Get login function from context
    const navigate = useNavigate(); // Initialize navigate function

    const handleLogin = async (formData) => {
        try {
            const response = await login(formData.email, formData.password);
            saveUser(response.user); // Store user in context
            navigate("/"); // Redirect to home page on success
        } catch (err) {
            console.error("Login error:", err.message);
        }
    };

    return (
        <div>
            <AuthForm isLogin={true} onSubmit={handleLogin} />
        </div>
    );
};

export default Login;
