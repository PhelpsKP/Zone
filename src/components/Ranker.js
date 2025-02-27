import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import Logos from "./Logos";
import Slot from "./Slot";
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
    const [teamPool, setTeamPool] = useState([...allTeams]); // Ensures teamPool starts fresh
    const rankingRef = useRef(null);
  
    const handleDrop = (team, index) => {
      if (!team) return; // ✅ Prevents issues when dragging empty slots
    
      setRankings((prevRankings) => {
        const newRankings = [...prevRankings];
    
        if (team.fromIndex !== undefined && team.fromIndex !== index) {
          newRankings[team.fromIndex] = null;
        }
    
        const existingTeam = newRankings[index]; // ✅ Store the team currently in the target slot
        newRankings[index] = { id: team.id, name: team.name, logo: team.logo }; // ✅ Move team to new slot
    
        // ✅ Update team pool together with rankings
        setTeamPool((prevPool) => {
          let updatedPool = prevPool.filter((t) => t.id !== team.id); // ✅ Remove new team from pool
    
          if (existingTeam) {
            updatedPool.push(existingTeam); // ✅ Add back replaced team
          }
    
          return [...new Set(updatedPool)];
        });
    
        return newRankings;
      });
    };
           
  
    const removeFromRankings = (team) => {
      setRankings((prevRankings) =>
        prevRankings.map((slot) => (slot?.id === team.id ? null : slot))
      );
    
      setTeamPool((prevPool) => {
        let updatedPool = prevPool.filter((t) => t.id !== team.id); // Remove new team from pool
        updatedPool.push(team); // ✅ Add back the removed team
        return [...new Set(updatedPool)]; // Remove duplicates
      });
    };
    
    const resetDroppedTeam = (team) => {
      setTeamPool((prevPool) => {
        if (!prevPool.some((t) => t.id === team.id)) {
          return [...prevPool, team]; // ✅ Add back if not already in the pool
        }
        return prevPool;
      });
    };
  
    const resetRankings = () => {
      setRankings(Array(32).fill(null)); // Clear rankings
      setTeamPool([...allTeams]); // Fully reset the pool
    };
  
    const generateImage = () => {
      if (!rankingRef.current) return;
      html2canvas(rankingRef.current, { backgroundColor: "#ffffff" }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "power_rankings.jpg";
        link.click();
      });
    };
  
    return (
      <div className="power-ranking-container">
        <h2>Power Rankings</h2>
        <div className="rankings" ref={rankingRef}>
          {rankings.map((team, index) => (
            <Slot key={`slot-${index}`} index={index} team={team} handleDrop={handleDrop} removeFromRankings={removeFromRankings} />
          ))}
        </div>
        <div className="team-pool">
  {teamPool.map((team) => (
    <Logos key={`team-${team.id}`} team={team} resetDroppedTeam={resetDroppedTeam} />
  ))}
</div>

        <button onClick={resetRankings}>Reset</button>
        <button onClick={generateImage}>Save as Image</button>
      </div>
    );
  };
  
  export default Ranker;