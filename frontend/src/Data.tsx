import { NavBlock } from "./layout/Navigation";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Market from "./pages/Market";
import { SocialBlock } from "./tools/SocialLinks";

export const navLinks: Array<NavBlock> = [
    {
        text: 'home',
        icon: 'icon bi-house',
        to: '/',
        exact: true,
        component: Home,
    },
    {
        text: 'markets',
        icon: 'icon bi-graph-up',
        to: '/financial-markets',
        component: Market,
    },
    {
        text: 'blog',
        icon: 'icon bi-journals',
        to: '/technology-blog',
        component: Blog,
    },
    {
        text: 'contact',
        icon: 'icon bi-envelope',
        to: '/contact',
        component: Contact,
        exact: true,
    },
    {
        text: 'about',
        icon: 'icon bi-person',
        to: '/about',
        component: About,
        exact: true,
    },
];

export const socialLinks: Array<SocialBlock> = [
    {
        title: 'Facebook',
        icon: 'icon bi-facebook',
        url: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
        title: 'Twitter',
        icon: 'icon bi-twitter',
        url: 'https://twitter.com/intent/tweet?url=',
    },
    {
        title: 'LinkedIn',
        icon: 'icon bi-linkedin',
        url: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    },
    {
        title: 'Email',
        icon: 'icon bi-envelope-open-fill',
        url: 'mailto:info@example.com?subject=',
    },

];

export const systemLanguages: Record<string, string> = {
    'en-US': 'English',
    'es': 'Español',
    'de': 'Deutsch'
};

export const supportedLanguages: Array<keyof typeof systemLanguages> = [
    'en-US',
    'es',
    'de'
];
