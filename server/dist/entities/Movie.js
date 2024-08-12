"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class Movie {
    constructor(name, types, regions, showTimeInMinutes) {
        this.isPopular = false;
        this.isComing = false;
        this.isClassic = false;
        this.name = name;
        this.types = types;
        this.showRegions = regions;
        this.showTimeInMinutes = showTimeInMinutes;
    }
    validateThis() {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield (0, class_validator_1.validate)(this);
            const result = [];
            errors.forEach((err) => {
                if (err.constraints) {
                    result.push(...Object.values(err.constraints));
                }
            });
            return result;
        });
    }
    static transform(plainObject) {
        return (0, class_transformer_1.plainToClass)(Movie, plainObject);
    }
}
exports.Movie = Movie;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'movie name can not be empty' }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], Movie.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'movie at least has one type' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'movie at least has one type' }),
    (0, class_validator_1.IsArray)({ message: 'movie types must be a Array' }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], Movie.prototype, "types", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'movie at least has one show region' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'movie at least has one show region' }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], Movie.prototype, "showRegions", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'movie show time can not be empty' }),
    (0, class_validator_1.IsInt)({ message: 'movie show time must be a integer' }),
    (0, class_validator_1.Min)(1, { message: 'movie show time at least 1 minute' }),
    (0, class_validator_1.Max)(600, { message: 'movie show time too long' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], Movie.prototype, "showTimeInMinutes", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'movie popularity can not be empty' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Object)
], Movie.prototype, "isPopular", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'movie coming can not be empty' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Object)
], Movie.prototype, "isComing", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'movie classic can not be empty' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Object)
], Movie.prototype, "isClassic", void 0);
