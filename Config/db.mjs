// db.mjs
import mongoose from 'mongoose';
import { MongoURL } from './environment.mjs';

const connection = mongoose.createConnection(MongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connection.once('open', () => console.log('✅ Connected to DB'))
          .on('error', (err) => console.log('❌ Error connecting DB -->', err));

export default connection;
