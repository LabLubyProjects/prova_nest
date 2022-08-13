"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BetModule = void 0;
var common_1 = require("@nestjs/common");
var bet_service_1 = require("./bet.service");
var bet_resolver_1 = require("./bet.resolver");
var typeorm_1 = require("@nestjs/typeorm");
var bet_entity_1 = require("./entities/bet.entity");
var cart_service_1 = require("../cart/cart.service");
var game_service_1 = require("../game/game.service");
var user_service_1 = require("../user/user.service");
var cart_entity_1 = require("../cart/entities/cart.entity");
var user_entity_1 = require("../user/entities/user.entity");
var game_entity_1 = require("../game/entities/game.entity");
var role_service_1 = require("../role/role.service");
var role_entity_1 = require("../role/entities/role.entity");
var BetModule = /** @class */ (function () {
    function BetModule() {
    }
    BetModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([bet_entity_1.Bet, cart_entity_1.Cart, user_entity_1.User, game_entity_1.Game, role_entity_1.Role])],
            providers: [
                bet_service_1.BetService,
                bet_resolver_1.BetResolver,
                cart_service_1.CartService,
                game_service_1.GameService,
                user_service_1.UserService,
                role_service_1.RoleService,
            ]
        })
    ], BetModule);
    return BetModule;
}());
exports.BetModule = BetModule;
