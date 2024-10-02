import axios from 'axios';

import type {
  GetDetailDataDTO,
  GetCommonDataDTO,
  GetSearchKeywordDataDTO,
} from './api.dto';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const getCommonParams = (page: number) => ({
  serviceKey: API_KEY,
  numOfRows: 4,
  pageNo: page,
  MobileOS: 'ETC',
  MobileApp: 'oho',
  _type: 'json',
});

export const getSearchKeywordData = (
  page: number,
  keyword: string,
  type: string,
  area: string,
  sigungu?: string,
) =>
  axios
    .get<GetSearchKeywordDataDTO>(`${API_URL}/searchKeyword1`, {
      params: {
        ...getCommonParams(page),
        keyword,
        contentTypeId: type,
        areaCode: area,
        sigunguCode: sigungu,
        arrange: 'C',
      },
    })
    .then((res) => res.data.response.body.items);

export const getCommonData = (contentId: string, page: number = 1) =>
  axios
    .get<GetCommonDataDTO>(`${API_URL}/detailCommon1`, {
      params: {
        ...getCommonParams(page),
        contentId,
        defaultYN: 'Y',
        firstImageYN: 'Y',
        addrinfoYN: 'Y',
        overviewYN: 'Y',
      },
    })
    .then((res) => res.data.response.body.items.item[0]);

export const getDetailData = (
  contentId: string,
  contentTypeId: string,
  page: number = 1,
) =>
  axios
    .get<GetDetailDataDTO>(`${API_URL}/detailIntro1`, {
      params: {
        ...getCommonParams(page),
        contentId,
        contentTypeId,
      },
    })
    .then((res) => res.data.response.body.items.item[0]);
