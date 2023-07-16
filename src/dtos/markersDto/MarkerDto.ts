import { DBMarker } from './types';

export class MarkerDto {
  id: string;
  position: number[][];
  date: string;

  constructor(marker: DBMarker) {
    this.id = marker.id;
    this.position = marker.position.suggestedValue;
    this.date = marker.date;
  }
}
