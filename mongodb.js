const mongoose = require('mongoose');


// mongoose.connect('mongodb://127.0.0.1:27017/Login_SignUp_Details_DB')
//     .then(() => {
//         console.log("Database Connected");
//     })
//     .catch((err) => {
//         console.log(err);
//     });


mongoose.set('strictQuery', false);
const connectdb = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}



const Login_schema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model('LOGIN_Collection', Login_schema);

module.exports = collection;
module.exports = connectdb;