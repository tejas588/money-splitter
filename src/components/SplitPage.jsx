import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./SplitPage.css";

const SplitPage = () => {
  const location = useLocation();
  const numFriends = location.state?.numFriends || 0;

  const [friends, setFriends] = useState(
    Array.from({ length: numFriends }, (_, i) => ({ name: "", paid: "" }))
  );
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newFriends = [...friends];
    newFriends[index][field] = field === "paid" ? Number(value) : value;
    setFriends(newFriends);
  };

  const calculateSplit = () => {
    const total = friends.reduce((sum, f) => sum + (f.paid || 0), 0);
    const equalShare = total / numFriends;

    const owes = friends.map(f => ({
      name: f.name,
      balance: (f.paid || 0) - equalShare
    }));

    const payments = [];

    let creditors = owes.filter(f => f.balance > 0);
    let debtors = owes.filter(f => f.balance < 0);

    creditors = creditors.map(c => ({ ...c }));
    debtors = debtors.map(d => ({ ...d }));

    debtors.forEach(d => {
      let debt = -d.balance;
      while (debt > 0 && creditors.length) {
        const c = creditors[0];
        const pay = Math.min(c.balance, debt);
        payments.push(`${d.name} pays ${c.name} ₹${pay.toFixed(2)}`);
        c.balance -= pay;
        debt -= pay;
        if (c.balance <= 0) creditors.shift();
      }
    });

    setResults(payments);
  };

  return (
    <div className="split-page">
      <h2>Enter Names and Amounts Paid</h2>
      <div className="friends-inputs">
        {friends.map((f, i) => (
          <div key={i} className="friend-row">
            <input
              type="text"
              placeholder={`Friend ${i + 1} Name`}
              value={f.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
              className="friend-name"
            />
            <input
              type="number"
              placeholder="Amount Paid"
              value={f.paid}
              onChange={(e) => handleChange(i, "paid", e.target.value)}
              className="friend-paid"
            />
          </div>
        ))}
      </div>
      <button onClick={calculateSplit} className="calculate-button">
        Calculate Split
      </button>

      {results.length > 0 && (
        <div className="results">
          <h3>Payments to Make:</h3>
          <ul>
            {results.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SplitPage;
