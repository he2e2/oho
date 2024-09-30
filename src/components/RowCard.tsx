import styled from '@emotion/styled';

export function RowCard({
  imageUrl,
  name,
  date,
  addr,
}: {
  imageUrl: string;
  name: string;
  date: string;
  addr: string;
}) {
  return (
    <styles.wrapper>
      <styles.image src={imageUrl} alt='card-image' />
      <styles.contents>
        <h4>{name}</h4>
        <span className='date'>{date}</span>
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
    width: 20rem;
    border-radius: 20px;
    background: #fff;
    box-shadow: 4px 4px 14.2px 0px rgba(0, 0, 0, 0.16);
    align-items: center;
  `,

  image: styled.img`
    width: 5.75rem;
    height: 5.75rem;
    border-radius: 50%;
    object-fit: content;
  `,

  contents: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.3rem;

    font-style: normal;
    line-height: normal;

    h4 {
      color: #000;
      font-size: 1rem;
      font-weight: 700;
    }

    .date {
      color: rgba(0, 0, 0, 0.65);
      font-size: 0.875rem;
      font-weight: 500;
    }

    .addr {
      color: #000;
      font-size: 0.75rem;
      font-weight: 400;
      flex: 1;
    }
  `,
};
