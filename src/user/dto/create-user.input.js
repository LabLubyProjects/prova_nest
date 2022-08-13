"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var CreateUserInput = /** @class */ (function () {
    function CreateUserInput() {
    }
    CreateUserInput._GRAPHQL_METADATA_FACTORY = function () {
        return { name: { type: function () { return String; } }, cpf: { type: function () { return String; } }, email: { type: function () { return String; } }, password: { type: function () { return String; } } };
    };
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(3, { message: 'Name minimum length is 3' }),
        (0, class_validator_1.MaxLength)(50, { message: 'Name maximum length is 50' })
        //eslint-disable-next-line
        ,
        (0, class_validator_1.Matches)('^[a-zA-ZÀ-ÿ\\s\\u00f1\\u00d1]*$')
    ], CreateUserInput.prototype, "name");
    __decorate([
        (0, class_validator_1.IsString)()
        //eslint-disable-next-line
        ,
        (0, class_validator_1.Matches)("^\\d{3}.\\d{3}.\\d{3}-\\d{2}$")
    ], CreateUserInput.prototype, "cpf");
    __decorate([
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.MinLength)(5, { message: 'Email minimum length is 5' }),
        (0, class_validator_1.MaxLength)(50, { message: 'Email maximum length is 50' })
    ], CreateUserInput.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(6, { message: 'Password minimum length is 6' }),
        (0, class_validator_1.MaxLength)(30, { message: 'Password maximum length is 30' })
    ], CreateUserInput.prototype, "password");
    CreateUserInput = __decorate([
        (0, graphql_1.InputType)()
    ], CreateUserInput);
    return CreateUserInput;
}());
exports.CreateUserInput = CreateUserInput;
