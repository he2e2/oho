import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { DetailDatas, useCommonData, useDetailData } from '@/api';
import { Keyword, LikeButton } from '@/components';
import { checkItem, removeItem, addItem } from '@/utils';

export function DetailPage() {
  const { id } = useParams();
  const [like, setLike] = useState(checkItem(id?.toString() ?? ''));
  const { data: commonData } = useCommonData(id?.toString() ?? '');
  const { data: detailData, refetch: getDetails } = useDetailData(
    id?.toString() ?? '',
    commonData?.contenttypeid ?? '',
  );

  const handleLikesClick = () => {
    setLike((prev) => !prev);

    if (commonData) {
      const { title, addr1, addr2, firstimage, contentid } = commonData;
      if (like) removeItem({ title, addr1, addr2, firstimage, contentid });
      else addItem({ title, addr1, addr2, firstimage, contentid });
    }
  };

  useEffect(() => {
    if (commonData) getDetails();
  }, [commonData]);

  const getHomepageURL = (homepage?: string) => {
    const urlMatch = homepage?.match(/href="([^"]*)"/);

    return urlMatch ? urlMatch[1] : undefined;
  };

  return (
    <styles.wrapper className='mw'>
      <styles.prev>
        <i className='fa-solid fa-chevron-left' />
        <span>리스트로 가기</span>
      </styles.prev>
      <Keyword type={commonData?.contenttypeid ?? '15'} />
      <styles.titleSection>
        <h2>{commonData?.title}</h2>
        <p className='addr'>
          {commonData?.addr1} {commonData?.addr2}
        </p>
        <LikeButton
          like={like}
          position='absolute'
          handleLikesClick={handleLikesClick}
        />
      </styles.titleSection>
      <styles.infoSection>
        <img src={commonData?.firstimage} alt='detail-image' />
        {renderContent(
          commonData?.contenttypeid,
          detailData!,
          getHomepageURL(commonData?.homepage),
          commonData?.overview,
        )}
      </styles.infoSection>
    </styles.wrapper>
  );
}

const renderContent = (
  contentTypeId?: string,
  details?: DetailDatas,
  homepage?: string,
  overview?: string,
) => {
  switch (contentTypeId) {
    case '15':
      return (
        <styles.info>
          <li>
            <styles.category>이벤트 장소</styles.category>
            <styles.cateItem>{details?.eventplace}</styles.cateItem>
          </li>
          <li>
            <styles.category>운영 기간</styles.category>
            <styles.cateItem>
              {details?.eventstartdate} ~ {details?.eventstartdate}
            </styles.cateItem>
          </li>
          <li>
            <styles.category>운영 시간</styles.category>
            <styles.cateItem>{details?.playtime}</styles.cateItem>
          </li>
          <li>
            <styles.category>홈페이지</styles.category>
            <styles.cateItem>
              <a href={homepage} target='_blank'>
                {homepage}
              </a>
            </styles.cateItem>
          </li>
          <li>
            <styles.category>상세정보</styles.category>
            <styles.cateItem>{overview}</styles.cateItem>
          </li>
        </styles.info>
      );
    case '32':
      return (
        <styles.info>
          <li>
            <styles.category>방 타입</styles.category>
            <styles.cateItem>{details?.roomtype}</styles.cateItem>
          </li>
          <li>
            <styles.category>체크인 시간</styles.category>
            <styles.cateItem>{details?.checkintime}</styles.cateItem>
          </li>
          <li>
            <styles.category>체크아웃 시간</styles.category>
            <styles.cateItem>{details?.checkouttime}</styles.cateItem>
          </li>
          <li>
            <styles.category>주차 가능 여부</styles.category>
            <styles.cateItem>{details?.parkinglodging}</styles.cateItem>
          </li>
          <li>
            <styles.category>홈페이지</styles.category>
            <styles.cateItem>
              <a href={homepage} target='_blank'>
                {homepage}
              </a>
            </styles.cateItem>
          </li>
          <li>
            <styles.category>상세 정보</styles.category>
            <styles.cateItem>{overview}</styles.cateItem>
          </li>
        </styles.info>
      );
    case '12':
      return (
        <styles.info>
          <li>
            <styles.category>전화번호</styles.category>
            <styles.cateItem>{details?.infocenter}</styles.cateItem>
          </li>
          <li>
            <styles.category>주차 가능 여부</styles.category>
            <styles.cateItem>{details?.parking}</styles.cateItem>
          </li>
          <li>
            <styles.category>휴무일</styles.category>
            <styles.cateItem>{details?.restdate}</styles.cateItem>
          </li>
          <li>
            <styles.category>홈페이지</styles.category>
            <styles.cateItem>
              <a href={homepage} target='_blank'>
                {homepage}
              </a>
            </styles.cateItem>
          </li>
          <li>
            <styles.category>상세정보</styles.category>
            <styles.cateItem>{overview}</styles.cateItem>
          </li>
        </styles.info>
      );
    default:
      return null;
  }
};

const styles = {
  wrapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 8rem 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 3rem;

    @media (max-width: 768px) {
      padding: 5rem 0.5rem;
      gap: 1.5rem;
    }
  `,

  prev: styled.div`
    width: 100%;
    display: flex;
    gap: 0.8rem;
    align-items: center;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }

    .fa-chevron-left {
      color: #505050;
    }

    span {
      color: #000;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,

  titleSection: styled.section`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 5rem;

    @media (max-width: 768px) {
      margin-bottom: 2rem;
    }

    h2 {
      color: #000;
      font-size: 2.5rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;

      @media (max-width: 768px) {
        font-size: 1.25rem;
      }
    }

    .addr {
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      @media (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  `,

  infoSection: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: start;
    }

    img {
      min-width: 20rem;
      flex: 1;
      object-fit: content;
      border-radius: 1.25rem;

      @media (max-width: 768px) {
        width: 100%;
        min-width: 100%;
      }
    }
  `,

  info: styled.ul`
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 0.69rem;

    li {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `,

  category: styled.p`
    color: #000;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  `,

  cateItem: styled.span`
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
};
