"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var eager_import_0 = require("../../role/entities/role.entity");
var eager_import_1 = require("../../bet/entities/bet.entity");
var graphql_1 = require("@nestjs/graphql");
var bet_entity_1 = require("../../bet/entities/bet.entity");
var crypto_1 = require("../../helpers/crypto");
var typeorm_1 = require("typeorm");
var role_entity_1 = require("../../role/entities/role.entity");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.isAdmin = function () {
        return this.roles.some(function (role) { return role.name === 'admin'; });
    };
    User._GRAPHQL_METADATA_FACTORY = function () {
        return { id: { type: function () { return String; } }, name: { type: function () { return String; } }, cpf: { type: function () { return String; } }, email: { type: function () { return String; } }, created_at: { type: function () { return Date; } }, updated_at: { type: function () { return Date; } }, roles: { type: function () { return [require("../../role/entities/role.entity").Role]; } }, bets: { type: function () { return [Object]; } } };
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        (0, graphql_1.Field)(function () { return graphql_1.ID; })
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], User.prototype, "cpf");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)({
            transformer: crypto_1.hashPassword
        }),
        (0, graphql_1.HideField)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({ "default": null }),
        (0, graphql_1.HideField)()
    ], User.prototype, "password_recovery_token");
    __decorate([
        (0, typeorm_1.Column)({ "default": null }),
        (0, graphql_1.HideField)()
    ], User.prototype, "password_recovery_token_expiration");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], User.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], User.prototype, "updated_at");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return role_entity_1.Role; }, function (role) { return role.users; }, {
            eager: true
        }),
        (0, typeorm_1.JoinTable)()
    ], User.prototype, "roles");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return bet_entity_1.Bet; }, function (bet) { return bet.user; }, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    ], User.prototype, "bets");
    User = __decorate([
        (0, graphql_1.ObjectType)(),
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
