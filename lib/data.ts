import React from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { HiMail } from "react-icons/hi";

export const links = [
    {
        name: 'Home',
        hash: '#home'
    },
    {
        name: 'About',
        hash: '#about'
    },
    {
        name: 'Product',
        hash: '#projects'
    },
    {
        name: 'Storytelling',
        hash: '#experience'
    },
    {
        name: 'AdTech',
        hash: '#experience'
    }
    ,
    {
        name: 'Contact',
        hash: '#experience'
    }
] as const;

export const socials = [
    {
        name: 'Github',
        url: 'https://github.com/ronnielutaro',
        icon: React.createElement(AiFillGithub)
    },
    {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/ronnie-lutaro-b73240aa/',
        icon: React.createElement(AiFillLinkedin)
    },
    {
        name: 'Email',
        url: 'mailto:ronnielutaro@outlook.com',
        icon: React.createElement(HiMail)
    }
] as const;