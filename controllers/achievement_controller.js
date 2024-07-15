import { achievementModel } from "../models/achievement-model.js";
import { userModel } from "../models/user_model.js";
import { achievementSchema } from "../schema/achievement_schema.js";

export const addAchievement = async (req, res) => {

  try {
    const { error, value } = achievementSchema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const achievement = await achievementModel.create({ ...value, user: userSessionId });

    console.log('userId', req.session.user.id)
    const userSessionId = req.session.user.id
    const user = await userModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send('User not found');
    }

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

// Get one Achievement
export const getUserAchievement = async (req, res) => {
  try {
    const userSessionId = req.session.user.id
    const achievementId = req.params.id;

    const allachievements = await achievementModel.find({ user: userSessionId });


    if (allachievements.length === 0) {
      return res.status(404).send('No achievement found for this user');
    }

    const achievement = allachievements.find(achievement => achievement._id.toString() === achievementId);

    if (!achievement) {
      return res.status(404).send('Achievement not found');
    }
    res.status(201).json({ achievement });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


// Update an Achievement
export const updateAchievement = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const achievementId = req.params.id; 

    const { error, value } = achievementSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const achievementToUpdate = await achievementModel.findOne({ _id: achievementId, user: userSessionId });

    if (!achievementToUpdate) {
      return res.status(404).send('Achievement not found');
    }

    const updatedAchievement = await achievementModel.findByIdAndUpdate(
      achievementId,
      value,
      { new: true }
    );

    res.status(201).json({ achievement: updatedAchievement });
  } catch (error) {
    console.error('Error updating achievement:', error);
    res.status(500).send(error.message);
  }
};


//   Delete Achievement
export const deleteAchievement = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const achievementId = req.params.id;

    const allachievements = await achievementModel.find({ user: userSessionId });
      
      if (allachievements.length === 0) {
          return res.status(404).send('No achievement found for this user');
      }

      const achievementToDelete = allachievements.find(achievement => achievement._id.toString() === achievementId);
      
      if (!achievementToDelete) {
          return res.status(404).send('Achievement not found');
      }
      
      await achievementToDelete.remove();
      
      res.status(200).json({ message: 'Achievement deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
