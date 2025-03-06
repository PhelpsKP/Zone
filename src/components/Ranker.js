import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import Logos from "./Logos";
import Slot from "./Slot";
import CustomDragLayer from "./CustomDragLayer";
import "./Ranker.css";

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

  const Ranker = () => {
    const [rankings, setRankings] = useState(Array(32).fill(null));
    const [teamPool, setTeamPool] = useState([...allTeams]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const rankingRef = useRef(null);
  
    // Handle drag-and-drop functionality
    const handleDrop = (team, index) => {
      if (!team) return;
  
      setRankings((prevRankings) => {
        const newRankings = [...prevRankings];
  
        // If the team is coming from another slot in the rankings
        if (team.fromIndex !== undefined) {
          // Clear the original slot
          newRankings[team.fromIndex] = null;
        } else {
          // If coming from the pool, remove from pool
          setTeamPool((prevPool) => prevPool.filter((t) => t.id !== team.id));
        }
  
        // Store the team that was in the target slot (if any)
        const existingTeam = newRankings[index];
  
        // Put the dragged team in the target slot
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
    
    // Handle team logo click (select a team)
    const handleLogoClick = (team) => {
      setSelectedTeam(team);
      
      // If a slot is already selected, place the team there
      if (selectedSlot !== null) {
        handleDrop(team, selectedSlot);
      }
    };
    
    // Handle slot click (select a slot)
    const handleSlotClick = (index) => {
      setSelectedSlot(index);
      
      // If a team is already selected, place it in this slot
      if (selectedTeam) {
        handleDrop(selectedTeam, index);
      }
    };
  
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
  
    const resetRankings = () => {
      setRankings(Array(32).fill(null));
      setTeamPool([...allTeams]);
      setSelectedTeam(null);
      setSelectedSlot(null);
    };
    
    // Add visual cue for click-to-place
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
  
    const generateImage = () => {
      if (!rankingRef.current) return;

      // Set a background color for the export
      const originalBackground = rankingRef.current.style.background;
      rankingRef.current.style.background = "#222";
      rankingRef.current.style.padding = "20px";

      html2canvas(rankingRef.current, {
        backgroundColor: "#ffffff",
        // Scale for better quality
        scale: 2,
        // Adjust capture settings for better results on mobile
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

        <div className="team-pool">
          {teamPool.map((team) => (
            <Logos 
              key={`team-${team.id}`} 
              team={team} 
              resetDroppedTeam={resetDroppedTeam}
              onLogoClick={handleLogoClick}
            />
          ))}
        </div>
        
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
        
        <div className="action-buttons">
  <button onClick={resetRankings}>Reset</button>
  <button onClick={generateImage}>Save</button>
  {selectedTeam && (
    <button className="cancel-selection" onClick={() => setSelectedTeam(null)}>Cancel Selection</button>
  )}
</div>
      </div>
    );
  };

export default Ranker;