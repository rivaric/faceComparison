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
  const [coordinatesAllImages, setCoordinatesAllImages] = useState([[]]);
  const [drag, setDrag] = useState(true);
  const [imageIds, setImgsIds] = useState([]);
  //   const [selectedFace, setSelectedFace] = useState({});
  const [slidId, setSlidId] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      setPreviews((prevState) => [...prevState, URL.createObjectURL(file)]);
      setFiles((prevState) => [...prevState, e.target.files[i]]);
    }
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
    setCoordinatesAllImages([]);
    setSlidId(0);
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

          const imageIds = data.image_ids;
          const coordinatesAllImages = data.bboxes;

          setImgsIds(imageIds);
          setCoordinatesAllImages(coordinatesAllImages);
        });
    });
  };

  //   const onCheck = () => {
  //     console.log(selectedFace);
  //     getSimilarityCoefficient(selectedFace)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         const data = JSON.parse(JSON.stringify(json));
  //         console.log(data);
  //       });
  //   };

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
                    imgId={imageIds[i]}
                    preview={preview}
                    rectangles={coordinatesAllImages[i]}
                    // selectedFace={selectedFace}
                    // setSelectedFace={setSelectedFace}
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
        <button
          className="btn"
          // onClick={onCheck}
        >
          Проверить
        </button>
      </div>
    </div>
  );
}

export default App;
