import { volunteeringModel } from "../models/volunteering-model.js"
import { userModel } from "../models/user_model.js";
import {   volunteeringSchema } from "../schema/volunteering_schema.js";

export const addVolunteering = async (req, res) => {

   try {
    const {error, value} = volunteeringSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const volunteering = await volunteeringModel.create({...value, user: userSessionId});

    console.log('userId', req.session.user.id)
    const userSessionId = req.session.user.id
    const user = await userModel.findById(userSessionId);
    
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
        const userSessionId = req.session.user.id
        const allvolunteering = await volunteeringModel.find({user: userSessionId})
    if(allvolunteering.length == 0){
        return res.status(404).send('No Volunteering Added')
    }
    res.status(200).json({volunteering: allvolunteering})
    } catch (error) {
        
    }

}

// Get one volunteering
export const getUserVolunteering = async (req, res) => {
    try {
      const userSessionId = req.session.user.id
    const volunteeringId = req.params.id;

      const allvolunteering = await volunteeringModel.find({user: userSessionId});

      if (allvolunteering.length === 0) {
        return res.status(404).send('No volunteering found for this user');
      }
  
      const volunteering = allvolunteering.find(volunteering => volunteering._id.toString() === volunteeringId);

      if (!volunteering) {
        return res.status(404).send('Volunteering not found');
      }
      res.status(201).json({ volunteering });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  // Update Volunteering
  export const updateVolunteering = async (req, res) => {
    try {
      const userSessionId = req.session.user.id
    const volunteeringId = req.params.id;

   // Validate the request body
   const { error, value } = volunteeringSchema.validate(req.body);
   if (error) {
     return res.status(400).send(error.details[0].message);
   }

   // Find the specific volunteering record to update by its ID 
   const volunteeringToUpdate = await volunteeringModel.findOne({ _id: volunteeringId, user: userSessionId });

   if (!volunteeringToUpdate) {
     return res.status(404).send('Volunteering not found');
   }

   // Update the volunteering record
   const updatedVolunteering = await volunteeringModel.findByIdAndUpdate(
     volunteeringId,
     value,
     { new: true }
   );

   res.status(200).json({ volunteering: updatedVolunteering });
 } catch (error) {
   console.error('Error updating volunteering:', error);
   res.status(500).send(error.message);
 }
};


//   Delete Volunteering
  export const deleteVolunteering = async (req, res) => {
    try {
      const userSessionId = req.session.user.id;
    const volunteeringId = req.params.id;

    const allvolunteering = await volunteeringModel.find({ user: userSessionId });

    if (allvolunteering.length === 0) {
      return res.status(404).send('No volunteering found for this user');
    }

    const volunteeringToDelete = allvolunteering.find(volunteering => volunteering._id.toString() === volunteeringId);

    if (!volunteeringToDelete) {
      return res.status(404).send('Volunteering not found');
    }

    await volunteeringToDelete.remove();

    res.status(200).json({ message: 'Volunteering deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
