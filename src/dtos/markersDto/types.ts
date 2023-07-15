export type CreatedDBMarker = {
  id: string;
  position: {
    suggestedValue: number[][];
    approvedValue: number[];
  };
  date: string;
};
