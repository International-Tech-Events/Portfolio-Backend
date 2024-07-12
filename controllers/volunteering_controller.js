import { Volunteering } from "../models/volunteering-model.js";
import { User } from "../models/user_model.js";
import {   volunteeringSchema } from "../schema/volunteering_schema.js";

export const addVolunteering = async (req, res) => {

   try {
    const {error, value} = volunteeringSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const volunteering = await Volunteering.create(value)
    const user = await User.findById(value.user);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.volunteering.push(volunteering._id);
    
    await user.save();

    //return volunteering
    res.status(201).json({volunteering})

   } catch (error) {
    return res.status(500).send(error)
   }
}


// Get all User volunteering
export const getAllUserVolunteering = async (req, res) => {

    try {
        const userId = req.params.id
        const allvolunteering = await Volunteering.find({user: userId})
    if(allvolunteering.length == 0){
        return res.status(404).send('No Volunteering Added')
    }
    res.status(200).json({volunteering: allvolunteering})
    } catch (error) {
        
    }

}

// Get volunteering
export const getUserVolunteering = async (req, res) => {
    try {
      const volunteering = await Volunteering.findById(req.params.volunteeringId);
      if (!volunteering) {
        return res.status(404).send('Volunteering not found');
      }
      res.status(201).json({ volunteering });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  export const updateVolunteering = async (req, res) => {
    try {
      const { error, value } = volunteeringSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      
      const updatedVolunteering= await Volunteering.findByIdAndUpdate(
        req.params.volunteeringId,
        value,
        { new: true }
      );
  
      if (!updatedVolunteering) {
        return res.status(404).send('Volunteering not found');
      }
  
      res.status(201).json({ volunteering: updatedVolunteering });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

//   Delete Volunteering
  export const deleteVolunteering = async (req, res) => {
    try {
      const deletedVolunteering = await Volunteering.findByIdAndDelete(req.params.volunteeringtId);
  
      if (!deletedVolunteering) {
        return res.status(404).send('volunteering not found');
      }
  
      // Remove volunteering reference from user
      const user = await User.findById(deletedVolunteering.user);
      if (user) {
        user.volunteering = user.volunteering.filter(volunteeringId => volunteeringId.toString() !== req.params.volunteeringId);
        await user.save();
      }
  
      res.status(201).json({ volunteering: deletedVolunteering });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  