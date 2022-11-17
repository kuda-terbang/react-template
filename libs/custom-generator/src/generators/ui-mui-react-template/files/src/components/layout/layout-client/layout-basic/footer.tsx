import React from 'react';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export type FooterProps = {
  footerMenus: {
    title: string,
    menus: {
      title: string,
      link: string
    }[],
  }[],
  version?: string;
};

const Container = styled('div')`
  padding: 30px;
  background-color: ${(props) => props.theme.palette.primary.main};
  display: flex;
  flex-direction: row;
`;
const Section = styled('div')`
  min-width: 150px;
`;

const Footer = ({ version, footerMenus }: FooterProps) => {
  return (
    <Container>
      {footerMenus.map((section) => (
        <Section key={section.title}>
          <Typography variant="h6">{section.title}</Typography>
          {section.menus.map((menu) => (
            <Link key={menu.title} href={menu.link}>
              <Typography variant="body1" color="black">
                {menu.title}
              </Typography>
            </Link>
          ))}
        </Section>
      ))}
      <Typography variant="subtitle2">v{version}</Typography>
    </Container>
  );
};

export default Footer;
