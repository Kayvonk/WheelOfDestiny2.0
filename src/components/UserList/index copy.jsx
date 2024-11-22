import React, { useState, useEffect } from "react";

const UserList = ({ namesArray: parentNamesArray, onNamesArrayChange }) => {
  // Default names array
  const defaultNamesArray = [
    "Mario Mario",
    "Luigi Mario",
    "Link Hyrule",
    "Zelda Hyrule",
    "Cloud Strife",
  ];

  // State for managing the names array
  const [namesArray, setNamesArray] = useState(() => {
    return parentNamesArray.length
      ? parentNamesArray
      : JSON.parse(localStorage.getItem("namesArray")) || defaultNamesArray;
  });

  // State for tracking hidden users
  const [hiddenUsers, setHiddenUsers] = useState(
    JSON.parse(localStorage.getItem("hiddenUsers")) || []
  );

  // Save namesArray and hiddenUsers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("namesArray", JSON.stringify(namesArray));
    localStorage.setItem("hiddenUsers", JSON.stringify(hiddenUsers));
    onNamesArrayChange(namesArray);
  }, [namesArray, hiddenUsers, onNamesArrayChange]);

  // Handle input change
  const handleInputChange = (index, newValue) => {
    const updatedNames = [...namesArray];
    updatedNames[index] = newValue;
    setNamesArray(updatedNames);
  };

  // Add a new user
  const addUser = () => {
    setNamesArray([...namesArray, ""]);
  };

  // Remove a user by index
  const removeUser = (index) => {
    const updatedNames = namesArray.filter((_, i) => i !== index);
    setNamesArray(updatedNames);
  };

  // Clear the names array
  const clearNamesArray = () => {
    setNamesArray([]);
    setHiddenUsers([]);
  };

  // Hide a user
  const hideUser = (index) => {
    const userToHide = namesArray[index];
    const updatedNames = namesArray.filter((_, i) => i !== index);
    setNamesArray(updatedNames);
    setHiddenUsers([...hiddenUsers, userToHide]);
  };

  // Unhide a user
  const unhideUser = (user) => {
    const updatedHiddenUsers = hiddenUsers.filter((hidden) => hidden !== user);
    setHiddenUsers(updatedHiddenUsers);
    setNamesArray([...namesArray, user]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>

      {/* Render inputs for each user */}
      {namesArray.map((name, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={name}
            onChange={(e) => handleInputChange(index, e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <button onClick={() => removeUser(index)} style={{ marginRight: "10px" }}>
            Remove
          </button>
          <button onClick={() => hideUser(index)}>Hide</button>
        </div>
      ))}

      {/* Hidden Users Section */}
      {hiddenUsers.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Hidden Users</h3>
          {hiddenUsers.map((user, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <span style={{ marginRight: "10px" }}>{user}</span>
              <button onClick={() => unhideUser(user)}>Unhide</button>
            </div>
          ))}
        </div>
      )}

      {/* Add and clear buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={addUser} style={{ marginRight: "10px" }}>
          Add User
        </button>
        <button onClick={clearNamesArray}>Clear All</button>
      </div>
    </div>
  );
};

export default UserList;
