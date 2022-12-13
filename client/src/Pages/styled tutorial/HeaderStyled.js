import styled from "styled-components";
export const StyledHeader = styled.header`
background-color: ${({ theme }) => theme.colors.header};
padding: 40px 0;
//FYR
h1{
    color: red
}
& :hover{
    color: black;
}
`
