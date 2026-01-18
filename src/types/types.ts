export interface MealItem {
    id: string;
    meal: string;
    price: number;
    img: string;
    instructions?: string;
    category?: string;
}

export interface NavItem {
    label: string;
    path: string;
}

export interface FooterLink {
    label: string;
    url?: string;
}

export interface FooterLinkGroup {
    title: string;
    links: FooterLink[];
}

export interface SocialLink {
    icon: string;
    alt: string;
    url?: string;
}
