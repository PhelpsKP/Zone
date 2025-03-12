import React from 'react';
import { useDragLayer } from 'react-dnd';

/**
 * CustomDragLayer Component
 * 
 * Creates a visual representation of the currently dragged team logo that follows the cursor.
 * This makes the user feel like they are physically moving the logo around the screen.
 * This component enhances the drag-and-drop UX by showing users what they're currently moving.
 * 
 * @returns {React.Component|null} - The drag preview layer or null when not dragging
 */
const CustomDragLayer = () => {
  // Use react-dnd's useDragLayer hook to monitor the current drag state
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    // The item being dragged (contains team data)
    item: monitor.getItem(),
    
    // Current position of the dragged item relative to the viewport
    currentOffset: monitor.getSourceClientOffset(),
    
    // Boolean indicating whether a drag operation is in progress
    isDragging: monitor.isDragging(),
  }));
  
  // Don't render anything if we're not dragging or don't have position info
  if (!isDragging || !currentOffset) {
    return null;
  }
  
  // Create the CSS transform string to position our drag preview
  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
  
  return (
    <div style={{
      position: 'fixed',      // Fixed position relative to the viewport
      pointerEvents: 'none',  // Makes the element "ghost-like" (clicks pass through)
      zIndex: 100,            // Ensures the preview appears above other elements
      left: 0,
      top: 0,
      transform: transform    // Positions the preview to follow cursor
    }}>
      {/* Only render the logo if it exists in the dragged item */}
      {item.logo && (
        <img
          src={item.logo}
          alt={item.name || 'Team logo'}
          style={{
            width: '7rem',
            height: '7rem'
          }}
        />
      )}
    </div>
  );
};

export default CustomDragLayer;