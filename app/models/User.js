"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
;
// Define the user schema
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    mobNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/, // Regex to match exactly 10 digits
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v); // Ensure it is exactly 10 digits
            },
            message: 'Mobile number must be 10 digits long.',
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
});
// Create the User model based on the schema and interface
var User = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
exports.User = User;
