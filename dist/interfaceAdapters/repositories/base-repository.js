"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    toDomain;
    toModel;
    constructor(model, toDomain, toModel) {
        this.model = model;
        this.toDomain = toDomain;
        this.toModel = toModel;
    }
    async findById(id) {
        const doc = await this.model.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    async create(data) {
        const doc = await this.model.create(this.toModel(data));
        return this.toDomain(doc);
    }
    async updateById(id, data) {
        const doc = await this.model.findByIdAndUpdate(id, this.toModel(data), { new: true }).exec();
        return doc ? this.toDomain(doc) : null;
    }
    async deleteById(id) {
        const doc = await this.model.findByIdAndDelete(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base-repository.js.map