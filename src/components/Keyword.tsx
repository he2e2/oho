import styled from '@emotion/styled';

export function Keyword({ name }: { name: string }) {
  return (
    <styles.container>
      <span>{name}</span>
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    padding: 0.325rem 0.75rem;
    border-radius: 50px;
    background: #3b2db5;
    display: flex;
    align-items: center;

    span {
      color: #fff;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
};
