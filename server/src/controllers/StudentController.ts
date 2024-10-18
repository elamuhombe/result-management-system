//src/controllers/StudentController.ts
import {Request, Response} from "express"
import { StudentService } from "../services"
import { IStudent } from "../types/types";


class StudentController{
    private studentService = new StudentService();
    // add a new student
    public async addStudent(req: Request, res: Response): Promise<Response>{
        const studentData: IStudent = req.body
        try{
            const newStudentData = await this.studentService.addStudent(req,studentData)
            return res.status(201).json({
                message: "student data saved successfully",
                data:newStudentData
            })
        }catch(error: any){
            return res.status(400).json({message:error.message|| "saving of student data failed"})
        }
    }
    // get a new student
    // update student data
}
export default new StudentController()