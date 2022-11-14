import mongoose from "mongoose";

const empSchema = mongoose.Schema({
  fname: { type: String, required:  true },
  email: { type: String },
  address: { type: String },
  id: { type: String },
});

export default mongoose.model('Employee', empSchema);