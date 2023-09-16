import type { ValidationArguments, ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export function IsDateYYYYMMDD(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isDateYYYYMMDD',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, _args: ValidationArguments) {
          if (!value) {
            return false;
          }

          // Sử dụng biểu thức chính quy để kiểm tra định dạng "YYYY-MM-DD"
          const regex = /^\d{4}-\d{2}-\d{2}$/;
          return regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property}: must be in YYYY-MM-DD format`;
        },
      },
    });
  };
}
