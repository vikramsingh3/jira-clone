import React from "react";
import "./Card.css";

const Card = ({ ticket }) => {
  const { title, type, assignedTo, epic } = ticket;
  return (
    <div className="Card">
      <div className="Card__title">{title}</div>
      <div className="Card__epic">epic : {epic}</div>
      <div className="Card__type">type : {type}</div>
      <div className="Card__user">assigned : {assignedTo}</div>
    </div>
  );
};

export default Card;
