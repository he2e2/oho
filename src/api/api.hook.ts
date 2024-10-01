import { useQuery } from '@tanstack/react-query';

import { getSearchKeywordData } from './api';

export const useSearchData = (
  keyword: string,
  sigungu?: string,
  page: number = 1,
  type: string = '15',
  area: string = '1',
  enabled: boolean = false,
) =>
  useQuery({
    queryKey: ['/oho/searchKeyword1'],
    queryFn: () => getSearchKeywordData(page, keyword, type, area, sigungu),
  });
