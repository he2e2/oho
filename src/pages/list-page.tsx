import styled from '@emotion/styled';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useSearchData, type KeywordItem } from '@/api';
import { SearchBar, CustomButton, LikeButton } from '@/components';
import { areaMap, typeMap } from '@/utils';

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
  const [searchParams] = useSearchParams();

  return (
    <styles.wrapper>
      <Header />
      <ListSection
        searchKeyword={searchParams.get('keyword') ?? ''}
        searchArea={searchParams.get('areaCode') ?? '1'}
        searchCard={searchParams.get('sigunguCode')}
      />
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

function ListSection({
  searchKeyword,
  searchArea,
  searchCard,
}: {
  searchKeyword: string;
  searchArea: string;
  searchCard?: string | null;
}) {
  const [keyword, setKeyword] = useState(
    searchCard != null ? searchCard : searchKeyword,
  );
  const [area, setArea] = useState(
    areaMap.find((a) => a.code === searchArea)?.name ?? '서울',
  );
  const location = useLocation();
  const pathname = location.pathname.replace(/\//g, '');

  const { data: searchKeywordData, refetch: search } = useSearchData(
    keyword,
    areaMap.find((a) => a.name === area)?.code ?? '1',
    typeMap.find((t) => t.page === pathname)?.id ?? '15',
    1,
  );

  useEffect(() => {
    if (keyword !== '') search();
  }, [area, keyword]);

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
          {searchKeywordData?.item === undefined ? (
            <p>검색 결과가 존재하지 않습니다.</p>
          ) : (
            searchKeywordData?.item.map((item) => {
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
        </styles.listSection>
      </styles.listContainer>
    </styles.listWrapper>
  );
}

function ListItem({ title, addr1, addr2, firstimage, contentid }: KeywordItem) {
  const navigate = useNavigate();
  return (
    <styles.listItem
      onClick={() => {
        navigate(`/detail/${contentid}`);
      }}
    >
      <img
        src={firstimage === '' ? '/no-image.png' : firstimage}
        alt='item-image'
      />
      <styles.contents>
        <div className='withoutDescription'>
          <div
            style={{ gap: '0.3rem', display: 'flex', flexDirection: 'column' }}
          >
            <h3>{title}</h3>
            {/* {additional && <p className='additional'>{additional}</p>} */}
            <p className='addr'>
              {addr1} {addr2}
            </p>
          </div>
          <div
            className='buttons'
            style={{ gap: '0.5rem', display: 'flex', alignItems: 'center' }}
          >
            <LikeButton like={false} />
            <CustomButton name='상세보기' type='button' />
            {/* {dDay && <CustomButton name={dDay} type='d-day' />} */}
          </div>
        </div>
        {/* <span className='description'>{description}</span> */}
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

    img {
      width: 16.5rem;
      height: 12rem;
      object-fit: cover;
      border-radius: 8px;

      @media (max-width: 768px) {
        width: 100%;
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
};
