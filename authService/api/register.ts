import { Router } from 'express';
import Users from '../module/user';
export const register = Router();
import { Res } from '../../commons/response';

var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const reso = new Res();

register.post('/register', async (request: any, response: any) => {
    let user = await Users.findOne({ email: request.body?.email });
    if (user) {
          reso.statusCode = 400,
          reso.message = "User already exist!",
          response.status(400).json(reso);
    } else {
        if (!request.body.username || !request.body.email || !request.body.password) {
          reso.statusCode = 400,
          reso.message = "Required fields are missing",
          response.status(400).json(reso);
        
        }
        else if (!(request.body.email.match(validRegex))) {
          reso.statusCode = 400,
          reso.message = "Please enter a valid Email",
          response.status(400).json(reso);
        }
        else if ((request.body.password).length < 6) {
          reso.statusCode = 400,
          reso.message = "Password must contain atleast 6 characters",
          response.status(400).json(reso); 
        }
        else {
            user = new Users({
                username: request.body.username,
                email: request.body.email,
                password: request.body.password
            });
            await user.save();
            reso.statusCode = 200,
            reso.message = "User register successfully",
            reso.data = user
            response.status(200).json(reso); 
        }
    }
});


