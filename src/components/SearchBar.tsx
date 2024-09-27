import styled from '@emotion/styled';
import { useState } from 'react';

import { area } from '@/utils';

export function SearchBar({ type }: { type: string }) {
  return (
    <styles.wrapper>
      <Selector />
      <InputBar type={type} />
    </styles.wrapper>
  );
}

function Selector() {
  const [area, setArea] = useState('서울');
  const [isDropBoxVisible, setIsDropBoxVisible] = useState(false);

  return (
    <div
      className='selector-wrapper'
      onClick={() => {
        setIsDropBoxVisible((prev) => !prev);
      }}
    >
      <styles.selector>{area}</styles.selector>
      {isDropBoxVisible && <DropBox onItemClick={setArea} />}
      <styles.icon
        src='/chevron-bottom.svg'
        alt='chevron-bottom-icon'
        style={{ transform: 'translateY(0)' }}
      />
    </div>
  );
}

function DropBox({ onItemClick }: { onItemClick: (area: string) => void }) {
  return (
    <styles.dropBoxWrapper>
      <styles.dropBoxContainer>
        {area.map((area) => {
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

function InputBar({ type }: { type: string }) {
  return (
    <styles.inputContainer>
      <input type='text' placeholder={`지역 ${type} 찾아보기`} />
      <styles.icon src='/search.svg' alt='search-icon' />
    </styles.inputContainer>
  );
}

const styles = {
  wrapper: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.37rem;

    .selector-wrapper {
      display: flex;
      padding: 1.125rem;
      width: 10rem;
      border-radius: 8px;
      border: 1.5px solid rgba(234, 234, 234, 0.34);
      align-items: center;
      position: relative;
    }
  `,

  selector: styled.div`
    flex: 1 0 0;
    color: rgba(255, 255, 255, 0.74);
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1rem;
  `,

  inputContainer: styled.div`
    flex: 1 0 0;
    border-radius: 8px;
    border: 1.5px solid #eaeaea;
    padding: 1.125rem 1.3125rem 1.125rem 1.5rem;
    align-items: center;
    display: flex;
    gap: 1rem;

    input {
      flex: 1;
      color: #fff;
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1rem;

      &::placeholder {
        color: #fff;
      }
    }
  `,

  icon: styled.img`
    width: 1.125rem;
    height: 1.125rem;
    object-fit: content;
    transform: translateY(12%);
  `,

  dropBoxWrapper: styled.div`
    width: 10rem;
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
    }
  `,
};
