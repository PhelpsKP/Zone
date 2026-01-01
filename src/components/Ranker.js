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

// DEBUG FLAG - Set to false to disable export debugging
const EXPORT_DEBUG = true;

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
  const [isSaving, setIsSaving] = useState(false);                // Track saving state
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
  }, [isDragging, item, currentOffset]);

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
   * Fisher-Yates shuffle algorithm for randomizing an array
   *
   * @param {Array} array - The array to shuffle
   * @returns {Array} - A new shuffled array
   */
  const fisherYatesShuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  /**
   * Generates a random ranking by shuffling all 32 teams
   * and assigning them to all 32 slots
   */
  const generateRandomRankings = () => {
    // Shuffle all teams using Fisher-Yates algorithm
    const shuffledTeams = fisherYatesShuffle(allTeams);

    // Assign shuffled teams to rankings (all 32 slots filled)
    setRankings(shuffledTeams.map(team => ({
      id: team.id,
      name: team.name,
      logo: team.logo
    })));

    // Clear the team pool since all teams are now in rankings
    setTeamPool([]);

    // Clear any selections
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
   * Robust image preloading with decode support
   * Ensures all images are fully loaded and decoded before html2canvas capture
   */
  const preloadAndDecodeImages = async () => {
    if (!rankingRef.current) return;

    const images = Array.from(rankingRef.current.querySelectorAll('img'));

    // Step 1: Preload all image sources
    const preloadPromises = images.map(async (img) => {
      if (!img.src) return;

      // Create a preloader for each image source
      const preloader = new Image();
      preloader.crossOrigin = "anonymous";
      preloader.src = img.src;

      // Wait for preloader to load and decode
      await new Promise((resolve, reject) => {
        if (preloader.complete && preloader.naturalHeight !== 0) {
          resolve();
        } else {
          preloader.onload = () => resolve();
          preloader.onerror = () => {
            console.warn(`Failed to preload: ${img.src}`);
            resolve(); // Don't reject, just continue
          };
          setTimeout(() => resolve(), 5000); // Safety timeout
        }
      });

      // Use decode() API when available for better reliability
      if (preloader.decode) {
        try {
          await preloader.decode();
        } catch (err) {
          console.warn(`Decode failed for: ${img.src}`, err);
        }
      }
    });

    await Promise.all(preloadPromises);

    // Step 2: Ensure DOM images are also decoded
    const decodePromises = images.map(async (img) => {
      if (img.decode && img.src) {
        try {
          await img.decode();
        } catch (err) {
          console.warn(`DOM image decode failed: ${img.src}`, err);
        }
      }
    });

    await Promise.all(decodePromises);

    // Step 3: Wait for layout to settle (two animation frames)
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => requestAnimationFrame(resolve));
  };

  /**
   * Captures the current rankings as an image and triggers a download
   */
  const generateImage = async () => {
    if (!rankingRef.current || isSaving) return;

    try {
      setIsSaving(true);

      // Add is-exporting class FIRST to lock layout
      rankingRef.current.classList.add('is-exporting');

      // Robust image preloading with decode
      await preloadAndDecodeImages();

      // DEBUG: Inspect LIVE DOM images before html2canvas
      if (EXPORT_DEBUG) {
        const liveImages = Array.from(rankingRef.current.querySelectorAll('img'));
        const liveRows = [];

        for (let i = 0; i < liveImages.length; i++) {
          const img = liveImages[i];
          const rect = img.getBoundingClientRect();

          // Find slot number from closest .ranking-slot
          const slot = img.closest('.ranking-slot');
          let slotNumber = 'unknown';
          if (slot) {
            const slotNumberBadge = slot.querySelector('.slot-number');
            if (slotNumberBadge) {
              slotNumber = slotNumberBadge.textContent.trim();
            }
          }

          // Extract team name from alt attribute
          const teamName = img.alt || 'unknown';
          const filename = img.src.split('/').pop() || 'unknown';

          let decoded = null;
          let decodeError = null;

          if (img.decode) {
            try {
              await img.decode();
              decoded = true;
            } catch (err) {
              decoded = false;
              decodeError = err.message;
            }
          }

          liveRows.push({
            slot: slotNumber,
            team: teamName,
            file: filename,
            complete: img.complete,
            naturalW: img.naturalWidth,
            naturalH: img.naturalHeight,
            crossOrigin: img.crossOrigin || 'not-set',
            rectW: Math.round(rect.width),
            rectH: Math.round(rect.height),
            decoded,
            decodeError: decodeError || 'none'
          });
        }

        console.group("🔍 EXPORT DEBUG: LIVE IMAGES");
        console.table(liveRows);
        console.log("LIVE count:", liveImages.length);
        console.groupEnd();
      }

      // Get element dimensions for explicit sizing
      const rect = rankingRef.current.getBoundingClientRect();

      // Store original styles
      const originalBackground = rankingRef.current.style.background;
      const originalPadding = rankingRef.current.style.padding;

      // Apply export-specific styles
      rankingRef.current.style.background = "#222";
      rankingRef.current.style.padding = "20px";

      // Capture with html2canvas - explicit dimensions and scroll handling
      const canvas = await html2canvas(rankingRef.current, {
        backgroundColor: "#222",
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: rect.width,
        height: rect.height,
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        onclone: (clonedDoc) => {
          // Force export-safe styles in cloned document
          const clonedElement = clonedDoc.querySelector('.power-ranking-container');
          if (clonedElement) {
            clonedElement.classList.add('is-exporting');

            // Ensure all slots have stable layout
            const slots = clonedElement.querySelectorAll('.ranking-slot');
            slots.forEach(slot => {
              slot.style.transform = 'none';
              slot.style.transition = 'none';
            });

            // Ensure all badges are positioned correctly
            const badges = clonedElement.querySelectorAll('.slot-number');
            badges.forEach(badge => {
              badge.style.position = 'absolute';
              badge.style.top = '0.35rem';
              badge.style.left = '0.35rem';
            });

            // Ensure all images have proper constraints
            const images = clonedElement.querySelectorAll('.ranking-slot img');
            images.forEach(img => {
              img.style.maxWidth = '90%';
              img.style.maxHeight = '60%';
              img.style.objectFit = 'contain';
            });

            // DEBUG: Inspect CLONE DOM images
            if (EXPORT_DEBUG) {
              const clonedContainer = clonedDoc.querySelector('.rankings');
              if (clonedContainer) {
                const clonedImages = Array.from(clonedContainer.querySelectorAll('img'));
                const cloneRows = [];
                const failedSlots = [];

                clonedImages.forEach((img, i) => {
                  const isFailed = img.naturalWidth === 0 || img.naturalHeight === 0;

                  // Find slot number from closest .ranking-slot
                  const slot = img.closest('.ranking-slot');
                  let slotNumber = 'unknown';
                  if (slot) {
                    const slotNumberBadge = slot.querySelector('.slot-number');
                    if (slotNumberBadge) {
                      slotNumber = slotNumberBadge.textContent.trim();
                    }
                  }

                  // Extract team name and filename
                  const teamName = img.alt || 'unknown';
                  const filename = img.src.split('/').pop() || 'no-src';

                  cloneRows.push({
                    slot: slotNumber,
                    team: teamName,
                    file: filename,
                    complete: img.complete,
                    naturalW: img.naturalWidth,
                    naturalH: img.naturalHeight,
                    crossOrigin: img.crossOrigin || 'not-set',
                    FAILED: isFailed ? '❌' : '✓'
                  });

                  // Add visual marker for failed images
                  if (isFailed) {
                    failedSlots.push({ slot: slotNumber, team: teamName, file: filename });

                    img.style.outline = '4px solid red';
                    img.style.background = 'rgba(255,0,0,0.15)';

                    // Add label showing which image failed (team name + slot)
                    const label = clonedDoc.createElement('div');
                    label.textContent = `MISSING: ${teamName} (${slotNumber})`;
                    label.style.cssText = `
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      background: red;
                      color: white;
                      padding: 4px 6px;
                      font-size: 11px;
                      font-weight: bold;
                      z-index: 9999;
                      white-space: nowrap;
                      border: 1px solid white;
                      text-align: center;
                    `;

                    // Insert label relative to parent slot
                    if (slot) {
                      slot.style.position = 'relative';
                      slot.appendChild(label);
                    }
                  }
                });

                console.group("🔍 EXPORT DEBUG: CLONE IMAGES");
                console.table(cloneRows);
                console.log("CLONE count:", clonedImages.length);
                console.log("Failed images:", cloneRows.filter(r => r.FAILED === '❌').length);
                if (failedSlots.length > 0) {
                  console.warn("⚠️ FAILED SLOTS:", failedSlots);
                }
                console.groupEnd();
              }
            }
          }
        }
      });

      // Restore original styles and remove exporting class
      rankingRef.current.style.background = originalBackground;
      rankingRef.current.style.padding = originalPadding;
      rankingRef.current.classList.remove('is-exporting');

      // Create download link with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const link = document.createElement("a");

      // DEBUG: Wrap toDataURL in try/catch to detect taint issues
      try {
        link.href = canvas.toDataURL("image/png", 1.0);
      } catch (err) {
        if (EXPORT_DEBUG) {
          console.error("EXPORT DEBUG: toDataURL failed (possible taint)", err);
        }
        throw err;
      }

      link.download = `power_rankings_${timestamp}.png`;
      link.click();

    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
      // Ensure cleanup on error
      if (rankingRef.current) {
        rankingRef.current.classList.remove('is-exporting');
      }
    } finally {
      setIsSaving(false);
    }
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
        <button onClick={resetRankings} disabled={isSaving}>Reset</button>
        <button onClick={generateRandomRankings} disabled={isSaving}>Mikey's Rankings</button>
        <button onClick={generateImage} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        {selectedTeam && (
          <button className="cancel-selection" onClick={() => setSelectedTeam(null)} disabled={isSaving}>
            Cancel Selection
          </button>
        )}
      </div>
    </div>
  );
};

export default Ranker;