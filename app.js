const dotenv = require('dotenv');
dotenv.config(); 
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


const authRoutes = require('./routes/auth.routes');
const preferenceRoutes = require("./routes/preferences.routes");
const newsRoutes = require("./routes/news.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", authRoutes);
app.use("/users", preferenceRoutes);
app.use("/news", newsRoutes); 

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;