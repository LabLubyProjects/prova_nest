"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Cart = void 0;
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("typeorm");
var Cart = /** @class */ (function () {
    function Cart() {
    }
    Cart._GRAPHQL_METADATA_FACTORY = function () {
        return { min_cart_value: { type: function () { return Number; } } };
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)()
    ], Cart.prototype, "min_cart_value");
    Cart = __decorate([
        (0, graphql_1.ObjectType)(),
        (0, typeorm_1.Entity)()
    ], Cart);
    return Cart;
}());
exports.Cart = Cart;
