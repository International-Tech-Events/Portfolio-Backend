import { experienceModel } from "../models/experience-model.js";
import { userModel } from "../models/user_model.js";
import { experienceSchema } from "../schema/experience_schema.js";

export const addExperience = async (req, res) => {

  try {
    const { error, value } = experienceSchema.validate({ ...req.body })
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const experience = await experienceModel.create({ ...value, user: userId });

    user.experience.push(experience._id);

    await user.save();

    //return the experience
    res.status(201).json({message:"Experience Added"})

  } catch (error) {
    return res.status(500).send(error)
  }
}


// Get all User Experience
export const getAllUserExperience = async (req, res) => {

  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const allexperience = await experienceModel.find({ user: userId })

    if (allexperience.length == 0) {
      return res.status(200).json({Experience: allexperience})
    }
    res.status(200).json({ experience: allexperience })
  } catch (error) {

  }

}

// Get one User Experience by experienceId
export const getOneExperience = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const experienceId = req.params.experienceId;

    // Find the experience by experienceId and userId
    const experience = await experienceModel.findOne({ _id: experienceId, user: userId });
    if (!experience) {
      return res.status(404).json(experience);
    }
    
    res.status(200).json({ experience });
  } catch (error) {
    res.status(500).json({Error});
  }
};

// Update Experience
export const updateExperience = async (req, res) => {
  try {
    const { error, value } = userProfileSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const experience = await experienceModel.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!experience) {
      return res.status(404).send("experience not found");
    }

    res.status(200).json({message: "Experience Updated"});
  } catch (error) {
    return res.status(500).json({ error })
  }
};



//   Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const experience = await experienceModel.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).send("experience not found");
    }

    user.experience.pull(req.params.id);
    await user.save();
    res.status(200).json({message: "Experience deleted"});
  } catch (error) {
    return res.status(500).json({ error })
  }
};