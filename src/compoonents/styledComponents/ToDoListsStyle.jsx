import styled from "styled-components";

export const CardToDoList = styled.div`
  min-width: 350px;
  min-height: 120px;
  background-color: #fff;
  background-clip: border-box;
  border: 3px solid rgb(13, 110, 253, 1);
  border-radius: 1rem;
  user-select: none;
  color: rgb(13, 110, 253, 1);
  transition: 0.5s;

  ${({ showDetails }) =>
    !showDetails &&
    `    text-align: center;
  line-height: 115px;
  font-size: 2em;
  max-width: 350px;
  max-height: 120px;`}

  ${({ showDetails }) =>
    showDetails &&
    `    text-align: start;
    padding-left: 10px;
    padding-right: 10px;
line-height: 60px;
font-size: 1.6em;
background-color: rgb(13, 110, 253, 0.2);
`}
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  min-width: 200px;
  max-height: 70px;
  background-color: #fff;
  background-clip: border-box;
  border: 3px solid rgb(13, 110, 253, 1);
  border-radius: 1rem;
  user-select: none;
  color: rgb(13, 110, 253, 1);
  font-size: 0.8em;
`;
