"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthType = void 0;
var eager_import_0 = require("../../user/entities/user.entity");
var graphql_1 = require("@nestjs/graphql");
var user_entity_1 = require("../../user/entities/user.entity");
var AuthType = /** @class */ (function () {
    function AuthType() {
    }
    AuthType._GRAPHQL_METADATA_FACTORY = function () {
        return { user: { type: function () { return Object; } }, token: { type: function () { return String; } } };
    };
    __decorate([
        (0, graphql_1.Field)(function () { return user_entity_1.User; })
    ], AuthType.prototype, "user");
    AuthType = __decorate([
        (0, graphql_1.ObjectType)()
    ], AuthType);
    return AuthType;
}());
exports.AuthType = AuthType;
