import { ErrorBase } from './base.error.js';

export class EmailAlreadyExistsError extends ErrorBase {

  constructor(message =  'Email já em uso por outra conta.') {
    super(409, message);
  }
}