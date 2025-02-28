import React, { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';

const Logos = ({ team, resetDroppedTeam }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "TEAM",
    item: { ...team },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        resetDroppedTeam(item); // If dropped outside, return team to pool
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Use empty image as preview
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1, // Hide original when dragging
        cursor: "grab",
        transition: "transform 0.2s", // Animation for the bounce effect
        transform: isDragging ? 'scale(0.9)' : 'scale(1)', 
      }}
    >
      <img src={team.logo} alt={team.name} />
    </div>
  );
};

export default Logos;