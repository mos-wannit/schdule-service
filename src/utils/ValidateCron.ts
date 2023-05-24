import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { validate } from 'node-cron';
@ValidatorConstraint({ name: 'IsCron', async: false })
export class IsCron implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    console.log(text);
    if (text) {
      console.log('validate', validate('59****'));

      return validate(text);
    }
    return false;

    // return text.length > 1 && text.length < 10; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!';
  }
}
