export interface KeywordItem {
  contentid: string;
  title: string;
  firstimage: string;
  addr1: string;
  addr2: string;
}

export interface GetSearchKeywordDataDTO {
  response: {
    header: string;
    body: {
      items: {
        item: KeywordItem[];
      };
    };
  };
}

export interface GetCommonDataDTO {
  response: {
    header: string;
    body: {
      items: {
        item: (KeywordItem & {
          overview: string;
          homepage: string;
          contenttypeid: string;
        })[];
      };
    };
  };
}
