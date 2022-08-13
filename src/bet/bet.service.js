"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.BetService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var kafka_1 = require("../messaging/kafka");
var bet_entity_1 = require("./entities/bet.entity");
var BetService = /** @class */ (function () {
    function BetService(betsRepository, gameService, cartService, userService) {
        this.betsRepository = betsRepository;
        this.gameService = gameService;
        this.cartService = cartService;
        this.userService = userService;
    }
    BetService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.betsRepository.find()];
            });
        });
    };
    BetService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var bet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.betsRepository.findOneBy({ id: id })];
                    case 1:
                        bet = _a.sent();
                        if (!bet)
                            throw new common_1.NotFoundException('Bet not found');
                        return [2 /*return*/, bet];
                }
            });
        });
    };
    BetService.prototype.createBet = function (createBetInput, user) {
        return __awaiter(this, void 0, void 0, function () {
            var bets, totalCartValue, _loop_1, this_1, _i, bets_1, bet, cart, minimumValue, allAdmins;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bets = createBetInput.bets;
                        totalCartValue = 0;
                        _loop_1 = function (bet) {
                            var currentGameAnalyzed, arrayOfBetNumbers;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, this_1.gameService.findOne(bet.gameId)];
                                    case 1:
                                        currentGameAnalyzed = _b.sent();
                                        arrayOfBetNumbers = bet.numbers.split(',');
                                        if (arrayOfBetNumbers.length !== new Set(arrayOfBetNumbers).size)
                                            throw new common_1.BadRequestException('There are repeated numbers in a bet');
                                        if (arrayOfBetNumbers.length !== currentGameAnalyzed.minAndMaxNumber)
                                            throw new common_1.BadRequestException("A bet of type ".concat(currentGameAnalyzed.type, " must have ").concat(currentGameAnalyzed.minAndMaxNumber, " numbers"));
                                        if (arrayOfBetNumbers.some(function (betNumber) { return Number(betNumber) > currentGameAnalyzed.range; }))
                                            throw new common_1.BadRequestException('A bet has numbers out of game range');
                                        totalCartValue += currentGameAnalyzed.price;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, bets_1 = bets;
                        _a.label = 1;
                    case 1:
                        if (!(_i < bets_1.length)) return [3 /*break*/, 4];
                        bet = bets_1[_i];
                        return [5 /*yield**/, _loop_1(bet)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.cartService.findOnly()];
                    case 5:
                        cart = _a.sent();
                        minimumValue = cart ? cart.min_cart_value : 30;
                        if (totalCartValue < minimumValue)
                            throw new common_1.BadRequestException('Total value of bets is lower than cart minimum value');
                        return [4 /*yield*/, Promise.all(bets.map(function (bet) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.betsRepository.manager.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                                                var newBet;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            newBet = transactionalEntityManager.create(bet_entity_1.Bet, {
                                                                game_id: bet.gameId,
                                                                user_id: user.id,
                                                                numbers: bet.numbers
                                                            });
                                                            return [4 /*yield*/, transactionalEntityManager.save(newBet)];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, (0, kafka_1.produce)(user, 'new-bet')];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.userService.findAllWithSpecifiedRole('admin')];
                    case 8:
                        allAdmins = _a.sent();
                        allAdmins.forEach(function (admin) {
                            (0, kafka_1.produce)(__assign(__assign({}, admin), { playerName: user.name }), 'new-bet-admin-report');
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BetService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(bet_entity_1.Bet))
    ], BetService);
    return BetService;
}());
exports.BetService = BetService;
