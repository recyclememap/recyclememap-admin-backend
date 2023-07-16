export type DBMarker = {
  id: string;
  position: {
    suggestedValue: number[][];
    approvedValue: number[];
  };
  date: string;
};
