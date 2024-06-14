import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  private readonly logger = new Logger('VALIDATION ERROR');

  constructor() {
    super({
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (error) =>
            `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`,
        );

        console.log(
          '=======================================================start=============================================================',
        );
        this.logger.warn(`Bad Request`);
        this.logger.debug(messages);
        console.log(
          '========================================================end==============================================================',
        );
        return new BadRequestException();
      },
    });
  }
}
