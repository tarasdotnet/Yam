import React, { useState } from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    DropdownMenu,
} from "./NavbarElements";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { HomeLink } from "./NavbarElements";
import { DropdownLink } from "./NavbarElements";
import { DEFAULT_LANGUAGE, LANGUAGES } from "../Config/Languages";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const isAuth = useIsAuthenticated();
    const signOut = useSignOut();
    const [isOpen, setIsOpen] = useState(false);

    const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
    const { i18n, t } = useTranslation();

    const logOut = () => {
        signOut();
        window.location.assign('/');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguageChange = (e) => {
        const selectedLanguage = LANGUAGES.find(lang => lang.code === e.target.value);
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage.code);
    };

    return (
        <>
            <Nav>
                <Bars onClick={toggleMenu} />
                <NavMenu isOpen={isOpen}>
                    <HomeLink to="/">
                        <img src={require('../Images/logo-512x512.png')} width='70px' alt='Site logo'></img>
                        <div>
                            Yam Test App
                        </div>
                    </HomeLink>
                    <NavLink to="/plugpage">
                        {t("plugpage")}
                    </NavLink>
                    {
                        isAuth
                        ?
                        <NavLink to="/profile">
                            {t("profile")}
                        </NavLink>
                        :
                        <NavLink to="/signup">
                            {t("signup")}
                        </NavLink>
                    }
                </NavMenu>
                <NavBtn>
                {
                    isAuth
                    ?
                    <NavBtnLink to="/" onClick={logOut}>
                        {t("logout")}
                    </NavBtnLink>
                    :
                    <NavBtnLink to="/login">
                        {t("login")}
                    </NavBtnLink>
                }
                </NavBtn>
                <NavBtn>
                    <Box sx={{ minWidth: 50 }}>
                        <FormControl>
                            <Select sx={{ borderRadius: '20px', height: '40px' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={language.code}
                                onChange={handleLanguageChange}
                            >
                                {LANGUAGES.map(({ code }) => (
                                    <MenuItem key={code} value={code}>
                                        {code}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </NavBtn>
                {isOpen && (
                    <DropdownMenu>
                        <DropdownLink to="/plugpage" onClick={toggleMenu}>
                            {t("plugpage")}
                        </DropdownLink>
                        {isAuth ? (
                            <DropdownLink to="/profile" onClick={toggleMenu}>
                                {t("profile")}
                            </DropdownLink>
                        ) : (
                            <DropdownLink to="/signup" onClick={toggleMenu}>
                                {t("signup")}
                            </DropdownLink>
                        )}
                        {isAuth ? (
                            <DropdownLink to="/" onClick={() => { logOut(); toggleMenu(); }}>
                                {t("logout")}
                            </DropdownLink>
                        ) : (
                            <DropdownLink to="/login" onClick={toggleMenu}>
                                {t("login")}
                            </DropdownLink>
                        )}
                    </DropdownMenu>
                )}
            </Nav>
        </>
    );
};

export default Navbar;
