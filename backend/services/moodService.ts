import { moodType, keyable } from '../types/type.js'
import Mood from '../model/moodSchema.js'
import mongoose, { ObjectId } from 'mongoose';
import isNotValid from '../validations/validator.js';

export const createMoodService = (moodData: moodType): Promise<unknown> => {
    const {name, color} = moodData;
    return new Promise(async (resolve, reject) => {
        const notValid = isNotValid(moodData)
        if(notValid){
            return reject(notValid);
        }
        const isExist = await Mood.findOne({
            $or: [
                {
                    name
                },{
                    color
                }
            ]
        });
        if(isExist){
            return reject(new Error('Name exists: createMoodService!'))
        }
        Mood.create(moodData)
        .then((response) => {
            resolve(response)
        })
        .catch(() => {
            reject(new Error('Database error: createMoodService!'));
        })
    });
};

type editMoodServiceParams = {
    id: string, 
    data: {
        name: string,
        color: string
    }
}

export const editMoodService = ({id, data}: editMoodServiceParams): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        if(!id){
            return reject(new Error('Id required: editMoodService!'))
        }
        const notValid = isNotValid(data)
        if(notValid){
            return reject(notValid);
        }
        const _id = new mongoose.Types.ObjectId(id)
        Mood.updateOne({_id},{
            name: data?.name,
            color: data?.color
        }).then(() => {
            return Mood.findOne({_id})
        }).then((response) => {
            resolve(response)
        }).catch(() => {
            return reject(new Error('Database error: editMoodService!'))
        })
    })
}

export const deleteMoodService = (id: string) :Promise<unknown> => {
    return new Promise((resolve, reject) => {
        if(!id){
            return reject(new Error('Id required: deleteMoodService!'))
        }
        Mood.deleteOne({
            _id: new mongoose.Types.ObjectId(id)
        }).then(() => {
            resolve(true)
        }).catch(() => {
            reject(new Error("Database error: deleteMoodService!"))
        })
    })
}