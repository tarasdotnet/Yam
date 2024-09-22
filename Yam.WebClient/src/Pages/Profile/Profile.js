import { Box } from '@mui/material';
import ErrorAlert from '../../Components/ErrorAlert';
import React, { useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import UserService from '../../ApiServices/UserService';
import { useFetching } from '../../Helpers/hooks/useFetching';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { t } = useTranslation();
  const [errorsArray, setErrorsArray] = useState([]);

  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [user, setUser] = useState({
    id: auth.uid,
    username: auth.name,
    person: null
  });

  const [fetchUser, isUserLoading] = useFetching(async () => {
    const response = await UserService.getUserProfileDataById(auth.uid, authHeader);
    
    if(response.status >= 200 && response.status < 300){
      const data = response.data;
      setUser(data);
    }
    else {
        setErrorsArray([response.data]);
    }
  });

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  const getGender = (gender) => {
    switch (gender) {
      case 0:
        return 'Male';
      case 1:
        return 'Female';
      default:
        return 'Not specified';
    }
  };

  return (
    <div>
      <Box sx={{position: 'fixed', zIndex: 999, bottom: '20px', left: '20px'}}>
              {errorsArray.map((err) => {
                  return (<ErrorAlert key={err}>{err}</ErrorAlert>)
              })}
      </Box>
      <div 
        style={{ 
          padding: '20px',
          maxWidth: '400px',
          margin: '10% auto',
          border: '1px solid #ccc' 
          }}
      >
        <h2>Profile</h2>
        {!isUserLoading && user.person &&
          <>
            <p><strong>{t("username")}:</strong> {user.username ? user.username : 'N/A'}</p>
            <p><strong>{t("firstname")}:</strong> {user.person.firstName ? user.person.firstName : 'N/A'}</p>
            <p><strong>{t("lastname")}:</strong> {user.person.lastName ? user.person.lastName : 'N/A'}</p>
            <p><strong>Email:</strong> {user.person.email ? user.person.email : 'N/A'}</p>
            <p><strong>{t("phoneNumber")}:</strong> {user.person.phoneNumber ? user.person.phoneNumber : 'N/A'}</p>
            <p><strong>{t("gender")}:</strong> {getGender(user.person.gender)}</p>
          </>
        }
      </div>
    </div>
  );
}
