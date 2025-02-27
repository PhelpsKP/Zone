import React from "react";
import { useDrag, useDrop } from "react-dnd";

const Slot = ({ index, team, handleDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TEAM",
    drop: (item) => {
      handleDrop(item, index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TEAM",
    item: team ? { ...team, fromIndex: index } : null, // ✅ Ensure item is not null
    canDrag: !!team, // ✅ Prevents dragging when there's no team
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="ranking-slot"
      style={{
        backgroundColor: isOver ? "lightgray" : "#222",
        borderColor: isOver ? "yellow" : "white",
      }}
    >
      <span>#{index + 1}</span>
      {team ? (
        <div
          ref={drag} // ✅ Make the team draggable
          style={{
            cursor: "grab",
            opacity: isDragging ? 0.5 : 1,
          }}
        >
          <img src={team.logo} alt={team.name} />
        </div>
      ) : (
        <p>Drop Here</p>
      )}
    </div>
  );
};

export default Slot;