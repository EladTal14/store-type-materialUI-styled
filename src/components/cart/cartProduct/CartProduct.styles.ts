import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;

  align-items: flex-end;
  div {
    flex: 1;
  }

  .info, .actions {
    display: flex;
    justify-content: space-between;
  }

  img {
    max-width: 100px;
    object-fit: contain;
    margin-left: 40px;
  }
`