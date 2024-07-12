import {Schema, model} from "mongoose";

const skillSchema = new Schema({
        
            skillName: { type: String },
            levelOfProficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
            user:{type: Types.ObjectId, ref: 'User'}
        

    

}, {
    timestamps: true
});

export const skillModel = model('Skill', skillSchema);

   