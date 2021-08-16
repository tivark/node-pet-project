const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const jsonParser = express.json();
require('dotenv').config();
const userSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, { versionKey: false });
const app = express();
const port = process.env.PORT || 3000;
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(process.env.DB_URL, connectionOptions, (error) => {
    if (error) {
        return console.log(error);
    }
    app.listen(port);
});
const User = mongoose.model("User", userSchema);
app.post('/users/create', (req, res) => {
    console.log('run');
    res.end(process.env.DB_URL);
});
app.post('/login');
app.post('/register', jsonParser, (request, response) => {
    const body = request.body;
    console.log(body);
    if (!body) {
        response.sendStatus(400);
    }
    const { login, password } = body;
    User.find({ login }, (error, items) => {
        if (error) {
            return console.log(error);
        }
        response.send(items);
    });
});
//# sourceMappingURL=app.js.map