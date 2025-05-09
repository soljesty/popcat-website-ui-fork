import mongoose, { Model, Schema, Document } from "mongoose";

interface ITokenInfo extends Document {
  code: string;
  country: string;
  count: number;
}

const TokenInfoSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  country: { type: String, required: true, unique: true },
  count: { type: Number, required: true },
});

const TokenInfo: Model<ITokenInfo> =
  mongoose.models.TokenInfo ||
  mongoose.model<ITokenInfo>("TokenInfo", TokenInfoSchema);

export default TokenInfo;
