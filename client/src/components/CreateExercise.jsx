import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: formData.username,
      description: formData.description,
      duration: formData.duration,
      date: formData.date,
    };
    console.log(exercise);
    setFormData({
      ...formData,
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
    });
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      users: ["test user", "test user 2"],
      username: "test user",
    }));
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
