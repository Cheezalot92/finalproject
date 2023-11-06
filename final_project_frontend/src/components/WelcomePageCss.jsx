import styled from "styled-components";


export const StyleWelcome = styled.div`
.container {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 16px;
    margin-bottom: 40px;
  }
  
  .boxes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .box {
    width: 250px;
    height: 250px;
    margin: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
  }
  
  .box img {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: block;
  }
  
  h2 {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  `