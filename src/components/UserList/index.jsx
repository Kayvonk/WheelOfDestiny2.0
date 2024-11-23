import { useState, useEffect } from "react";
import "./style.css";

const UserList = ({ namesArray: parentNamesArray, onNamesArrayChange }) => {
  const defaultNamesArray = [
    "Mario Mario",
    "Luigi Mario",
    "Link Hyrule",
    "Zelda Hyrule",
    "Cloud Strife",
  ];

  const [namesArray, setNamesArray] = useState(() => {
    return parentNamesArray.length
      ? parentNamesArray
      : JSON.parse(localStorage.getItem("namesArray")) || defaultNamesArray;
  });

  const [hiddenUsers, setHiddenUsers] = useState(
    JSON.parse(localStorage.getItem("hiddenUsers")) || []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("namesArray", JSON.stringify(namesArray));
    localStorage.setItem("hiddenUsers", JSON.stringify(hiddenUsers));
    onNamesArrayChange(namesArray);
  }, [namesArray, hiddenUsers, onNamesArrayChange]);

  const handleInputChange = (index, newValue) => {
    const updatedNames = [...namesArray];
    updatedNames[index] = newValue;
    setNamesArray(updatedNames);
  };

  const addUser = () => {
    setNamesArray([...namesArray, ""]);
  };

  const removeUser = (index) => {
    const updatedNames = namesArray.filter((_, i) => i !== index);
    setNamesArray(updatedNames);
  };

  const hideUser = (index) => {
    const userToHide = namesArray[index];
    const updatedNames = namesArray.filter((_, i) => i !== index);
    setNamesArray(updatedNames);
    setHiddenUsers([...hiddenUsers, userToHide]);
  };

  const unhideUser = (user) => {
    const updatedHiddenUsers = hiddenUsers.filter((hidden) => hidden !== user);
    setHiddenUsers(updatedHiddenUsers);
    setNamesArray([...namesArray, user]);
  };

  const clearNamesArray = () => {
    setNamesArray([]);
    setHiddenUsers([]);
    setIsModalOpen(false);
  };

  return (
    <div className="user-list">
      <h2>User List</h2>

      {namesArray.map((name, index) => (
        <div key={index} className="user-item">
          <input
            type="text"
            value={name}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <div className="visible-user-buttons">
            <button onClick={() => removeUser(index)} className="remove-button">
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>remove</title>
                <path
                  d="M0 0l20 20M20 0l-20 20"
                  stroke="#f2f2f2"
                  strokeWidth="3"
                />
              </svg>
            </button>
            <button onClick={() => hideUser(index)} className="hide-button">
              <svg
                width="30"
                height="25"
                viewBox="0 0 40 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>hide</title>
                <path
                  d="M20 1C10 1 2 10 2 10s8 9 18 9 18-9 18-9-8-9-18-9z"
                  fill="none"
                  stroke="#f2f2f2"
                  strokeWidth="2"
                  transform="scale(0.75) translate(5, 2.5)"
                />
                <circle
                  cx="20"
                  cy="10"
                  r="6"
                  fill="none"
                  stroke="#f2f2f2"
                  strokeWidth="2"
                  transform="scale(0.75) translate(5, 2.5)"
                />
                <line
                  x1="10"
                  y1="0"
                  x2="30"
                  y2="20"
                  stroke="#f2f2f2"
                  strokeWidth="2"
                  transform="scale(0.75) translate(5, 2.5)"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
      <div className="add-button-container">
        <button onClick={addUser} className="add-button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>add user</title>
            <path
              d="M10 3v14M3 10h14"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {hiddenUsers.length > 0 && (
        <div className="hidden-users">
          <h3>Hidden Users</h3>
          {hiddenUsers.map((user, index) => (
            <div key={index} className="hidden-user">
              {user}
              <button
                onClick={() => unhideUser(user)}
                className="unhide-button"
              >
                <svg
                  width="30"
                  height="25"
                  viewBox="0 0 40 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>unhide</title>
                  <path
                    d="M20 1C10 1 2 10 2 10s8 9 18 9 18-9 18-9-8-9-18-9z"
                    fill="none"
                    stroke="#f2f2f2"
                    strokeWidth="2"
                    transform="scale(0.75) translate(5, 2.5)"
                  />
                  <circle
                    cx="20"
                    cy="10"
                    r="6"
                    fill="none"
                    stroke="#f2f2f2"
                    strokeWidth="2"
                    transform="scale(0.75) translate(5, 2.5)"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="clear-button-container">
        <button onClick={() => setIsModalOpen(true)} className="clear-button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>clear all users</title>
            <circle
              cx="10"
              cy="10"
              r="9"
              stroke="#f2f2f2"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M4 5L17 15"
              stroke="#f2f2f2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Are you sure?</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="close-button"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Do you really want to clear all names?</p>
            </div>
            <div className="modal-footer">
              <button onClick={clearNamesArray} className="confirm-button">
                Yes
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cancel-button"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
