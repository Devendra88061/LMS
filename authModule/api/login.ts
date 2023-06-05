import { Router } from 'express';
import Users  from '../module/user';
export const login = Router();

console.log("You are in login");

login.post("/login", async (request : any , response:any)=>{
    try {
        // check if the user exists
        const user = await Users.findOne({ email: request.body.email });
        console.log("user=>",user);
        if (user) {
          //check if password matches
          const result = request.body.password === user.password;
          if (result) {
            response.status(200).json({result :"Login Successfully"});
          } else {
            response.status(400).json({ error: "password doesn't match" });
          }
        } else {
            response.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        response.status(400).json({ error });
      }
});