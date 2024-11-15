export interface LocalFields {
    title: string;
    caption: string;
    tags: string[];
    sourceUrl: string;
    imgUrl: string;
  }

  export const defaultValues: LocalFields = {
    title: "",
    caption: "",
    tags: [],
    sourceUrl: "",
    imgUrl: "",
  };