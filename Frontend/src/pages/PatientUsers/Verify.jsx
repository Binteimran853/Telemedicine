import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyCodeAndRegister } from "../../api/Authenthication/auth";

const Verify = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleVerification = async (e) => {
        e.preventDefault();
        try {
            console.log("Verifying code for:", email);
            await verifyCodeAndRegister(email, code);
            console.log("Verification successful!");
            alert("Account verified successfully. You can now log in.");
            navigate("/patient-login");
        } catch (error) {
            console.error("Verification failed:", error);
            alert(error.message || "Verification failed");
        }
    };

    return (
        <div className="auth-container">
            <h2 className="headingh2">Verify Email</h2>
            <form onSubmit={handleVerification}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    name="code"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <button type="submit">Verify</button>
            </form>
        </div>
    );
};

export default Verify;
