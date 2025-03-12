import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';

/**
 * Logos Component - Represents a team in the available teams pool for NFL Power Rankings
 * 
 * This component renders a draggable team logo from the unranked teams pool.
 * It supports both drag-and-drop and click-to-place functionality to allow
 * users to add teams to their power rankings.
 * 
 * @param {object} team - The NFL team object containing id, name, and logo
 * @param {function} resetDroppedTeam - Callback to handle failed drag operations
 * @param {function} onLogoClick - Callback for click-to-place functionality
 */
const Logos = ({ team, resetDroppedTeam, onLogoClick }) => {
  // Configure drag behavior for team logos in the pool
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "TEAM",
    item: { ...team },
    end: (item, monitor) => {
      // If dropped outside a valid ranking slot, ensure team stays in the pool
      if (!monitor.didDrop()) {
        resetDroppedTeam(item);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Use empty image as drag preview to allow the CustomDragLayer component
  // to render a more interactive and visually appealing drag preview
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // Handle click events for the click-to-place functionality
  // This selects the team for placement in a ranking slot
  const handleClick = () => {
    onLogoClick(team);
  };

  return (
    <div
      ref={drag}
      onClick={handleClick}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: "grab",
        transition: "transform 0.2s",
        transform: isDragging ? 'scale(0.9)' : 'scale(1)',
      }}
    >
      <img src={team.logo} alt={team.name} />
    </div>
  );
};

export default Logos;