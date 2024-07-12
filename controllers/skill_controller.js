import { Skill } from "../models/skills-model.js";
import { User } from "../models/user_model.js";
import {   skillSchema } from "../schema/skill_schema.js";

export const addSkill = async (req, res) => {

   try {
    const {error, value} = skillSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const skill = await Skill.create(value)
    const user = await User.findById(value.user);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.skill.push(skill._id);
    
    await user.save();

    //return the skill
    res.status(201).json({skill})

   } catch (error) {
    return res.status(500).send(error)
   }
}


// Get all User skills
export const getAllUserSkills = async (req, res) => {

    try {
        const userId = req.params.id
        const allskill = await Skill.find({user: userId})
    if(allskill.length == 0){
        return res.status(404).send('No skills Added')
    }
    res.status(200).json({skill: allskill})
    } catch (error) {
        
    }

}

// Get a skill
export const getUserSkill = async (req, res) => {
    try {
      const skill = await Skill.findById(req.params.skillId);
      if (!skill) {
        return res.status(404).send('Skills not found');
      }
      res.status(201).json({ skill });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  export const updateSkill = async (req, res) => {
    try {
      const { error, value } = skillSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      
      const updatedSkill= await Skill.findByIdAndUpdate(
        req.params.skillId,
        value,
        { new: true }
      );
  
      if (!updatedSkill) {
        return res.status(404).send('Skill not found');
      }
  
      res.status(201).json({ skill: updatedSkill });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

//   Delete Skills
  export const deleteSkill = async (req, res) => {
    try {
      const deletedSkill = await Skill.findByIdAndDelete(req.params.skillId);
  
      if (!deletedSkill) {
        return res.status(404).send('Skill not found');
      }
  
      // Remove Skill reference from user
      const user = await User.findById(deletedSkill.user);
      if (user) {
        user.skill = user.skill.filter(skillId => skillId.toString() !== req.params.skillId);
        await user.save();
      }
  
      res.status(201).json({ skill: deletedSkill });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  