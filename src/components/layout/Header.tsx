import styled from '@emotion/styled';

export function Header() {
  return (
    <styles.wrapper className='mw'>
      <styles.logo />
      <styles.navBar>
        <span>행사</span>
        <span>숙박</span>
        <span>관광지</span>
        <span>마이페이지</span>
      </styles.navBar>
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  `,

  logo: styled.h1`
    width: 4.1875rem;
    height: 1.8125rem;
    background: url('/logo.png') no-repeat center;
    background-size: 100%;
  `,

  navBar: styled.nav`
    display: flex;
    gap: 2rem;
    align-items: center;

    span {
      color: #fff;
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `,
};
