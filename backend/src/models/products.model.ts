// products-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import {Model, Mongoose} from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'products';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    imageURL: { type: String },
    name: { type: String, required: true },
    catagory: { type: String, required: true },
    brand: { type: String, required: true },
    isTrending: { type: Boolean, required: true, default: false },
    unitPrice : { type: Number, required: true },
    stockAvailable: { type: Number, required: true },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
