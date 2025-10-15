import { Complain } from "../models/complain.model.js";
import { Department } from "../models/deparmentdetail.js"; 
import { User } from "../models/user.model.js";



export const getalldepart = async (req, res) => {
  try {
    const departments = await Department.find().select("departmentName");

    res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch departments",
      error: error.message,
    });
  }
};



export const createDepartment = async (req, res) => {
  try {
    const { departmentName ,username,email,password} = req.body;

    if(!departmentName || !username || !email || !password)
        return res.status(400).json({message:"all field are required",success:false})


   
    if (!departmentName) {
      return res.status(400).json({
        success: false,
        message: "Department name is required.",
      });
    }

   
    const existingDept = await Department.findOne({ departmentName });
    if (existingDept) {
      return res.status(400).json({
        success: false,
        message: "Department already exists.",
      });
    }

   
    const department = await Department.create({
      departmentName,
      state,
    });

    const user= User.create({
      username,
      email,
      password
    });
    department.admin=user;
    department.save()

    res.status(201).json({
      success: true,
      message: "Department created successfully.",
      department,
    });
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create department.",
      error: error.message,
    });
  }
};


// assign the complain add middleware to check only admin assign


export const assignComplain = async (req, res) => {
  try {
    const { complainId, departmentId } = req.body; 
   
    if (!complainId || !departmentId) {
      return res.status(400).json({
        success: false,
        message: "Both complainId and departmentId are required.",
      });
    }

    const complain = await Complain.findById(complainId);
    const department = await Department.findById(departmentId);

    if (!complain || !department) {
      return res.status(404).json({
        success: false,
        message: "Complain or Department not found.",
      });
    }

 
    department.totalComplain.push(complainId);
    await department.save();

    complain.assignedDepartment=department.departmentName
    complain.Status = "assign";
    await complain.save();

    res.status(200).json({
      success: true,
      message: "Complain assigned to department successfully.",
      department,
    });
  } catch (error) {
    console.error("Error assigning complain:", error);
    res.status(500).json({
      success: false,
      message: "Failed to assign complain.",
      error: error.message,
    });
  }
};


