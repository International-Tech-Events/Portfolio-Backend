import { experienceModel } from "../models/experience-model.js";
import { User } from "../models/user_model.js";
import { experienceSchema } from "../schema/experience_schema.js";

export const addExperience = async (req, res) => {

  try {
    const { error, value } = experienceSchema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    const experience = await experienceModel.create({ ...value, user: userSessionId });

    console.log('userId', req.session.user.id)
    const userSessionId = req.session.user.id
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.experience.push(experience._id);

    await user.save();

    //return the experience
    res.status(201).json({ experience })

  } catch (error) {
    return res.status(500).send(error)
  }
}


// Get all User Experience
export const getAllUserExperience = async (req, res) => {

  try {
    const userSessionId = req.session.user.id
    const allexperience = await experienceModel.find({ user: userSessionId })

    if (allexperience.length == 0) {
      return res.status(404).send('No Experience Added')
    }
    res.status(200).json({ experience: allexperience })
  } catch (error) {

  }

}

// Get one experience
export const getUserExperience = async (req, res) => {
  try {
    const userSessionId = req.session.user.id
    const experienceId = req.params.id;

    const allexperience = await experienceModel.find({ user: userSessionId });

    if (allexperience.length === 0) {
      return res.status(404).send('No experience found for this user');
    }

    const experience = allexperience.find(experience => experience._id.toString() === experienceId);

    if (!experience) {
      return res.status(404).send('Experience not found');
    }
    res.status(201).json({ experience });
  } catch (error) {
    res.status(500).send(error);
  }
};


// Update Experience
export const updateExperience = async (req, res) => {
  try {

    const userSessionId = req.session.user.id;
    const experienceId = req.params.id;

    const { error, value } = experienceSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const experienceToUpdate = await experienceModel.findOne({ _id: experienceId, user: userSessionId });

    if (!experienceToUpdate) {
      return res.status(404).send('Experience not found');
    }

    const updatedExperience = await experienceModel.findByIdAndUpdate(
      experienceId,
      value,
      { new: true }
    );



    res.status(201).json({ experience: updatedExperience });
  } catch (error) {
    console.error('Error updating Experience:', error);
    res.status(500).send(error.message);
  }
};


//   Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const experienceId = req.params.id;

    const allexperience = await experienceModel.find({ user: userSessionId });

    if (allexperience.length === 0) {
      return res.status(404).send('No experience found for this user');
    }

    const experienceToDelete = allexperience.find(experience => experience._id.toString() === experienceId);

    if (!experienceToDelete) {
      return res.status(404).send('Experience not found');
    }

    await experienceToDelete.remove();

    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};