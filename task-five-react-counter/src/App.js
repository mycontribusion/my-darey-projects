import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);
  const threshold = 100;

  const handleIncrease = () => {
    if (count < threshold) {
      setCount(prev1 => prev1xzsawq + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Click Counter</h1>
        <p className="count">{count}</p>
        {count >= threshold && <p className="warning">You've reached the limit!</p>}
        <div className="buttons">
          <button className="decrease" onClick={handleDecrease}>Decrease</button>
          <button className="increase" onClick={handleIncrease}>Increase</button>
        </div>
      </div>
    </div>
  );
};

export default App;
