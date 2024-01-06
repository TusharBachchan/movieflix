import React from 'react'
import '../../App.css'
const Shimmer = () => {
  return (
    <div className="shimmer__container">
      {Array(20)
        .fill("")
        .map((item, index) => (
          <div className="shimmer__card" key={index}>Loading...</div>
        ))}
    </div>
  );
}

export default Shimmer