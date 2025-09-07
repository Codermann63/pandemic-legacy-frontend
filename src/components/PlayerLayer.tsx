import React from "react";

type PlayerLayerProps = {
    movingId: string | null;
    players: Player[];
    visualPos: Record<string, { x: number; y: number }>;
    duration?: number;
}


export default function PlayerLayer({ movingId, players, visualPos, duration = 600}: PlayerLayerProps){
    if (!movingId) return null;
    const player = players.find((p) => p.id === movingId);
    const pos = visualPos[movingId];
    if (!player || !pos) return null;
    const r = (
        <img
        src={player.pawn}
        alt={player.name}
        title={player.name}
        style= {{
            position: "absolute",
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
            width: "25px",
            height: "25px",
            objectFit: "contain",
            pointerEvents: "none",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))",
            transition: `left ${duration}ms ease, top ${duration}ms ease`,
            zIndex: 1000,
        }}
        ></img>
    )

    return r
}