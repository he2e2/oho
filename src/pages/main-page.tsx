import styled from '@emotion/styled';
import { useState } from 'react';

import { SearchBar, ColCard } from '@/components';
import { areaImageMap, areaMap, typeMap } from '@/utils';
import { useNavigate } from 'react-router-dom';

export function MainPage() {
  return (
    <styles.wrapper>
      <styles.background $section='top'>
        <SearchSection />
      </styles.background>
      <styles.background $section='bottom'>
        <LegionListSection />
      </styles.background>
    </styles.wrapper>
  );
}

interface MenuProps {
  $active: boolean;
}

function SearchSection() {
  const [menu, setMenu] = useState('행사');
  const [, setKeyword] = useState('');
  const [area, setArea] = useState('서울');
  const navigate = useNavigate();

  const handleSearch = (menu: string, keyword: string) => {
    const queryParams = new URLSearchParams({
      keyword,
      areaCode: areaMap.find((a) => a.name === area)?.code ?? '1',
    });
    navigate(
      `/${typeMap.find((type) => type.name === menu)?.page}?${queryParams.toString()}`,
    );
  };

  return (
    <styles.container className='mw'>
      <h2 style={{ color: '#fff' }}>
        찾고싶은 행사, 숙소, 관광지를
        <br />
        검색해보세요
      </h2>
      <styles.tabMenuCon>
        <styles.menu
          $active={menu === '행사'}
          onClick={() => {
            setMenu('행사');
          }}
        >
          행사 검색
        </styles.menu>
        <styles.menu
          $active={menu === '숙소'}
          onClick={() => {
            setMenu('숙소');
          }}
        >
          숙소 검색
        </styles.menu>
        <styles.menu
          $active={menu === '관광지'}
          onClick={() => {
            setMenu('관광지');
          }}
        >
          관광지 검색
        </styles.menu>
      </styles.tabMenuCon>
      <SearchBar
        type={menu}
        area={area}
        onKeywordChange={setKeyword}
        onAreaChange={setArea}
        handleSearch={handleSearch}
      />
    </styles.container>
  );
}

function LegionListSection() {
  const navigate = useNavigate();

  const handleSearch = (area: string, sigungu?: string) => {
    const queryParams = new URLSearchParams({
      areaCode: area,
      sigunguCode: sigungu ?? '',
    });
    navigate(`/festival?${queryParams.toString()}`);
  };

  return (
    <styles.container className='mw'>
      <h2 style={{ color: '#000' }}>인기있는 지역의 행사를 확인해보세요!</h2>
      <styles.areaList>
        {areaImageMap.map((area) => {
          return (
            <button
              type='button'
              key={area.name}
              onClick={() => {
                handleSearch(area.code, area.name);
              }}
            >
              <ColCard imageUrl={area.imageUrl} name={area.name} />
            </button>
          );
        })}
      </styles.areaList>
    </styles.container>
  );
}

interface BackgroundProps {
  $section: 'top' | 'bottom';
}

const styles = {
  wrapper: styled.div`
    width: 100%;
    height: 100%;
  `,

  background: styled.div<BackgroundProps>`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    background-color: ${(props) =>
      props.$section === 'top' ? '#3B2DB5' : '#fff'};
  `,

  container: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;

    @media (max-width: 768px) {
      gap: 1.25rem;
    }

    h2 {
      text-align: center;
      font-size: 2rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;

      @media (max-width: 768px) {
        font-size: 1.25rem;
      }
    }
  `,

  tabMenuCon: styled.div`
    display: flex;
    gap: 1.5rem;
    align-items: center;
  `,

  menu: styled.span<MenuProps>`
    position: relative;
    color: #fff;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 0.56rem;
    cursor: pointer;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: ${(props) => (props.$active ? '100%' : '0')};
      height: 2px;
      background-color: #fff;
      transition: width 0.3s ease;
    }
  `,

  areaList: styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;

    overflow-x: scroll;

    &::-webkit-scrollbar {
      width: 8px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d9d9d9;
      border-radius: 20px;
    }

    @media (max-width: 768px) {
      justify-content: start;
    }
  `,
};
