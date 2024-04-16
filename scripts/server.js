// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/move_rc_car', (req, res) => {
    const selectedRoom = req.body.room;
    // Send selected room information to Python script
    const pythonProcess = spawn('python', ['rc_car_control.py', selectedRoom]);
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });
    res.send('Received room: ' + selectedRoom);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});