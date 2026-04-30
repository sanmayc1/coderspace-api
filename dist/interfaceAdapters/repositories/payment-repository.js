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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("./base-repository");
const payment_model_1 = require("../../frameworks/database/models/payment.model");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const mongo_utils_1 = require("../../shared/utils/mongo-utils");
let PaymentRepository = class PaymentRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(payment_model_1.PaymentModel, dto_mapper_1.paymentRepositoryMapper.toEntity, dto_mapper_1.paymentRepositoryMapper.toModel);
    }
    async findByRazorpayOrderId(razorpayOrderId) {
        const doc = await payment_model_1.PaymentModel.findOne({ razorpayOrderId });
        return doc ? dto_mapper_1.paymentRepositoryMapper.toEntity(doc) : null;
    }
    async updatePaymentByRazorpayOrderId(razorpayOrderId, data) {
        await payment_model_1.PaymentModel.updateOne({ razorpayOrderId }, data);
    }
    async getAllPayments(data) {
        const filter = data.filter ? (0, mongo_utils_1.convertToMongoFilter)(data.filter) : {};
        const projection = data.projections ? (0, mongo_utils_1.convertToMongoProjection)(data.projections) : {};
        const relations = data.relations ? data.relations.join(' ') : '';
        const sort = data.sort ? (0, mongo_utils_1.convertToMongoSort)(data.sort) : {};
        const skip = data.skip ?? 0;
        const [docs, total] = await Promise.all([
            payment_model_1.PaymentModel.find(filter, projection)
                .populate(relations)
                .sort(sort)
                .skip(skip)
                .limit(data.limit)
                .lean(),
            payment_model_1.PaymentModel.countDocuments(filter),
        ]);
        return { data: docs.map((doc) => dto_mapper_1.paymentRepositoryMapper.toEntity(doc)), total };
    }
};
exports.PaymentRepository = PaymentRepository;
exports.PaymentRepository = PaymentRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], PaymentRepository);
//# sourceMappingURL=payment-repository.js.map