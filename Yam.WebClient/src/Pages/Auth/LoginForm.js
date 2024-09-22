import { Box } from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import UserService from '../../ApiServices/UserService';
import ErrorAlert from '../../Components/ErrorAlert';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useFormik } from 'formik';
import { getQueryParam } from '../../Helpers/URLHelper';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
    const { t } = useTranslation();
    const signIn = useSignIn();
    const [errorsArray, setErrorsArray] = useState([]);

    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .required(`${t("enterUsername")}`),
        password: Yup.string()
            .required(`${t("enterPassword")}`),
     });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async(values) => {
            setErrorsArray([]);
            let data = JSON.stringify(values, null, 2);

            const authResponse = await UserService.postLogIn(data);

            if(authResponse.status >= 200 && authResponse.status < 300) {
                const isSignedIn = signIn({
                    auth: {
                        token: authResponse.data.token,
                        type: 'Bearer',
                    },
                    userState: {
                        name: authResponse.data.username,
                        uid: authResponse.data.id,
                        role: authResponse.data.roles,
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
                setErrorsArray([authResponse.data]);
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
                <label htmlFor="username">
                    {t("username")}
                </label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                {
                    formik.touched.username && Boolean(formik.errors.username) &&
                    <div className='error-container'>
                        <div className="error-messsage">
                            {formik.touched.username && formik.errors.username}
                        </div>
                    </div>
                }
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
                <button className='submit-button' type='submit'>
                    {t("login")}
                </button>
            </form>
        </div>
    );
};
