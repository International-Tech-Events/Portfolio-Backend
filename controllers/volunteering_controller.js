import { volunteeringModel } from "../models/volunteering-model.js"
import { userModel } from "../models/user_model.js";
import { volunteeringSchema } from "../schema/volunteering_schema.js";

export const addVolunteering = async (req, res) => {

  try {
    const { error, value } = volunteeringSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const volunteering = await volunteeringModel.create({
      ...value,
      user: userId,
    });

    user.volunteering.push(volunteering._id);

    await user.save();

    res.status(201).json("volunteering Added");
  } catch (error) {
    console.log(error);
  }
};

// Get all User volunteering
export const getAllUserVolunteering = async (req, res) => {

  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const allvolunteering = await volunteeringModel.find({ user: userId })
    if (allvolunteering.length == 0) {
      return res.status(404).json({volunteering: allvolunteering})
    }
    res.status(200).json({ volunteering: allvolunteering })
  } catch (error) {

  }

}


// Get one User Volunteering by volunteeringId
export const getOneVolunteering = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const volunteeringId = req.params.volunteeringId;

    const volunteering = await volunteeringModel.findOne({ _id: volunteeringId, user: userId });
    if (!volunteering) {
      return res.status(200).json({volunteering});
    }
    
    res.status(200).json({ volunteering });
  } catch (error) {
    res.status(500).send({error});
  }
};




// Update Volunteering
export const updateVolunteering = async (req, res) => {
  try {
    const { error, value } = volunteeringSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);
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

    res.status(200).json("volunteering Updated");
  } catch (error) {
    return res.status(500).json({ error });
  }
};


//   Delete Volunteering
export const deleteVolunteering = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);
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
