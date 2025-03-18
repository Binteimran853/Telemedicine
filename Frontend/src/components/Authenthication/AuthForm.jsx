import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css"

const AuthForm = ({ isLogin, isVerification, onSubmit }) => {
    const [formData, setFormData] = useState({ email: "", password: "", name: "", code: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="auth-container">
            <h2 className="headingh2">{isLogin ? "Login" : isVerification ? "Verify Email" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && !isVerification && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {!isVerification ? (
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                ) : (
                    <input
                        type="text"
                        name="code"
                        placeholder="Verification Code"
                        value={formData.code}
                        onChange={handleChange}
                        required
                    />
                )}
                <button type="submit">
                    {isLogin ? "Login" : isVerification ? "Verify" : "Register"}
                </button>
            </form>
            <p>
                {isLogin ? "Don't have an account?" : isVerification ? "" : "Already have an account?"}{" "}
                {!isVerification && (
                    <span onClick={() => navigate(isLogin ? "/patient-register" : "/patient-login")}>
                        {isLogin ? "Register" : "Login"}
                    </span>
                )}
            </p>
        </div>
    );
};

export default AuthForm;
