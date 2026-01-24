import type { NavItem, FooterLinkGroup } from '../types/types';

export const navItems: NavItem[] = [
    { label: 'nav.home', path: '/' },
    { label: 'nav.menu', path: '/menu' },
    { label: 'nav.order', path: '/order' },
];

export const footerLinks: FooterLinkGroup[] = [
    {
        title: 'footer.companyTitle',
        links: [
            { label: 'footer.company.home' },
            { label: 'footer.company.order' },
            { label: 'footer.company.faq' },
            { label: 'footer.company.contact' },
        ],
    },
    {
        title: 'footer.templateTitle',
        links: [
            { label: 'footer.template.styleGuide', url: 'https://google.com' },
            { label: 'footer.template.changelog', url: 'https://google.com' },
            { label: 'footer.template.license', url: 'https://google.com' },
            {
                label: 'footer.template.webflowUniversity',
                url: 'https://google.com',
            },
        ],
    },
    {
        title: 'footer.flowbaseTitle',
        links: [{ label: 'footer.flowbase.moreCloneables' }],
    },
];
