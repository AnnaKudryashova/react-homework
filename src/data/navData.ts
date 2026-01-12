import type { NavItem, FooterLinkGroup, SocialLink } from '../types/types';

export const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Order', path: '/order' },
];

export const footerLinks: FooterLinkGroup[] = [
    {
        title: 'COMPANY',
        links: [
            { label: 'Home' },
            { label: 'Order' },
            { label: 'FAQ' },
            { label: 'Contact' },
        ],
    },
    {
        title: 'TEMPLATE',
        links: [
            { label: 'Style Guide', url: 'https://google.com' },
            { label: 'Changelog', url: 'https://google.com' },
            { label: 'License', url: 'https://google.com' },
            { label: 'Webflow University', url: 'https://google.com' },
        ],
    },
    {
        title: 'FLOWBASE',
        links: [{ label: 'More Cloneables' }],
    },
];

export const socialLinks: SocialLink[] = [
    {
        icon: 'src/assets/icons/instagram.svg',
        alt: 'Instagram',
    },
    {
        icon: 'src/assets/icons/twitter.svg',
        alt: 'Twitter',
    },
    {
        icon: 'src/assets/icons/youtube.svg',
        alt: 'YouTube',
    },
];
