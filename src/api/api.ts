import axios from 'axios';

import type { GetSearchKeywordDataDTO } from './api.dto';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const getCommonParams = (page: number) => ({
  serviceKey: API_KEY,
  numOfRows: 4,
  pageNo: page,
  MobileOS: 'ETC',
  MobileApp: 'oho',
  _type: 'json',
  arrange: 'C',
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
      },
    })
    .then((res) => res.data.response.body.items);

export const getSearchFestivalData = (
  page: number,
  area: string,
  eventStartDate: string,
  sigungu?: string,
) =>
  axios
    .get<GetSearchKeywordDataDTO>(`${API_URL}/searchFestival1`, {
      params: {
        ...getCommonParams(page),
        areaCode: area,
        sigunguCode: sigungu,
        eventStartDate: eventStartDate,
      },
    })
    .then((res) => res.data.response.body.items);
