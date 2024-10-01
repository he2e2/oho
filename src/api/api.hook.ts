import { useQuery } from '@tanstack/react-query';

import { getSearchKeywordData } from './api';

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
