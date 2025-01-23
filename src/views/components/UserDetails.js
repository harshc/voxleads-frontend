// File: UserDetails.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState(""); // Optionally pre-filled after login
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
        // Save client details
        const clientData = { name, company, phone, email };
        // const response = await axios.post("http://localhost:8000/", clientData); // Backend API
        // console.log("Client created:", response.data);

        // Redirect to Stripe Checkout or handle in-page payment
        //navigate("/payment", { state: { clientId: response.data.id } });
        } catch (error) {
        //  console.error("Error creating client:", error.response.data);
        }
};

return (
    <form onSubmit={handleFormSubmit}>
        <h2>Enter Your Details</h2>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Company:</label>
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Proceed to Payment</button>
    </form>
    );
};

export default UserDetails;
