export type LocalPlayerPayload = {
  position: {
    x: number;
    y: number;
    z: number;
    timestamp: number;
  };
  facingDirection?: {
    x: number;
    y: number;
    z: number;
  };
  animationState?: number;
};
