import { User } from '../models/data/User';
import { IGenericRepository } from './GenericRepository';

export abstract class IDataAccessService {
  user: IGenericRepository<User>;
}
