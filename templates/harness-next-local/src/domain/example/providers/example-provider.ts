export type ExampleClockProvider = {
  now(): Date;
};

export const systemClockProvider: ExampleClockProvider = {
  now() {
    return new Date();
  }
};

