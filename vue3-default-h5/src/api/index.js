import axios from '../utils/interactive';

// get
const getAny = _ => axios.get('/api', _);

// post
const getAnswer = _ => axios.post('/getAnswer', _);

export {
  getAny,
  getAnswer
};
