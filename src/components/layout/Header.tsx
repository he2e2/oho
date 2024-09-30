import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  return (
    <styles.wrapper>
      <styles.logo $pathname={location.pathname} />
      <styles.navBar>
        <styles.navItem $pathname={location.pathname}>행사</styles.navItem>
        <styles.navItem $pathname={location.pathname}>숙박</styles.navItem>
        <styles.navItem $pathname={location.pathname}>관광지</styles.navItem>
        <styles.navItem $pathname={location.pathname}>
          마이페이지
        </styles.navItem>
      </styles.navBar>
    </styles.wrapper>
  );
}

interface Logo {
  $pathname: string;
}

const styles = {
  wrapper: styled.header`
    width: 100%;
    max-width: 90rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    position: absolute;
    top: 0;
  `,

  logo: styled.h1<Logo>`
    width: 4.1875rem;
    height: 1.8125rem;
    background: ${(props) =>
      props.$pathname.startsWith('/detail') || props.$pathname.startsWith('/my')
        ? "url('/logo-purple.png') no-repeat center"
        : "url('/logo-white.png') no-repeat center"};
    background-size: 100%;
  `,

  navBar: styled.nav`
    display: flex;
    gap: 2rem;
    align-items: center;
  `,

  navItem: styled.span<Logo>`
    color: ${(props) =>
      props.$pathname.startsWith('/detail') || props.$pathname.startsWith('/my')
        ? '#000'
        : '#fff'};
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
  `,
};
