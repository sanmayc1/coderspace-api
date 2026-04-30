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
exports.GetAllPaymentsUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const mongo_utils_1 = require("../../../shared/utils/mongo-utils");
const mappers_1 = require("../../dtos/mappers/mappers");
let GetAllPaymentsUseCase = class GetAllPaymentsUseCase {
    _paymentRepository;
    constructor(_paymentRepository) {
        this._paymentRepository = _paymentRepository;
    }
    async execute(page, limit, sort, search) {
        const sortby = mongo_utils_1.PAYMENT_SORTING[sort] || mongo_utils_1.PAYMENT_SORTING.NEWEST;
        const filter = search
            ? {
                razorpayPaymentId: { op: 'contains', value: search },
                status: { op: 'in', value: ['success', 'failed'] },
            }
            : { status: { op: 'in', value: ['success', 'failed'] } };
        const projections = [
            'razorpayPaymentId',
            'amount',
            'status',
            'planId',
            'createdAt',
            'userId',
        ];
        const relations = ['userId', 'planId'];
        const skip = (page - 1) * limit;
        const { data, total } = await this._paymentRepository.getAllPayments({
            filter,
            sort: sortby,
            projections,
            relations,
            skip,
            limit,
        });
        const response = data.map((payment) => mappers_1.getAllPaymentsUsecaseMapper.toResponse(payment));
        return {
            data: response,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        };
    }
};
exports.GetAllPaymentsUseCase = GetAllPaymentsUseCase;
exports.GetAllPaymentsUseCase = GetAllPaymentsUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPaymentRepository')),
    __metadata("design:paramtypes", [Object])
], GetAllPaymentsUseCase);
//# sourceMappingURL=get-all-payments.usecase.js.map