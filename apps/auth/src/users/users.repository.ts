import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { UsersDocument } from './models/users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UsersDocument.name) usersModel: Model<UsersDocument>,
  ) {
    super(usersModel);
  }
}
