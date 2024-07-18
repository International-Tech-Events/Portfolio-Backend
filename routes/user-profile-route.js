import { Router } from "express";
import { createUserProfile,getUserProfile, getOneUserProfile, updateUserProfile} from "../controllers/user-profile-controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const userProfileRouter = Router();

userProfileRouter.post(
    "/users/userProfile",
    remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
      { name: "coverPhoto", maxCount: 1 }
    ]),
    checkUserSession,
    createUserProfile
  );
  userProfileRouter.patch(
      "/users/userProfile/:id",
      remoteUpload.fields([
        { name: "profilePicture", maxCount: 1 },
        { name: "resume", maxCount: 1 },
        { name: "coverPhoto", maxCount: 1 }
      ]),
      checkUserSession,
      updateUserProfile
    );

    userProfileRouter.get('/users/userProfile', checkUserSession, getUserProfile);
  
    userProfileRouter.get('/users/userProfile/:userProfieId', checkUserSession, getOneUserProfile);

