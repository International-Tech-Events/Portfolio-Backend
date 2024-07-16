
import { projectSchema } from "../schema/project_schema.js";
import { userModel} from "../models/user_model.js";
import { ProjectModel } from "../models/project-model.js";

export const createProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate({...req.body});

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;   
    const user = await userModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const project = await ProjectModel.create({ ...value, user: userSessionId });

    user.project.push(project._id)

    await user.save();

    res.status(201).json({ project });
  } catch (error) {
    console.log(error);
  }
};



export const getAllProjects = async (req, res) => {
  try {
    //we are fetching Project that belongs to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;    
    const allProject = await ProjectModel.find({ user: userSessionId });
    if (allProject.length == 0) {
      return res.status(404).send("No Project added");
    }
    res.status(200).json({ Projects: allProject });
  } catch (error) {
    return res.status(500).json({error})
  }
};



export const updateProject = async (req, res) => {
    try {
      const { error, value } = projectSchema.validate({...req.body});

  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session?.user?.id || req?.user?.id;      
      const user = await userModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const project = await ProjectModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!project) {
            return res.status(404).send("Project not found");
        }
  
      res.status(200).json({ project });
    } catch (error) {
      return res.status(500).json({error})
    }
  };


  export const deleteProject = async (req, res) => {
    try {
     
  
      const userSessionId = req.session?.user?.id || req?.user?.id;      
      const user = await userModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const project = await ProjectModel.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).send("Project not found");
        }
  
        user.project.pull(req.params.id);
        await user.save();
      res.status(200).json("Project deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };



  