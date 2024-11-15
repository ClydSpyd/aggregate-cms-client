import { LocalFields } from "./types";

export function hasEmptyFields(fields: LocalFields): boolean {
    return (
      !fields.title.trim() ||     
      !fields.caption.trim() ||   
      fields.tags.length === 0 || 
      !fields.sourceUrl.trim() || 
      !fields.imgUrl.trim()       
    );
  }