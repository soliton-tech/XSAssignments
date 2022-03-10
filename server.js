const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
__dirname = "";
router.get('/',function(req,res){
    res.sendFile('index.html', { root: '.' });
});

//add the router
app.use('/', router);

app.listen(process.env.port || 3000);
app.use('/CSS',express.static('CSS'));
app.use('/JS',express.static('JS'));
app.use('/Assets',express.static('Assets'));
console.log('Running at Port 3000');