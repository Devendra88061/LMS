import { Router } from 'express';
import Users from '../module/user';
import { Res } from '../../commons/response';
export const userModule = Router();
const reso = new Res();

//get all user 

userModule.get("/users", async (request, response) => {
    try {
      const users = await Users.find();
      reso.statusCode = 200,
      reso.message = "User return successfully",
      reso.data = users,
      response.status(200).json(reso);
    } catch (error) {
        reso.statusCode = 500,
        reso.message = "Internal server error",
        response.status(200).json(reso);
    }
  });