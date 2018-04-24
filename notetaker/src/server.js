

//This is the entry point file

const express = require('express');

const app = express();

const port = process.env.PORT || 5000;


app.listen(port, function () {
    console.log('app listening on port 5000!');
});

app.use( express.static( `${__dirname}/../build` ) );

const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})