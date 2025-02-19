import React from "react";
import { useDrag } from "react-dnd";

const Logos = ({ team }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TEAM",
    item: team,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      <img src={team.logo} alt={team.name} />
    </div>
  );
};

export default Logos;