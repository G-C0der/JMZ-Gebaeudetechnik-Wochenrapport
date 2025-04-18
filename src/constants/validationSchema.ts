import * as yup from "yup";
import { userFieldLengths } from "./user";
import { escapeForRegExp, timeStringToMinutes } from "../utils";
import { codes, workdayFieldLengths, workdayProjectFieldLengths } from "./workday";

const passwordSpecialCharacters = '*.!@#$%^&(){}[\]:;<>,.?\/~_+\-=|\\';
const passwordSpecialCharactersDoubleEscaped = escapeForRegExp(passwordSpecialCharacters);

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

const emailValidationSchema = yup
  .string()
  .required('Email is required.')
  .max(userFieldLengths.email.max, `Email is too long - should be maximum ${userFieldLengths.email.max} characters.`)
  .email('Email is invalid.');

const passwordValidationSchema = yup
  .string()
  .required('Password is required.')
  .matches(new RegExp(`^[a-zA-Z0-9${passwordSpecialCharactersDoubleEscaped}]+$`),
    `Password can only contain Latin letters, numbers, and following special characters: ${passwordSpecialCharacters}`)
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
  .matches(/[0-9]+/, 'Password must contain at least one digit.')
  .matches(new RegExp(`[${passwordSpecialCharactersDoubleEscaped}]+`),
    'Password must contain at least one special character.')
  .min(userFieldLengths.password.min, `Password is too short - should be minimum ${userFieldLengths.password.min} characters.`);

const workdayValidationSchema = yup.lazy((values: any) => {
  const shape: Record<string, any> = {
    date: yup.date().required('Date is required.'),
  };

  const _timeRegex = /^(from|to|from2|to2)-\d+$/;
  const projectRegex = /^project-\d+$/;
  const codeRegex = /^code-\d+$/;

  for (const key in values) {
    if (_timeRegex.test(key)) {
      shape[key] = yup.string().nullable().matches(timeRegex);
    } else if (projectRegex.test(key)) {
      shape[key] = yup.string()
        .required('Project is required.')
        .max(workdayProjectFieldLengths.project.max, `Project too long - should be maximum ${workdayProjectFieldLengths.project.max} characters.`);
    } else if (codeRegex.test(key)) {
      shape[key] = yup.number()
        .required('Type is required.')
        .oneOf(codes, 'Type is invalid.');
    }
  }

  return yup.object().shape(shape).test('time-validation', 'Time validation failed', function (values) {
    for (let i = 0; i < workdayFieldLengths.projects.max; i++) {
      const from = values[`from-${i}`];
      const to = values[`to-${i}`];
      const from2 = values[`from2-${i}`];
      const to2 = values[`to2-${i}`];

      if (to && !from) return this.createError({ path: `from-${i}`, message: `From-${i} is required when To-${i} is set.` });
      if (from && !to) return this.createError({ path: `to-${i}`, message: `To-${i} is required when From-${i} is set.` });

      if (to2 && !from2) return this.createError({ path: `from2-${i}`, message: `From2-${i} is required when To2-${i} is set.` });
      if (from2 && !to2) return this.createError({ path: `to2-${i}`, message: `To2-${i} is required when From2-${i} is set.` });

      if (from && to && timeStringToMinutes(from) >= timeStringToMinutes(to)) {
        return this.createError({ path: `to-${i}`, message: `To-${i} must be after From-${i}.` });
      }

      if (to && from2 && timeStringToMinutes(to) >= timeStringToMinutes(from2)) {
        return this.createError({ path: `from2-${i}`, message: `From2-${i} must be after To-${i}.` });
      }

      if (from2 && to2 && timeStringToMinutes(from2) >= timeStringToMinutes(to2)) {
        return this.createError({ path: `to2-${i}`, message: `To2-${i} must be after From2-${i}.` });
      }
    }

    return true;
  });
});

export {
  passwordSpecialCharacters,
  emailValidationSchema,
  passwordValidationSchema,
  workdayValidationSchema
}
