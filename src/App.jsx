import { useState, useRef } from "react";
import { Download } from "./assets/Download";
import { toBase64 } from "./helpers/toBase64";
import "./App.css";
import { ImgItem } from "./components/ImgItem/ImgItem";
import { getCoorditatesFaces } from "./api/getCoorditatesFaces";
import { getSimilarityCoefficient } from "./api/getSimilarityCoefficient";
import { Dnd } from "./HOC/DND/Dnd";
import { Slider } from "./components/Slider/Slider";

function App() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [naturalSize, setNaturalSize] = useState([]);
  const [scaleReactangleCoordinates, setScaleReactangleCoordinates] = useState(
    []
  );
  const [drag, setDrag] = useState(true);
  const refImg = useRef();
  const [imgId, setImgId] = useState([]);
  const [selectedFace, setSelectedFace] = useState({});
  const [slidId, setSlidId] = useState([]);

  const getRectangleDimensions = (x1, y1, x2, y2) => {
    const originalPoint1 = { x1, y1 };
    const originalPoint2 = { x2, y2 };
    const originalImageSize = naturalSize;

    // Новые размеры изображения
    const newImageSize = {
      width: refImg.current.width,
      height: refImg.current.height,
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

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      setPreviews((prevState) => [...prevState, URL.createObjectURL(file)]);
      setFiles((prevState) => [...prevState, e.target.files[i]]);
    }
  };

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setNaturalSize({
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const handleDrop = (e) => {
    const files = [...e.dataTransfer.files];
    for (let i = 0; i < files; i++) {
      const file = files[i];
      setPreviews((prevState) => [...prevState, URL.createObjectURL(file)]);
      setFiles((prevState) => [...prevState, e.target.files[i]]);
    }
  };

  const onClear = () => {
    setFiles([]);
    setPreviews([]);
    setScaleReactangleCoordinates([]);
  };

  const addImage = () => {
    document.getElementById("addImage").click();
  };

  const onSend = () => {
    toBase64(files).then((data) => {
      getCoorditatesFaces(data)
        .then((response) => response.json())
        .then((json) => {
          const data = JSON.parse(JSON.stringify(json));
          const coordinates = data.bboxes;
          setImgId(data.image_ids[0]);
          coordinates[0].forEach((_, i) => {
            setScaleReactangleCoordinates((prevState) => [
              ...prevState,
              getRectangleDimensions(...coordinates[0][i]),
            ]);
          });
        });
    });
  };

  const onCheck = () => {
    console.log(selectedFace);
    getSimilarityCoefficient(selectedFace)
      .then((response) => response.json())
      .then((json) => {
        const data = JSON.parse(JSON.stringify(json));
        console.log(data);
      });
  };

  return (
    <div className="app">
      <input type="file" onChange={handleChange} id="addImage" multiple />
      <Dnd setDrag={setDrag} onDrop={handleDrop}>
        <div className="wrapper">
          <Slider setSlidId={setSlidId} slidId={slidId} prewiews={previews} />
          <div className="wrapper__content">
            <div
              className="add"
              onClick={addImage}
              style={{ display: `${files.length !== 0 ? "none" : "flex"}` }}
            >
              <div className="add__icon">
                <Download />
              </div>
              Добавить изображение
            </div>
            <div
              className="imgs"
              style={{
                transform: `translate(-${slidId * 800}px)`,
              }}
            >
              {previews.map((preview, i) => (
                <div className="item" key={i}>
                  <ImgItem
                    imgId={imgId[i]}
                    preview={preview}
                    onLoad={handleImageLoad}
                    rectangles={scaleReactangleCoordinates}
                    refImg={refImg}
                    selectedFace={selectedFace}
                    setSelectedFace={setSelectedFace}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dnd>
      <div className="wrapper__btn">
        <button className="btn" onClick={onSend}>
          Получить рамки
        </button>
        <button className="btn" onClick={onClear}>
          Отчистить
        </button>
        <button className="btn" onClick={onCheck}>
          Проверить
        </button>
      </div>
    </div>
  );
}

export default App;
