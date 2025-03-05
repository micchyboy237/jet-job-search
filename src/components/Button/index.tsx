import React from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  border: none;

  ${(props) =>
    props.isLoading &&
    css`
      cursor: not-allowed;
      opacity: 0.7;
    `}

  ${(props) => {
    switch (props.variant) {
      case "outline":
        return css`
          border: 1px solid ${props.theme.colors.border};
          background: transparent;
          color: ${props.theme.colors.text};
          &:hover {
            background: ${props.theme.colors.backgroundSecondary};
          }
        `;
      case "ghost":
        return css`
          background: transparent;
          color: ${props.theme.colors.text};
          &:hover {
            background: ${props.theme.colors.backgroundSecondary};
          }
        `;
      case "destructive":
        return css`
          background: ${props.theme.colors.primaryDark};
          color: white;
          &:hover {
            background: ${props.theme.colors.primary};
          }
        `;
      default:
        return css`
          background: ${props.theme.colors.primary};
          color: white;
          &:hover {
            background: ${props.theme.colors.primaryDark};
          }
        `;
    }
  }}

  ${(props) => {
    switch (props.size) {
      case "sm":
        return "padding: 6px 12px; font-size: 0.875rem;";
      case "lg":
        return "padding: 12px 24px; font-size: 1.125rem;";
      default:
        return "padding: 8px 16px; font-size: 1rem;";
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({ isLoading, children, ...props }) => {
  return (
    <StyledButton {...props} isLoading={isLoading}>
      {isLoading ? <span className="animate-spin mr-2">⏳</span> : null}
      {children}
    </StyledButton>
  );
};

export default Button;
