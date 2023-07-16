import { connectToDB } from '@utils/dbConnections';
import { app } from './app';

const start = async () => {
  try {
    await connectToDB(process.env.DB_CONNECTION_URI);

    const port = app.get('port');
    app.listen(port, () => {
      console.log(`run server at port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
