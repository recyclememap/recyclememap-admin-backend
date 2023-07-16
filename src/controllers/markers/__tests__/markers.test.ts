import request from 'supertest';
import { app } from '@root/app';
import { StatusCodes } from '@root/commons/constants';
import { markersSchema } from '@root/model/schemas';
import { insertDataToDB } from '@root/utils/tests/helpers';
import { connectDB, dropDB, dropCollections } from '@utils/tests/dbConnection';
import {
  MOCK_DB_MARKERS,
  MOCK_APPROVED_DB_MARKERS,
  MOCK_SUGGESTED_MARKERS_RESPONSE
} from './test-data';

describe('Markers controller', () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await dropDB();
  });
  afterEach(async () => {
    await dropCollections();
  });

  describe('GET /api/markers', () => {
    it('returns 200 with correct markers', async () => {
      await insertDataToDB('Markers', MOCK_DB_MARKERS, markersSchema);

      await request(app)
        .get('/api/markers')
        .expect(StatusCodes.Ok)
        .expect((res) => {
          expect(res.body).toStrictEqual(MOCK_SUGGESTED_MARKERS_RESPONSE);
        });
    });

    it('returns 200 with an empty array if there are no suggested markers in DB', async () => {
      await insertDataToDB('Markers', MOCK_APPROVED_DB_MARKERS, markersSchema);

      await request(app)
        .get('/api/markers')
        .expect(StatusCodes.Ok)
        .expect((res) => {
          expect(res.body).toStrictEqual([]);
        });
    });
  });
});
