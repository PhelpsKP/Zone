import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';

const Slot = ({ index, team, handleDrop, removeFromRankings }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TEAM",
    drop: (item) => {
      handleDrop(item, index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "TEAM",
    item: team ? { ...team, fromIndex: index } : null,
    canDrag: !!team,
    end: (item, monitor) => {
      // If the drag ended outside of a valid drop target (back to pool)
      if (!monitor.didDrop() && team) {
        removeFromRankings(team, index);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [team, index, removeFromRankings]); // Adding dependencies to ensure the drag behavior updates

  // Use empty image as preview when there's a team in the slot
  useEffect(() => {
    if (team) {
      preview(getEmptyImage(), { captureDraggingState: true });
    }
  }, [preview, team]);

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
          ref={drag}
          style={{
            cursor: "grab",
            opacity: isDragging ? 0 : 1, // Hide original when dragging
            transition: "transform 0.2s", // Animation for the bounce effect
            transform: isDragging ? 'scale(0.9)' : 'scale(1)',
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