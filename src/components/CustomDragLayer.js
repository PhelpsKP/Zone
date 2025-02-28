import React from 'react';
import { useDragLayer } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const CustomDragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  // Transform style to move our custom preview with the cursor
  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

  return (
    <div style={{
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 100,
      left: 0,
      top: 0,
      transform: transform
    }}>
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