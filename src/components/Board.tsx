import React, { useMemo } from "react";
import CityView from "./CityView";
import PlayerLayer from "./PlayerLayer";
import { CityData, CubeColor } from "../data/cities";
import { Network } from "../infrastructure/Network";
import Roads from "./Roads";
import { City } from "../domain/City";

type BoardProps = {
  players: any[];
  onMove: (cityName: string) => void;
  onTreat: (cityName: string, cubeColor: CubeColor) => void;
  network: Network;
  movingId: string | null;
  visualPos: Record<string, { x: number; y: number }>;
  animDuration?: number;
};

export default function Board({ players, onMove, onTreat, network, movingId, visualPos, animDuration = 600 }: BoardProps) {

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
        <Roads network={network} />
      }

      {/* Cities */}
      {Array.from(network.cities.values()).map((city) => (
        <CityView
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
