import { Achievement } from "../models/achievement-model.js";
import { User } from "../models/user_model.js";
import {   achievementSchema } from "../schema/achievement_schema.js";

export const addAchievement = async (req, res) => {

   try {
    const {error, value} = achievementSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const achievement = await Achievement.create(value)
    const user = await User.findById(value.user);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.achievement.push(achievement._id);
    
    await user.save();

    //return the achievement
    res.status(201).json({achievement})

   } catch (error) {
    return res.status(500).send(error)
   }
}


// Get all User Achievement
export const getAllUserAchievement = async (req, res) => {

    try {
        const userId = req.params.id
        const allachievement = await Achievement.find({user: userId})
    if(allachievement.length == 0){
        return res.status(404).send('No Achievement Added')
    }
    res.status(200).json({achievement:allachievement})
    } catch (error) {
        
    }

}

// Get Achievement
export const getUserAchievement = async (req, res) => {
    try {
      const achievement = await Achievement.findById(req.params.achievementId);
      if (!achievement) {
        return res.status(404).send('Achievement not found');
      }
      res.status(201).json({ achievement });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  export const updateAchievement = async (req, res) => {
    try {
      const { error, value } = achievementSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      
      const updatedAchievement= await Achievement.findByIdAndUpdate(
        req.params.achievementId,
        value,
        { new: true }
      );
  
      if (!updatedAchievement) {
        return res.status(404).send('Achievement not found');
      }
  
      res.status(201).json({ achievement: updatedAchievement });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

//   Delete Achievement
  export const deleteAchievement = async (req, res) => {
    try {
      const deletedAchievement = await Achievement.findByIdAndDelete(req.params.achievementId);
  
      if (!deletedAchievement) {
        return res.status(404).send('Achievement not found');
      }
  
      // Remove Achievement reference from user
      const user = await User.findById(deletedAchievement.user);
      if (user) {
        user.achievement = user.achievement.filter(achievementId => achievementId.toString() !== req.params.achievementId);
        await user.save();
      }
  
      res.status(201).json({ achievement: deletedAchievement });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  