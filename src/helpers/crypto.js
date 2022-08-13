"use strict";
exports.__esModule = true;
exports.hashPassword = void 0;
var bcryptjs_1 = require("bcryptjs");
exports.hashPassword = {
    to: function (password) {
        return (0, bcryptjs_1.hashSync)(password, 10);
    },
    from: function (hash) {
        return hash;
    }
};
