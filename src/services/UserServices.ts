import { injectable } from "tsyringe";
import { User } from "../models/UserModel";
import { IUser } from "../types/IUser";

@injectable()
export default class UserService {
  FindAllUsersAsync = async (): Promise<Array<IUser>> => {
    return User.findAll();
  };

  GetByUsernameAsync = async (username: string): Promise<IUser> => {
    return User.findOne({ where: { username: username } });
  };

  GetByEmailAsync = async (email: string): Promise<IUser> => {
    return User.findOne({ where: { email: email } });
  };

  PostAsync = async (user: IUser): Promise<IUser> => {
    return User.create(user);
  };
}
