# Domain
[] City
[] Player
[x] Network

# Services
[] PlayerAnimationController
[] Camera

# Hooks
[] usePlayerAnimation
[] useCamera

# Components
[] App

# Config
[] board
[] cities


# Cube enum?


src/
  domain/
    City.ts
    Player.ts
    Graph.ts            roads rules
  services/
    PlayerAnimationController.ts
    PanZoomController.ts
  hooks/
    usePlayerAnimation.ts
    usePanZoom.ts
  config/board.ts
  components/
    App.tsx
    BoardViewport.tsx
    Board.tsx
    City.tsx
    PlayerLayer.tsx
