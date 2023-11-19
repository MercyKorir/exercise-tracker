import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [formData, setFormData] = useState({
    exercises: [],
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete === false) return;
    try {
      const response = await axios.delete(
        `http://localhost:5050/exercise/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Exercise deleted successfully");
        window.location.reload();
      } else {
        alert("Error deleting exercise");
        console.error("Error deleting exercise");
      }
    } catch (err) {
      console.error("Error deleting exercise", err);
      alert("Error deleting exercise");
    }
  };

  useEffect(() => {
    const getExercises = async () => {
      try {
        const response = await axios.get("http://localhost:5050/exercise/", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          if (response.data.length === 0) {
            alert("No exercises found");
            window.location.href = "/create";
          }
          setFormData((prevState) => ({
            ...prevState,
            exercises: response.data,
          }));
        }
      } catch (err) {
        console.error("Error getting exercises", err);
      }
    };

    getExercises();
  }, []);

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.exercises.map((exercise) => (
            <tr key={exercise._id}>
              <td>{exercise.username}</td>
              <td>{exercise.description}</td>
              <td>{exercise.duration}</td>
              <td>{exercise.date.substring(0, 10)}</td>
              <td>
                <Link to={`/edit/${exercise._id}`}>edit</Link> |{" "}
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(exercise._id);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
