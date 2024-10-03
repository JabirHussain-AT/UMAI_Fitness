import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in format 123-456-7890')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    age: Yup.number()
      .positive('Age must be a positive number')
      .integer('Age must be an integer')
      .required('Age is required'),
    address: Yup.string()
      .required('Address is required'),
    job: Yup.string()
      .required('Job is required'),
    weight: Yup.string()
      .matches(/^\d+kg$/, 'Weight must be in format 70kg')
      .required('Weight is required'),
    height: Yup.string()
      .matches(/^[0-9]'[0-9]{1,2}"?$/, 'Height must be in format 5\'9" or 5\'9')
      .required('Height is required'),
    dob: Yup.date()
      .max(new Date(), 'Date of birth cannot be in the future')
      .required('Date of birth is required'),
  });