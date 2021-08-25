"use strict";
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
const ytChannel_1 = require("../classes/ytChannel");
const youtubesearchapi = require('youtube-search-api');
function getYTChannelFromQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const resultsObject = yield youtubesearchapi.GetListByKeyword(query);
        console.log(resultsObject);
        const results = resultsObject['items'];
        for (let i = 0; i < results.length; i++) {
            if (results[i]['type'] == 'channel')
                return new ytChannel_1.default(results[i]['title'], `https://www.youtube.com/channel/${results[i]['id']}`, results[i]['thumbnail']);
        }
        return null;
    });
}
exports.default = getYTChannelFromQuery;
