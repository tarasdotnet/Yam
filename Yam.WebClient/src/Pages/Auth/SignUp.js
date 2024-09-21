import { Card } from '@mui/material';
import './auth.css';
import SignUpForm from './SignUpForm';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
    const { t } = useTranslation();

    return (
    <Card className='auth-container'>
        <img
            src={require('../../Images/logo-512x512.png')}
            width='200px'
            alt='Site logo' 
        />
        <div className='auth-title'>
            {t("signup")}
        </div>
        <SignUpForm />
    </Card>
    );
}