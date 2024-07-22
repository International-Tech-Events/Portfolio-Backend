import { skillModel } from "../models/skills-model.js";
import { userModel } from "../models/user_model.js";
import { skillSchema } from "../schema/skill_schema.js";

export const addSkill = async (req, res) => {

  try {
    const { error, value } = skillSchema.validate({ ...req.body })
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const skill = await skillModel.create({ ...value, user: userId });

    user.skill.push(skill._id);

    await user.save();

    //return the skill
    res.status(201).json({message: "Skill Added"})

  } catch (error) {
    return res.status(500).send(error)
  }
}


// Get all User skills
export const getAllUserSkills = async (req, res) => {

  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const allskill = await skillModel.find({ user: userId })

    if (allskill.length == 0) {
      return res.status(404).json({skills: allskill})
    }
    res.status(200).json({ skill: allskill })
  } catch (error) {

  }

}


// Get one User Skill by skillId
export const getOneSkill = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const skillId = req.params.skillId;

    const skill = await skillModel.findOne({ _id: skillId, user: userId });
    if (!skill) {
      return res.status(404).json(skill);
    }
    
    res.status(200).json({ skill });
  } catch (error) {

    res.status(500).send({error});
  }
};


// Update Skills
export const updateSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate({ ...req.body });


    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await skillModel.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!skill) {
      return res.status(404).send("Skill not found");
    }

    res.status(200).json({message: "Skill Updated"});
  } catch (error) {
    return res.status(500).json({ error })
  }
};


//   Delete Skills
export const deleteSkill = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await skillModel.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).send("Skill not found");
    }

    user.skill.pull(req.params.id);
    await user.save();
    res.status(200).json({message: "Skill deleted"});
  } catch (error) {
    return res.status(500).json({ error })
  }
};