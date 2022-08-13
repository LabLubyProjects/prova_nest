"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Role = void 0;
var eager_import_0 = require("../../user/entities/user.entity");
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../user/entities/user.entity");
var Role = /** @class */ (function () {
    function Role() {
    }
    Role._GRAPHQL_METADATA_FACTORY = function () {
        return { id: { type: function () { return String; } }, name: { type: function () { return String; } }, description: { type: function () { return String; } }, created_at: { type: function () { return Date; } }, updated_at: { type: function () { return Date; } }, users: { type: function () { return [require("../../user/entities/user.entity").User]; } } };
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        (0, graphql_1.Field)(function () { return graphql_1.ID; })
    ], Role.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], Role.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)()
    ], Role.prototype, "description");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Role.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Role.prototype, "updated_at");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return user_entity_1.User; }, function (user) { return user.roles; })
    ], Role.prototype, "users");
    Role = __decorate([
        (0, graphql_1.ObjectType)(),
        (0, typeorm_1.Entity)()
    ], Role);
    return Role;
}());
exports.Role = Role;
