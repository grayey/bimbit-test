import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersInterface } from '../interfaces/users.interface';
import { RolesInterface } from '../interfaces/roles.interface';
import { DbWorker } from '../utils/dbworker.utils';
import { LoginInDto } from '../dtos/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  public dbWork;
  constructor(
    @InjectModel('Users') private userModel: Model<UsersInterface>,
    @InjectModel('Roles') private roleModel: Model<RolesInterface>,
  ) {
    //* Db worker is hard to manage because you'd have to be switching models in cases of multiple db operations
    // this.dbWork = new DbWorker(userModel);
  }

  /**
   *  This method creates a new user using the dbworker.
   */
  // async createuser() {
  //   this.dbWork.create();
  // }


  /**
   * This method retrieves all users
   * @return returns a promise of all users
   */
  async findAll(): Promise<UsersInterface[]> {
    return await this.userModel.find();
  }

  /**
   * This method retrieves a user by its Id
   * @return returns a single user instance
   */
  async findOne(id: string): Promise<UsersInterface> {
    return await this.userModel.findOne({ _id: id });
  }

  async findByEither(username): Promise<UsersInterface> {
    console.log(username, 'shshshs')
    return await this.userModel.findOne({ $or: [{ email: username }, { username }] })
  }

  /**
   * This method creates a new user
   * @return returns the new instance
   */
  async create(user: UsersInterface): Promise<UsersInterface> {
    const dummyPassword = "password";
    const hashedPassword = await bcrypt.hash(dummyPassword, 10); // hash password with 10 salt rounds
    const newUsersInterface = new this.userModel(
      { ...user,
        password:hashedPassword
      }
    );
    const newUser = await newUsersInterface.save();
    newUser.password = undefined;  // equivalent to deleting the property
    return newUser;

  }

  /**
   * This method deletes a  user
   * @return 204: returns empty body
   */
  async delete(id: string): Promise<UsersInterface> {
    return await this.userModel.findByIdAndRemove(id);
  }

  /**
   * This method updates a  user
   * @return returns updated instance
   */
  async update(
    id: string,
    user: UsersInterface,
  ): Promise<UsersInterface> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }

  /**
   * This method attempts to find a user by their username or email
   * @return returns a user instance
   */
  async attemptUserLogin(loginData:LoginInDto): Promise<any>{
    const { username, password, email }  = loginData;

    let user = await this.userModel.findOne({username});
    if(!user){
      user = await this.userModel.findOne({email:username});
    }
    return user;
  }

  /**
   * This method retrieves a user's role from the user object
   * @return returns a role instance or undefined
   */
  async appendUserRole(user:UsersInterface):Promise<RolesInterface | undefined>{
    const { role_id } = user;
    const role = await this.roleModel.findOne({_id:role_id});
    return  role;

  }


}
