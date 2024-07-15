// create a server
import http from 'http';
import app from './app.js';
const server=http.createServer(app);
server.listen(3001,()=>{
    console.log('server is running buddy');
})
