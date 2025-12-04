import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const [friends, setFriends] = useState("");
  const navigate = useNavigate();

  /*useEffect(() => {
    const typed = new Typed("#typed-name", {
      strings: ["Welcome to Money Splitter 💰"],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1000,
      loop: true,
    });

    return () => typed.destroy();
  }, []);*/
    
  const handleNext = () => {
    if (friends === "" || friends <= 0) {
      alert("Please enter a valid number of friends!");
      return;
    }
    // Navigate to split page with state
    navigate("/split", { state: { numFriends: Number(friends) } });
  };

  return (
    <div className="homepage">
      <h1 className="homepage-title">
         Money Splitter 💰
        <span id="typed-name" className="typed"></span>
      </h1>

      <div className="input-section">
        <label htmlFor="friends" className="input-label">
          Enter number of friends:
        </label>
        <input
          id="friends"
          type="number"
          value={friends}
          onChange={(e) => setFriends(e.target.value)}
          placeholder="e.g. 3"
          className="friends-input"
        />
        <button onClick={handleNext} className="next-button">
          Next ➜
        </button>
      </div>
    </div>
  );
};

export default Homepage;
