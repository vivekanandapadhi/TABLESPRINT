const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = require('../model/user.model');
const secretKey = process.env.JWT_SECRET_KEY;

exports.register = async (req, res) => {
  // Registration logic
  try {
    const { email, password } = req.body;
// console.log(email)
    if (!email || !password) {
      return res.status(400).send('Email and Password are required');
    }

    const existingUser = await UserSchema.findOne({ email });
    
    if (existingUser) {
        
      return res.status(400).send('User already exists');
    }
    else{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserSchema({ email, password: hashedPassword });

    await newUser.save();
    res.status(200).send('Registration successful, Please Login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
};

exports.login = async (req, res) => {
  // Login logic

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Email and Password are required');
    }

    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    
    res.status(200).json({ token });    
  } catch (error) {
    console.log("error")
    console.error(error);
    res.status(500).send('Something went wrong');
  }
};
exports.forgetpassword=async(req,res)=>{
  const {email,password}=req.body;
  const user=await UserSchema.findOne({email})
  // console.log(user)
  if(user){
    const hashedPassword=await bcrypt.hash(password,10);
    user.password = hashedPassword;
    await user.save()
    res.status(200).send("password update successfully")
  }
  else{
    res.status(400).send("User name is not exist")
  }
}
