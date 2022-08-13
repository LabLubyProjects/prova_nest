"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SingleBetInput = exports.CreateBetInput = void 0;
var eager_import_0 = require("./create-bet.input");
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var CreateBetInput = /** @class */ (function () {
    function CreateBetInput() {
    }
    CreateBetInput._GRAPHQL_METADATA_FACTORY = function () {
        return { bets: { type: function () { return [require("./create-bet.input").SingleBetInput]; } } };
    };
    __decorate([
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayMinSize)(1, { message: 'You need to provide at least one bet' }),
        (0, graphql_1.Field)(function () { return [SingleBetInput]; })
    ], CreateBetInput.prototype, "bets");
    CreateBetInput = __decorate([
        (0, graphql_1.InputType)()
    ], CreateBetInput);
    return CreateBetInput;
}());
exports.CreateBetInput = CreateBetInput;
var SingleBetInput = /** @class */ (function () {
    function SingleBetInput() {
    }
    SingleBetInput._GRAPHQL_METADATA_FACTORY = function () {
        return { gameId: { type: function () { return String; } }, numbers: { type: function () { return String; } } };
    };
    SingleBetInput = __decorate([
        (0, graphql_1.InputType)()
    ], SingleBetInput);
    return SingleBetInput;
}());
exports.SingleBetInput = SingleBetInput;
