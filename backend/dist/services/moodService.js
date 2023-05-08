var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Mood from '../model/moodSchema.js';
import mongoose from 'mongoose';
import isNotValid from '../validations/validator.js';
export const createMoodService = (moodData) => {
    const { name, color } = moodData;
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const notValid = isNotValid(moodData);
        if (notValid) {
            return reject(notValid);
        }
        const isExist = yield Mood.findOne({
            $or: [
                {
                    name
                }, {
                    color
                }
            ]
        });
        if (isExist) {
            return reject(new Error('Name exists: createMoodService!'));
        }
        Mood.create(moodData)
            .then((response) => {
            resolve(response);
        })
            .catch(() => {
            reject(new Error('Database error: createMoodService!'));
        });
    }));
};
export const editMoodService = ({ id, data }) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject(new Error('Id required: editMoodService!'));
        }
        const notValid = isNotValid(data);
        if (notValid) {
            return reject(notValid);
        }
        const _id = new mongoose.Types.ObjectId(id);
        Mood.updateOne({ _id }, {
            name: data === null || data === void 0 ? void 0 : data.name,
            color: data === null || data === void 0 ? void 0 : data.color
        }).then(() => {
            return Mood.findOne({ _id });
        }).then((response) => {
            resolve(response);
        }).catch(() => {
            return reject(new Error('Database error: editMoodService!'));
        });
    });
};
export const deleteMoodService = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject(new Error('Id required: deleteMoodService!'));
        }
        Mood.deleteOne({
            _id: new mongoose.Types.ObjectId(id)
        }).then(() => {
            resolve(true);
        }).catch(() => {
            reject(new Error("Database error: deleteMoodService!"));
        });
    });
};
