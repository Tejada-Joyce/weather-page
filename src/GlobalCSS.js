import { createGlobalStyle } from "styled-components";
import NerkoOne from "./fonts/nerko-one-v5-latin-regular.woff";
import Sansita from "./fonts/sansita-v5-latin-regular.woff";
import Pacifico from "./fonts/pacifico-v17-latin-regular.woff";

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
  }

  h1 {
    font-family: 'NerkoOne', cursive;
    font-size: 5rem;
  }
`;

export default GlobalCSS;
