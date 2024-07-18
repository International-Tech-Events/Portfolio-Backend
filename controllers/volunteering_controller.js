import { volunteeringModel } from "../models/volunteering-model.js"
import { userModel } from "../models/user_model.js";
import { volunteeringSchema } from "../schema/volunteering_schema.js";

export const addVolunteering = async (req, res) => {

  try {
    const { error, value } = volunteeringSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const volunteering = await volunteeringModel.create({
      ...value,
      user: userSessionId,
    });

    user.volunteering.push(volunteering._id);

    await user.save();

    res.status(201).json({ volunteering });
  } catch (error) {
    console.log(error);
  }
};

// Get all User volunteering
export const getAllUserVolunteering = async (req, res) => {

  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const allvolunteering = await volunteeringModel.find({ user: userSessionId })
    if (allvolunteering.length == 0) {
      return res.status(404).send('No Volunteering Added')
    }
    res.status(200).json({ volunteering: allvolunteering })
  } catch (error) {

  }

}


// Get one User Volunteering by volunteeringId
export const getOneVolunteering = async (req, res) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const volunteeringId = req.params.volunteeringId;

    const volunteering = await volunteeringModel.findOne({ _id: volunteeringId, user: userSessionId });
    if (!volunteering) {
      return res.status(404).send('volunteering not found');
    }
    
    res.status(200).json({ volunteering });
  } catch (error) {
    console.error('Error fetching volunteering:', error);
    res.status(500).send('Server Error');
  }
};




// Update Volunteering
export const updateVolunteering = async (req, res) => {
  try {
    const { error, value } = volunteeringSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const volunteering = await volunteeringModel.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    if (!volunteering) {
      return res.status(404).send("Volunteering not found");
    }

    res.status(200).json({ volunteering });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


//   Delete Volunteering
export const deleteVolunteering = async (req, res) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const volunteering = await volunteeringModel.findByIdAndDelete(req.params.id);
    if (!volunteering) {
      return res.status(404).send("Volunteering not found");
    }

    user.volunteering.pull(req.params.id);
    await user.save();

    res.status(200).json("Volunteering deleted");
  } catch (error) {
    return res.status(500).json({ error });
  }
};
