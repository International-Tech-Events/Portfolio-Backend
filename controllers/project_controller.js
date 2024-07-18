
import { projectSchema } from "../schema/project_schema.js";
import { userModel} from "../models/user_model.js";
import { ProjectModel } from "../models/project-model.js";

export const createProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate({...req.body});

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;   
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const project = await ProjectModel.create({ ...value, user: userId });

    user.project.push(project._id)

    await user.save();

    res.status(201).json({message: "Project Added"});
  } catch (error) {
    console.log(error);
  }
};



export const getAllProjects = async (req, res) => {
  try {
    //we are fetching Project that belongs to a particular user
    const userId = req.session?.user?.id || req?.user?.id;    
    const allProject = await ProjectModel.find({ user: userId });
    if (allProject.length == 0) {
      return res.status(404).json(allProject);
    }
    res.status(200).json({ Projects: allProject });
  } catch (error) {
    return res.status(500).json({error})
  }
};


// Get one User Project by projectId
export const getOneProject = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const projectId = req.params.projectId;

    const project = await ProjectModel.findOne({ _id: projectId, user: userId });
    if (!project) {
      return res.status(404).json(project);
    }
    
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).send({error});
  }
};


export const updateProject = async (req, res) => {
    try {
      const { error, value } = projectSchema.validate({...req.body});

  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user?.id;      
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const project = await ProjectModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!project) {
            return res.status(404).send("Project not found");
        }
  
      res.status(200).json({message: "Project Updated"});
    } catch (error) {
      return res.status(500).json({error})
    }
  };


  export const deleteProject = async (req, res) => {
    try {
     
  
      const userId = req.session?.user?.id || req?.user?.id;      
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const project = await ProjectModel.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).send("Project not found");
        }
  
        user.project.pull(req.params.id);
        await user.save();
      res.status(200).json({message:"Project deleted"});
    } catch (error) {
      return res.status(500).json({error})
    }
  };



  