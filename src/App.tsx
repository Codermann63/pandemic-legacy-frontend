import React, { useMemo, useState } from "react";
import BoardViewport from "./ui/BoardViewport";
import { v4 as uuid } from "uuid";
import { CityData, cities as cityData, type CubeColor } from "./data/data";
import { Network } from "./domain/Network";
import { Player } from "./domain/Player";
import { GameState } from "./domain/GameState";

const ANIM_MS = 600;

function App() {
  const [players, setPlayers] = useState([
    new Player( uuid(), "Player 1", "Atlanta", "/pawn-red.png" ),
    new Player( uuid(), "Player 2", "Atlanta", "/pawn-blue.jpg" ),
  ]);
  const [network, setNetwork] = useState<Network>(new Network(cityData));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const gamestate = useMemo(
  () => new GameState(players, currentPlayerIndex, network),
  [players, currentPlayerIndex, network]
  );

  const [movingId, setMovingId] = useState<string | null>(null);
  const [visualPos, setVisualPos] = useState({}); // { [playerId]: {x,y} }

  const handleMove = (targetCityName: string) => {
    setPlayers((prev) => {
      const arr = [...prev];
      const active = arr[0]; // TODO: change - demo: Player 1 is active
      const fromCity = network.cities.get(active.location);
      const toCity = network.cities.get(targetCityName);
      // Guard: must have road
      if (!fromCity || !toCity || !network.areAdjecent(fromCity.name,targetCityName)) {
        console.warn(`No road from ${fromCity?.name} to ${targetCityName}`);
        return arr;
      }

      // Begin animation
      const pid = active.id;
      setMovingId(pid);

      // Start at origin
      setVisualPos((prevPos) => ({
        ...prevPos,
        [pid]: { x: fromCity.x, y: fromCity.y },
      }));

      // Kick to destination on next frame so CSS transition animates
      requestAnimationFrame(() => {
        setVisualPos((prevPos) => ({
          ...prevPos,
          [pid]: { x: toCity.x, y: toCity.y },
        }));
      });

      // After animation completes: commit the move & clear moving state
      setTimeout(() => {
        setPlayers((latest) => {
          const copy = [...latest];
          const idx = copy.findIndex((p) => p.id === pid);
          if (idx >= 0) copy[idx] = { ...copy[idx], location: targetCityName };
          return copy;
        });
        setMovingId(null);
      }, ANIM_MS);
      return arr; // keep logical location at origin until animation ends
    });
  };

  const handleTreat = (cityName: string, color: CubeColor) => {
    setNetwork((prev) =>{
      if (!prev.cities.has(cityName)) alert("Unknown city during treat" + cityName);
      if (prev.cities.get(cityName)!.cubes[color] > 0) prev.cities.get(cityName)!.cubes[color] -= 1;
      return prev;  
    }
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Pandemic Game</h1>
      <BoardViewport
        gameState={gamestate}
        onMove={handleMove}
        onTreat={handleTreat}
        movingId={movingId}
        visualPos={visualPos}
        animDuration={ANIM_MS}
      />
    </div>
  );
}

export default App;
