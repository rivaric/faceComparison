import { useEffect, useRef, useState } from "react";
import { FaceRect } from "../FaceRect/FaceRect";

export const ImgItem = ({
  preview,
  rectangles,
  imgId,
  selectedFace,
  setSelectedFace,
}) => {
  const [naturalSize, setNaturalSize] = useState({});
  const [scaleRect, setScaleRect] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [containedSize, setContainedSize] = useState({});
  const [diffSize, setDiffSize] = useState();
  const refImg = useRef();

  useEffect(() => {
    if (rectangles?.length > 0) {
      rectangles.forEach((_, i) => {
        const scale = getRectangleDimensions(...rectangles[i]);
        setScaleRect((prevState) => [...prevState, scale]);
      });
    }
  }, [rectangles]);

  const handleImageLoad = (event) => {
    const { scaleWidth, scaleHeight } = getContainedSize(event.target);
    const { naturalWidth, naturalHeight } = event.target;

    setDiffSize({
      diffWidth: refImg.current.offsetWidth - scaleWidth,
      diffHeight: refImg.current.offsetHeight - scaleHeight,
    });
    setContainedSize({
      width: scaleWidth,
      height: scaleHeight,
    });
    setNaturalSize({
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const handleSelectFace = (i, imgId) => {
    setSelectedId(i);
    setSelectedFace((prevState) => ({
      ...prevState,
      [imgId]: i,
    }));
  };

  function getContainedSize(img) {
    let ratio = img.naturalWidth / img.naturalHeight;
    let width = img.height * ratio;
    let height = img.height;
    if (width > img.width) {
      width = img.width;
      height = img.width / ratio;
    }
    return { scaleWidth: width, scaleHeight: height };
  }

  const getRectangleDimensions = (x1, y1, x2, y2) => {
    const originalPoint1 = { x1, y1 };
    const originalPoint2 = { x2, y2 };
    const originalImageSize = naturalSize;

    // Новые размеры изображения
    const newImageSize = containedSize;

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
            isSelect={selectedId === i}
            diffSize={diffSize}
          />
        ))}
      </div>
      <img
        src={preview}
        className="img"
        onLoad={handleImageLoad}
        ref={refImg}
      />
    </div>
  );
};
