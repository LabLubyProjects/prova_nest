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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./entities/user.entity");
var UserService = /** @class */ (function () {
    function UserService(userRepository, roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    UserService.prototype.create = function (createUserInput) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerRole, newUser;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { cpf: createUserInput.cpf }
                        })];
                    case 1:
                        _a = (_b.sent());
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { email: createUserInput.email }
                            })];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a)
                            throw new common_1.UnprocessableEntityException('User already exists');
                        return [4 /*yield*/, this.roleService.findByName('player')];
                    case 4:
                        playerRole = _b.sent();
                        newUser = this.userRepository.create(createUserInput);
                        newUser.roles = [playerRole];
                        return [4 /*yield*/, this.userRepository.manager.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, transactionalEntityManager.save(newUser)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, newUser];
                }
            });
        });
    };
    UserService.prototype.findAll = function () {
        return this.userRepository.find();
    };
    UserService.prototype.findAllWithBets = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userRepository.find({
                        relations: {
                            bets: true
                        }
                    })];
            });
        });
    };
    UserService.prototype.findAllWithSpecifiedRole = function (role) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userRepository.find({
                        relations: {
                            roles: true
                        },
                        where: {
                            roles: {
                                name: role
                            }
                        }
                    })];
            });
        });
    };
    UserService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneBy({ id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.NotFoundException('User not found');
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.NotFoundException('User not found');
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.update = function (id, updateUserInput) {
        return __awaiter(this, void 0, void 0, function () {
            var userToUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        userToUpdate = _a.sent();
                        return [2 /*return*/, this.userRepository.save(__assign(__assign({}, userToUpdate), updateUserInput))];
                }
            });
        });
    };
    UserService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userToDelete, isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        userToDelete = _a.sent();
                        return [4 /*yield*/, this.userRepository["delete"](userToDelete.id)];
                    case 2:
                        isDeleted = _a.sent();
                        if (!isDeleted)
                            throw new common_1.InternalServerErrorException('Could not delete user');
                        return [2 /*return*/, userToDelete];
                }
            });
        });
    };
    UserService.prototype.grantRoles = function (id, roles) {
        return __awaiter(this, void 0, void 0, function () {
            var userToGrant;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        userToGrant = _a.sent();
                        return [4 /*yield*/, Promise.all(roles.map(function (role) { return __awaiter(_this, void 0, void 0, function () {
                                var newUserRole;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!!userToGrant.roles.some(function (userRole) { return userRole.name === role; })) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.roleService.findByName(role)];
                                        case 1:
                                            newUserRole = _a.sent();
                                            userToGrant.roles.push(newUserRole);
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.userRepository.manager.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, transactionalEntityManager.save(userToGrant)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.findOne(id)];
                }
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
