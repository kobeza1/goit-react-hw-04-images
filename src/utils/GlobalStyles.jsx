import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
      html {
        box-sizing: border-box;
        width: 100vw;
        overflow-x: hidden;
      }
      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }
      body {
        color: gray;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        margin: 0;
      }
      h2 {
        margin-bottom: 20px;
      }
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      section {
        width: 100%;
        margin: 0 auto;
        text-align: center;
      }

      `;

// button {
//   padding: 6px 15px;
//   border-radius: 30px;
//   border: none;
//   background-color: #d22566;
//   color: white;
//   font-weight: 700;
// }

// input {
//   width: 200px;
//   height: 20px;
// }
