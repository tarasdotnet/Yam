import { Box } from '@mui/material';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import UserService from '../../ApiServices/UserService';
import ErrorAlert from '../../Components/ErrorAlert';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { getQueryParam } from '../../Helpers/URLHelper';
import { useTranslation } from 'react-i18next';

export default function SignUpForm() {
    const { t } = useTranslation();
    const signIn = useSignIn();
    const [errorsArray, setErrorsArray] = useState([]);
    const phoneNumberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    const signupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, `${t("firstnameValidation")}`)
            .max(30, `${t("firstnameValidation")}`),
            // .required("Enter first name"),
        lastName: Yup.string()
            .min(2, `${t("lastnameValidation")}`)
            .max(30, `${t("lastnameValidation")}`),
            // .required("Enter last name"),
        userName: Yup.string()
            .min(2, `${t("usernameValidation")}`)
            .max(30, `${t("usernameValidation")}`)
            .required(`${t("enterUsername")}`),
        email: Yup.string()
            .email(`${t("emailValidation")}`),
            // .required('Enter email'),
        phoneNumber: Yup.string().matches(phoneNumberRegex, `${t("phonenumberValidation")}`),
        // birthdate: Yup.date()
        //     .min(new Date('1910-01-01T00:00:00'), 'Available dates from 1910 to present day')
        //     .max(new Date(), 'Available dates from 1910 to present day')
        //     .required('Enter birthdate'),
        // genderId: Yup.number()
        //     .min(1, 'Choose your gender')
        //     .required('Choose your gender'),
        password: Yup.string()
            .required(`${t("enterPassword")}`),
        passwordConfirmation: Yup.string()
            .required(`${t("repeatPassword")}`)
            .oneOf([Yup.ref('password')], `${t("passwordsNotEqual")}`)
     });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            phoneNumber: '',
            // birthdate: new Date('2000-01-01T00:00:00'),
            // genderId: 0,
            password: '',
            passwordConfirmation: ''
        },
        validationSchema: signupSchema,
        onSubmit: async(values) => {
            setErrorsArray([]);
            // values.birthdate = convertDate(values.birthdate);
            let data = JSON.stringify(values, null, 2);

            const signUpResponse = await UserService.postSignUp(data);
            if (signUpResponse.data.data == null || signUpResponse.data.data === undefined) {
                setErrorsArray([signUpResponse.data.Error.ErrorMessage]);
                return;
            }

            const logInResponse = await UserService.postLogIn({
                username: values.userName,
                password: values.password
            });

            if(logInResponse.data.data) {
                const isSignedIn = signIn({
                    auth: {
                        token: logInResponse.data.data.token,
                        type: 'Bearer',
                    },
                    userState: {
                        name: logInResponse.data.data.username,
                        uid: logInResponse.data.data.id,
                        role: logInResponse.data.data.roles,
                    }
                });

                if (isSignedIn) {
                    const redirectTo = getQueryParam('redirectTo');
                    window.location.assign(redirectTo ? `/${redirectTo}` : '/profile');
                } else {
                    setErrorsArray(['Failed to sign in. Please try again.']);
                }
            }
            else {
                setErrorsArray([logInResponse.data.Error.ErrorMessage]);
            }
        },
      });

    return (
        <div>
            <Box sx={{position: 'fixed', zIndex: 999, bottom: '20px', left: '20px'}}>
                    {errorsArray.map((err) => {
                        return (<ErrorAlert key={err}>{err}</ErrorAlert>)
                    })}
            </Box>
            <form className='form-container' onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">
                    {t("firstname")}
                </label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    placeholder='John'
                />
                {
                    formik.touched.firstName && Boolean(formik.errors.firstName) &&
                    <div className='error-container'>
                        <div className="error-messsage">
                            {formik.touched.firstName && formik.errors.firstName}
                        </div>
                    </div>
                }
                <label htmlFor="lastName">
                    {t("lastname")}
                </label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    placeholder='Smith'
                />
                {
                    formik.touched.lastName && Boolean(formik.errors.lastName) &&
                    <div className='error-container'>
                        <div className="error-messsage">
                            {formik.touched.lastName && formik.errors.lastName}
                        </div>
                    </div>
                }
                <label htmlFor="userName">
                    {t("username")}
                </label>
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                    placeholder='johnsmith123'
                />
                {
                    formik.touched.userName && Boolean(formik.errors.userName) &&
                    <div className='error-container'>
                        <div className="error-messsage">
                            {formik.touched.userName && formik.errors.userName}
                        </div>
                    </div>
                }
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder='mymail@domain.com'
                />
                {
                    formik.touched.email && Boolean(formik.errors.email) &&
                    <div className='error-container'>
                        <div className="error-messsage">
                            {formik.touched.email && formik.errors.email}
                        </div>
                    </div>
                }
                {/* <label htmlFor="phoneNumber">Phone number</label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type='phoneNumber'
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    placeholder='+380-111-222333'
                />
                {
                    formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber) &&
                    <div className='error-container'>
                        <div className="error-messsage">
                            {formik.touched.phoneNumber && formik.errors.phoneNumber}
                        </div>
                    </div>
                } */}
                <label htmlFor="password">
                    {t("password")}
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className='password'
                />
                {
                    formik.touched.password && Boolean(formik.errors.password) &&
                    <div className='error-container'>
                        <div className="error-messsage">
                            {formik.touched.password && formik.errors.password}
                        </div>
                    </div>
                }
                <label htmlFor="passwordConfirmation">
                    {t("repeatPassword")}
                </label>
                <input 
                    id="passwordConfirmation"
                    type="password"
                    name="passwordConfirmation"
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    className='password'
                />
                {
                    formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation) &&
                    <div className='error-container'>
                        <div className="error-messsage">
                            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                        </div>
                    </div>
                }
                <button className='submit-button' type='submit'>
                    {t("signup")}
                </button>
            </form>
        </div>
    );
};
