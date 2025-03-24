import { ErrorBase } from './base.error.js';

export class ForbiddenError extends ErrorBase {
  constructor(message = "Não autorizado") {
    super(403, message);
  }
}