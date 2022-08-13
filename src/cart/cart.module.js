"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartModule = void 0;
var common_1 = require("@nestjs/common");
var cart_service_1 = require("./cart.service");
var cart_resolver_1 = require("./cart.resolver");
var typeorm_1 = require("@nestjs/typeorm");
var cart_entity_1 = require("./entities/cart.entity");
var user_service_1 = require("../user/user.service");
var user_entity_1 = require("../user/entities/user.entity");
var role_service_1 = require("../role/role.service");
var role_entity_1 = require("../role/entities/role.entity");
var CartModule = /** @class */ (function () {
    function CartModule() {
    }
    CartModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([cart_entity_1.Cart, user_entity_1.User, role_entity_1.Role])],
            providers: [cart_resolver_1.CartResolver, cart_service_1.CartService, user_service_1.UserService, role_service_1.RoleService]
        })
    ], CartModule);
    return CartModule;
}());
exports.CartModule = CartModule;
