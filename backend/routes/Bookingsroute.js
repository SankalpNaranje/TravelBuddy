const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchUser');
const Booking = require("../models/Booking");

router.post("/bookcar" ,  fetchuser,async(req,res) => {
    try{
        const newbooking = new Booking(req.body)
        const savedbooking  =  await newbooking.save()
        res.json(savedbooking)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//get all bookings of a user
router.get('/bookings',  fetchuser,async (req, res)=>{
    try{
        const booking = await Booking.find({bookeduser : req. user.id})
        res.json(booking)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router