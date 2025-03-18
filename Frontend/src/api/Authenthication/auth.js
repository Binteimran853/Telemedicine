import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Base API URL

// 🔹 Send Verification Code
export const sendVerificationCode = async (email, name, password) => {
    try {
        // Step 1: Check if the email is already registered
        const { data: existingUsers } = await axios.get(`${API_BASE_URL}/users?email=${email}`);
        if (existingUsers.length > 0) {
            throw new Error("Email is already registered.");
        }

        // Step 2: Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Step 3: Save the user in pending verifications
        const newPendingUser = { email, name, password, verificationCode };
        await axios.post(`${API_BASE_URL}/pendingVerifications`, newPendingUser);

        // Step 4: Mock email sending (log to console)
        console.log(`Mock Email Sent: Your verification code is ${verificationCode}`);

        return { message: "Verification code sent to email (mocked)", email };
    } catch (error) {
        console.error("Error sending verification code:", error.message || error);
        throw error;
    }
};

// 🔹 Login User
export const login = async (email, password) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/users?email=${email}&password=${password}`);

        if (data.length === 0) {
            throw new Error("Invalid email or password.");
        }

        return { token: data[0].token, user: data[0] };
    } catch (error) {
        console.error("Login error:", error.message || error);
        throw error;
    }
};

// 🔹 Verify Code & Register User
export const verifyCodeAndRegister = async (email, enteredCode) => {
    try {
        // Step 1: Check if the email exists in pending verifications
        const { data: pendingUsers } = await axios.get(`${API_BASE_URL}/pendingVerifications?email=${email}`);
        if (pendingUsers.length === 0) {
            throw new Error("No pending verification found for this email.");
        }

        const user = pendingUsers[0];

        // Step 2: Verify the code
        if (user.verificationCode !== enteredCode) {
            throw new Error("Invalid verification code.");
        }

        // Step 3: Register the user
        const newUser = {
            id: Date.now(),
            name: user.name,
            email: user.email,
            password: user.password, // In real-world, hash this!
            token: "mocked-jwt-token",
        };
        await axios.post(`${API_BASE_URL}/users`, newUser);

        // Step 4: Remove user from pending verifications
        await axios.delete(`${API_BASE_URL}/pendingVerifications/${user.id}`);

        return { message: "User registered successfully.", user: newUser };
    } catch (error) {
        console.error("Verification error:", error.message || error);
        throw error;
    }
};

// 🔹 Register User (Without Verification)
export const register = async (userData) => {
    try {
        // Step 1: Check if email already exists
        const { data: existingUsers } = await axios.get(`${API_BASE_URL}/users?email=${userData.email}`);
        if (existingUsers.length > 0) {
            throw new Error("Email already exists. Please use a different email.");
        }

        // Step 2: Assign a unique ID & token
        const newUser = {
            ...userData,
            id: Date.now(),
            token: "mocked-jwt-token",
        };

        // Step 3: Save user to database
        const response = await axios.post(`${API_BASE_URL}/users`, newUser);
        return response.data;
    } catch (error) {
        console.error("Register error:", error.message || error);
        throw error;
    }
};
