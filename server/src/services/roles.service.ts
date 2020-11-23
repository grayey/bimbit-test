import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RolesInterface } from '../interfaces/roles.interface';
import { UsersInterface } from '../interfaces/users.interface'

import { DbWorker } from '../utils/dbworker.utils';

@Injectable()
export class RolesService {
  public dbWork;
  // public relations;

  constructor(
    @InjectModel('Roles') private roleModel: Model<RolesInterface>,
    @InjectModel('Users') private userModel: Model<UsersInterface>,

  ) {
    //* Db worker is hard to manage because you'd have to be switching models in cases of multiple db operations
    // this.dbWork = new DbWorker(userModel);
    // this.relations = { users: userModel }

  }

  /**
   *  This method creates a new role using the dbworker.
   */
  // async createrole() {
  //   this.dbWork.create();
  // }


  /**
   * This method retrieves all roles
   * @return returns a promise of all roles
   */
  async findAll(): Promise<RolesInterface[]> {
    return await this.roleModel.find();
  }

  /**
   * This method retrieves a role by it's Id
   * @return returns a single role instance
   */
  async findOne(id: string): Promise<RolesInterface> {
     const role = await this.roleModel.findOne({ _id: id });
     const users = await this.userModel.find( {role_id:role._id} )
      role['users'] = users;
      return role;

  }

  /**
   * This method creates a new role
   * @return returns the new instance
   */
  async create(role: RolesInterface): Promise<RolesInterface> {
    const newRolesInterface = new this.roleModel(role);
    return await newRolesInterface.save();
  }

  /**
   * This method updates a  role
   * @return returns updated instance
   */
  async update(
    id: string,
    role: RolesInterface,
  ): Promise<RolesInterface> {
    return await this.roleModel.findByIdAndUpdate(id, role, {
      new: true,
    });
  }

  /**
   * This method deletes a  role
   * @return 204: returns empty body
   */
  async delete(id: string): Promise<RolesInterface> {
    return await this.roleModel.findByIdAndRemove(id);
  }


}
