import { skillModel } from "../models/skills-model.js";
import { User } from "../models/user_model.js";
import { skillSchema } from "../schema/skill_schema.js";

export const addSkill = async (req, res) => {

  try {
    const { error, value } = skillSchema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const skill = await skillModel.create({ ...value, user: userSessionId });

    console.log('userId', req.session.user.id)
    const userSessionId = req.session.user.id
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }
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

// Get a skill
export const getUserSkill = async (req, res) => {
  try {
    const userSessionId = req.session.user.id
    const skillId = req.params.id;

    const allskill = await skillModel.find({ user: userSessionId });

    if (allskill.length === 0) {
      return res.status(404).send('No skills found for this user');
    }

    const skill = allskill.find(skill => skill._id.toString() === skillId);

    if (!skill) {
      return res.status(404).send('Skills not found');
    }
    res.status(201).json({ skill });
  } catch (error) {
    res.status(500).send(error);
  }
};



// Update Skills
export const updateSkill = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const skillId = req.params.id;

    const { error, value } = skillSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const skillToUpdate = await skillModel.findOne({ _id: skillId, user: userSessionId });
    if (!skillToUpdate) {
      return res.status(404).send('Skill not found');
    }

    const updatedSkill = await skillModel.findByIdAndUpdate(
      skillId,
      value,
      { new: true }
    );


    res.status(201).json({ skill: updatedSkill });
  } catch (error) {
    console.error('Error updating education:', error);
    res.status(500).send(error.message);
  }
};


//   Delete Skills
export const deleteSkill = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const skillId = req.params.id;

    const allskill = await skillModel.find({ user: userSessionId });

    if (allskill.length === 0) {
      return res.status(404).send('No skills found for this user');
    }

    const skillToDelete = allskill.find(skill => skill._id.toString() === skillId);

    if (!skillToDelete) {
      return res.status(404).send('Skills not found');
    }

    await skillToDelete.remove();

    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
