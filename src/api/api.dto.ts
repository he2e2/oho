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

export interface DetailDatas {
  eventplace?: string;
  eventstartdate?: string;
  eventenddate?: string;
  playtime?: string;
  infocenter?: string;
  parking?: string;
  restdate?: string;
  roomtype?: string;
  checkintime?: string;
  checkouttime?: string;
  parkinglodging?: string;
}

export interface GetDetailDataDTO {
  response: {
    header: string;
    body: {
      items: {
        item: DetailDatas[];
      };
    };
  };
}
