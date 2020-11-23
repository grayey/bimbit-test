import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TasksInterface } from '../interfaces/tasks.interface';
import { DbWorker } from '../utils/dbworker.utils';
import * as RoutesConfig from '../utils/config/routes.config';

@Injectable()
export class TasksService {
  public dbWork;
  constructor(
    @InjectModel('Tasks') private taskModel: Model<TasksInterface>,
  ) {
    this.dbWork = new DbWorker(taskModel);
  }

  /**
   *  This method creates or gets all system tasks task
   */
  async createorGetAlltasks() {
    let allTasks = await this.taskModel.find();
    if(!allTasks.length){
       const appRoutes = RoutesConfig.getAppRoutes();
      for(const key in appRoutes){
        appRoutes[key].forEach( async (route) => {
          const task : TasksInterface = {
            ...route,
            module_name: key
          }
          const newTask = new this.taskModel(task);
          await  newTask.save();
        });
      }

    }
    return await this.findAll();
  }

  async findAll(): Promise<TasksInterface[]> {
    return await this.taskModel.find();
  }

  async findOne(id: string): Promise<TasksInterface> {
    return await this.taskModel.findOne({ _id: id });
  }

  async create(task: TasksInterface): Promise<TasksInterface> {
    const newTasksInterface = new this.taskModel(task);
    return await newTasksInterface.save();
  }

  async delete(id: string): Promise<TasksInterface> {
    return await this.taskModel.findByIdAndRemove(id);
  }

  async update(
    id: string,
    task: TasksInterface,
  ): Promise<TasksInterface> {
    return await this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
    });
  }
}
