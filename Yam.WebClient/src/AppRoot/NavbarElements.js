import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    z-index: 999;
    position: sticky;
    top: 0;
    background: #ddd;
    height: 85px;
    display: flex;
    justify-content: space-between;
    padding: /* 0.2rem */ 0 calc((100vw - 1000px) / 2);
    z-index: 12;
`;

export const HomeLink = styled(Link)`
    color: #000000;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 25px;
    font-weight: 400;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
`;

export const NavLink = styled(Link)`
    color: #000000;
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: 400;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        border-top: 3px solid #ddd;
        border-bottom: 3px solid #005;
    }
    &:hover {
        border-top: 3px solid #ddd;
        border-bottom: 3px solid #005;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtnLink = styled(Link)`
    border-radius: 25px;
    background: #61C3DC;
    padding: 10px 22px;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
    font-size: 23px;
    font-weight: 400;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #07659b;
        color: white;
    }
`;

export const DropdownMenu = styled.div`
    display: none;
    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: #ddd;
        position: absolute;
        top: 85px;
        left: 0;
        padding: 10px 0;
    }
`;

export const DropdownLink = styled(Link)`
    color: #000000;
    padding: 10px 1rem;
    text-decoration: none;
    height: auto;
    cursor: pointer;
        border-right: 3px solid #ddd;
        border-left: 3px solid #ddd;
    &.active {
        border-right: 3px solid #ddd;
        border-left: 3px solid #005;
        padding-left: -3px;
    }
    &:hover {
        border-right: 3px solid #ddd;
        border-left: 3px solid #005;
        padding-left: -3px;
    }
`;
