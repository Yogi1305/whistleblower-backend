import { Complain } from "../models/complain.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { createWhistleBlower } from "./userController.js";
import Department from "../models/department.model.js"

export const createcomplain = async (req, res) => {
    console.log("HIT")
    try {
        const { department,  title, description, category } = req.body
     
        if (!department  || !title || !description )
            return res.status(400).json({ message: "All field are required", success: false })
        const urls = [];
        
        for (const file of req.files) {
            const url = await uploadOnCloudinary(file.path);
            if (url) urls.push(url);
            console.log("uploaded :: ", url);
        }
        console.log("Uploaded urls ", urls)
        const dep= await Department.findOne({departmentname:department})
        if(!dep)
            return res.status(404).json({message:"no department found",success:false});
        const complain = new Complain({
            departmentAddressed:dep,
         
            title,
            description,
            file: urls,
            category,
            status:"assign"
        })
        dep.totalComplain.push(complain._id);
        await dep.save();
        console.log("Created Complaint");
        const { newWhistleBlower, username, password } = await createWhistleBlower();
        const newComplaint = await complain.save()
        return res.status(201).json({ message: "your complain send to Admin", WhistleBlower: { username, password }, newComplaint, success: true })

    } catch (error) {
        console.log("error in complain creation", error)
    }
}
// all complain
export const getAllComplain = async (req, res) => {

    try {
        const complain = await Complain.find();
        return res.status(201).json({ message: "complain", complain, sucess: true })
    } catch (error) {

    }
}