export type TranslationsAPIResponse = {
  UntranslatedLanguages: string[];
  Items: {
    Culture: string;
    FileStatus: number;
    HasPublishedVersion: boolean;
    LastModified: string;
    Path: {
      DecodedUrl: string;
    };
    Title: string;
  }[];
};

export type TranslationsItemAPIResponse = {
  OData__SPIsTranslation: boolean;
  OData__SPTranslatedLanguages: string[];
  UniqueId: string;
};

export type TranslationsSearchAPIResponse = {
  ElapsedTime: number;
  PrimaryQueryResult: {
    RelevantResults: {
      Table: {
        Rows: [
          {
            Cells: [{ Key: string; Value: string; ValueType: string }];
          }
        ];
      };
    };
  };
  Properties: any;
  SecondaryQueryResults: any[];
};

export type TranslationsResponses = {
  translationsAPI: string[];
  itemAPI: string[];
  searchAPI: string[];
};
