import { connect } from 'mongoose';
const uri = 'TU_URI_DE_MONGODB';

connect(ENV.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));