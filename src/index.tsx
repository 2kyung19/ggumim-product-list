import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from 'styles/global-styles';
import theme from 'styles/theme';

import App from 'pages/App';
import { ThemeProvider } from 'styled-components';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
