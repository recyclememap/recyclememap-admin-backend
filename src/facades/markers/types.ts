export type SuggestedMarker = {
  id: string;
  position: {
    suggestedValue: number[][];
    approvedValue: number[];
  };
  date: string;
};

export type SuggestedMarkersList = SuggestedMarker[];
