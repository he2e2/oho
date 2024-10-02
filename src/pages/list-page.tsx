import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import { useListSectionData, type KeywordItem } from '@/api';
import {
  SearchBar,
  CustomButton,
  LikeButton,
  LoadingIndicator,
  LoadingImage,
} from '@/components';
import { addItem, removeItem, checkItem } from '@/utils';

const headerMap: Record<
  'festival' | 'lodgement' | 'tour',
  { ko: string; en: string }
> = {
  festival: {
    ko: '행사',
    en: 'Festival',
  },
  lodgement: {
    ko: '숙소',
    en: 'Lodgement',
  },
  tour: {
    ko: '관광지',
    en: 'Tourist attraction',
  },
};

export function ListPage() {
  return (
    <styles.wrapper>
      <Header />
      <ListSection />
    </styles.wrapper>
  );
}

function Header() {
  const location = useLocation();
  const pathname = location.pathname.replace(
    /\//g,
    '',
  ) as keyof typeof headerMap;
  const headerData = headerMap[pathname] || { ko: '알 수 없음', en: 'Unknown' };

  return (
    <styles.listHeader $pathname={pathname}>
      <h2>{headerData.ko}</h2>
      <span className='eng'>{headerData.en}</span>
      <styles.path>HOME &gt; {pathname.toUpperCase()}</styles.path>
    </styles.listHeader>
  );
}

function ListSection() {
  const loadingRef = useRef(null);
  const { items, keyword, setKeyword, area, setArea, hasMore, status } =
    useListSectionData(loadingRef);

  return (
    <styles.listWrapper>
      <styles.listContainer className='mw'>
        <styles.searchSection>
          <span>
            <span className='bold'>{area}</span>
            {keyword !== '' && (
              <>
                의 <span className='bold'>‘{keyword}’</span>
              </>
            )}
            에 대한 검색 결과입니다.
          </span>
          <SearchBar
            type='행사'
            area={area}
            keyword={keyword}
            onAreaChange={setArea}
            onKeywordChange={setKeyword}
          />
        </styles.searchSection>
        <styles.listSection>
          {items.length === 0 && status !== 'pending' ? (
            <p>검색 결과가 존재하지 않습니다.</p>
          ) : (
            items.map((item) => {
              return (
                <ListItem
                  key={item.title}
                  title={item.title}
                  addr1={item.addr1}
                  addr2={item.addr2}
                  firstimage={item.firstimage}
                  contentid={item.contentid}
                />
              );
            })
          )}
          {hasMore && (
            <styles.loadingWrapper ref={loadingRef}>
              <LoadingIndicator />
            </styles.loadingWrapper>
          )}
        </styles.listSection>
      </styles.listContainer>
    </styles.listWrapper>
  );
}

function ListItem({ title, addr1, addr2, firstimage, contentid }: KeywordItem) {
  const navigate = useNavigate();
  const [like, setLike] = useState(checkItem(contentid));

  const handleLikesClick = () => {
    setLike((prev) => !prev);

    if (like) removeItem({ title, addr1, addr2, firstimage, contentid });
    else addItem({ title, addr1, addr2, firstimage, contentid });
  };

  return (
    <styles.listItem>
      <LoadingImage
        imageURL={firstimage === '' ? '/no-image.png' : firstimage}
        page='list'
      />
      <styles.contents>
        <div className='withoutDescription'>
          <styles.nameContainer>
            <h3>{title}</h3>
            <p className='addr'>
              {addr1} {addr2}
            </p>
          </styles.nameContainer>
          <styles.buttonWrapper>
            <LikeButton like={like} handleLikesClick={handleLikesClick} />
            <div
              onClick={() => {
                navigate(`/detail/${contentid}`);
              }}
            >
              <CustomButton name='상세보기' type='button' />
            </div>
          </styles.buttonWrapper>
        </div>
      </styles.contents>
    </styles.listItem>
  );
}

interface Path {
  $pathname: string;
}

const styles = {
  wrapper: styled.div`
    width: 100%;
    height: 100%;
  `,

  listHeader: styled.section<Path>`
    width: 100%;
    padding: 9rem 0 8rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${(props) => `/bg/${props.$pathname}.png`}) no-repeat center;
    background-size: cover;
    position: relative;
    flex-direction: column;

    @media (max-width: 768px) {
      padding: 6rem 0 5rem 0;
    }

    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: inherit;
      filter: blur(5px);
      z-index: 2;
    }

    h2 {
      color: #fff;
      text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
      font-size: 2.5rem;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      z-index: 5;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .eng {
      color: rgba(255, 255, 255, 0.52);
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      z-index: 5;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  `,

  path: styled.span`
    position: absolute;
    z-index: 10;
    bottom: 1rem;
    right: 0.5rem;
    color: rgba(255, 255, 255, 0.52);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  `,

  listWrapper: styled.div`
    flex: 1 0 0;
    padding: 7rem 0;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
      padding: 3rem 0;
    }
  `,

  listContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
  `,

  searchSection: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1.75rem;

    span {
      color: #000;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    .bold {
      font-weight: 600;
    }
  `,

  listSection: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: 1fr;
    }
  `,

  listItem: styled.li`
    display: flex;
    gap: 2.55rem;
    align-items: center;
    cursor: pointer;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1.25rem;
    }

    .imgWrapper {
      @media (max-width: 768px) {
        position: relative;
        width: 100%;
        height: 0;
        overflow: hidden;
        padding-bottom: 70%;
      }
    }

    img {
      width: 16.5rem;
      height: 12rem;
      object-fit: cover;
      border-radius: 8px;

      @media (max-width: 768px) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  `,

  contents: styled.section`
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem 0;

    .withoutDescription {
      display: flex;
      align-items: start;
      justify-content: space-between;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
      }
    }

    h3 {
      color: #000;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .addr {
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .description {
      flex: 1;
      color: #626262;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .additional {
      color: rgba(0, 0, 0, 0.65);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `,

  nameContainer: styled.div`
    gap: 1rem;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      align-items: center;
      gap: 0.5rem;
    }
  `,

  loadingWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  buttonWrapper: styled.div`
    gap: 0.5rem;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
      gap: 0.3rem;
    }
  `,
};
