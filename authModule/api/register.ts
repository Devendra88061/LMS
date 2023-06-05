import { Router } from 'express';
import Users  from '../module/user';
export const register = Router();

var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

register.post('/register', async (request : any , response : any) => {
    let user = await Users.findOne({ email: request.body?.email });
    if (user) {
        return response.status(400).send({message : 'User already exist!'});
    } else {
        if(!request.body.username || !request.body.email || !request.body.password ){
           return response.status(400).send({message : 'Required fields are missing'});
        }
        else if(!(request.body.email.match(validRegex))){
            return response.status(400).send({message : 'Please enter a valid Email'});
        }
        else if ((request.body.password).length < 6){
            return response.status(400).send({message : 'Password must contain atleast 6 characters'})
        }
        else{
            user = new Users({
                username: request.body.username,
                email: request.body.email,
                password: request.body.password
            });
            await user.save();
            response.send(user);
        } 
     }
});


function validateEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  