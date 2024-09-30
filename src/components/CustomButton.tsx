import styled from '@emotion/styled';

export function CustomButton({
  type,
  name,
}: {
  type: 'button' | 'd-day';
  name: string;
}) {
  return (
    <styles.container $type={type}>
      <span>{name}</span>
    </styles.container>
  );
}

interface Button {
  $type: 'button' | 'd-day';
}

const styles = {
  container: styled.div<Button>`
    background-color: ${(props) =>
      props.$type === 'button' ? '#3b2db5' : '#fff'};
    border-radius: 8px;
    border: ${(props) =>
      props.$type === 'button' ? 'none' : '1px solid rgba(59, 45, 181, 0.11)'};
    display: flex;
    align-items: center;

    span {
      color: ${(props) => (props.$type === 'button' ? '#fff' : '#3B2DB5')};
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 600;
      padding: 0.8rem 2rem;

      @media (max-width: 768px) {
        padding: 0.4rem 1rem;
      }
    }
  `,
};
