import { Network } from "../domain/Network";

type RoadProps = {
  network: Network;
};

export default function Roads({ network }: RoadProps) {

  return (
    <div>
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
        {network.roadList.map(([a, b]) => {
          if (network.cities.get(a) === undefined || network.cities.get(b) === undefined){ alert("City not found in network, drawing Roads" +a + b);return null;}
          const A = {x:network.cities.get(a)!.x, y:network.cities.get(a)!.y};
          const B = {x:network.cities.get(b)!.x, y:network.cities.get(b)!.y};
          if (!A || !B) return null;
          if (A.x < 250 && B.x > 1750) {B.x -= 2000;}
          if (A.x > 1750 && B.x < 250) {B.x += 2000;}
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
      </svg></div>
  );
}
