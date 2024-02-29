import { FaceRect } from "../FaceRect/FaceRect";

export const ImgItem = ({
  preview,
  onLoad,
  rectangles,
  refImg,
  imgId,
  selectedFace,
  setSelectedFace,
}) => {
  const handleSelectFace = (i, imgId) => {
    setSelectedFace((prevState) => {
      return {
        ...prevState,
        [imgId]:
          prevState[imgId] !== undefined ? [...prevState[imgId], i] : [i],
      };
    });
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
        {rectangles.map((item, i) => (
          <FaceRect
            {...item}
            key={i}
            onClick={() => handleSelectFace(i, imgId)}
            // checkSelect={}
          />
        ))}
      </div>
      <img src={preview} className="img" onLoad={onLoad} ref={refImg} />
    </div>
  );
};
