import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { StatusCodes } from '@root/commons/constants';
import { MarkersFacade } from '@root/facades';
import { facadeRequest } from '@root/utils/helpers';
import { updateMarkerSchema } from './validation';

export const markers = Router();

/*
 * GET /markers
 */
markers.get(
  '',
  facadeRequest(async (req, res) => {
    const markersList = await MarkersFacade.getSuggestedMarkers();

    res.status(StatusCodes.Ok).send(markersList);
  })
);

/*
 * PATCH /markers/:markerId
 */
markers.patch(
  '/:markerId',
  checkSchema(updateMarkerSchema),
  facadeRequest(async (req, res) => {
    await MarkersFacade.updateMarker(req);

    res.sendStatus(StatusCodes.NoContent);
  })
);

/*
 * DELETE /markers/:markerId
 */
markers.delete(
  '/:markerId',
  facadeRequest(async (req, res) => {
    await MarkersFacade.declineMarker(req.params.markerId);

    res.sendStatus(StatusCodes.NoContent);
  })
);
