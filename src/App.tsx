import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"

const H1 = styled.h1`
  font-size: 30px;
  font-weight: bold;
`
const Button = styled.button`
  font-size: 1.4rem;
  padding: 2rem;
  font-weight:500;
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
`
const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`
const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`
export default function App() {
  return ( <>
  <GlobalStyles />
  <StyledApp>
    <H1>Hey there</H1>
    <Button> Click me</Button>
    <Button> Click me 2</Button>
    <Input />
  </StyledApp>
  </>)
}

