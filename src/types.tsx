export type DragRefType = {
  start: HTMLImageElement | null;
  end: HTMLElement | null;
  setPosStart: React.Dispatch<React.SetStateAction<string>>;
  setPosEnd: React.Dispatch<React.SetStateAction<string>>;
  maxIndex: number;
  rawFiles: { [key: string]: File };
};

export type CompressedImageProps = {
  file: File;
  order: number;
  dragRef: React.RefObject<DragRefType>;
  uuid: string;
  MaxResolution?: number;
  MaxFileSize?: number;
};
