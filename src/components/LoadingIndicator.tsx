import styled from '@emotion/styled';

export function LoadingIndicator() {
  return <styles.loader />;
}

const styles = {
  loader: styled.div`
    width: 30px;
    height: 30px;
    position: relative;
    transform: rotate(45deg);

    &::before,
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50% 50% 0 50%;
      background: #0000;
      background-image: radial-gradient(
        circle 7px at 50% 50%,
        #0000 94%,
        #3b2db5
      );
    }

    &::after {
      animation: pulse 1s infinite;
      transform: perspective(336px) translateZ(0px);
    }

    @keyframes pulse {
      to {
        transform: perspective(336px) translateZ(168px);
        opacity: 0;
      }
    }
  `,
};
