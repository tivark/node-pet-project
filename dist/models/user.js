const { Schema } = mongoose;
exports.UserSchema = new Schema({
    login: String,
    password: String,
    role: String
});
//# sourceMappingURL=user.js.map