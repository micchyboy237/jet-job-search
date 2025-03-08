import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Universal settings */
  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
  }

  /* Scroll behavior */
  body.modal-open {
    overflow: hidden;
  }

  /* Form element reset */
  input, textarea, button {
    font-family: ${({ theme }) => theme.fonts.main};
    border: none; /* Reset borders */
    outline: none; /* Remove outline for inputs and buttons */
  }

  /* Anchor tag reset */
  a {
    text-decoration: none; /* Remove underline by default */
    color: inherit; /* Inherit color from parent element */
  }

  /* List style reset */
  ul, ol {
    list-style: none; /* Remove bullet points and numbers */
  }

  /* Image reset */
  img {
    max-width: 100%; /* Ensure images are responsive */
    height: auto; /* Maintain aspect ratio */
  }
`;

export default GlobalStyle;
