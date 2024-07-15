import { userProfileModel } from "../models/userProfile-model.js";
import { userProfileSchema } from "../schema/userProfile_schema.js";
import {userModel} from "../models/user_model.js"


// Create a new user profile
export const postuserProfile = async (req, res, next) => {
    try {
        const newuserProfile = await userProfileSchema.create({
            ...req.body,
            image: req.file.filename
        });
        // Return response
        res.json(newuserProfile);
    } catch (error) {
        next(error);
    }
}

// Get all user profiles
export const getUserProfile = async (req, res, next) => {
    try {
        const userProfiles = await userProfileModel.find();
        res.status(200).json(userProfiles);
    } catch (error) {
        next(error);
    }
};

// Get a user profile by ID
export const getUserProfileById = async (req, res, next) => {
    try {
        const userProfile = await userProfileModel.findById(req.params.id);
        if (!userProfile) {
            return res.status(404).json({ message: 'UserProfile not found' });
    } else{
        res.status(200).json(userProfile);
    }
        
    } catch (error) {
        next(error);
    }
};

// Update a user profile by ID
export const updateUserProfile = async (req, res, next) => {
    try {
        const updatedUserProfile = await userProfileModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body, image: req.file.filename },
            { new: true, runValidators: true }
        );
        if (!updatedUserProfile) {
            return res.status(404).json({ message: 'UserProfile not found' });
} else {
    res.status(200).json(updatedUserProfile);}
        
    } catch (error) {
        next(error);
    }
};

// Delete a user profile by ID
export const deleteUserProfile = async (req, res, next) => {
    try {
        const userProfile = await userProfileModel.findByIdAndDelete(req.params.id);
        if (!userProfile) {
            return res.status(404).json({ message: 'UserProfile not found' });
        } else {
            res.status(200).json({ message: 'UserProfile deleted' });}
        
    } catch (error) {
        next(error);
    }
};




