import { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // State to store user data and role
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    // Check if user is already logged in (from localStorage)
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setRole(parsedUser.role || "user"); // Default role if not provided
        }
    }, []);

    // Function to handle login
    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData)); // Save user in localStorage
        setUser(userData); // Update user in context
        setRole(userData.role || "user"); // Ensure role is stored
    
        console.log("User saved in context:", userData); // Debugging
    };
    

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem("user"); // Remove user from storage
        setUser(null); // Clear context state
        setRole(null); // Clear role
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
