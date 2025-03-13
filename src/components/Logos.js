import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';

/**
 * Logos Component - Represents a team in the available teams pool for NFL Power Rankings
 * 
 * This component renders a draggable team logo from the unranked teams pool.
 * It supports both drag-and-drop and click-to-place functionality to allow
 * users to add teams to their power rankings.
 * It also implements a push-away effect when other logos are dragged over it.
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

  // Add drop behavior to detect when other logos are being dragged over this one
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TEAM",
    // We don't actually want to handle drops here, just detect hover
    drop: () => ({}),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
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

  // Combine drag and drop refs to handle both behaviors
  const combinedRef = (element) => {
    drag(element);
    drop(element);
  };

  return (
    <div
      ref={combinedRef}
      onClick={handleClick}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: "grab",
        transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transform: isDragging 
          ? 'scale(0.9)' 
          : isOver 
            ? 'scale(0.85) translateY(10px)' 
            : 'scale(1)',
        position: 'relative',
        zIndex: isOver ? '5' : '1',
      }}
    >
      <img src={team.logo} alt={team.name} />
    </div>
  );
};

export default Logos;