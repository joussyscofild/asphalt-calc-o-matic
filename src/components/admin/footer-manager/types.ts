
export type FooterLink = {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
};

export type FooterLinkGroup = {
  id: string;
  title: string;
  links: FooterLink[];
};

export type NewLinkData = Omit<FooterLink, 'id'>;
