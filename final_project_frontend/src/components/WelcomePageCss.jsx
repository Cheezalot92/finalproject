import styled from "styled-components";


export const StyleWelcome = styled.div`


.container {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
  
  h1 {
    outline: 5px outset white;
    outline-color: #f7f7f7;
    color: red;
    font-size: 40px;
    margin-bottom: 20px;
  }
  
  p {
    color: red;
    font-size: 18px;
    margin-bottom: 40px;
  }
  
  .boxes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .box {
    width: 270px;
    height: 270px;
    margin: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
  }
  
  .box img {
    width: 220px;
    height: 120px;
    margin: 0 auto;
    display: block;

  }
  
  h2 {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  `