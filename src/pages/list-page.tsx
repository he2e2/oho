import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

import { SearchBar } from '@/components';

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
    </styles.listHeader>
  );
}

function ListSection() {
  return (
    <styles.listWrapper>
      <styles.listContainer className='mw'>
        <SearchBar type='행사' />
      </styles.listContainer>
    </styles.listWrapper>
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

    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: inherit;
      filter: blur(3px);
      z-index: 2;
    }

    h2 {
      color: #fff;
      font-size: 2.5rem;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      z-index: 5;
    }

    .eng {
      color: rgba(255, 255, 255, 0.52);
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      z-index: 5;
    }
  `,

  listWrapper: styled.div`
    flex: 1 0 0;
    padding: 7rem 0;
    display: flex;
    justify-content: center;
  `,

  listContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
