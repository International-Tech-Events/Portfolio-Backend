import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel} from "../models/user_model.js";
import { userSchema} from "../schema/user_schema.js";



export const signup = async (req, res) => {
    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const email = value.email
    // console.log('email', email)
    
    const findIfUserExist = await userModel.findOne({email})
    if (findIfUserExist){
        return res.status(401).send('user has already signed up')
    } else{
        const hashedPassword = await bcrypt.hash(value.password,12)
        value.password = hashedPassword;

        await userModel.create(value)
        return res.status(201).json({message: "Registration successful"})
    }
}


// Login user
export const login = async (req, res, next) => {
    try {
       const { userName, email, password } = req.body;

        // Ensure at least email or userName and password are provided
    if (!password || (!email && !userName)) {
      return res.status(400).json('Email or userName and password are required');
    }
    
       //  Find a user using their email or username
       const user = await userModel.findOne(
          { $or: [{ email: email}, { userName: userName }] }
       );
       if (!user) {
          return res.status(401).json('User does not exist')
       } else {
       // Verify user password
       const correctPass = bcrypt.compareSync(password, user.password);
       if (!correctPass) {
          return res.status(401).json('Invalid login details')
       }
       // Generate a session for the user
       req.session.user = { id: user.id };

       console.log('user', req.session.user)
       // Return response
       res.status(201).json('Login successful')
      }
    } catch (error) {
       next(error)
    }
 }


 export const getUser = async (req, res, next) => {
   try {
     const userName = req.params.userName.toLowerCase();
 
   const options = { sort: { startDate: -1 } }
   const userDetails = await userModel.findOne({ userName }).select("-password")
     .populate({
       path: "education",
       options,
     })
     .populate("userProfile")
     .populate("skill")
 
     .populate({
       path: "achievement",
       options: { sort: { date: -1 } }, 
     })
     .populate({
       path: "experience",
       options, 
     })
     .populate({
       path: "volunteering",
       options, 
     })
     .populate({
         path: 'project',
         options 
     });
 
   return res.status(200).json({ user: userDetails });
   } catch (error) {
     next(error);
   }
 };



 
 export const getUsers = async (req, res) => {
  
 
   const email = req.query.email?.toLowerCase()
   const userName = req.query.userName?.toLowerCase();
 
   const filter = {};
   if (email) {
     filter.email = email;
   }
   if (userName) {
     filter.userName = userName;
   }
 
   const users = await userModel.find(filter);
 
   return res.status(200).json({ users });
 };
 
 
 
 export const logout = async (req, res, next) => {
   try {
     // Destroy user session
     await req.session.destroy();
     // Return response
     res.status(200).json("User logged out");
   } catch (error) {
     next(error);
   }
 };



 export const token = async (req, res, next) => {
  try {
     const { userName, email, password } = req.body;

         //Check if email or userName and password are provided
    if (!password || (!email && !userName)) {
      return res.status(400).json('Email or userName and password are required');
    }


     //  Find a user using their email or username
     const user = await userModel.findOne(
        { $or: [{ email: email }, { userName: userName }] }
     );
     if (!user) {
        return res.status(401).json('User does not exist')
     }
     // Verify user password
     const correctPass = bcrypt.compareSync(password, user.password)
     if (!correctPass) {
        return res.status(401).json('Invalid login details')
     }
     // Generate a token
     const token = jwt.sign(
      {id:user.id}, 
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: '72h' }
    
    );

    //  console.log('user', req.session.user)
     // Return response
     res.status(201).json({
      message: 'User  logged in',
      accessToken: token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName
      }
    });
  } catch (error) {
     next(error)
  }
}
