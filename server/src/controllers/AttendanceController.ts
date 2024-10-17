//src/controllers/AttendanceController.ts
import{Request, Response}from 'express';
import { AttendanceMarksService } from "../services"
import { IAttendance } from "../types/types"

class AttendanceController{
private attendanceMarksService = new AttendanceMarksService

// controller to handle adding of attendance data
public async addAttendanceData(req: Request, res: Response): Promise<Response>{
    const attendanceData: IAttendance = req.body
  
    try{
     
        const newAttendanceData = await this.attendanceMarksService.addAttendanceData(req,attendanceData)
        return res.status(201).json({
            message:"Attendance data added successfully", 
            success: true,
            data: newAttendanceData})
    }
    catch(error:any){
        return res.status(500).json({
            message:"Error occured in saving of attendance data",
            success: false,
        error: error.message})
    }
  

}
// controller to handle fetching of attendance data by unique student id

// controller to get all attendance data

// controller to update attendance data
}
export default new AttendanceController()