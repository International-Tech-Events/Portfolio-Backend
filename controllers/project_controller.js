// import { ProjectModel } from "../models/project-model";

// export const postProject = async (req, res, next) => {
//     try {
//         const newProject = await ProjectModel.create(req.body);
//         res.status(201).json(newProject);
//     } catch (error) {
//         next(error);
//     }
// };

// // Get all projects
// export const getProjects = async (req, res, next) => {
//     try {
//         const projects = await projects.find();
//         res.status(200).json(projects);
//     } catch (error) {
//         next(error);
//     }
// };

// // Get a project by ID
// export const getProjectById = async (req, res, next) => {
//     try {
//         const project = await project.findById(req.params.id);
//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }
//         res.status(200).json(project);
//     } catch (error) {
//         next(error);
//     }
// };

// // Update a project by ID
// export const updateProject = async (req, res, next) => {
//     try {
//         const updatedProject = await Project.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!updatedProject) {
//             return res.status(404).json({ message: 'Project not found' });
//         }
//         res.status(200).json(updatedProject);
//     } catch (error) {
//         next(error);
//     }
// };

// // Delete a project by ID
// export const deleteProject = async (req, res, next) => {
//     try {
//         const project = await project.findByIdAndDelete(req.params.id);
//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }
//         res.status(200).json({ message: 'Project deleted' });
//     } catch (error) {
//         next(error);
//     }
// };

import { ProjectModel } from '../models/project-model';

// Create a new project
export const postProject = async (req, res, next) => {
    try {
        const newProject = await ProjectModel.create(req.body);
        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
};

// Get all projects
export const getProjects = async (req, res, next) => {
    try {
        const projects = await ProjectModel.find();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
};

// Get a project by ID
export const getProjectById = async (req, res, next) => {
    try {
        const project = await ProjectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

// Update a project by ID
export const updateProject = async (req, res, next) => {
    try {
        const updatedProject = await ProjectModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
};

// Delete a project by ID
export const deleteProject = async (req, res, next) => {
    try {
        const project = await ProjectModel.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted' });
    } catch (error) {
        next(error);
    }
};