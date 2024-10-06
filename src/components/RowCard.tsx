import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

export function RowCard({
  imageUrl,
  name,
  addr,
  contentid,
}: {
  imageUrl: string;
  name: string;
  addr: string;
  contentid: string;
}) {
  const navigate = useNavigate();
  return (
    <styles.wrapper
      onClick={() => {
        navigate(`/detail/${contentid}`);
      }}
    >
      <styles.image src={imageUrl} alt='card-image' />
      <styles.contents>
        <h3>{name}</h3>
        <span className='addr'>{addr}</span>
      </styles.contents>
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.section`
    padding: 1.63rem 2rem;
    display: flex;
    gap: 1.5rem;
    border-radius: 20px;
    background: #fff;
    box-shadow: 4px 4px 14.2px 0px rgba(0, 0, 0, 0.16);
    align-items: center;
    cursor: pointer;

    @media (max-width: 768px) {
      padding: 0.8rem 1rem;
      gap: 0.75rem;
    }
  `,

  image: styled.img`
    width: 5.75rem;
    height: 5.75rem;
    border-radius: 50%;
    object-fit: cover;

    @media (max-width: 768px) {
      width: 3.5rem;
      height: 3.5rem;
    }
  `,

  contents: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-style: normal;
    line-height: normal;
    width: 10rem;

    h3 {
      color: #000;
      font-size: 1rem;
      font-weight: 700;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 768px) {
        font-size: 0.875rem;
      }
    }

    .addr {
      color: #000;
      font-size: 0.75rem;
      font-weight: 400;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  `,
};
