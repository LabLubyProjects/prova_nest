"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Bet = void 0;
var eager_import_0 = require("../../user/entities/user.entity");
var eager_import_1 = require("../../game/entities/game.entity");
var graphql_1 = require("@nestjs/graphql");
var game_entity_1 = require("../../game/entities/game.entity");
var user_entity_1 = require("../../user/entities/user.entity");
var typeorm_1 = require("typeorm");
var Bet = /** @class */ (function () {
    function Bet() {
    }
    Bet._GRAPHQL_METADATA_FACTORY = function () {
        return { id: { type: function () { return String; } }, numbers: { type: function () { return String; } }, user_id: { type: function () { return String; } }, game_id: { type: function () { return String; } }, created_at: { type: function () { return Date; } }, updated_at: { type: function () { return Date; } }, user: { type: function () { return Object; } }, game: { type: function () { return Object; } } };
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        (0, graphql_1.Field)(function () { return graphql_1.ID; })
    ], Bet.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Bet.prototype, "numbers");
    __decorate([
        (0, typeorm_1.Column)()
    ], Bet.prototype, "user_id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Bet.prototype, "game_id");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Bet.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Bet.prototype, "updated_at");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.bets; }),
        (0, typeorm_1.JoinColumn)({ name: 'user_id' })
    ], Bet.prototype, "user");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return game_entity_1.Game; }, function (game) { return game.bets; }),
        (0, typeorm_1.JoinColumn)({ name: 'game_id' })
    ], Bet.prototype, "game");
    Bet = __decorate([
        (0, graphql_1.ObjectType)(),
        (0, typeorm_1.Entity)()
    ], Bet);
    return Bet;
}());
exports.Bet = Bet;
