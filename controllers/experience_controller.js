import { Experience } from "../models/experience-model.js";
import { User } from "../models/user_model.js";
import {   experienceSchema } from "../schema/experience_schema.js";

export const addExperience = async (req, res) => {

   try {
    const {error, value} = experienceSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const experience = await Experience.create(value)
    const user = await User.findById(value.user);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.experience.push(experience._id);
    
    await user.save();

    //return the experience
    res.status(201).json({experience})

   } catch (error) {
    return res.status(500).send(error)
   }
}


// Get all User Experience
export const getAllUserExperience = async (req, res) => {

    try {
        const userId = req.params.id
        const allexperience = await Experience.find({user: userId})
    if(allexperience.length == 0){
        return res.status(404).send('No Experience Added')
    }
    res.status(200).json({experience:allexperience})
    } catch (error) {
        
    }

}

// Get experience
export const getUserExperience = async (req, res) => {
    try {
      const experience = await Experience.findById(req.params.experienceId);
      if (!experience) {
        return res.status(404).send('Experience not found');
      }
      res.status(201).json({ experience });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  export const updateExperience = async (req, res) => {
    try {
      const { error, value } = experienceSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      
      const updatedExperience= await Experience.findByIdAndUpdate(
        req.params.experienceId,
        value,
        { new: true }
      );
  
      if (!updatedExperience) {
        return res.status(404).send('Experience not found');
      }
  
      res.status(201).json({ experience: updatedExperience });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

//   Delete experience
  export const deleteExperience= async (req, res) => {
    try {
      const deletedExperience = await Experience.findByIdAndDelete(req.params.experienceId);
  
      if (!deletedExperience) {
        return res.status(404).send('Experience not found');
      }
  
      // Remove experience reference from user
      const user = await User.findById(deletedExperience.user);
      if (user) {
        user.experience = user.experience.filter(experienceId => experienceId.toString() !== req.params.experienceId);
        await user.save();
      }
  
      res.status(201).json({ experience: deletedExperience});
    } catch (error) {
      res.status(500).send(error);
    }
  };
  