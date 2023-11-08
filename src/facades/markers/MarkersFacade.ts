import { Request } from 'express';
import { MarkersDB } from '@model/schemas';
import { MarkerDto } from '@root/dtos';
import { DBMarker } from '@root/dtos/markersDto/types';
import { ApiError } from '@root/utils/errors';
import {
  ApprovedMarker,
  MarkerProperties,
  SuggestedMarkersList
} from './types';

export class MarkersFacade {
  static async getSuggestedMarkers(): Promise<SuggestedMarkersList> {
    const suggestedMarkers = await MarkersDB.find({
      $or: [
        { 'position.suggestedValue': { $exists: true, $not: { $size: 0 } } },
        { 'wasteTypes.suggestedValue': { $exists: true, $not: { $size: 0 } } },
        { 'address.suggestedValue': { $exists: true, $not: { $size: 0 } } }
      ]
    }).exec();

    const suggestedMarkersDto = suggestedMarkers.map(
      (marker) => new MarkerDto(marker as DBMarker)
    );

    return suggestedMarkersDto;
  }

  static async updateMarker({ params, body }: Request): Promise<void> {
    const markerToUpdate: ApprovedMarker = body;

    const markersToUpdateProperties = Object.keys(markerToUpdate);

    if (
      markersToUpdateProperties.length === 0 ||
      !markersToUpdateProperties.every((property) =>
        Object.values(MarkerProperties).includes(property as MarkerProperties)
      )
    ) {
      throw ApiError.BadRequest(
        'Body contains incorrect properties or is empty'
      );
    }

    const suggestedMarker = await MarkersDB.findOne({
      id: params.markerId
    }).exec();

    if (!suggestedMarker) {
      throw ApiError.NotFound('Marker not found');
    }

    const suggestedMarkerDTO = new MarkerDto(suggestedMarker as DBMarker);

    const markerToUpdateDTO = new MarkerDto({
      ...suggestedMarkerDTO,
      ...markerToUpdate,
      date: new Date().toISOString()
    } as DBMarker);

    await MarkersDB.replaceOne(
      {
        id: markerToUpdateDTO.id
      },
      markerToUpdateDTO
    ).exec();
  }

  static async declineMarker(id: string): Promise<void> {
    const suggestedMarker = await MarkersDB.findOne({
      id
    }).exec();

    if (!suggestedMarker) {
      throw ApiError.NotFound('Marker not found');
    }

    await MarkersDB.deleteOne({
      id
    });
  }
}
