import diaryData from '../../data/entries';

import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    return entry;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};


const addDiary = (
    entry: NewDiaryEntry
): DiaryEntry => {
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

export default {
    getEntries, findById,
    getNonSensitiveEntries,
    addDiary
};