export type DragRefType = {
  start: HTMLImageElement | null;
  end: HTMLElement | null;
  setPosStart: React.Dispatch<React.SetStateAction<string>>;
  setPosEnd: React.Dispatch<React.SetStateAction<string>>;
  maxIndex: number;
  rawFiles: { [key: string]: File };
  fileNames: Set<string>;
};

export type CompressedImageProps = {
  file: File;
  order: number;
  dragRef: React.RefObject<DragRefType>;
  uuid: string;
  MaxResolution?: number;
  MaxFileSize?: number;
};

export type ImageUploaderProps = {
  handleFileSubmit: (files: { [key: string]: File }) => void;
  uploadButtonStyle?: React.CSSProperties;
  submitButtonStyle?: React.CSSProperties;
  Width?: string;
  Height?: string;
  MaxResolution: number;
  MaxFileSize: number;
};
