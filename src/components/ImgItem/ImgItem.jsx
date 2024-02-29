import { useEffect, useState } from "react";
import { FaceRect } from "../FaceRect/FaceRect";

export const ImgItem = ({
  preview,
  rectangles,
  imgId,
  selectedFace,
  setSelectedFace,
}) => {
  const [naturalSize, setNaturalSize] = useState([]);
  const [scaleRect, setScaleRect] = useState([]);

  useEffect(() => {
    if (rectangles?.length > 0) {
      console.log(rectangles);
      rectangles.forEach((_, i) => {
        const scale = getRectangleDimensions(...rectangles[i]);
        setScaleRect((prevState) => [...prevState, scale]);
      });
    }
  }, [rectangles]);

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setNaturalSize({
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const handleSelectFace = (i, imgId) => {
    setSelectedFace((prevState) => {
      return {
        ...prevState,
        [imgId]:
          prevState[imgId] !== undefined ? [...prevState[imgId], i] : [i],
      };
    });
  };

  const getRectangleDimensions = (x1, y1, x2, y2) => {
    console.log(x1, y1, x2, y2);
    const originalPoint1 = { x1, y1 };
    const originalPoint2 = { x2, y2 };
    const originalImageSize = naturalSize;

    // Новые размеры изображения
    const newImageSize = {
      width: 800,
      height: 500,
    };

    // Рассчитываем соотношение между старым и новым размером
    const widthRatio = newImageSize.width / originalImageSize?.width;
    const heightRatio = newImageSize.height / originalImageSize?.height;

    // Рассчитываем новые координаты точки
    const newPoint1 = {
      x: originalPoint1.x1 * widthRatio,
      y: originalPoint1.y1 * heightRatio,
    };

    const newPoint2 = {
      x: originalPoint2.x2 * widthRatio,
      y: originalPoint2.y2 * heightRatio,
    };

    const width = newPoint2.x - newPoint1.x;
    const height = newPoint2.y - newPoint1.y;

    return {
      x: newPoint1.x,
      y: newPoint1.y,
      width,
      height,
    };
  };

  return (
    <div className="img__item">
      <div
        className="rect_wrapper"
        style={{
          width: "800px",
          height: "500px",
        }}
      >
        {scaleRect?.map((item, i) => (
          <FaceRect
            {...item}
            key={i}
            onClick={() => handleSelectFace(i, imgId)}
          />
        ))}
      </div>
      <img src={preview} className="img" onLoad={handleImageLoad} />
    </div>
  );
};
