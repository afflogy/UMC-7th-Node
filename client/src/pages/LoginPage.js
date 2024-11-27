import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components for Login Page
const LoginContainer = styled.div`
  position: relative;
  width: 1440px;
  height: 960px;
  background: #FFFFFF;
`;

const UmcButton = styled.button`
  position: absolute;
  left: 642px;
  top: 293px;
  width: 156px;
  height: 77px;
  background: #FF5100;
  border-radius: 11px;
  border: 1px solid #FFFFFF;
  font-family: 'Rubik Scribble';
  font-size: 36px;
  color: #FFFFFF;
  cursor: pointer;
`;

const InputField = styled.input`
  box-sizing: border-box;
  position: absolute;
  width: 429px;
  height: 56px;
  left: 505px;
  border: 2px solid #FF5100;
  border-radius: 12px;
  padding: 10px;

  &:nth-child(1) {
    top: 401px;
  }
  &:nth-child(2) {
    top: 468px;
  }
`;

const LoginButton = styled.button`
  position: absolute;
  width: 429px;
  height: 56px;
  left: 505px;
  top: 535px;
  background: #FF5100;
  border-radius: 12px;
  color: #FFFFFF;
  font-family: 'Rubik Scribble';
  font-size: 20px;
  cursor: pointer;
`;

const RegisterLink = styled.a`
  position: absolute;
  left: 636px;
  top: 613px;
  font-family: 'Rubik Scribble';
  font-size: 15px;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
`;

const ForgotPasswordLink = styled.a`
  position: absolute;
  left: 731px;
  top: 613px;
  font-family: 'Nokora';
  font-size: 15px;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
`;

const SocialLoginContainer = styled.div`
  display: flex;
  position: absolute;
  left: 650px;
  top: 668px;
  gap: 20px;
`;

const SocialLoginButton = styled.button`
  width: 62px;
  height: 62px;
  background: ${props => props.background || '#EFEFEF'};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth login
    window.location.href = '/oauth2/login/google';
  };

  const handleKakaoLogin = () => {
    // Redirect to Kakao OAuth login
    window.location.href = '/oauth2/login/kakao';
  };

  return (
    <LoginContainer>
      <UmcButton>UMC</UmcButton>
      
      <InputField type="text" placeholder="아이디" />
      <InputField type="password" placeholder="비밀번호" />
      
      <LoginButton>로그인</LoginButton>
      
      <RegisterLink href="/register">회원가입</RegisterLink>
      <ForgotPasswordLink href="/find-account">아이디/비밀번호 찾기</ForgotPasswordLink>
      
      <SocialLoginContainer>
        <SocialLoginButton 
          onClick={handleKakaoLogin}
          background="url('/path/to/kakao-icon.png') no-repeat center" // 이미지 경로 필요
        />
        <SocialLoginButton 
          onClick={handleGoogleLogin}
          background="url('/path/to/google-icon.png') no-repeat center" // 이미지 경로 필요
        />
      </SocialLoginContainer>
    </LoginContainer>
  );
};

export default LoginPage;