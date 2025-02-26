import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import html2canvas from "html2canvas";
import Logos from "./Logos";
import "./Ranker.css";

const teams = [
    // AFC East
    { id: "bills", name: "Buffalo Bills", logo: "./images/Bills logo.png" },
    { id: "dolphins", name: "Miami Dolphins", logo: "./images/Dolphins logo.png" },
    { id: "patriots", name: "New England Patriots", logo: "./images/Patriots logo.png" },
    { id: "jets", name: "New York Jets", logo: "./images/Jets logo.png" },
  
    // AFC North
    { id: "ravens", name: "Baltimore Ravens", logo: "./images/Ravens logo.png" },
    { id: "bengals", name: "Cincinnati Bengals", logo: "./images/Bengals logo.png" },
    { id: "browns", name: "Cleveland Browns", logo: "./images/Browns logo.png" },
    { id: "steelers", name: "Pittsburgh Steelers", logo: "./images/Steelers logo.png" },
  
    // AFC South
    { id: "texans", name: "Houston Texans", logo: "./images/Texans logo.png" },
    { id: "colts", name: "Indianapolis Colts", logo: "./images/Colts logo.png" },
    { id: "jaguars", name: "Jacksonville Jaguars", logo: "./images/Jaguars logo.png" },
    { id: "titans", name: "Tennessee Titans", logo: "./images/Titans logo.png" },
  
    // AFC West
    { id: "broncos", name: "Denver Broncos", logo: "./images/Broncos logo.png" },
    { id: "chiefs", name: "Kansas City Chiefs", logo: "./images/Chiefs logo.png" },
    { id: "raiders", name: "Oakland Raiders", logo: "./images/Raiders logo.png" },
    { id: "chargers", name: "Los Angeles Chargers", logo: "./images/Chargers logo.png" },
  
    // NFC East
    { id: "cowboys", name: "Dallas Cowboys", logo: "./images/Cowboys logo.png" },
    { id: "giants", name: "New York Giants", logo: "./images/Giants logo.png" },
    { id: "eagles", name: "Philadelphia Eagles", logo: "./images/Eagles logo.png" },
    { id: "washington", name: "Washington Commanders", logo: "./images/Washington logo.png" },
  
    // NFC North
    { id: "bears", name: "Chicago Bears", logo: "./images/Bears logo.png" },
    { id: "lions", name: "Detroit Lions", logo: "./images/Lions logo.png" },
    { id: "packers", name: "Green Bay Packers", logo: "./images/Packers logo.png" },
    { id: "vikings", name: "Minnesota Vikings", logo: "./images/Vikings logo.png" },
  
    // NFC South
    { id: "falcons", name: "Atlanta Falcons", logo: "./images/Falcons logo.png" },
    { id: "panthers", name: "Carolina Panthers", logo: "./images/Panthers logo.png" },
    { id: "saints", name: "New Orleans Saints", logo: "./images/Saints logo.png" },
    { id: "buccaneers", name: "Tampa Bay Buccaneers", logo: "./images/Buccaneers logo.png" },
  
    // NFC West
    { id: "cardinals", name: "Arizona Cardinals", logo: "./images/Cardinals logo.png" },
    { id: "rams", name: "Los Angeles Rams", logo: "./images/Rams logo.png" },
    { id: "49ers", name: "San Francisco 49ers", logo: "./images/49ers logo.png" },
    { id: "seahawks", name: "Seattle Seahawks", logo: "./images/Seahawks logo.png" }
  ];  

const Ranker = () => {
  const [rankings, setRankings] = useState(Array(10).fill(null));
  const rankingRef = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TEAM",
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (!offset) return;

      const newRankings = [...rankings];
      newRankings[rankings.indexOf(null)] = item;
      setRankings(newRankings);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const resetRankings = () => {
    setRankings(Array(10).fill(null));
  };

  const generateImage = () => {
    if (!rankingRef.current) return;
    html2canvas(rankingRef.current, { backgroundColor: "#ffffff" }).then(
      (canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "power_rankings.jpg";
        link.click();
      }
    );
  };

  return (
    <div className="power-ranking-container">
      <h2>Power Rankings</h2>
      <div className="rankings" ref={rankingRef}>
        {rankings.map((team, index) => (
          <div key={index} className="ranking-slot" ref={drop}>
            <span>#{index + 1}</span>
            {team ? <img src={team.logo} alt={team.name} /> : <p>Drop Here</p>}
          </div>
        ))}
      </div>
      <div className="team-pool">
        {teams.map((team) => (
          <Logos key={team.id} team={team} />
        ))}
      </div>
      <button onClick={resetRankings}>Reset</button>
      <button onClick={generateImage}>Save as Image</button>
    </div>
  );
};

export default Ranker;