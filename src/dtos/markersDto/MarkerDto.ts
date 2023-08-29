import { DBMarker } from './types';

export class MarkerDto {
  id: string;
  position: {
    suggestedValue: number[][];
    approvedValue: number[];
  };
  date: string;

  constructor(marker: DBMarker) {
    this.id = marker.id;
    this.position = marker.position;
    this.date = marker.date;
  }
}
