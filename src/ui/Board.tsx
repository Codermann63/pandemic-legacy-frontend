import React, { useMemo } from "react";
import CityView from "./CityView";
import PlayerLayer from "./PlayerLayer";
import { CityData, CubeColor } from "../data/data";
import { Network } from "../infrastructure/Network";
import Roads from "./Roads";
import { City } from "../domain/City";
import { GameState } from "../domain/GameState";

type BoardProps = {
  gameState: GameState;
  onMove: (cityName: string) => void;
  onTreat: (cityName: string, cubeColor: CubeColor) => void;
  movingId: string | null;
  visualPos: Record<string, { x: number; y: number }>;
  animDuration?: number;
};

export default function Board({ gameState, onMove, onTreat, movingId, visualPos, animDuration = 600 }: BoardProps) {

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
      {
        <Roads network={gameState.network} />
      }

      {/* Cities */}
      {Array.from(gameState.network.cities.values()).map((city) => (
        <CityView
          key={city.name}
          city={city}
          gameState={gameState}
          onMove={onMove}
          onTreat={onTreat}
          movingId={movingId}
        />
      ))}

      {/* Moving pawn overlay */}
      <PlayerLayer movingId={movingId} players={gameState.players} visualPos={visualPos} duration={animDuration} />
    </div>
  );
}
