const mongoose = require("mongoose");

    const connectDB = async () => {
        const uri = "mongodb+srv://moritzdemmer:Wasser99@cluster0.eusqzpv.mongodb.net/projects?retryWrites=true&w=majority";
        try {
            await mongoose.connect(uri);
            console.log('Connected to MongoDB');
        } catch (e) {
            console.error(e);
        }
    }

exports.connectDB = connectDB;