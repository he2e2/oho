import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export function LoadingImage({ imageURL }: { imageURL: string }) {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imageURL;
    img.onload = () => setImageLoading(false);
    img.onerror = () => setImageLoading(false);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageURL]);

  return (
    <styles.wrapper>
      <styles.container $isLoading={imageLoading}>
        <styles.contents
          $isLoading={imageLoading}
          src={imageURL}
          alt='item-image'
          loading='lazy'
        />
      </styles.container>
    </styles.wrapper>
  );
}

interface Loading {
  $isLoading: boolean;
}

const styles = {
  wrapper: styled.div`
    width: 17rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;

    @media (max-width: 768px) {
      position: relative;
      width: 100%;
      height: 0;
      overflow: hidden;
      padding-bottom: 70%;
    }
  `,

  container: styled.div<Loading>`
    width: 16.5rem;
    height: 12rem;
    object-fit: cover;
    border-radius: 8px;

    flex-shrink: 0;
    position: relative;

    overflow: hidden;
    background-color: ${(props) => (props.$isLoading ? '#f9f9f9' : '#fff')};
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    background-size: 40px 100%;
    background-repeat: no-repeat;
    background-position: left -80px top 0;
    animation: ${(props) =>
      props.$isLoading ? 'loading 1s ease-in-out infinite' : 'none'};

    @media (max-width: 768px) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    @keyframes loading {
      to {
        background-position: right -40px top 0;
      }
    }
  `,

  contents: styled.img<Loading>`
    object-fit: cover;
    width: 100%;
    height: 100%;
    display: ${(props) => (props.$isLoading ? 'none' : 'block')};
  `,
};
