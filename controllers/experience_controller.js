import { experienceModel } from "../models/experience-model.js";
import { userModel } from "../models/user_model.js";
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
    const user = await userModel.findById(userSessionId);
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


// Update Experience
export const updateExperience = async (req, res) => {
  try {
    const { error, value } = userProfileSchema.validate(req.body);
  
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id; 
    const user = await userModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const experience = await experienceModel.findByIdAndUpdate(req.params.id, value, { new: true });
      if (!experience) {
          return res.status(404).send("experience not found");
      }

    res.status(200).json({ experience });
  } catch (error) {
    return res.status(500).json({error})
  }
};



//   Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const userSessionId = req.session.user.id; 
      const user = await userModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await experienceModel.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).send("experience not found");
        }
  
        user.experience.pull(req.params.id);
        await user.save();
      res.status(200).json("Experience deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };