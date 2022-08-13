"use strict";
exports.__esModule = true;
exports.LoggedUser = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
exports.LoggedUser = (0, common_1.createParamDecorator)(function (data, ctx) {
    var gqlContext = graphql_1.GqlExecutionContext.create(ctx);
    return gqlContext.getContext().req.user;
});
