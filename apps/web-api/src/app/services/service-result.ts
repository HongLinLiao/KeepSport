import { of, Observable } from 'rxjs';

export class ServiceResult<T = unknown> {
  public isOk: boolean;

  public data?: T;

  public error?: Error;

  constructor(params?: { isOk?: boolean; error?: Error; data?: T }) {
    this.isOk = params?.isOk ?? true;
    this.data = params?.data;
    this.error = params?.error;
  }
}

export const serviceSuccess = <T>(data?: T): Observable<ServiceResult<T>> => {
  return of(new ServiceResult<T>({ isOk: true, data }));
};

export const serviceError = <T>(error: Error): Observable<ServiceResult<T>> => {
  return of(new ServiceResult<T>({ isOk: false, error }));
};
