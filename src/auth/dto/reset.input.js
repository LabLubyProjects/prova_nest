"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResetInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var ResetInput = /** @class */ (function () {
    function ResetInput() {
    }
    ResetInput._GRAPHQL_METADATA_FACTORY = function () {
        return { email: { type: function () { return String; } }, token: { type: function () { return String; } }, newPassword: { type: function () { return String; } } };
    };
    __decorate([
        (0, class_validator_1.IsEmail)()
    ], ResetInput.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(6, { message: 'Password minimum length is 6' }),
        (0, class_validator_1.MaxLength)(30, { message: 'Password maximum length is 30' })
    ], ResetInput.prototype, "newPassword");
    ResetInput = __decorate([
        (0, graphql_1.InputType)()
    ], ResetInput);
    return ResetInput;
}());
exports.ResetInput = ResetInput;
