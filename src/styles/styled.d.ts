import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    imageWidth: string;

    color: {
      main: string;
      white: string;
      border: string;
    };

    icon: {
      size: string;
    };
  }
}
