import styled from '@emotion/styled';

export function LikeButton({
  like,
  position,
}: {
  like: boolean;
  position?: string;
}) {
  return (
    <styles.container $position={position}>
      {like ? <Heart /> : <EmptyHeart />}
    </styles.container>
  );
}

function EmptyHeart() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='17'
      viewBox='0 0 18 17'
      fill='none'
    >
      <path
        d='M1 6.0207C1 10.4207 6.33333 14.5207 9 16.0207C16 11.5206 17 8.52075 17 5.52075C17 2.52075 15 1.0207 12.5 1.0207C10.5 1.0207 9.33333 2.35407 9 3.02075C8.2 1.42075 6.66667 1.02072 6 1.0207C4.33333 0.854031 1 1.6207 1 6.0207Z'
        stroke='black'
        stroke-opacity='0.25'
      />
    </svg>
  );
}

function Heart() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M0 5.0207C0 9.4207 5.33333 13.5207 8 15.0207C15 10.5206 16 7.52075 16 4.52075C16 1.52075 14 0.0206976 11.5 0.0206976C9.5 0.0206976 8.33333 1.35407 8 2.02075C7.2 0.420752 5.66667 0.0207157 5 0.0206976C3.33333 -0.145969 0 0.620697 0 5.0207Z'
        fill='#E64C3C'
      />
    </svg>
  );
}

interface LikeButton {
  $position?: string;
}

const styles = {
  container: styled.div<LikeButton>`
    width: 2.375rem;
    height: 2.375rem;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.13);

    display: flex;
    justify-content: center;
    align-items: center;
    position: ${(props) => (props.$position ? props.$position : 'relative')};
    right: 0;
    top: 0;
  `,
};
