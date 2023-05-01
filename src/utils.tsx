import { DragRefType } from "./types";

// image starts being dragged
const handleDragStart = (
  e: React.DragEvent<HTMLImageElement>,
  ref: React.RefObject<HTMLImageElement>,
  dragRef: React.RefObject<DragRefType>,
  setPos: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!ref.current || !dragRef.current) return;
  ref.current.classList.add("isDragging");
  dragRef.current.start = ref.current;
  dragRef.current.setPosStart = setPos;
};
// image stops being dragged (released)
const handleDragEnd = (
  e: React.DragEvent<HTMLImageElement>,
  ref: React.RefObject<HTMLImageElement>,
  dragRef: React.RefObject<DragRefType>
) => {
  if (!ref.current || !dragRef.current) return;
  ref.current.classList.remove("over");
  // swap the positions of the two images by exchanging their 'order' styles
  const startOrder = dragRef.current.start?.id || "";
  const endOrder = dragRef.current.end?.id || "";
  dragRef.current.setPosStart(endOrder);
  dragRef.current.setPosEnd(startOrder);
  ref.current.classList.remove("isDragging");
};
// image is dragged over other image
const handleDragOver = (
  e: React.DragEvent<HTMLImageElement>,
  dragRef: React.RefObject<DragRefType>,
  setPos: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!dragRef.current) return;

  dragRef.current.end = e.target as HTMLElement;
  dragRef.current.setPosEnd = setPos;
};
// other image has image dragged over it
const handleDragEnter = (
  e: React.DragEvent<HTMLImageElement>,
  ref: React.RefObject<HTMLDivElement>
) => {
  if (!ref.current) return;
  ref.current.classList.add("over");
};
// other image has image dragged away from it
const handleDragLeave = (
  e: React.DragEvent<HTMLImageElement>,
  ref: React.RefObject<HTMLDivElement>
) => {
  if (!ref.current) return;
  ref.current.classList.remove("over");
};
// loading states of image
const handleLoad = (
  ref: React.RefObject<HTMLImageElement>,
  setIsRendered: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // image is in second cycle of rendering
  const handleRendering = () => {
    requestAnimationFrame(handleRender);
  };

const handleRender = () => {
    if (!ref.current) return;
    ref.current.classList.remove("rendering");
    ref.current.classList.add("rendered");
    setIsRendered(true);
  };
  // image starts rendering
  requestAnimationFrame(handleRendering);
};

export { handleDragStart, handleDragEnd, handleDragOver, handleDragEnter, handleDragLeave, handleLoad };