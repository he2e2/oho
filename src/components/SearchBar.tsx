import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { areaMap } from '@/utils';

export function SearchBar({
  type,
  area,
  onKeywordChange,
  onAreaChange,
  handleSearch,
}: {
  type: string;
  area: string;
  onKeywordChange: (k: string) => void;
  onAreaChange: (a: string) => void;
  handleSearch: (m: string) => void;
}) {
  const location = useLocation();
  return (
    <styles.wrapper $pathname={location.pathname}>
      <Selector
        pathname={location.pathname}
        onAreaChange={onAreaChange}
        area={area}
      />
      <InputBar
        type={type}
        pathname={location.pathname}
        onKeywordChange={onKeywordChange}
        handleSearch={handleSearch}
      />
    </styles.wrapper>
  );
}

function Selector({
  pathname,
  area,
  onAreaChange,
}: {
  pathname: string;
  area: string;
  onAreaChange: (a: string) => void;
}) {
  const [isDropBoxVisible, setIsDropBoxVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        containerRef.current !== null &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropBoxVisible(false);
      }
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  return (
    <div
      className='selector-wrapper'
      onClick={() => {
        setIsDropBoxVisible((prev) => !prev);
      }}
      ref={containerRef}
    >
      <styles.selector $pathname={pathname}>{area}</styles.selector>
      {isDropBoxVisible && <DropBox onItemClick={onAreaChange} />}
      <ChevronIcon
        color={
          pathname === '/' ? 'rgba(234, 234, 234, 1)' : 'rgba(136, 136, 136, 1)'
        }
      />
    </div>
  );
}

function DropBox({ onItemClick }: { onItemClick: (area: string) => void }) {
  return (
    <styles.dropBoxWrapper>
      <styles.dropBoxContainer>
        {areaMap.map((area) => {
          return (
            <span
              key={area.code}
              className='option'
              onClick={() => {
                onItemClick(area.name);
              }}
            >
              {area.name}
            </span>
          );
        })}
      </styles.dropBoxContainer>
    </styles.dropBoxWrapper>
  );
}

function InputBar({
  type,
  pathname,
  onKeywordChange,
  handleSearch,
}: {
  type: string;
  pathname: string;
  onKeywordChange: (k: string) => void;
  handleSearch: (m: string) => void;
}) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSearch(type);
  };

  return (
    <styles.inputContainer $pathname={pathname}>
      <input
        type='text'
        placeholder={`지역 ${type} 찾아보기`}
        onChange={(e) => {
          onKeywordChange(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <button
        type='button'
        onClick={() => {
          handleSearch(type);
        }}
      >
        <SearchIcon
          color={pathname === '/' ? '#eaeaea' : 'rgba(0, 0, 0, 0.14)'}
        />
      </button>
    </styles.inputContainer>
  );
}

function ChevronIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.29289 6.79289C4.68342 6.40237 5.31658 6.40237 5.70711 6.79289L10 11.0858L14.2929 6.79289C14.6834 6.40237 15.3166 6.40237 15.7071 6.79289C16.0976 7.18342 16.0976 7.81658 15.7071 8.20711L10.7071 13.2071C10.3166 13.5976 9.68342 13.5976 9.29289 13.2071L4.29289 8.20711C3.90237 7.81658 3.90237 7.18342 4.29289 6.79289Z'
        fill={color}
        fillOpacity='0.34'
      />
    </svg>
  );
}

function SearchIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
    >
      <path
        d='M16.3126 15.5172L12.0646 11.2692C13.0854 10.0437 13.5945 8.47182 13.4858 6.88054C13.3772 5.28927 12.6593 3.80113 11.4814 2.7257C10.3035 1.65027 8.75639 1.07035 7.16182 1.10658C5.56726 1.14281 4.04804 1.79241 2.92022 2.92022C1.79241 4.04804 1.14281 5.56726 1.10658 7.16182C1.07035 8.75639 1.65027 10.3035 2.7257 11.4814C3.80113 12.6593 5.28927 13.3772 6.88054 13.4858C8.47182 13.5945 10.0437 13.0854 11.2692 12.0646L15.5172 16.3126L16.3126 15.5172ZM2.2501 7.3126C2.2501 6.31133 2.54701 5.33255 3.10328 4.50002C3.65956 3.6675 4.45021 3.01862 5.37526 2.63546C6.30031 2.25229 7.31821 2.15203 8.30024 2.34737C9.28227 2.54271 10.1843 3.02486 10.8923 3.73287C11.6003 4.44087 12.0825 5.34292 12.2778 6.32495C12.4732 7.30698 12.3729 8.32488 11.9897 9.24993C11.6066 10.175 10.9577 10.9656 10.1252 11.5219C9.29265 12.0782 8.31386 12.3751 7.3126 12.3751C5.97039 12.3736 4.68359 11.8398 3.73451 10.8907C2.78543 9.9416 2.25158 8.6548 2.2501 7.3126Z'
        fill={color}
      />
    </svg>
  );
}

interface Path {
  $pathname: string;
}

const styles = {
  wrapper: styled.div<Path>`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.37rem;

    .selector-wrapper {
      display: flex;
      padding: 1.125rem;
      max-width: 10rem;
      width: 20%;
      min-width: 6rem;
      border-radius: 8px;
      border: ${(props) =>
        props.$pathname === '/'
          ? '1.5px solid rgba(234, 234, 234, 0.34)'
          : '1px solid rgba(136, 136, 136, 0.34)'};
      align-items: center;
      position: relative;

      @media (max-width: 768px) {
        padding: 0.8rem;
      }
    }
  `,

  selector: styled.div<Path>`
    flex: 1 0 0;
    color: ${(props) =>
      props.$pathname === '/'
        ? 'rgba(255, 255, 255, 0.74)'
        : 'color: rgba(0, 0, 0, 0.74)'};
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1rem;
    cursor: pointer;
  `,

  inputContainer: styled.div<Path>`
    flex: 1 0 0;
    border-radius: 8px;
    border: ${(props) =>
      props.$pathname === '/'
        ? '1.5px solid #eaeaea'
        : '1px solid rgba(0, 0, 0, 0.14)'};
    padding: 1.125rem 1.3125rem 1.125rem 1.5rem;
    align-items: center;
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
      padding: 0.875rem 1rem 0.875rem 1.3rem;
    }

    input {
      flex: 1;
      color: ${(props) => (props.$pathname === '/' ? '#fff' : '#000')};
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1rem;

      &::placeholder {
        color: ${(props) => (props.$pathname === '/' ? '#fff' : '#000')};
      }
    }
  `,

  icon: styled.img`
    width: 1.125rem;
    height: 1.125rem;
    object-fit: content;
    transform: translateY(12%);
    cursor: pointer;
  `,

  dropBoxWrapper: styled.div`
    width: 100%;
    height: 10rem;
    padding: 0.8rem;
    background-color: #fff;
    position: absolute;
    z-index: 1000;
    display: flex;
    bottom: -11rem;
    left: 0;
    border-radius: 10px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  `,

  dropBoxContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    height: 100%;

    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 8px;
      height: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d9d9d9;
      border-radius: 20px;
    }

    .option {
      color: #505050;
      cursor: pointer;
      font-size: 0.8125rem;
    }
  `,
};
