"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PineconeModule = void 0;
const common_1 = require("@nestjs/common");
const pinecone_ingestion_service_1 = require("./services/pinecone-ingestion.service");
const service2_service_1 = require("./services/service2.service");
let PineconeModule = class PineconeModule {
};
exports.PineconeModule = PineconeModule;
exports.PineconeModule = PineconeModule = __decorate([
    (0, common_1.Module)({
        providers: [pinecone_ingestion_service_1.PineconeService, service2_service_1.ChatProcessingService],
        exports: [pinecone_ingestion_service_1.PineconeService, service2_service_1.ChatProcessingService],
    })
], PineconeModule);
//# sourceMappingURL=pinecone.module.js.map