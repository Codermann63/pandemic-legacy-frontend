// src/components/Board.js
import React, { useMemo } from "react";
import City from "../domain/City";
import PlayerLayer from "./PlayerLayer";
import { CityData, CubeColor } from "../data/cities";

type BoardProps = {
  players: any[];
  onMove: (cityName: string) => void;
  onTreat: (cityName: string, cubeColor: CubeColor) => void;
  cities: CityData[];
  movingId: string | null;
  visualPos: Record<string, { x: number; y: number }>;
  animDuration?: number;
};

export default function Board({ players, onMove, onTreat, cities, movingId, visualPos, animDuration = 600 }: BoardProps) {
  // roads to draw
  const roads = useMemo(
    () => Array.from(new Set (cities.flatMap((c) =>
        c.connections.flatMap((conn) => [c.name, conn].sort().join(";;")))
    )).map((s) => s.split(";;")),
    []
  );
  

  const cityPos = useMemo(() => {
    const map = new Map();
    cities.forEach((c) => map.set(c.name, { x: c.x, y: c.y }));
    return map;
  }, [cities]);

  return (
    <div
      style={{
        position: "relative",
        width: "2000px",
        height: "1200px",
        backgroundImage: "url('/pandemic-board.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
      {/* Roads (SVG overlay) */}
      <svg
        width="2000"
        height="1200"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none"
        }}
      >
        {roads.map(([a, b]) => {
          const A = cityPos.get(a);
          const B = cityPos.get(b);
          if (!A || !B) return null;
          return (
            <line
              key={`${a}-${b}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="4"
              strokeLinecap="round"
              // subtle glow
              style={{ filter: "drop-shadow(0 0 3px rgba(0,0,0,0.6))" }}
            />
          );
        })}
      </svg>

      {/* Cities */}
      {cities.map((city) => (
        <City
          key={city.name}
          city={city}
          players={players}
          onMove={onMove}
          onTreat={onTreat}
          movingId={movingId}
        />
      ))}

      {/* Moving pawn overlay */}
      <PlayerLayer movingId={movingId} players={players} visualPos={visualPos} duration={animDuration} />
    </div>
  );
}
