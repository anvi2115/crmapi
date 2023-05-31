import Controller from "../utils/interface/controller.interface";
import { Router ,NextFunction, Request,Response } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import validate from './user.validation'
import HttpException from  '../utils/exceptions/HttpException'
import UserService from "./user.service";
import { GetUserError, RegisterUserError } from "../utils/messageConstants";

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.post(
            `${this.path}/customersignup`,
            validationMiddleware(validate.register),
            this.customersignup
        );
        this.router.post(
            `${this.path}/userExists`,
            validationMiddleware(validate.userExits),
            this.userExists
        );
        this.router.post(
            `${this.path}/updatePassword`,
            validationMiddleware(validate.updatePassword),
            this.updatePassword
        );
        this.router.post(
            `${this.path}/forgotPassword`,
            validationMiddleware(validate.userExits),
            this.forgotPassword
        );
    }


    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const result = await this.UserService.getUser(email,password);
            res.status(200).json({ result });
        } catch (error) {
            next(new HttpException(400, GetUserError));
        }
    };

    private customersignup = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const result = await this.UserService.register(req.body);
            res.status(200).json({ status:true, message:"Customer registered Successfully" });
        } catch (error) {
            next(new HttpException(400, RegisterUserError));
        }
    };

    private userExists = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {email } = req.body;
            const result = await this.UserService.userExists(email);
            res.status(200).json({ result });
        } catch (error) {
            next(new HttpException(400, GetUserError));
        }
    };

    private updatePassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {email ,newPassword } = req.body;
            const result = await this.UserService.updatePassword(email,newPassword);
            res.status(200).json({ status:true, message:"Updated Password Successfully" });
        } catch (error) {
            next(new HttpException(400, GetUserError));
        }
    };

    private forgotPassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {email } = req.body;
            const result = await this.UserService.forgotPassword(email);
            res.status(200).json({ result });
        } catch (error) {
            next(new HttpException(400, GetUserError));
        }
    };
}

export default UserController;
