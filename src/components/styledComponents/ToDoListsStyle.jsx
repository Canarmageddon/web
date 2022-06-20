import styled from "styled-components";

export const CardToDoList = styled.div`
  min-width: 350px;
  min-height: 120px;
  background-color: #fff;
  background-clip: border-box;
  border: 3px solid var(--primary);
  border-radius: 1rem;
  user-select: none;
  color: var(--primary);
  text-align: start;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 60px;
  font-size: 1.6em;
  background-color: rgb(13, 110, 253, 0.2);
  margin-left: 30px;
  margin-right: 30px;
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 25px;
  min-width: 200px;
  max-height: 70px;
  background-color: #fff;
  background-clip: border-box;
  border: 3px solid var(--primary);
  border-radius: 1rem;
  user-select: none;
  color: var(--primary);
  font-size: 0.8em;
`;
