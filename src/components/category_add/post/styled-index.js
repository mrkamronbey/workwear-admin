import styled from "styled-components";

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 15px;
    font-size: 24px;
  }

  input[type="file"] {
    display: none;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    border-radius: 15px;
    border-style: solid;
    text-align: center;
    padding: 10px 10px 15px 10px;
    cursor: pointer;
  }
  .spins {
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f3f3;
    border-radius: 15px;
    padding-top: 5px;
    /* padding-bottom: 20px; */
    /* margin-top: 10px; */
  }
  .span-download {
    font-size: 30px;
    position: relative;
    top: 10px;
    margin-right: 5px;
  }
`;
