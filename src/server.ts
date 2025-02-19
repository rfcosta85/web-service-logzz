import  express from "express";
import config from './config/config.json';
import  routes from '../src/routes/Routes'

const app = express();
const port = config.server_port;
app.use(express.json());
app.use(routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
