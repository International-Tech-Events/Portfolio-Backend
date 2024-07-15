import { Router } from "express";
import { createUserProfile,getUserProfile, updateUserProfile} from "../controllers/user-profile-controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const userProfileRouter = Router();

userProfileRouter.post(
    "/users/userProfile",
    remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    createUserProfile
  );
  userProfileRouter.patch(
      "/users/userProfile/:id",
      remoteUpload.fields([
        { name: "profilePicture", maxCount: 1 },
        { name: "resume", maxCount: 1 },
      ]),
      checkUserSession,
      updateUserProfile
    );

    userProfileRouter.get('/users/userProfile', getUserProfile);
  




// userProfileRouter.post('/userProfiles', upload.single('profilePicture'), checkUserSession,postuserProfile);

// userProfileRouter.get('/userProfiles/:id', getUserProfileById);
// userProfileRouter.patch('/userProfiles/:id', upload.single('profilePicture'), updateUserProfile);
// userProfileRouter.delete('/userProfiles/:id', deleteUserProfile);

