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
    const userId = req.session?.user?.id || req?.user?.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const achievement = await achievementModel.create({ ...value, user: userId });

    user.achievement.push(achievement._id);

    await user.save();

    //return the achievement
    res.status(201).json({ achievement })

  } catch (error) {
    console.log(error);
  }
}


// Get all User Achievement
export const getAllUserAchievement = async (req, res) => {

  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const allachievements = await achievementModel.find({ user: userId })
    if (allachievements.length == 0) {
      return res.status(200).json({achievement: allachievements})
    }
    res.status(200).json({ achievement: allachievements })
  } catch (error) {
    return res.status(500).json({Error})
  }

}


// Get one User Achievement by achievementId
export const getOneAchievement = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const achievementId = req.params.achievementId;

    const achievement = await achievementModel.findOne({ _id: achievementId, user: userId });
    if (!achievement) {
      return res.status(200).json({Achievement: achievement});
    }
    
    res.status(200).json({ achievement });
  } catch (error) {
    res.status(500).json({Error});
  }
};

// Update an Achievement
export const updateAchievement = async (req, res) => {
  try {
    const { error, value } = achievementSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);
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
    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);
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
