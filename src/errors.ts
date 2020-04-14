import { BaseError } from 'squid-utils';

export class UnsupportedOperation extends BaseError {
  constructor (opName: string) {
    super('UNSUPPORTED_OP', `${opName} is not supported.`);
  }
}

export class MergeError extends BaseError {
  constructor (error: string) {
    super('MERGE_ERROR', error);
  }
}
