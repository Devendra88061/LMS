import { Router } from 'express';
import Users from '../module/user';
import { Res } from '../../commons/response';
export const login = Router();
const reso = new Res();

login.post("/login", async (request: any, response: any) => {
  try {
    // check if the user exists
    const user = await Users.findOne({ email: request.body.email });
    console.log("user=>", user);
    if (user) {
      //check if password matches
      const result = request.body.password === user.password;
      if (result) {
          reso.statusCode = 200,
          reso.message = "User login successfully",
          response.status(200).json(reso);
      } else {
          reso.statusCode = 400,
          reso.message = "Password doesn't match",
          response.status(400).json(reso);
      }
    } else {
        reso.statusCode = 400,
        reso.message = "User doesn't exist",
        response.status(400).json(reso);
    }
  } catch (error) {
      reso.statusCode = 500,
      reso.message = "internal server error",
      response.status(500).json(reso);

  }
});