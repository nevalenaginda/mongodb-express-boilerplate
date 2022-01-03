import mongoose from 'mongoose';

const connectIntegral = mongoose.createConnection('mongodb://localhost/integral', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default connectIntegral;
