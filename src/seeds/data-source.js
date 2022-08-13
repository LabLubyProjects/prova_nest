"use strict";
exports.__esModule = true;
exports.dataSource = void 0;
var typeorm_1 = require("typeorm");
var MainSeeder_1 = require("./MainSeeder");
var options = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    seeds: [MainSeeder_1.MainSeeder],
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: !!process.env.DB_SYNC
};
exports.dataSource = new typeorm_1.DataSource(options);
