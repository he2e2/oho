import { RowCard } from '@/components';
import { loadStorage, typeMap } from '@/utils';
import styled from '@emotion/styled';

export function MyPage() {
  return (
    <styles.wrapper className='mw'>
      <LikeList type='행사' />
      <LikeList type='숙소' />
      <LikeList type='관광지' />
    </styles.wrapper>
  );
}

function LikeList({ type }: { type: string }) {
  const list = loadStorage(typeMap.find((t) => t.name === type)!.id);

  return (
    <styles.likeList>
      <h2>내가 찜한 {type} 목록</h2>
      <div className='cardsWrapper'>
        <div className='cards'>
          {list.length === 0 ? (
            <p className='noData'>찜 목록이 없습니다.</p>
          ) : (
            list.map((item) => (
              <RowCard
                key={item.contentid}
                name={item.title}
                addr={item.addr1}
                imageUrl={
                  item.firstimage === '' ? '/no-image.png' : item.firstimage
                }
                contentid={item.contentid}
              />
            ))
          )}
        </div>
      </div>
    </styles.likeList>
  );
}

const styles = {
  wrapper: styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 8rem 0.5rem;
    gap: 6rem;
  `,

  likeList: styled.section`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 2.38rem;

    @media (max-width: 768px) {
      gap: 1rem;
    }

    h2 {
      color: #000;
      font-size: 1.875rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    .cardsWrapper {
      width: 100%;
      padding: 1.5rem 1rem;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        width: 4px;
        height: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: #d9d9d9;
        border-radius: 20px;
      }
    }

    .cards {
      display: flex;
      width: 100%;
      gap: 1rem;
    }

    .noData {
      color: rgba(0, 0, 0, 0.4);
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `,
};
