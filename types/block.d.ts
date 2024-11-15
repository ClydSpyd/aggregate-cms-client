// import { Block } from "@blocknote/core";

enum BlockType {
    Paragraph = "paragraph",
    Image = "image",
    Link = "link",
    Text = "text",
  }
  
  // generic block properties (applicable to all blocks)
  interface BlockProps {
    textColor?: string;
    backgroundColor?: string;
    textAlignment?: "left" | "center" | "right";
    name?: string;         // For image blocks
    url?: string;          // For image blocks
    caption?: string;      // For image blocks
    showPreview?: boolean; // For image blocks
    previewWidth?: number; // For image blocks
  }
  
  //content within blocks 
  interface BlockContent {
    type: BlockType;  // Type of content (text, link, etc.)
    text?: string;    // For text content
    href?: string;    // For link content
    styles?: {
      bold?: boolean;
      italic?: boolean;
    }; // Optional styles (for text content)
    content?: BlockContent[]; // Nested content for link blocks (e.g., text inside links)
  }
  
  declare interface BlockType {
    // id: string;           // Unique ID of the block
    type: BlockType;      // Type of the block (paragraph, image, etc.)
    props?: BlockProps;   // Properties specific to the block
    content?: BlockContent[]; // Content array (generic content for all block types)
    children?: Block[];   // Children blocks (for nested blocks, optional)
  }
  