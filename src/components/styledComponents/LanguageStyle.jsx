import styled from "styled-components";

export const FlagImg = styled.img`
  cursor: pointer;
  border-radius: 8px;
  padding: 1px 14px;
  boxShadow: "2px 2px 2px 1px black"
  ${({ selected }) =>
    selected
      ? `border: 1px solid black;
    box-shadow: 2px 2px 2px 2px black;`
      : `border: 1px solid transparent;`}
  &:hover {
    background-color: rgb(247, 247, 247);
`;
