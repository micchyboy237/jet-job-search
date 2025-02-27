import React, { ReactNode } from "react";
import { Container, Header, Title, ExtraContent } from "./styles";

interface CardProps {
  children: ReactNode;
  title?: string;
  extra?: ReactNode;
}

const Card: React.FC<CardProps> = ({ children, title, extra }) => {
  return (
    <Container>
      {(title || extra) && (
        <Header>
          {title && <Title>{title}</Title>}
          {extra && <ExtraContent>{extra}</ExtraContent>}
        </Header>
      )}
      {children}
    </Container>
  );
};

export default Card;
