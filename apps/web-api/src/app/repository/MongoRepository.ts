import { Model } from 'mongoose';
import { IGenericRepository } from '../interfaces/GenericRepository';
import { Observable, from } from 'rxjs';

export class MongoRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  getAll(): Observable<T[]> {
    return from(this._repository.find().exec());
  }

  getById(id: string): Observable<T> {
    return from(this._repository.findById(id).exec());
  }

  getOne(condition: { [key in keyof T]?: T[keyof T] }) {
    return from(this._repository.findOne(condition).exec());
  }

  get(condition: { [key in keyof T]?: T[keyof T] }) {
    return from(this._repository.find(condition).exec());
  }

  create(item: T): Observable<T> {
    return from(this._repository.create(item));
  }

  update(id: string, item: T) {
    return from(this._repository.findByIdAndUpdate(id, item));
  }

  delete(id: string) {
    return from(this._repository.findByIdAndDelete(id).exec());
  }
}
