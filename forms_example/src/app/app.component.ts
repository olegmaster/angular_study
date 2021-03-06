import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from './my.validators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    form: FormGroup;

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [
                Validators.email,
                Validators.required,
                MyValidators.restrictedEmails
            ], [MyValidators.uniqeEmail]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ]),
            address: new FormGroup({
                country: new FormControl('ua'),
                city: new FormControl('', Validators.required)
            }),
            skills: new FormArray([])
        });
    }

    submit() {
        if (this.form.valid) {
            console.log('Form: ', this.form);
            const formData = {...this.form.value};

            console.log('Form Data:', formData);

            this.form.reset();
        }
    }

    selectCapital() {
        const capitalMap = {
            ru: 'Moskow',
            ua: 'Kiev',
            by: 'Minsk'
        };
        const sityKey = this.form.get('address').get('country').value;
        const city = capitalMap[sityKey];
        // this.form.get('address').get('city').setValue(capital);
        this.form.patchValue({
            address: {city}
        });
    }

    addSkill() {
        const control = new FormControl('', Validators.required);
        (this.form.get('skills') as FormArray).push(control);
    }
}

