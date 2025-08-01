import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import figma from './figma.png';
import git from './git.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import Profile from './Profile.png'
import light100 from './light100.png'
import profile_img from './profile_img.jpg'
import vs from './vs.png'
import mysql from './mysql.png'
import aws from './aws.png'
import hardwork from './hardwork.png'
import commit from './commit.png'
import teamwork from './teamwork.png'
import leadership from './leadership.png'

export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    firebase,
    figma,
    git,
    mongodb,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark,
    Profile,
    light100,
    vs,
    mysql,
    aws,
    hardwork,
    commit,
    teamwork,
    leadership
};

export const workData = [
    {
        title: 'Weather App',
        description: 'Type in a City, Get the Weather',
        bgImage: './weatherapp.png',
        link: 'https://dmish13.github.io/weather-app/weather.html'
    },
    {
        title: 'To-Do List App',
        description: 'Create Your Own To-Do List',
        bgImage: './todo.png',
        link: 'https://dmish13.github.io/to-do/'
    },
    {
        title: 'Stopwatch',
        description: 'Fully Functioning Stopwatch with a Lap Feature',
        bgImage: './stopwatch.png',
        link: 'https://dmish13.github.io/Stopwatch/'
    },
    {
        title: 'Rock Paper Scissors App',
        description: 'Play Rock Paper Scissors with a Computer',
        bgImage: './rps.png',
        link : 'https://dmish13.github.io/rock-paper-scissors/rps.html'
    },
]

export const serviceData = [
    { icon: assets.hardwork, title: 'Hard Working', description: 'I am a hard worker willing to put the extra effort in to assignments, proejcts and what ever else comes in my way.' },
    { icon: assets.commit, title: 'Commitment', description: 'I am committed to doing the best I can in everything I do, I always keep it at 100%.'},
    { icon: assets.teamwork, title: 'Teamwork', description: 'I have experience being in teams to work on group projects, and I strive to support my teammates whenever I can.'},
    { icon: assets.leadership, title: 'Leadership', description: 'I have experience leading groups in projects by enforcing deadlines, delegating work to my teammates, and helping them.'},
]

export const infoList = [
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Programming Languages', description: 'HTML, CSS, JS, React, C/C++, Python, Java, Arduino' },
    { icon: assets.edu_icon, title: 'Education', description: 'B.S. in Computer Science (Expected Graduation: May 2027)' },
    { icon: assets.project_icon, title: 'Projects', description: 'Built more than 5 projects (notable projects listed in projects section)' }
];

export const toolsData = [
    assets.vscode, assets.vs, assets.mongodb, assets.mysql, assets.aws, assets.git
];