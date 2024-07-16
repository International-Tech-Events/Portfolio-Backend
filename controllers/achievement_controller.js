import { achievementModel } from "../models/achievement-model.js";
import { userModel } from "../models/user_model.js";
import { achievementSchema } from "../schema/achievement_schema.js";

export const addAchievement = async (req, res) => {

  try {
    const { error, value } = achievementSchema.validate({ 
      ...req.body,
      image: req.file.filename
     });
    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    const userSessionId = req.session.user.id

    const user = await userModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const achievement = await achievementModel.create({ ...value, user: userSessionId });
    
    user.achievement.push(achievement._id);

    await user.save();

    //return the achievement
    res.status(201).json({ achievement })

  } catch (error) {
    return res.status(500).send(error)
  }
}


// Get all User Achievement
export const getAllUserAchievement = async (req, res) => {

  try {
    const userSessionId = req.session.user.id
    const allachievements = await achievementModel.find({ user: userSessionId })
    if (allachievements.length == 0) {
      return res.status(404).send('No Achievement Added')
    }
    res.status(200).json({ achievement: allachievements })
  } catch (error) {

  }

}


// Update an Achievement
export const updateAchievement = async (req, res) => {
  try {
    const { error, value } = achievementSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;
    const user = await userModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const achievement = await achievementModel.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!achievement) {
      return res.status(404).send("Achievement not found");
    }

    res.status(200).json({ achievement });
  } catch (error) {
    return res.status(500).json({ error })
  }
};


//   Delete Achievement
export const deleteAchievement = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const user = await userModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const achievement = await achievementModel.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).send("Achievement not found");
    }

    user.achievement.pull(req.params.id);
    await user.save();

    res.status(200).json("Achievement deleted");
  } catch (error) {
    return res.status(500).json({ error })
  }
};
