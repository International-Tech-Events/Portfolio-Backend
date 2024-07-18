import { userProfileModel } from "../models/userProfile-model.js";
import { userProfileSchema } from "../schema/userProfile_schema.js";
import { userModel } from "../models/user_model.js";

export const createUserProfile = async (req, res) => {
    
  try {
    const { error, value } = userProfileSchema.validate({
      ...req.body,
      profilePicture: req.files.profilePicture[0].filename,
      resume: req.files.resume[0].filename,
      coverPhoto: req.files.coverPhoto[0].filename,
    });


    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    console.log(value)

    const profile = await userProfileModel.create({ ...value, user: userId });
    // console.log('py', profile)

    user.userProfile = profile._id;

    await user.save();

    res.status(201).json({ profile });
  } catch (error) {
    console.log(error);
  }
};



export const updateUserProfile = async (req, res) => {
    try {
      const { error, value } = userProfileSchema.validate({
        ...req.body,
        profilePicture: req.files.profilePicture[0].filename,
        resume: req.files.resume[0].filename,
        coverPhoto: req.files.coverPhoto[0].filename,
      });
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user?.id;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const profile = await userProfileModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!profile) {
            return res.status(404).send("Profile not found");
        }
  
      res.status(201).json({ profile });
    } catch (error) {
      console.log(error);
    }
  };
  



  export const getUserProfile = async (req, res) => {
    try {
    //  Get user id from session or request
      const userId = req.session?.user?.id || req?.user?.id;
      const profile = await userProfileModel.find({ user: userId });
      if (!profile) {
        return res.status(404).json(profile);
      }
      res.status(200).json({profile});
    } catch (error) {
      return res.status(500).json({error})
    }
  };


// Get one User Profile by userProfileId
export const getOneUserProfile = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const userProfileId = req.params.userProfileId;

    const userProfile = await userProfileModel.findOne({ _id: userProfileId, user: userId });
    if (!userProfile) {
      return res.status(404).json(userProfile);
    }
    
    res.status(200).json({ userProfile });
  } catch (error) {
    res.status(500).send({error});
  }
};