import { Schema, model } from 'mongoose';
import { Response } from 'supertest';

export const insertDataToDB = async (
  modelName: string,
  data: any[],
  scheme: Schema
) => {
  const TestModel = model(modelName, scheme);

  await TestModel.insertMany(data).catch((e) => console.error(e));
};

export const gatDataFromDB = async (modelName: string, scheme: Schema) => {
  const TestModel = model(modelName, scheme);

  return await TestModel.find().lean();
};

export const gatDataByIdFromDB = async (
  modelName: string,
  scheme: Schema,
  id: string
) => {
  const TestModel = model(modelName, scheme);

  return await TestModel.findOne({
    id
  }).lean();
};

export const extractValidationError = (res: Response) => {
  return JSON.parse((res.error as any).text);
};

export const createValidationError = (
  path: string,
  location: string,
  msg: string,
  additionalParams = {}
): any => {
  return {
    message: 'Invalid value',
    error: {
      [path]: {
        msg,
        path,
        location,
        type: 'field',
        ...additionalParams
      }
    }
  };
};
