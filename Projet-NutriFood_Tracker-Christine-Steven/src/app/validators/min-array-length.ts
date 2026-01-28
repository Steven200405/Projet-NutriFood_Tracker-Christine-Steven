import { ValidatorFn } from "@angular/forms";
export function minArrayLengthValidator(minLength: number): ValidatorFn {
    return (control) => {
        const value = control.value;
        if (Array.isArray(value) && value.length >= minLength) {
            return null;
        }
        return { minArrayLength: true };
    }
}