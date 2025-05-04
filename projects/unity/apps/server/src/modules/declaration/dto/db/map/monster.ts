export type MapMonsterDB = {
  id: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  respawn?: {
    delay: number;
  };
};
