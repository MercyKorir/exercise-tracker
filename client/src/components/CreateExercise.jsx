import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CreateExercise = () => {
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exercise = {
      username: formData.username,
      description: formData.description,
      duration: formData.duration,
      date: formData.date,
    };
    try {
      const response = await axios.post(
        "http://localhost:5050/exercise/add",
        exercise,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        alert("Exercise created successfully");
        setFormData({
          ...formData,
          username: "",
          description: "",
          duration: 0,
          date: new Date(),
        });
      } else {
        alert("Error creating exercise");
      }
    } catch (err) {
      console.error("Error creating exercise: ", err);
      alert("Error creating exercise");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5050/user/", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          if (response.data.length === 0) {
            alert("No users found. Please create a user first.");
            window.location = "/user";
          } else {
            setFormData({
              ...formData,
              users: response.data.map((user) => user.username),
              username: response.data[0].username,
            });
          }
        }
      } catch (err) {
        console.error("Error fetching users: ", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <select
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            autoComplete="username"
            required
          >
            {formData.users.map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <div>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              id="date"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Exercise Log
        </button>
      </form>
    </div>
  );
};

export default CreateExercise;
