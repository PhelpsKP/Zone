import React, { useState, useRef, useEffect } from "react";
import { useDragLayer } from "react-dnd";
import html2canvas from "html2canvas";
import Logos from "./Logos";
import Slot from "./Slot";
import CustomDragLayer from "./CustomDragLayer";
import "./Ranker.css";

/**
 * NFL team data array containing team information for all 32 teams
 * Organized by division (AFC East, AFC North, etc.)
 * Make sure all logos are in the public/images folder and are called with /images/LogoName.png
 */
const allTeams = [
  // AFC East
  { id: "bills", name: "Buffalo Bills", logo: "/images/Bills Logo.png" },
  { id: "dolphins", name: "Miami Dolphins", logo: "/images/Dolphins Logo.png" },
  { id: "patriots", name: "New England Patriots", logo: "/images/Patriots Logo.png" },
  { id: "jets", name: "New York Jets", logo: "/images/Jets Logo.png" },

  // AFC North
  { id: "ravens", name: "Baltimore Ravens", logo: "/images/Ravens logo.png" },
  { id: "bengals", name: "Cincinnati Bengals", logo: "/images/Bengals Logo.png" },
  { id: "browns", name: "Cleveland Browns", logo: "/images/Browns logo.png" },
  { id: "steelers", name: "Pittsburgh Steelers", logo: "/images/Steelers logo.png" },

  // AFC South
  { id: "texans", name: "Houston Texans", logo: "/images/Texans logo.png" },
  { id: "colts", name: "Indianapolis Colts", logo: "/images/Colts logo.png" },
  { id: "jaguars", name: "Jacksonville Jaguars", logo: "/images/Jags logo.png" },
  { id: "titans", name: "Tennessee Titans", logo: "/images/Titans Logo.png" },

  // AFC West
  { id: "broncos", name: "Denver Broncos", logo: "/images/Broncos Logo.png" },
  { id: "chiefs", name: "Kansas City Chiefs", logo: "/images/Chiefs Logo.png" },
  { id: "raiders", name: "Oakland Raiders", logo: "/images/Raiders logo.png" },
  { id: "chargers", name: "Los Angeles Chargers", logo: "/images/Chargers Logo.png" },

  // NFC East
  { id: "cowboys", name: "Dallas Cowboys", logo: "/images/Cowboys logo.png" },
  { id: "giants", name: "New York Giants", logo: "/images/Giants logo.png" },
  { id: "eagles", name: "Philadelphia Eagles", logo: "/images/Eagles logo.png" },
  { id: "washington", name: "Washington Commanders", logo: "/images/Commanders logo.png" },

  // NFC North
  { id: "bears", name: "Chicago Bears", logo: "/images/Bears logo.png" },
  { id: "lions", name: "Detroit Lions", logo: "/images/Lions Logo.png" },
  { id: "packers", name: "Green Bay Packers", logo: "/images/Packers Logo.png" },
  { id: "vikings", name: "Minnesota Vikings", logo: "/images/Vikings logo.png" },

  // NFC South
  { id: "falcons", name: "Atlanta Falcons", logo: "/images/Falcons logo.png" },
  { id: "panthers", name: "Carolina Panthers", logo: "/images/Panthers logo.png" },
  { id: "saints", name: "New Orleans Saints", logo: "/images/Saints logo.png" },
  { id: "buccaneers", name: "Tampa Bay Buccaneers", logo: "/images/Bucs Logo.png" },

  // NFC West
  { id: "cardinals", name: "Arizona Cardinals", logo: "/images/Cardinals logo.png" },
  { id: "rams", name: "Los Angeles Rams", logo: "/images/Rams logo.png" },
  { id: "49ers", name: "San Francisco 49ers", logo: "/images/49ers Logo.png" },
  { id: "seahawks", name: "Seattle Seahawks", logo: "/images/Seahawks logo.png" }
];  

