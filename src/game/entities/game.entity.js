"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Game = void 0;
var eager_import_0 = require("../../bet/entities/bet.entity");
var graphql_1 = require("@nestjs/graphql");
var bet_entity_1 = require("../../bet/entities/bet.entity");
var typeorm_1 = require("typeorm");
var Game = /** @class */ (function () {
    function Game() {
    }
    Game._GRAPHQL_METADATA_FACTORY = function () {
        return { id: { type: function () { return String; } }, type: { type: function () { return String; } }, description: { type: function () { return String; } }, range: { type: function () { return Number; } }, price: { type: function () { return Number; } }, minAndMaxNumber: { type: function () { return Number; } }, color: { type: function () { return String; } }, created_at: { type: function () { return Date; } }, updated_at: { type: function () { return Date; } }, bets: { type: function () { return [Object]; } } };
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        (0, graphql_1.Field)(function () { return graphql_1.ID; })
    ], Game.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], Game.prototype, "type");
    __decorate([
        (0, typeorm_1.Column)()
    ], Game.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)()
    ], Game.prototype, "range");
    __decorate([
        (0, typeorm_1.Column)()
    ], Game.prototype, "price");
    __decorate([
        (0, typeorm_1.Column)()
    ], Game.prototype, "minAndMaxNumber");
    __decorate([
        (0, typeorm_1.Column)()
    ], Game.prototype, "color");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Game.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Game.prototype, "updated_at");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return bet_entity_1.Bet; }, function (bet) { return bet.game; })
    ], Game.prototype, "bets");
    Game = __decorate([
        (0, graphql_1.ObjectType)(),
        (0, typeorm_1.Entity)()
    ], Game);
    return Game;
}());
exports.Game = Game;
