import React, { useState, useMemo, useEffect, useRef } from "react";
import Board from "./Board";
import { CityData, CubeColor } from "../data/data";
import { Network } from "../infrastructure/Network";
import { Player } from "../domain/Player";
import { GameState } from "../domain/GameState";

type BoardViewportProps = {
  gameState: GameState
  onMove: (cityName: string) => void;
  onTreat: (cityName: string, cubeColor: CubeColor) => void;
  movingId: string | null;
  visualPos: Record<string, { x: number; y: number }>;
  animDuration?: number;
};

export default function BoardViewport({ gameState, onMove, onTreat, movingId, visualPos, animDuration = 600 }: BoardViewportProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const viewportWidth = 800;
  const viewportHeight = 500;

  const boardWidth = 2000;   // world units (unscaled)
  const boardHeight = 1200;

  // ---- helpers ----
  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  const clampY = (y: number, s: number) => {
    const scaledH = boardHeight * s;
    const minY = Math.min(0, viewportHeight - scaledH);
    const maxY = 0;
    return clamp(y, minY, maxY);
  };

  // compute which horizontal tiles to render so the scaled boards cover the viewport
  const tileIndices = useMemo(() => {
    const worldOffsetX = offset.x / scale;
    const tilesNeeded = Math.ceil(viewportWidth / (boardWidth * scale)) + 2;
    const startIndex = Math.floor((-worldOffsetX) / boardWidth) - 1;
    return Array.from({ length: tilesNeeded }, (_, i) => startIndex + i);
  }, [offset.x, scale]);

  // ---- mouse handlers ----
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDragging(true);
    setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    // --- calculate board-space coordinates ---
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect(); // TODO: check if there can be errors
    const mouseX = e.clientX - rect.left; // cursor X in viewport
    const mouseY = e.clientY - rect.top;  // cursor Y in viewport

    // transform to board coordinates
    const boardX = (mouseX - offset.x) / scale;
    const boardY = (mouseY - offset.y) / scale;

    console.log(`Board coords: x=${boardX.toFixed(0)}, y=${boardY.toFixed(0)}`);
  };


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!dragging) return;
    const newX = e.clientX - start.x;       // horizontal is free (no clamp)
    const newY = clampY(e.clientY - start.y, scale); // vertical clamped
    setOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => setDragging(false);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    const zoomStep = 0.1;
    const direction = e.deltaY < 0 ? 1 : -1;
    const newScale = Math.min(Math.max(0.5, scale + direction * zoomStep), 3);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect(); // TODO: check if there can be errors
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // world coords under mouse (before zoom)
    const worldX = (mouseX - offset.x) / scale;
    const worldY = (mouseY - offset.y) / scale;

    // new offset so the same world point stays under cursor
    const newOffsetX = mouseX - worldX * newScale; // X not clamped (infinite wrap)
    const newOffsetYUnclamped = mouseY - worldY * newScale;
    const newOffsetY = clampY(newOffsetYUnclamped, newScale);

    setScale(newScale);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };


  // Camera follow:
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef(0);

  useEffect(() => {
    if (!movingId) return;
    const pos = visualPos?.[movingId];
    if (!pos) return;

    const follow = (ts: number) => {
      if (dragging) return;

      const desiredX = viewportWidth / 2 - pos.x * scale;
      const desiredYUnclamped = viewportHeight / 2 - pos.y * scale;
      const desiredY = clampY(desiredYUnclamped, scale);

      const LERP = 0.18; // follow strength; increase for tighter follow
      const nextX = offset.x + (desiredX - offset.x) * LERP;
      const nextY = offset.y + (desiredY - offset.y) * LERP;

      const closeEnough =
        Math.hypot(desiredX - offset.x, desiredY - offset.y) < 0.5;

      if (!closeEnough) {
        setOffset({ x: nextX, y: nextY });
        rafRef.current = requestAnimationFrame(follow);
      } else {
        setOffset({ x: desiredX, y: desiredY });
        rafRef.current = requestAnimationFrame(follow);
      }
      lastTsRef.current = ts;
    };

    rafRef.current = requestAnimationFrame(follow);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [movingId, visualPos, scale, dragging, offset.x, offset.y]);

  return (
    <div
      style={{
        width: `${viewportWidth}px`,
        height: `${viewportHeight}px`,
        overflow: "hidden",
        border: "2px solid black",
        position: "relative",
        margin: "20px auto",
        cursor: dragging ? "grabbing" : "grab",
        background: "#0b0d12"
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Scaled world wrapper */}
      <div
        style={{
          position: "absolute",
          left: offset.x,
          top: offset.y,
          transform: `scale(${scale})`,
          transformOrigin: "0 0"
        }}
      >
        {/* Render enough horizontal tiles to cover the viewport */}
        {tileIndices.map((idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: `${idx * boardWidth}px`,
              top: 0,
              width: `${boardWidth}px`,
              height: `${boardHeight}px`
            }}
          >
            <Board
              gameState={gameState}
              onMove={onMove}
              onTreat={onTreat}
              movingId={movingId}
              visualPos={visualPos}
              animDuration={animDuration}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
