export class MaxCheckinPerDayError extends Error {
  constructor() {
    super('Max check-ins per day reached.')
  }
}
