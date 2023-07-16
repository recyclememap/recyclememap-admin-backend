import { Schema, model } from 'mongoose';

export const insertDataToDB = async (
  modelName: string,
  data: any[],
  scheme: Schema
) => {
  const TestModel = model(modelName, scheme);

  await TestModel.insertMany(data).catch((e) => console.error(e));
};
