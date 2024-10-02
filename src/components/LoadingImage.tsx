import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export function LoadingImage({
  imageURL,
  page,
}: {
  imageURL: string;
  page: 'detail' | 'list';
}) {
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
    <styles.wrapper $page={page}>
      <styles.container $isLoading={imageLoading} $page={page}>
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

interface Page {
  $page: 'detail' | 'list';
}

const styles = {
  wrapper: styled.div<Page>`
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
      position: relative;
      width: 100%;
      height: ${(props) => (props.$page === 'list' ? '0' : 'auto')};
      overflow: hidden;
      padding-bottom: ${(props) => (props.$page === 'list' ? '70%' : '0')};
    }
  `,

  container: styled.div<Loading & Page>`
    width: ${(props) => (props.$page === 'list' ? '16.5rem' : '100%')};
    flex: ${(props) => (props.$page === 'detail' ? '1' : '0')};
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
      position: ${(props) =>
        props.$page === 'list' ? 'absolute' : 'relative'};
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

    @media (max-width: 768px) {
      object-fit: content;
    }
  `,
};
