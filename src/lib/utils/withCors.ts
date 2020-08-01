import Cors from 'cors';

import initMiddleware from './initMiddleware';

const cors = initMiddleware(Cors({origin: 'localhost', credentials: true}));

export default cors;
