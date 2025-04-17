"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var User_1 = require("../../models/User");
var mongoose_1 = require("mongoose");
var mongodb_1 = require("../../lib/mongodb");
function adduser() {
    return __awaiter(this, void 0, void 0, function () {
        var filter;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mongodb_1.connectToDatabase)()];
                case 1:
                    _a.sent();
                    filter = {};
                    // Delete all existing users in the collection
                    return [4 /*yield*/, User_1.User.deleteMany({})];
                case 2:
                    // Delete all existing users in the collection
                    _a.sent();
                    // await User.deleteMany({} as FilterQuery<UserDocument>)
                    //     .then(() => console.log("All existing users deleted."))
                    //     .catch((error: any) => console.error("Error deleting users:", error));
                    fs.readFile('../data/user.json', 'utf8', function (err, data) { return __awaiter(_this, void 0, void 0, function () {
                        var users, _loop_1, _i, users_1, user;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        console.error("Error reading the file:", err);
                                        return [2 /*return*/];
                                    }
                                    users = JSON.parse(data);
                                    _loop_1 = function (user) {
                                        var newUser;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    newUser = new User_1.User({
                                                        _id: new mongoose_1.default.Types.ObjectId(user._id), // Generate a new ObjectId for each user
                                                        name: user.name,
                                                        mobNumber: user.mobNumber,
                                                        email: user.email
                                                    });
                                                    return [4 /*yield*/, newUser.save()
                                                            .then(function () {
                                                            console.log("User ".concat(user.name, " saved successfully."));
                                                        })
                                                            .catch(function (error) {
                                                            console.error("Error saving user ".concat(user.name, ":").concat(user._id), error);
                                                        })];
                                                case 1:
                                                    _b.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    _i = 0, users_1 = users;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < users_1.length)) return [3 /*break*/, 4];
                                    user = users_1[_i];
                                    return [5 /*yield**/, _loop_1(user)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
// Asynchronous approach to reading the JSON file
adduser().then(function () {
    console.log("All users added successfully.");
}).catch(function (error) {
    console.error("Error adding users:", error);
});
