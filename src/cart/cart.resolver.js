"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CartResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var cart_entity_1 = require("./entities/cart.entity");
var common_1 = require("@nestjs/common");
var roles_guard_1 = require("../auth/guards/roles.guard");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var auth_guard_1 = require("../auth/guards/auth.guard");
var CartResolver = /** @class */ (function () {
    function CartResolver(cartService) {
        this.cartService = cartService;
    }
    CartResolver.prototype.findOnly = function () {
        return this.cartService.findOnly();
    };
    CartResolver.prototype.updateCart = function (data) {
        return this.cartService.update(data);
    };
    __decorate([
        (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard),
        (0, graphql_1.Query)(function () { return cart_entity_1.Cart; }, { name: 'cart' })
    ], CartResolver.prototype, "findOnly");
    __decorate([
        (0, roles_decorator_1.Roles)('admin'),
        (0, common_1.UseGuards)(auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
        (0, graphql_1.Mutation)(function () { return cart_entity_1.Cart; }),
        __param(0, (0, graphql_1.Args)('data'))
    ], CartResolver.prototype, "updateCart");
    CartResolver = __decorate([
        (0, graphql_1.Resolver)(function () { return cart_entity_1.Cart; })
    ], CartResolver);
    return CartResolver;
}());
exports.CartResolver = CartResolver;
