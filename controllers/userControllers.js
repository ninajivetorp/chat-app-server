const User = require('../models/userModel');
var bcrypt = require('bcryptjs');

const createUser = async(req, res) => {
    const { username, password } = req.body

    if(!username || !password) { 
        return res.status(400).send("All fields are required") 
    }

    if(await User.exists({ username })) return res.status(400).send("User already exists")

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds = 10);

    try{
        const user = await User.create({
            username, 
            password: hashedPassword,
        })
   
        res.status(201).json({ id: user._id, username: user.username })
    } catch(err){
        res.status(400).json("Something went wrong, try again or come back later")
    }

}

const loginUser = async(req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid username or password")

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) return res.status(400).send("Invalid username or password")

    if(user) res.status(200).json({ id: user._id, username: user.username })
    else res.status(400).json("Something went wrong, try again or come back later")

}

const getAllUsers = async(req, res) => {
    try{
        const allUsers = await User.find({}, {username: 1, _id: 1})
        res.status(200).json(allUsers)
    } catch(err){
        return res.status(400).json("Something went wrong, try again or come back later")
    }
}

const getSingleUser = async(req, res) => {

    try{
        const user = await User.find({ _id: req.params.id }, {username: 1, _id: 1})
        res.status(200).json(user)
    } catch(err){
        return res.status(400).json("Something went wrong, try again or come back later")
    }
}



module.exports = { createUser, loginUser, getAllUsers, getSingleUser }