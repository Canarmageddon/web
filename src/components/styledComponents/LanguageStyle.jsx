import styled from "styled-components";

export const FlagImg = styled.img`
  cursor: pointer;
  border-radius: 8px;
  padding: 1px 14px;
  ${({ selected }) =>
    selected ? `border: 1px solid black;` : `border: 1px solid transparent;`}
  &:hover {
    background-color: rgb(247, 247, 247);
`;
