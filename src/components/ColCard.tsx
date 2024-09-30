import styled from '@emotion/styled';

export function ColCard({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  return (
    <div className='colCardWrapper' style={{ perspective: '1000px' }}>
      <styles.card>
        <img src={imageUrl} alt='card-image' />
        <h3>{name}</h3>
      </styles.card>
    </div>
  );
}

const styles = {
  card: styled.section`
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background: #fff;
    box-shadow: 4px 4px 14.2px 0px rgba(0, 0, 0, 0.16);
    padding: 2rem;
    justify-content: space-between;
    align-items: center;
    gap: 2.75rem;
    transition: transform 0.3s ease-in-out;
    transform-style: preserve-3d;
    width: 100%;

    @media (max-width: 768px) {
      padding: 1rem;
      gap: 1.25rem;
    }

    &:hover {
      transform: translateZ(30px);
    }

    img {
      width: 5.75rem;
      height: 5.75rem;
      object-fit: content;

      @media (max-width: 768px) {
        width: 3.25rem;
        height: 3.25rem;
      }
    }

    h3 {
      color: #000;
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

      @media (max-width: 768px) {
        font-size: 0.875rem;
      }
    }
  `,
};
