import bcrypt from "bcrypt";
import { userModel} from "../models/user_model.js";
import { userSchema} from "../schema/user_schema.js";



export const signup = async (req, res) => {
    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const email = value.email
    console.log('email', email)
    
    const findIfUserExist = await userModel.findOne({email:email})
    if (findIfUserExist){
        return res.status(401).send('user has already signed up')
    } else{
        const hashedPassword = await bcrypt.hash(value.password,12)
        value.password = hashedPassword
        const addUser = await userModel.create(value)
        return res.status(201).send(addUser)
    }
}

   

// Login user
export const login = async (req, res, next) => {
    try {
       const { userName, email, password } = req.body;
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
       // Generate a session for the user
       req.session.user = { id: user.id }

       console.log('user', req.session.user)
       // Return response
       res.status(201).json('Login successful')
    } catch (error) {
       next(error)
    }
 }
