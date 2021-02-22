import cors from 'cors';
import { AUTH_HEADER } from './Auth';

export default cors({
  exposedHeaders: AUTH_HEADER,
});
