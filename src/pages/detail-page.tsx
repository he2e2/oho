import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

import { DetailDatas, useCommonData, useDetailData } from '@/api';
import { Keyword, LikeButton, LoadingImage } from '@/components';
import { useIsMobile } from '@/hooks';
import { checkItem, removeItem, addItem } from '@/utils';

export function DetailPage() {
  const { id } = useParams();
  const [like, setLike] = useState(false);
  const { data: commonData } = useCommonData(id?.toString() ?? '');
  const { data: detailData, refetch: getDetails } = useDetailData(
    id?.toString() ?? '',
    commonData?.contenttypeid ?? '',
  );

  const handleLikesClick = () => {
    setLike((prev) => !prev);

    if (commonData) {
      const { title, addr1, addr2, firstimage, contentid, contenttypeid } =
        commonData;
      if (like)
        removeItem(
          { title, addr1, addr2, firstimage, contentid },
          contenttypeid,
        );
      else
        addItem({ title, addr1, addr2, firstimage, contentid }, contenttypeid);
    }
  };

  useEffect(() => {
    if (commonData && id) {
      getDetails();
      setLike(checkItem(id.toString(), commonData.contenttypeid));
    }
  }, [commonData]);

  const getHomepageURL = (homepage?: string) => {
    const urlMatch = homepage?.match(/href="([^"]*)"/);

    return urlMatch ? urlMatch[1] : undefined;
  };

  return (
    <styles.wrapper className='mw'>
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
        <LoadingImage
          imageURL={commonData?.firstimage ?? '/no-image.png'}
          page='detail'
        />
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

const formatEmptyString = (detail: string) => {
  return detail === '' ? '정보가 없습니다.' : detail;
};

const stringToJSX = (text?: string): JSX.Element => {
  const cleanHTML = DOMPurify.sanitize(text ?? '');
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};

const InfoList = ({
  category,
  content,
}: {
  category: string;
  content?: string | JSX.Element;
}) => (
  <li>
    <styles.category>{category}</styles.category>
    <styles.cateItem>
      {typeof content === 'string' ? formatEmptyString(content) : content}
    </styles.cateItem>
  </li>
);

const renderContent = (
  contentTypeId?: string,
  details?: DetailDatas,
  homepage?: string,
  overview?: string,
) => {
  const isMobile = useIsMobile();

  const homepageLink = (
    <a href={homepage} target='_blank'>
      {isMobile ? '🔗링크' : formatEmptyString(homepage ?? '')}
    </a>
  );

  const commonInfo = (
    <>
      <InfoList category='홈페이지' content={homepageLink} />
      <InfoList category='상세정보' content={stringToJSX(overview)} />
    </>
  );

  switch (contentTypeId) {
    case '15':
      return (
        <styles.info>
          <InfoList category='이벤트 장소' content={details?.eventplace} />
          <InfoList
            category='운영 기간'
            content={`${details?.eventstartdate} ~ ${details?.eventenddate}`}
          />
          <InfoList category='운영 시간' content={details?.playtime} />
          {commonInfo}
        </styles.info>
      );
    case '32':
      return (
        <styles.info>
          <InfoList category='방 타입' content={details?.roomtype} />
          <InfoList category='체크인 시간' content={details?.checkintime} />
          <InfoList category='체크아웃 시간' content={details?.checkouttime} />
          <InfoList
            category='주차 가능 여부'
            content={details?.parkinglodging}
          />
          {commonInfo}
        </styles.info>
      );
    case '12':
      return (
        <styles.info>
          <InfoList category='전화번호' content={details?.infocenter} />
          <InfoList category='주차 가능 여부' content={details?.parking} />
          <InfoList category='휴무일' content={details?.restdate} />
          {commonInfo}
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
      text-align: center;
      width: 60%;

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
    gap: 4rem;
    padding: 0 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: start;
      gap: 2rem;
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
    width: 100%;
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
