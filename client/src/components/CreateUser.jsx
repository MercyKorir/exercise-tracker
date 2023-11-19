import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: formData.username,
    };

    try {
      const response = await axios.post(
        "http://localhost:5050/user/signup",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("User created successfully");
        setFormData({
          username: "",
        });
      } else {
        alert("Error creating user");
      }
    } catch (err) {
      console.error("Error creating user: ", err);
      alert("Error creating user");
    }
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
