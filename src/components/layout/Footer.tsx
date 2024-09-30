import styled from '@emotion/styled';

export function Footer() {
  return (
    <styles.wrapper>
      <img src='/github.svg' alt='github-icon' />
      <p>© 2024. @he2e2 All pictures cannot be copied without permission.</p>
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.footer`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    gap: 1rem;
    align-items: center;
    background: rgba(217, 217, 217, 0.5);

    p {
      color: #a3a3a3;
      font-feature-settings:
        'liga' off,
        'clig' off;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 2.625rem;
    }

    img {
      width: 2rem;
      height: 2rem;
      object-fit: content;
    }
  `,
};
