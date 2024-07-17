// create a server
import http from 'http';
import app from './app.js';
import 'dotenv/config'
const server=http.createServer(app);
const PORT=process.env.PORT

server.listen(PORT,()=>{
    console.log(`server is running buddy on port ${PORT}`);
})
