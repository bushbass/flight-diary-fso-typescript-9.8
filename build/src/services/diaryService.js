"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entries_1 = __importDefault(require("../../data/entries"));
const diaries = entries_1.default;
const getEntries = () => {
    return diaries;
};
const findById = (id) => {
    const entry = diaries.find(d => d.id === id);
    return entry;
};
const getNonSensitiveEntries = () => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const addDiary = (entry) => {
    const { date, weather, visibility, comment } = entry;
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        date,
        weather,
        visibility,
        comment,
    };
    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};
exports.default = {
    getEntries, findById,
    getNonSensitiveEntries,
    addDiary
};
