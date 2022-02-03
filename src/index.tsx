import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from 'styles/global-styles';
import theme from 'styles/theme';

import Main from 'pages/main';
import { ThemeProvider } from 'styled-components';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
