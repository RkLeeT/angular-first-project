import { AbstractControl, ValidatorFn } from '@angular/forms';

// USERNAME

// export function forbiddenNameValidator(control: AbstractControl): {[key: string]: any} | null {
//     const forbidden = /admin/.test(control.value);
//     return forbidden? {'forbiddenName': {value: control.value}} : null;
// }

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden? {'forbiddenName': {value: control.value}} : null;
    };
}

// PASSWORD

export function PasswordValidator(control: AbstractControl): {[key:string]: boolean} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    // if(confirmPassword.pristine) {
    //     return null;
    // }
    return password && confirmPassword.dirty && password.value != confirmPassword.value ? 
        {'mismatch': true} : null;
}