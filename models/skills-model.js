import {Schema, model, Types} from "mongoose";

const skillSchema = new Schema({
        
            skillName: { type: String },
            levelOfProficiency: { type: String, enum: ['25', '50', '75', '100'] },
            user:{type: Types.ObjectId, ref: 'User', select:false}
        

    

}, {
    timestamps: true
});

export const skillModel = model('Skill', skillSchema);

   