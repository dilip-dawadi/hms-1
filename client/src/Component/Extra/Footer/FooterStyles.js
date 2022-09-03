import styled from 'styled-components';

export const Box = styled.div`
  padding: 20px 60px;
    background-color: rgb(0, 67, 77);
    background-image: url("https://uploads-ssl.webflow.com/610a3f7bd34716485e27f5b4/611232a9cd508f2dced4ebc4_Pattern.svg");
    background-position: 100% 0;
    background-size: auto;
    background-repeat: no-repeat;
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
  @media (max-width: 600px) {
    font-size: 11px;
    text-align: center;
  }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
                         minmax(300px, 1fr));
  grid-gap: 100px;
   
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, 
                           minmax(200px, 1fr));
  }
`;
export const FooterLink = styled.a`
  color: gray;
  margin-bottom: 20px;
  font-size: 16px;
  text-decoration: none;
  font-weight: 300;
  &:hover {
      color: white;
      transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 20px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: 300;
  text-transform: uppercase;
  &:hover {
    color: white;
    transition: 200ms ease-in;
}
`;