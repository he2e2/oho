import axios from 'axios';

import type { GetSearchKeywordDataDTO } from './api.dto';

export const getSearchKeywordData = (
  page: number,
  keyword: string,
  type: string,
  area: string,
  sigungu?: string,
) =>
  axios
    .get<GetSearchKeywordDataDTO>(`/oho/searchKeyword1`, {
      params: {
        serviceKey: import.meta.env.VITE_API_KEY,
        numOfRows: 4,
        pageNo: page,
        MobileOS: 'ETC',
        MobileApp: 'oho',
        _type: 'json',
        arrange: 'C',
        keyword: keyword,
        contentTypeId: type,
        areaCode: area,
        sigunguCode: sigungu,
      },
    })
    .then((res) => res.data);
