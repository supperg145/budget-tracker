const moment = require("moment");
const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(created_At) {
            return moment(created_At).format("MMM DD, YYYY");
        }
    }
})

const User = mongoose.model("User", UsersSchema);
module.exports = User