/**
 * Ranker Component
 * 
 * A drag-and-drop interface for creating NFL power rankings.
 * Users can select teams from a pool and place them in ranking slots,
 * using either drag-and-drop or click-to-place functionality.
 */
const Ranker = () => {
  // State management
  const [rankings, setRankings] = useState(Array(32).fill(null)); // Ordered ranking slots
  const [teamPool, setTeamPool] = useState([...allTeams]);        // Available unranked teams
  const [selectedTeam, setSelectedTeam] = useState(null);         // Currently selected team
  const [selectedSlot, setSelectedSlot] = useState(null);         // Currently selected slot
  const rankingRef = useRef(null);                               // Reference for image export
  const teamPoolRef = useRef(null);                             // Reference to the team pool div

  // Use react-dnd's useDragLayer to monitor drag operations globally
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  // Effect to add 'has-dragging-over' class to team pool when dragging over it
  useEffect(() => {
    if (!isDragging || !teamPoolRef.current || !currentOffset) return;

    const teamPoolElement = teamPoolRef.current;
    
    // Get the team pool element's bounding rectangle
    const poolRect = teamPoolElement.getBoundingClientRect();
    
    // Check if current drag position is over the team pool
    const isOverPool = 
      currentOffset.x >= poolRect.left && 
      currentOffset.x <= poolRect.right && 
      currentOffset.y >= poolRect.top && 
      currentOffset.y <= poolRect.bottom;
    
    // Add or remove class based on whether dragging over pool
    if (isOverPool) {
      teamPoolElement.classList.add('has-dragging-over');
    } else {
      teamPoolElement.classList.remove('has-dragging-over');
    }
    
    return () => {
      if (teamPoolElement) {
        teamPoolElement.classList.remove('has-dragging-over');
      }
    };
  }, [isDragging, currentOffset]);

  /**
   * Handles team placement in a ranking slot
   * 
   * @param {Object} team - The team being placed
   * @param {number} index - The destination slot index
   */
  const handleDrop = (team, index) => {
    if (!team) return;

    setRankings((prevRankings) => {
      const newRankings = [...prevRankings];

      // If team is coming from another slot in the rankings
      if (team.fromIndex !== undefined) {
        newRankings[team.fromIndex] = null;
      } else {
        // If coming from the pool, remove from pool
        setTeamPool((prevPool) => prevPool.filter((t) => t.id !== team.id));
      }

      // Store any existing team in the target slot
      const existingTeam = newRankings[index];

      // Place the team in the target slot
      newRankings[index] = { 
        id: team.id, 
        name: team.name, 
        logo: team.logo 
      };

      // If we displaced a team, put it back in the pool
      if (existingTeam) {
        setTeamPool((prevPool) => {
          // Avoid duplicates
          if (!prevPool.some((t) => t.id === existingTeam.id)) {
            return [...prevPool, existingTeam];
          }
          return prevPool;
        });
      }

      return newRankings;
    });
    
    // Clear selections after drop
    setSelectedTeam(null);
    setSelectedSlot(null);
  };
  
  /**
   * Handles team logo click for the click-to-place functionality
   * 
   * @param {Object} team - The team that was clicked
   */
  const handleLogoClick = (team) => {
    setSelectedTeam(team);
    
    // If a slot is already selected, place the team there
    if (selectedSlot !== null) {
      handleDrop(team, selectedSlot);
    }
  };
  
  /**
   * Handles slot click for the click-to-place functionality
   * 
   * @param {number} index - The index of the slot that was clicked
   */
  const handleSlotClick = (index) => {
    setSelectedSlot(index);
    
    // If a team is already selected, place it in this slot
    if (selectedTeam) {
      handleDrop(selectedTeam, index);
    }
  };

  /**
   * Removes a team from the rankings and returns it to the team pool
   * 
   * @param {Object} team - The team to remove
   * @param {number} index - The slot index to remove from (optional)
   */
  const removeFromRankings = (team, index) => {
    if (!team) return;
    
    setRankings((prevRankings) => {
      const newRankings = [...prevRankings];
      
      // If index is provided, clear that specific slot
      if (index !== undefined) {
        newRankings[index] = null;
      } else {
        // Otherwise find and clear slots containing this team
        return prevRankings.map((slot) => 
          (slot?.id === team.id ? null : slot)
        );
      }
      
      return newRankings;
    });

    // Add the team back to the pool if it's not already there
    setTeamPool((prevPool) => {
      if (!prevPool.some((t) => t.id === team.id)) {
        return [...prevPool, team];
      }
      return prevPool;
    });
    
    // Clear selections
    setSelectedTeam(null);
    setSelectedSlot(null);
  };

  /**
   * Returns a team to the pool (used for error handling in drag operations)
   * 
   * @param {Object} team - The team to return to the pool
   */
  const resetDroppedTeam = (team) => {
    if (!team) return;
    
    // Add back to pool if not already there
    setTeamPool((prevPool) => {
      if (!prevPool.some((t) => t.id === team.id)) {
        return [...prevPool, team];
      }
      return prevPool;
    });
  };

  /**
   * Resets the entire ranking to its initial state
   */
  const resetRankings = () => {
    setRankings(Array(32).fill(null));
    setTeamPool([...allTeams]);
    setSelectedTeam(null);
    setSelectedSlot(null);
  };
  
  /**
   * Returns context-sensitive instruction text based on the current selection state
   * 
   * @returns {string} - Instructions for the user
   */
  const getInstructionText = () => {
    if (selectedTeam && !selectedSlot) {
      return "Now click a ranking slot to place the selected team";
    } else if (!selectedTeam && selectedSlot !== null) {
      return "Now click a team logo to place it in the selected slot";
    } else if (!selectedTeam && selectedSlot === null) {
      return "Click a team logo, then click a slot to place it. You can also drag and drop.";
    } else {
      return ""; // Both are selected or other state, no instruction needed
    }
  };

  /**
   * Captures the current rankings as an image and triggers a download
   */
  const generateImage = () => {
    if (!rankingRef.current) return;

    // Set a background color for the export
    const originalBackground = rankingRef.current.style.background;
    rankingRef.current.style.background = "#222";
    rankingRef.current.style.padding = "20px";

    html2canvas(rankingRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
      allowTaint: true,
      useCORS: true
    }).then((canvas) => {
      // Restore original background
      rankingRef.current.style.background = originalBackground;
      rankingRef.current.style.padding = "";
      
      // Create download link        
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      link.download = "power_rankings.jpg";
      link.click();
    });
  };

  return (
    <div className="power-ranking-container">
      <h2>Power Rankings</h2>
      <CustomDragLayer />
      
      {/* Instructions for click-to-place */}
      <div className="instructions">
        <p>{getInstructionText()}</p>
      </div>

      {/* Pool of available teams with ref for drag effects */}
      <div 
        className="team-pool"
        ref={teamPoolRef}
      >
        {teamPool.map((team) => (
          <Logos 
            key={`team-${team.id}`} 
            team={team} 
            resetDroppedTeam={resetDroppedTeam}
            onLogoClick={handleLogoClick}
          />
        ))}
      </div>
      
      {/* Rankings slots display */}
      <div className="rankings" ref={rankingRef}>
        {rankings.map((team, index) => (
          <Slot 
            key={`slot-${index}`} 
            index={index} 
            team={team} 
            handleDrop={handleDrop} 
            removeFromRankings={removeFromRankings}
            onSlotClick={handleSlotClick}
            isSelected={selectedSlot === index}
          />
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="action-buttons">
        <button onClick={resetRankings}>Reset</button>
        <button onClick={generateImage}>Save</button>
        {selectedTeam && (
          <button className="cancel-selection" onClick={() => setSelectedTeam(null)}>
            Cancel Selection
          </button>
        )}
      </div>
    </div>
  );
};

export default Ranker;