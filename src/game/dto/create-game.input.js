"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateGameInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var CreateGameInput = /** @class */ (function () {
    function CreateGameInput() {
    }
    CreateGameInput._GRAPHQL_METADATA_FACTORY = function () {
        return { type: { type: function () { return String; } }, description: { type: function () { return String; } }, range: { type: function () { return Number; } }, price: { type: function () { return Number; } }, minAndMaxNumber: { type: function () { return Number; } }, color: { type: function () { return String; } } };
    };
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(3, { message: 'Type minimum length is 3' }),
        (0, class_validator_1.MaxLength)(50, { message: 'Type maximum length is 3' })
        //eslint-disable-next-line
        ,
        (0, class_validator_1.Matches)('^[a-zA-ZÀ-ÿ\\s\\u00f1\\u00d1-]*$')
    ], CreateGameInput.prototype, "type");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(10, { message: 'Type minimum length is 10' }),
        (0, class_validator_1.MaxLength)(255, { message: 'Type maximum length is 255' })
    ], CreateGameInput.prototype, "description");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsPositive)({ message: 'Range must be positive' })
    ], CreateGameInput.prototype, "range");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsPositive)({ message: 'Price must be positive' })
    ], CreateGameInput.prototype, "price");
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)({ message: 'MinAndMaxNumber must be positive' })
    ], CreateGameInput.prototype, "minAndMaxNumber");
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateGameInput.prototype, "color");
    CreateGameInput = __decorate([
        (0, graphql_1.InputType)()
    ], CreateGameInput);
    return CreateGameInput;
}());
exports.CreateGameInput = CreateGameInput;
