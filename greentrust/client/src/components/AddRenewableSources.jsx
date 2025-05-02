// src/components/AddRenewableSource.jsx
import { useState } from "react";

function AddRenewableSource() {
  const [formData, setFormData] = useState({
    location: "",
    capacity: "",
    output: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/add-source`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Source added successfully!");
      } else {
        alert(data.error || "Failed to add source.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving data.");
    }
  
  };

  return (
    <div className="card">
      <h3>🖊️ Add Your Renewable Source</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Location: <input name="location" type="text" value={formData.location} onChange={handleChange} />
        </label>
        <label>
          Capacity (kW): <input name="capacity" type="number" value={formData.capacity} onChange={handleChange} />
        </label>
        <label>
          Daily Output (kWh): <input name="output" type="number" value={formData.output} onChange={handleChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddRenewableSource;
