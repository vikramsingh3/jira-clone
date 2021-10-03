import React from "react";
import Card from "../Card/Card";
import "./Board.css";
import { category } from "../../data/categories";

const Board = ({ tickets }) => {
  const toDoList = tickets.filter(
    (ticket) => ticket.category === category.toDo
  );
  const inProgressList = tickets.filter(
    (ticket) => ticket.category === category.inProgress
  );
  const devCompleteList = tickets.filter(
    (ticket) => ticket.category === category.devComplete
  );
  const inQAList = tickets.filter(
    (ticket) => ticket.category === category.inQA
  );
  const doneList = tickets.filter(
    (ticket) => ticket.category === category.done
  );

  return (
    <div className="Board">
      <div className="Board__category">
        <h4 className="Board__categoryName">{category.toDo}</h4>
        {toDoList.map((ticket, index) => (
          <Card ticket={ticket} key={index} />
        ))}
      </div>
      <div className="Board__category">
        <h4 className="Board__categoryName">{category.inProgress}</h4>
        {inProgressList.map((ticket, index) => (
          <Card ticket={ticket} key={index} />
        ))}
      </div>
      <div className="Board__category">
        <h4 className="Board__categoryName">{category.devComplete}</h4>
        {devCompleteList.map((ticket, index) => (
          <Card ticket={ticket} key={index} />
        ))}
      </div>
      <div className="Board__category">
        <h4 className="Board__categoryName">{category.inQA}</h4>
        {inQAList.map((ticket, index) => (
          <Card ticket={ticket} key={index} />
        ))}
      </div>
      <div className="Board__category">
        <h4 className="Board__categoryName">{category.done}</h4>
        {doneList.map((ticket, index) => (
          <Card ticket={ticket} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Board;
