import { educationModel } from "../models/education-model.js";
import { userModel } from "../models/user_model.js";
import { educationSchema } from "../schema/education_schema.js";

export const addEducation = async (req, res) => {

  try {
    const { error, value } = educationSchema.validate({ ...req.body });
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    //create education with the value
    const education = await educationModel.create({ ...value, user: userId });

    //if you find the user, push the education id you just created inside
    user.education.push(education._id);

    //and save the user now with the educationId
    await user.save();

    //return the education
    res.status(201).json({message:'Education Added'})

  } catch (error) {
    console.log(error);
  }
}


// Get all User Education
export const getAllUserEducation = async (req, res) => {

  try {
    //we are fetching education that belongs to a particular user
    const userId = req.session?.user?.id || req?.user?.id;    
    const alleducation = await educationModel.find({ user: userId })
    if (alleducation.length == 0) {
      return res.status(200).json({Education: alleducation})
    }
    res.status(200).json({ education: alleducation })
  } catch (error) {

  }

}


// Get one User Education by educationId
export const getOneEducation = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const educationId = req.params.educationId;

    const education = await educationModel.findOne({ _id: educationId, user: userId });
    if (!education) {
      return res.status(200).json({education});
    }
    
    res.status(200).json({ education });
  } catch (error) {
    res.status(500).json({Error});
  }
};


// Update Education
export const updateEducation = async (req, res) => {
  try {
    const { error, value } = educationSchema.validate({ ...req.body });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const Education = await educationModel.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!Education) {
      return res.status(404).send("Education not found");
    }

    res.status(201).json({message: "Education Updated"} );
  } catch (error) {
    return res.status(500).json({ error })
  }
};


// Delete User Education
export const deleteEducation = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const education = await educationModel.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).send("Education not found");
    }

    user.education.pull(req.params.id);
    await user.save();
    res.status(200).json({message:"Education deleted"});
  } catch (error) {
    return res.status(500).json({ error })
  }
};
