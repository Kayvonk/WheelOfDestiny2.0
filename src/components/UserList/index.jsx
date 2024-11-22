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

  // State for managing the users (each user has a name and a hidden flag)
  const [users, setUsers] = useState(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    return storedUsers || parentNamesArray.length
      ? parentNamesArray.map((name) => ({ name, hidden: false }))
      : defaultNamesArray.map((name) => ({ name, hidden: false }));
  });

  // Save to localStorage and notify the parent component whenever users change
  useEffect(() => {
    const namesArray = users.map((user) => user.name);
    localStorage.setItem("users", JSON.stringify(users));
    onNamesArrayChange(namesArray);
  }, [users, onNamesArrayChange]);

  // Handle input change
  const handleInputChange = (index, newValue) => {
    const updatedUsers = [...users];
    updatedUsers[index].name = newValue;
    setUsers(updatedUsers);
  };

  // Add a new user
  const addUser = () => {
    setUsers([...users, { name: "", hidden: false }]);
  };

  // Remove a user by index
  const removeUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  // Clear the users array
  const clearUsersArray = () => {
    setUsers([]);
  };

  // Toggle hidden status of a user
  const toggleHideUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].hidden = !updatedUsers[index].hidden;
    setUsers(updatedUsers);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>

      {/* Render inputs for each user */}
      {users.map((user, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          {!user.hidden ? (
            <>
              <input
                type="text"
                value={user.name}
                onChange={(e) => handleInputChange(index, e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <button
                onClick={() => removeUser(index)}
                style={{ marginRight: "10px" }}
              >
                Remove
              </button>
              <button onClick={() => toggleHideUser(index)}>Hide</button>
            </>
          ) : (
            <button onClick={() => toggleHideUser(index)}>Unhide</button>
          )}
        </div>
      ))}

      {/* Add and clear buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={addUser} style={{ marginRight: "10px" }}>
          Add User
        </button>
        <button onClick={clearUsersArray}>Clear All</button>
      </div>
    </div>
  );
};

export default UserList;
