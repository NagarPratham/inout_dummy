import { Schema, model, models } from "mongoose";

const RecordSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
});

export const Record = models.Record || model("Record", RecordSchema);
