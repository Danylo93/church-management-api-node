import { Request, Response } from "express";
import { getCourses } from "../services/course.service";

export const listCourses = async (req: Request, res: Response) => {
  try {
    const courses = await getCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
