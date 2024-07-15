// import { userProfileModel } from "../models/userProfile-model.js";
// import { userProfileSchema } from "../schema/userProfile_schema.js";


// // Create a new user profile
// export const postuserProfile = async (req, res, next) => {
//     try {
//         const newuserProfile = await userProfileSchema.create({
//             ...req.body,
//             image: req.file.filename
//         });
//         // Return response
//         res.json(newuserProfile);
//     } catch (error) {
//         next(error);
//     }
// }

// // Get all user profiles
// export const getUserProfile = async (req, res, next) => {
//     try {
//         const userProfiles = await userProfileModel.find();
//         res.status(200).json(userProfiles);
//     } catch (error) {
//         next(error);
//     }
// };

// // Get a user profile by ID
// export const getUserProfileById = async (req, res, next) => {
//     try {
//         const userProfile = await userProfileModel.findById(req.params.id);
//         if (!userProfile) {
//             return res.status(404).json({ message: 'UserProfile not found' });
//     } else{
//         res.status(200).json(userProfile);
//     }
        
//     } catch (error) {
//         next(error);
//     }
// };

// // Update a user profile by ID
// export const updateUserProfile = async (req, res, next) => {
//     try {
//         const updatedUserProfile = await userProfileModel.findByIdAndUpdate(
//             req.params.id,
//             { ...req.body, image: req.file.filename },
//             { new: true, runValidators: true }
//         );
//         if (!updatedUserProfile) {
//             return res.status(404).json({ message: 'UserProfile not found' });
// } else {
//     res.status(200).json(updatedUserProfile);}
        
//     } catch (error) {
//         next(error);
//     }
// };

// // Delete a user profile by ID
// export const deleteUserProfile = async (req, res, next) => {
//     try {
//         const userProfile = await userProfileModel.findByIdAndDelete(req.params.id);
//         if (!userProfile) {
//             return res.status(404).json({ message: 'UserProfile not found' });
//         } else {
//             res.status(200).json({ message: 'UserProfile deleted' });}
        
//     } catch (error) {
//         next(error);
//     }
// };



import { UserProfile } from "../models/userProfile_model.js";
import { userProfileSchema } from "../schema/user_schema.js";
import { User } from "../models/user_model.js";
import { userProfileModel } from "../models/userProfile-model.js";


export const createUserProfile = async (req, res) => {
  try {
    const { error, value } = userProfileSchema.validate({
      ...req.body,
      profilePicture: req.files.profilePicture[0].filename,
      resume: req.files.resume[0].filename,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const userSessionId = req.session.user.id;
   
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const profile = await UserProfile.create({ ...value, user: userSessionId });
    user.userProfile = profile._id;
    await user.save();
    res.status(201).json({ profile });
  } catch (error) {
    console.log(error);
  }
};



export const getUserProfile = async (req, res) => {
    try {

      const userSessionId = req.session.user.id
      const profile = await UserProfile.find({ user: userSessionId });
      if (!profile) {
        return res.status(404).send("No profile added");
      }
      res.status(200).json({ profile});
    } catch (error) {
      return res.status(500).json({error})
    }
  };


  export const updateUserProfile = async (req, res) => {
    try {
      const { error, value } = userProfileSchema.validate({
        ...req.body,
        profilePicture: req.files.profilePicture[0].filename,
        resume: req.files.resume[0].filename,
      });
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session.user.id; 
      const user = await User.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const profile = await UserProfile.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!profile) {
            return res.status(404).send("Profile not found");
        }
  
      res.status(201).json({ profile });
    } catch (error) {
      console.log(error);
    }
  };


  export const deleteUserProfile = async (req, res, next) =>{
    try {
        const userSessionId = req.session.user.id;
        const user = await userProfileModel.findById(userSessionId);
        if(!user) {
            return res.status(404).send("User not found");
        }
        const deleteUserProfile = await userProfileModel.findByIdAndDelete(
            req.param.id
        );
        if(!deleteUserProfile) {
            return res.status(404).send('Education not found')
        }
        res.status(201).json({ profile });
    } catch (error) {
        next(error);
    }
  }