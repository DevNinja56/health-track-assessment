import { Request, Response } from "express";
import { createUser, getUserRole } from "../models/userModel";

// Assign a role to a user (doctor or patient)
export const assignUserRole = async (req: Request, res: Response) => {
  const { userId, email, role } = req.body;
  try {
    await createUser(userId, email, role);
    res
      .status(201)
      .send({ success: true, message: "User role created successfully" });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error creating user role",
      error: error.message,
    });
  }
};

//  Fetch a user's role (doctor or patient)
export const fetchUserRole = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const user = await getUserRole(userId);
    res.status(200).send({ success: true, data: user });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error fetching user role",
      error: error.message,
    });
  }
};
