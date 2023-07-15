import { app } from './app';

const start = async () => {
  try {
    app.listen(app.get('port'), () => {
      console.log('run server at port ' + app.get('port'));
    });
  } catch (e) {
    console.log(e);
  }
};

start();
