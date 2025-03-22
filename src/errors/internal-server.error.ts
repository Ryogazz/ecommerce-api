import { ErrorBase } from './base.error';

export class InternalServerError extends ErrorBase {
  constructor(message = "Erro Interno do servidor") {
    super(500, message);
  }
}