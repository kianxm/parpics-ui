export enum ContentRelation {
  ORIGINAL = "ORIGINAL",
  THUMBNAIL128 = "THUMBNAIL_128",
  THUMBNAIL256 = "THUMBNAIL_256",
  THUMBNAIL480 = "THUMBNAIL_480",
  THUMBNAIL720 = "THUMBNAIL_720",
}

export enum ContentCategory {
  RECEIPT = "receipt",
  DISPUTE = "dispute",
  BANKING = "banking",
  THUMBNAIL = "thumbnail",
}

export enum FileType {
  STATEMENTS = "statements",
  RECEIPTS = "receipts",
  INVOICES = "invoices",
}

export interface UploadFileParams {
  category: ContentCategory;
  ids: {
    companyId?: number;
    tenantId?: number;
    userId?: number;
  };
  file: File;
}

export interface Content {
  contentType?: string;
  downloadURL?: string;
  filename?: string;
  relation?: ContentRelation;
  lastModificationTime?: string;
  size?: number;
  url?: string;
  uuid: string;
  derived?: {
    [key in ContentRelation]?: Array<
      Omit<Content, "derived"> & { origContentUUID: string }
    >;
  };
}
