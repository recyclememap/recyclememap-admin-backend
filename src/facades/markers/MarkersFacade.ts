import { MarkersDB } from '@model/schemas';
import { MarkerDto } from '@root/dtos';
import { DBMarker } from '@root/dtos/markersDto/types';
import { SuggesteMarkersList } from './types';

export class MarkersFacade {
  static async getSuggestMarkers(): Promise<SuggesteMarkersList> {
    const suggestedMarkers = await MarkersDB.find({
      'position.suggestedValue': { $exists: true, $ne: [] }
    });

    const suggestedMarkersDto = suggestedMarkers.map(
      (marker) => new MarkerDto(marker as DBMarker)
    );

    return suggestedMarkersDto;
  }
}
