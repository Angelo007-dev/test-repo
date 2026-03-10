import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsAfterDate(prop: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propName: string) {
        registerDecorator({
            name: 'isAfterDate',
            target: object.constructor,
            propertyName: propName,
            constraints: [prop],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return value > relatedValue;
                }
            }

        })
    }
}