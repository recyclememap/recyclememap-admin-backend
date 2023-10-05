import { MarkersDB } from '@model/schemas';
import { MarkerDto } from '@root/dtos';
import { DBMarker } from '@root/dtos/markersDto/types';
import { SuggestedMarkersList } from './types';

export class MarkersFacade {
  static async getSuggestMarkers(): Promise<SuggestedMarkersList> {
    const suggestedMarkers = await MarkersDB.find({
      $or: [
        { 'position.suggestedValue': { $exists: true, $not: { $size: 0 } } },
        { 'wasteTypes.suggestedValue': { $exists: true, $not: { $size: 0 } } },
        { 'address.suggestedValue': { $exists: true, $not: { $size: 0 } } }
      ]
    });

    const suggestedMarkersDto = suggestedMarkers.map(
      (marker) => new MarkerDto(marker as DBMarker)
    );

    return suggestedMarkersDto;
  }
}
