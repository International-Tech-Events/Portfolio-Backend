import { skillModel } from "../models/skills-model.js";
import { userModel } from "../models/user_model.js";
import { skillSchema } from "../schema/skill_schema.js";

export const addSkill = async (req, res) => {

  try {
    const { error, value } = skillSchema.validate({...req.body})
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

const userSessionId = req.session.user.id

const user = await userModel.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const skill = await skillModel.create({ ...value, user: userSessionId });

    user.skill.push(skill._id);

    await user.save();

    //return the skill
    res.status(201).json({ skill })

  } catch (error) {
    return res.status(500).send(error)
  }
}


// Get all User skills
export const getAllUserSkills = async (req, res) => {

  try {
    const userSessionId = req.session.user.id
    const allskill = await skillModel.find({ user: userSessionId })

    if (allskill.length == 0) {
      return res.status(404).send('No skills Added')
    }
    res.status(200).json({ skill: allskill })
  } catch (error) {

  }

}




// Update Skills
export const updateSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate({...req.body});

  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session.user.id; 
      const user = await userModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const skill = await skillModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!skill) {
            return res.status(404).send("Skill not found");
        }
  
      res.status(200).json({ skill });
    } catch (error) {
      return res.status(500).json({error})
    }
  };


//   Delete Skills
export const deleteSkill = async (req, res) => {
  try {
    const userSessionId = req.session.user.id; 
      const user = await userModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const skill = await skillModel.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).send("Skill not found");
        }
  
        user.skill.pull(req.params.id);
        await user.save();
      res.status(200).json("Skill deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };