import request from 'supertest';
import { StatusCodes } from '@commons/constants';
import { markersSchema } from '@model/schemas';
import { app } from '@root/app';
import { connectDB, dropDB, dropCollections } from '@utils/tests/dbConnection';
import { insertDataToDB, gatDataByIdFromDB } from '@utils/tests/helpers';
import { AUTH_JWT } from '@utils/tests/testData';
import {
  MOCK_DB_MARKERS,
  MARKERS_DB_NAME,
  MOCK_APPROVED_MARKER
} from './test-data';

describe('DELETE /api/markers/:markerId', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  afterEach(async () => {
    await dropCollections();
  });

  it('returns 204 and delete marker from DB', async () => {
    await insertDataToDB(MARKERS_DB_NAME, MOCK_DB_MARKERS, markersSchema);

    await request(app)
      .delete(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
      .set('Authorization', `Bearer ${AUTH_JWT}`)
      .expect(StatusCodes.NoContent)
      .expect(async () => {
        const dbData = await gatDataByIdFromDB(
          MARKERS_DB_NAME,
          markersSchema,
          MOCK_DB_MARKERS[0].id
        );

        expect(dbData).toBeNull();
      });
  });

  it('returns 404 if there is no such marker in data base', async () => {
    await insertDataToDB(MARKERS_DB_NAME, MOCK_DB_MARKERS, markersSchema);

    await request(app)
      .delete(`/api/markers/invalidId`)
      .send(MOCK_APPROVED_MARKER)
      .set('Authorization', `Bearer ${AUTH_JWT}`)
      .expect(StatusCodes.NotFound)
      .expect(async (res) => {
        expect(res.body.message).toBe('Marker not found');
      });
  });
});
