"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonResponse = commonResponse;
function commonResponse(success, message, data) {
    return {
        success,
        message,
        ...(data && { data }),
    };
}
//# sourceMappingURL=common-response.js.map