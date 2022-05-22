import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoudPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: inline-block;
    margin-bottom: 40px;
  }

  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 40px;
  }

  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background-color: ${(props) => props.theme.primary};
    border-radius: 12px;
    margin-bottom: 20px;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoudPageStyles>
      <NavLink to="/" className="logo">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" />
      </NavLink>
      <h1 className="heading">Oops! Page not found</h1>
      <NavLink to="/" className="text-black bg-green-400 p-[10px] rounded-lg">
        Back to home
      </NavLink>
    </NotFoudPageStyles>
  );
};

export default NotFoundPage;
