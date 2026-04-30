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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCompanyUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const account_mapper_1 = require("../dtos/mappers/account.mapper");
const custom_error_1 = require("../../domain/utils/custom-error");
const constant_1 = require("../../shared/constant");
let RegisterCompanyUsecase = class RegisterCompanyUsecase {
    _bcrypt;
    _walletRepository;
    _accountRepository;
    _companyRepository;
    constructor(_bcrypt, _walletRepository, _accountRepository, _companyRepository) {
        this._bcrypt = _bcrypt;
        this._walletRepository = _walletRepository;
        this._accountRepository = _accountRepository;
        this._companyRepository = _companyRepository;
    }
    async execute(data) {
        const account = account_mapper_1.accountDtoMapper.toEntity(data);
        const existingAccount = await this._accountRepository.findByEmail(account.email);
        if (existingAccount) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.CONFLICT, constant_1.ERROR_MESSAGES.EMAIL_EXIST, 'email');
        }
        const existingGstin = await this._companyRepository.findByGstin(data.gstin);
        if (existingGstin) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.CONFLICT, constant_1.ERROR_MESSAGES.GSTIN_EXIST, 'gstin');
        }
        const hashedPassword = await this._bcrypt.hash(account.password);
        account.password = hashedPassword;
        account.role = 'company';
        const newAccount = await this._accountRepository.create(account);
        await this._companyRepository.create({
            accountId: newAccount._id,
            gstin: data.gstin,
        });
        await this._walletRepository.create({ accountId: newAccount._id });
        return account.email;
    }
};
exports.RegisterCompanyUsecase = RegisterCompanyUsecase;
exports.RegisterCompanyUsecase = RegisterCompanyUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IBcrypt')),
    __param(1, (0, tsyringe_1.inject)('IWalletRepository')),
    __param(2, (0, tsyringe_1.inject)('IAccountRepository')),
    __param(3, (0, tsyringe_1.inject)('ICompanyRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], RegisterCompanyUsecase);
//# sourceMappingURL=register-company.usecase.js.map