// This file will handle connection logic to the MongoDB database

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


mongoose.connect('mongodb+srv://Mourad:Mourad@cluster0.los7xbu.mongodb.net/ISMAGI_Courses')
    .then(() => {
        console.log("Connected successfully")
    })
    .catch((err) => {
        console.error(`Error connecting to the database. ${err}`)
    })
// To prevent deprectation warnings (from MongoDB native driver)



module.exports = {
    mongoose
};