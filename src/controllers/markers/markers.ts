import { Router } from 'express';
import { StatusCodes } from '@root/commons/constants';
import { MarkersFacade } from '@root/facades';
import { facadeRequest } from '@root/utils/helpers';

export const markers = Router();

/*
 * GET /markers
 */
markers.get(
  '',
  facadeRequest(async (req, res) => {
    const markersList = await MarkersFacade.getSuggestMarkers();

    res.status(StatusCodes.Ok).send(markersList);
  })
);
