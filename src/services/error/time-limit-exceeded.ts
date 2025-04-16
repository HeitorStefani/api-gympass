export class TimeLimitExceededError extends Error {
  constructor() {
    super('Validation time exceed')
  }
}
