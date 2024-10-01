import { useQuery } from '@tanstack/react-query';

import { getSearchKeywordData, getSearchFestivalData } from './api';

export const useSearchData = (
  keyword: string,
  area: string,
  type: string,
  page: number,
  sigungu?: string,
  enabled: boolean = false,
) =>
  useQuery({
    queryKey: ['/oho/searchKeyword1'],
    queryFn: () => getSearchKeywordData(page, keyword, type, area, sigungu),
    enabled,
  });

export const useSearchFestival = (
  area: string,
  eventStartDate: string,
  page: number,
  sigungu?: string,
  enabled: boolean = false,
) =>
  useQuery({
    queryKey: ['/oho/searchFestival1'],
    queryFn: () => getSearchFestivalData(page, eventStartDate, area, sigungu),
    enabled,
  });
