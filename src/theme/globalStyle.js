import { createGlobalStyle} from "styled-components";
const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Source Sans Pro', sans-serif;
        scroll-behavior: smooth;
    }
    * {
        box-sizing: border-box
    }
`
export default GlobalStyle