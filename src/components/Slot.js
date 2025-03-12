import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';

/**
 * Slot Component - Represents a ranking position in the NFL Power Rankings builder
 * 
 * This component creates both a droppable target for team logos and a draggable source
 * if a team is already placed in the slot. It works in conjunction with the Ranker 
 * component to enable both drag-and-drop and click-to-place functionality.
 * 
 * @param {number} index - The position in the power rankings (zero-based)
 * @param {object} team - The NFL team object placed in this slot (null if empty)
 * @param {function} handleDrop - Callback when a team is dropped into this ranking position
 * @param {function} removeFromRankings - Callback to return a team to the pool
 * @param {function} onSlotClick - Callback for click-to-place functionality
 * @param {boolean} isSelected - Whether this slot is currently selected for team placement
 */
const Slot = ({ index, team, handleDrop, removeFromRankings, onSlotClick, isSelected }) => {
  // Configure drop zone behavior for this ranking position
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TEAM",
    drop: (item) => {
      handleDrop(item, index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Configure drag behavior for teams already in the rankings
  // This allows reordering or removing teams from the rankings
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "TEAM",
    item: team ? { ...team, fromIndex: index } : null,
    canDrag: !!team,
    end: (item, monitor) => {
      // If drag ended outside a valid drop target, return team to the pool
      if (!monitor.didDrop() && team) {
        removeFromRankings(team, index);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [team, index, removeFromRankings]);

  // Use empty image as drag preview to allow the CustomDragLayer component
  // to render a more interactive and visually appealing drag preview
  useEffect(() => {
    if (team) {
      preview(getEmptyImage(), { captureDraggingState: true });
    }
  }, [preview, team]);

  // Handle click events for the click-to-place functionality
  // This works with the selectedTeam state in the Ranker component
  const handleClick = () => {
    onSlotClick(index);
  };

  return (
    <div
      ref={drop}
      onClick={handleClick}
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
            opacity: isDragging ? 0 : 1,
            transition: "transform 0.2s",
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