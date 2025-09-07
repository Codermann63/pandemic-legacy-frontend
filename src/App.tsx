import React, { useMemo, useState } from "react";
import BoardViewport from "./components/BoardViewport";
import { v4 as uuid } from "uuid";
import { CityData, cities as cityData, CubeColor } from "./data/cities";

const ANIM_MS = 600;

function App() {
  const [players, setPlayers] = useState([
    { id: uuid(), name: "Player 1", location: "Atlanta", pawn: "/pawn-red.png" },
    { id: uuid(), name: "Player 2", location: "Atlanta", pawn: "/pawn-blue.png" },
  ]);
  const [cities, setCities] = useState<CityData[]>(cityData);

  const [movingId, setMovingId] = useState<string | null>(null);
  const [visualPos, setVisualPos] = useState({}); // { [playerId]: {x,y} }

  const cityByName = useMemo(() => {
    const m = new Map();
    cities.forEach((c) => m.set(c.name, c));
    return m;
  }, [cities]);

  const handleMove = (targetCityName: string) => {
    setPlayers((prev) => {
      const arr = [...prev];
      const active = arr[0]; // demo: Player 1 is active
      const fromCity = cityByName.get(active.location);
      const toCity = cityByName.get(targetCityName);
      // Guard: must have road
      if (!fromCity || !toCity || !fromCity.connections.includes(targetCityName)) {
        console.warn(`No road from ${fromCity?.name} to ${targetCityName}`);
        return arr;
      }

      // Begin animation
      const pid = active.id;
      console.log("Animating move for", pid, "to", targetCityName);
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
    setCities((prev) =>
      prev.map((c) => {
        if (c.name === cityName) {
          const cubes = { ...c.cubes };
          if (cubes[color] > 0) cubes[color] -= 1;
          return { ...c, cubes };
        }
        return c;
      })
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Pandemic Game</h1>
      <BoardViewport
        players={players}
        cities={cities}
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
