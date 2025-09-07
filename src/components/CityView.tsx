import React from "react";
import { CityData, CubeColor } from "../data/cities";
import { City } from "../domain/City";

type CityViewProps = {
  key: string;
  city: City;
  players: Player[];
  onMove: (cityName: string) => void;
  onTreat: (cityName: string, color: CubeColor) => void;
  movingId: string | null;
};

export default function CityView({ key, city, players, onMove, onTreat, movingId }: CityViewProps) {
  const cityPlayers = players.filter((p) => p.location === city.name).filter(p => p.id !== movingId);
  const visibleCubes = Object.entries(city.cubes).filter(([, count]) => count !== 0);

  return (
    <div
      style={{
        position: "absolute",
        left: city.x,
        top: city.y,
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      {/* Player pawns above the city */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "5px",
          gap: "5px",
        }}
      >
        {cityPlayers.map((p) => (
          <img
            key={p.id}
            src={p.pawn}
            alt={p.name}
            title={p.name}
            style={{
              width: "25px",
              height: "25px",
              objectFit: "contain",
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))",
            }}
          />
        ))}
      </div>

      {/* Wrapper ensures cubes don't shift the city box (absolute positioning) */}
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Cube stack to the left (does not affect layout) */}
        {visibleCubes.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "-40%",       // anchor to left of the box
              marginLeft: "6px",  // gap to the box
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pointerEvents: "none", // clicks pass through to the box/buttons
            }}
          >
            {visibleCubes.map(([color, count]) => (
              <div
                key={color}
                title={`${color}: ${count}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  margin: "1px 0",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "2px",
                    backgroundColor: color,
                    boxShadow: "0 0 2px rgba(0,0,0,0.6)",
                    border: "1px solid rgba(0,0,0,0.4)",
                  }}
                />
                <span style={{ fontSize: "9px", color: "#222", userSelect: "none" }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* City box */}
        <div
          style={{
            border: `3px solid ${city.color}`,
            borderRadius: "10px",
            padding: "5px",
            backgroundColor: "rgba(255,255,255,0.8)",
            textAlign: "center",
          }}
        >
          <h4 style={{ fontSize: "8px", margin: "1px 0" }}>{city.name}</h4>
          {/* (Optional) keep details hidden since cubes are now shown left */}
          {/* If you still want the per-color lines, keep this: */}

          <button
            style={{ fontSize: "5px", padding: "5px 5px", marginRight: "4px" }}
            onClick={() => onMove(city.name)}
          >
            Move
          </button>
          <button
            style={{ fontSize: "5px", padding: "5px 5px" }}
            onClick={() => onTreat(city.name, "blue")}
          >
            Treat
          </button>
        </div>
      </div>
    </div>
  );
}
