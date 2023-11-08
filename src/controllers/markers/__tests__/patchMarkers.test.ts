import request from 'supertest';
import { StatusCodes } from '@commons/constants';
import { markersSchema } from '@model/schemas';
import { app } from '@root/app';
import { WasteTypes } from '@root/facades/markers/types';
import { connectDB, dropDB, dropCollections } from '@utils/tests/dbConnection';
import {
  insertDataToDB,
  gatDataFromDB,
  createValidationError,
  extractValidationError
} from '@utils/tests/helpers';
import { AUTH_JWT } from '@utils/tests/testData';
import {
  MOCK_DB_MARKERS,
  MARKERS_DB_NAME,
  MOCK_APPROVED_MARKER
} from './test-data';

describe('PATCH /api/markers/:markerId', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  afterEach(async () => {
    await dropCollections();
  });

  it('returns 204 and updates marker in DB', async () => {
    await insertDataToDB(MARKERS_DB_NAME, MOCK_DB_MARKERS, markersSchema);

    await request(app)
      .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
      .send(MOCK_APPROVED_MARKER)
      .set('Authorization', `Bearer ${AUTH_JWT}`)
      .expect(StatusCodes.NoContent)
      .expect(async () => {
        const dbData = await gatDataFromDB(MARKERS_DB_NAME, markersSchema);

        expect(dbData[0].position).toStrictEqual(MOCK_APPROVED_MARKER.position);
        expect(dbData[0].wasteTypes).toStrictEqual(
          MOCK_APPROVED_MARKER.wasteTypes
        );
        expect(dbData[0].address).toStrictEqual(MOCK_APPROVED_MARKER.address);
      });
  });

  it('returns 400 if body contains extra fields', async () => {
    await insertDataToDB(MARKERS_DB_NAME, MOCK_DB_MARKERS, markersSchema);

    await request(app)
      .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
      .send({ ...MOCK_APPROVED_MARKER, randomField: 'randomValue' })
      .set('Authorization', `Bearer ${AUTH_JWT}`)
      .expect(StatusCodes.BadRequest)
      .expect(async (res) => {
        expect(res.body.message).toBe(
          'Body contains incorrect properties or is empty'
        );
      });
  });

  it('returns 400 if body is empty', async () => {
    await insertDataToDB(MARKERS_DB_NAME, MOCK_DB_MARKERS, markersSchema);

    await request(app)
      .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
      .send({})
      .set('Authorization', `Bearer ${AUTH_JWT}`)
      .expect(StatusCodes.BadRequest)
      .expect(async (res) => {
        expect(res.body.message).toBe(
          'Body contains incorrect properties or is empty'
        );
      });
  });

  it('returns 404 if there is no such marker in data base', async () => {
    await insertDataToDB(MARKERS_DB_NAME, MOCK_DB_MARKERS, markersSchema);

    await request(app)
      .patch(`/api/markers/invalidId`)
      .send(MOCK_APPROVED_MARKER)
      .set('Authorization', `Bearer ${AUTH_JWT}`)
      .expect(StatusCodes.NotFound)
      .expect(async (res) => {
        expect(res.body.message).toBe('Marker not found');
      });
  });

  describe('position validation', () => {
    describe('approvedValue', () => {
      it('returns 400 if value is not an array', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            position: {
              suggestedValue: MOCK_APPROVED_MARKER.position.suggestedValue,
              approvedValue: 'invalid'
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'position',
                'body',
                'The position property must have the correct type.',
                {
                  value: {
                    suggestedValue:
                      MOCK_APPROVED_MARKER.position.suggestedValue,
                    approvedValue: 'invalid'
                  }
                }
              )
            );
          });
      });

      it('returns 400 if value has less than 2 elements', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            position: {
              suggestedValue: MOCK_APPROVED_MARKER.position.suggestedValue,
              approvedValue: [1]
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'position',
                'body',
                'The position property must have the correct type.',
                {
                  value: {
                    suggestedValue:
                      MOCK_APPROVED_MARKER.position.suggestedValue,
                    approvedValue: [1]
                  }
                }
              )
            );
          });
      });

      it('returns 400 if value has more than 2 elements', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            position: {
              suggestedValue: MOCK_APPROVED_MARKER.position.suggestedValue,
              approvedValue: [1, 2, 3]
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'position',
                'body',
                'The position property must have the correct type.',
                {
                  value: {
                    suggestedValue:
                      MOCK_APPROVED_MARKER.position.suggestedValue,
                    approvedValue: [1, 2, 3]
                  }
                }
              )
            );
          });
      });

      it('returns 400 if value does not contain numbers', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            position: {
              suggestedValue: MOCK_APPROVED_MARKER.position.suggestedValue,
              approvedValue: [1, '2']
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'position',
                'body',
                'The position property must have the correct type.',
                {
                  value: {
                    suggestedValue:
                      MOCK_APPROVED_MARKER.position.suggestedValue,
                    approvedValue: [1, '2']
                  }
                }
              )
            );
          });
      });
    });

    describe('suggestedValue', () => {
      it('returns 400 if value is not an array', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            position: {
              suggestedValue: ['invalid', [1, 4]],
              approvedValue: MOCK_APPROVED_MARKER.position.approvedValue
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'position',
                'body',
                'The position property must have the correct type.',
                {
                  value: {
                    suggestedValue: ['invalid', [1, 4]],
                    approvedValue: MOCK_APPROVED_MARKER.position.approvedValue
                  }
                }
              )
            );
          });
      });

      it('returns 400 if value has less than 2 elements', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            position: {
              suggestedValue: [[1], [1, 4]],
              approvedValue: MOCK_APPROVED_MARKER.position.approvedValue
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'position',
                'body',
                'The position property must have the correct type.',
                {
                  value: {
                    suggestedValue: [[1], [1, 4]],
                    approvedValue: MOCK_APPROVED_MARKER.position.approvedValue
                  }
                }
              )
            );
          });
      });

      it('returns 400 if value has more than 2 elements', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            position: {
              suggestedValue: [
                [1, 2, 3],
                [1, 2]
              ],
              approvedValue: MOCK_APPROVED_MARKER.position.approvedValue
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'position',
                'body',
                'The position property must have the correct type.',
                {
                  value: {
                    suggestedValue: [
                      [1, 2, 3],
                      [1, 2]
                    ],
                    approvedValue: MOCK_APPROVED_MARKER.position.approvedValue
                  }
                }
              )
            );
          });
      });

      it('returns 400 if value does not contain numbers', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            position: {
              suggestedValue: [
                [1, '2'],
                [123, 456]
              ],
              approvedValue: MOCK_APPROVED_MARKER.position.approvedValue
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'position',
                'body',
                'The position property must have the correct type.',
                {
                  value: {
                    suggestedValue: [
                      [1, '2'],
                      [123, 456]
                    ],
                    approvedValue: MOCK_APPROVED_MARKER.position.approvedValue
                  }
                }
              )
            );
          });
      });
    });
  });

  describe('wasteTypes validation', () => {
    describe('approvedValue', () => {
      it('returns 400 if value is not an array', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            wasteTypes: {
              suggestedValue: MOCK_APPROVED_MARKER.wasteTypes.suggestedValue,
              approvedValue: 'invalid'
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'wasteTypes',
                'body',
                'The wasteTypes property must have the correct type.',
                {
                  value: {
                    suggestedValue:
                      MOCK_APPROVED_MARKER.wasteTypes.suggestedValue,
                    approvedValue: 'invalid'
                  }
                }
              )
            );
          });
      });

      it('returns 400 if value has incorect element', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            wasteTypes: {
              suggestedValue: MOCK_APPROVED_MARKER.wasteTypes.suggestedValue,
              approvedValue: [WasteTypes.Batteries, 'incorrect']
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'wasteTypes',
                'body',
                'The wasteTypes property must have the correct type.',
                {
                  value: {
                    suggestedValue:
                      MOCK_APPROVED_MARKER.wasteTypes.suggestedValue,
                    approvedValue: [WasteTypes.Batteries, 'incorrect']
                  }
                }
              )
            );
          });
      });
    });

    describe('suggestedValue', () => {
      it('returns 400 if value is not an array', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            wasteTypes: {
              suggestedValue: 'invalid',
              approvedValue: MOCK_APPROVED_MARKER.wasteTypes.approvedValue
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'wasteTypes',
                'body',
                'The wasteTypes property must have the correct type.',
                {
                  value: {
                    suggestedValue: 'invalid',
                    approvedValue: MOCK_APPROVED_MARKER.wasteTypes.approvedValue
                  }
                }
              )
            );
          });
      });

      it('returns 400 if one of the suggestions is not an array', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            wasteTypes: {
              suggestedValue: ['invalid', [WasteTypes.Batteries]],
              approvedValue: MOCK_APPROVED_MARKER.wasteTypes.approvedValue
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'wasteTypes',
                'body',
                'The wasteTypes property must have the correct type.',
                {
                  value: {
                    suggestedValue: ['invalid', [WasteTypes.Batteries]],
                    approvedValue: MOCK_APPROVED_MARKER.wasteTypes.approvedValue
                  }
                }
              )
            );
          });
      });

      it('returns 400 if value has incorect element', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            wasteTypes: {
              suggestedValue: [
                [WasteTypes.Batteries, 'incorrect'],
                [WasteTypes.Glass, WasteTypes.Plastic]
              ],
              approvedValue: MOCK_APPROVED_MARKER.wasteTypes.approvedValue
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'wasteTypes',
                'body',
                'The wasteTypes property must have the correct type.',
                {
                  value: {
                    suggestedValue: [
                      [WasteTypes.Batteries, 'incorrect'],
                      [WasteTypes.Glass, WasteTypes.Plastic]
                    ],
                    approvedValue: MOCK_APPROVED_MARKER.wasteTypes.approvedValue
                  }
                }
              )
            );
          });
      });
    });
  });

  describe('address validation', () => {
    describe('approvedValue', () => {
      it('returns 400 if value is not string', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            address: {
              suggestedValue: MOCK_APPROVED_MARKER.address.suggestedValue,
              approvedValue: { test: 'invalid' }
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'address',
                'body',
                'The address property must have the correct type.',
                {
                  value: {
                    suggestedValue: MOCK_APPROVED_MARKER.address.suggestedValue,
                    approvedValue: { test: 'invalid' }
                  }
                }
              )
            );
          });
      });
    });

    describe('suggestedValue', () => {
      it('returns 400 if value is not an array', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            address: {
              suggestedValue: 'invalid',
              approvedValue: MOCK_APPROVED_MARKER.address.approvedValue
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'address',
                'body',
                'The address property must have the correct type.',
                {
                  value: {
                    suggestedValue: 'invalid',
                    approvedValue: MOCK_APPROVED_MARKER.address.approvedValue
                  }
                }
              )
            );
          });
      });

      it('returns 400 if one of the suggestions is not string', async () => {
        await request(app)
          .patch(`/api/markers/${MOCK_DB_MARKERS[0].id}`)
          .send({
            ...MOCK_APPROVED_MARKER,
            address: {
              suggestedValue: ['correct', 123],
              approvedValue: MOCK_APPROVED_MARKER.address.approvedValue
            }
          })
          .set('Authorization', `Bearer ${AUTH_JWT}`)
          .expect(StatusCodes.BadRequest)
          .then((res) => {
            expect(extractValidationError(res)).toStrictEqual(
              createValidationError(
                'address',
                'body',
                'The address property must have the correct type.',
                {
                  value: {
                    suggestedValue: ['correct', 123],
                    approvedValue: MOCK_APPROVED_MARKER.address.approvedValue
                  }
                }
              )
            );
          });
      });
    });
  });
});
