import * as MySQLConnector from "../utils/mysql.connector";
import {
  GetUser,
  InsertUser,
  SelectUserForEmail,
  UpdatePasswordForEmail,
  ForgotPassword
} from "./user.queries";
import { GetUserError, RegisterUserError } from "../utils/messageConstants";
import userInterface from "../utils/interface/user.interface";

class UserService {
  public async getUser(
    email: string,
    password: string
  ): Promise<string | Error> {
    try {
      const output = await MySQLConnector.execute(GetUser, [password, email]);
      let result = JSON.parse(JSON.stringify(output));
      return result;
    } catch (error) {
      throw new Error(GetUserError);
    }
  }

  public async register(userDetails: userInterface): Promise<string | Error> {
    try {
      const output = await MySQLConnector.execute(InsertUser, [
        userDetails.first_name,
        userDetails.last_name,
        userDetails.email,
        userDetails.password,
        userDetails.phone,
        userDetails.address1,
        userDetails.address2,
        userDetails.address3,
        userDetails.city,
        userDetails.state,
        userDetails.country,
        userDetails.postcode,
        userDetails.creation_date,
        userDetails.update_date,
      ]);

      let result = JSON.parse(JSON.stringify(output));
      return result;
    } catch (error) {
      throw new Error(RegisterUserError);
    }
  }

  public async userExists(userEmail: string): Promise<boolean | Error> {
    const output = await MySQLConnector.execute(SelectUserForEmail, [
      userEmail,
    ]);
    let result = JSON.parse(JSON.stringify(output));
    return result;
  }

  public async forgotPassword(userEmail: string): Promise<boolean | Error> {
    const output = await MySQLConnector.execute(ForgotPassword, [
      userEmail,
    ]);
    let result = JSON.parse(JSON.stringify(output));
    return result;
  }

  public async updatePassword(
    userEmail: string,
    newPassword: string
  ): Promise<boolean | Error> {
    const output = await MySQLConnector.execute(UpdatePasswordForEmail, [
      newPassword,
      userEmail,
    ]);
    let result = JSON.parse(JSON.stringify(output));
    return result;
  }
}

export default UserService;
