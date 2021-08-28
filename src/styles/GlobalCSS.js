import { createGlobalStyle } from "styled-components";
import NerkoOne from "../fonts/nerko-one-v5-latin-regular.woff";
import Sansita from "../fonts/sansita-v5-latin-regular.woff";
import Pacifico from "../fonts/pacifico-v17-latin-regular.woff";
import breakpoints from "./breakpoints";

const GlobalCSS = createGlobalStyle`
  @font-face {
    font-family: 'NerkoOne';
    src: url(${NerkoOne}) format('woff');
  }

  @font-face {
    font-family: 'Sansita';
    src: url(${Sansita}) format('woff');
  }

  @font-face {
    font-family: 'Pacifico';
    src: url(${Pacifico}) format('woff');
  }

  body {
    font-family: "Sansita", sans-serif;
    max-width: 1530px;
    margin: 0 auto;
  }

  h1 {
    font-family: 'NerkoOne', cursive;
    font-size: 4.4rem;
    word-break: break-word;

    @media only screen and ${breakpoints.device.sm} {
      font-size: 5rem;      
    }
  }

  h2 {
    font-family: 'NerkoOne', cursive;
    font-size: 4rem;
  }
`;

export default GlobalCSS;
