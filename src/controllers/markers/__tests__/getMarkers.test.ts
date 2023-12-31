import request from 'supertest';
import { app } from '@root/app';
import { StatusCodes } from '@root/commons/constants';
import { markersSchema } from '@root/model/schemas';
import { insertDataToDB } from '@root/utils/tests/helpers';
import { connectDB, dropDB, dropCollections } from '@utils/tests/dbConnection';
import { AUTH_JWT } from '@utils/tests/testData';
import {
  MOCK_DB_MARKERS,
  MOCK_APPROVED_DB_MARKERS,
  MOCK_SUGGESTED_MARKERS_RESPONSE
} from './test-data';

describe('GET /api/markers', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  afterEach(async () => {
    await dropCollections();
  });

  it('returns 200 with correct markers', async () => {
    await insertDataToDB('Markers', MOCK_DB_MARKERS, markersSchema);

    await request(app)
      .get('/api/markers')
      .set('Authorization', `Bearer ${AUTH_JWT}`)
      .expect(StatusCodes.Ok)
      .expect((res) => {
        expect(res.body).toStrictEqual(MOCK_SUGGESTED_MARKERS_RESPONSE);
      });
  });

  it('returns 200 with an empty array if there are no suggested markers in DB', async () => {
    await insertDataToDB('Markers', MOCK_APPROVED_DB_MARKERS, markersSchema);

    await request(app)
      .get('/api/markers')
      .set('Authorization', `Bearer ${AUTH_JWT}`)
      .expect(StatusCodes.Ok)
      .expect((res) => {
        expect(res.body).toStrictEqual([]);
      });
  });
});
