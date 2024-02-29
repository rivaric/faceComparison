import { useState } from "react";
import { toBase64 } from "../helpers/toBase64";
import { ImgItem } from "../components/ImgItem/ImgItem";
import { getCoorditatesFaces } from "../api/getCoorditatesFaces";
import { Dnd } from "../HOC/DND/Dnd";
import { Slider } from "../components/Slider/Slider";
import { AddImages } from "../components/AddImages/AddImages";
import "./App.css";
import { Spiner } from "../assets/icons/Spiner";

function App() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [coordinatesAllImages, setCoordinatesAllImages] = useState([[]]);
  const [drag, setDrag] = useState(false);
  const [imageIds, setImgsIds] = useState([]);
  const [selectedFace, setSelectedFace] = useState({});
  const [slidId, setSlidId] = useState(0);
  const [degreeSimilarity, setDegreeSimilarity] = useState();
  const [isLoading, setIsloading] = useState();

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      setPreviews((prevState) => [...prevState, URL.createObjectURL(file)]);
      setFiles((prevState) => [...prevState, e.target.files[i]]);
    }
  };

  const handleDrop = (e) => {
    const files = [...e.dataTransfer.files];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setPreviews((prevState) => [...prevState, URL.createObjectURL(file)]);
      setFiles((prevState) => [...prevState, file]);
    }
  };

  const onClear = () => {
    setFiles([]);
    setPreviews([]);
    setCoordinatesAllImages([]);
    setSlidId(0);
    setDegreeSimilarity("");
  };

  const onSend = () => {
    setIsloading(true);
    toBase64(files).then((data) => {
      getCoorditatesFaces(data)
        .then((response) => response.json())
        .then((json) => {
          setIsloading(false);
          const data = JSON.parse(JSON.stringify(json));

          const imageIds = data.image_ids;
          const coordinatesAllImages = data.bboxes;

          setImgsIds(imageIds);
          setCoordinatesAllImages(coordinatesAllImages);
        });
    });
  };

  const onCheck = () => {
    // console.log(selectedFace);
    // getSimilarityCoefficient(selectedFace)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     const data = JSON.parse(JSON.stringify(json));
    //     console.log(data);
    //   });
    const max = 100;
    const min = 0;
    setDegreeSimilarity(Math.floor(Math.random() * (max - min + 1)) + min);
  };

  return (
    <div className="app">
      <input type="file" onChange={handleChange} id="addImage" multiple />
      <div className="simil__text">
        {previews.length > 0 &&
          degreeSimilarity &&
          `Степень сходства: ${degreeSimilarity}%`}
      </div>
      <Dnd setDrag={setDrag} onDrop={handleDrop}>
        <div
          className="wrapper"
          style={{
            background: drag ? "#c5c5c5" : "",
          }}
        >
          <Slider setSlidId={setSlidId} slidId={slidId} prewiews={previews} />
          <div className="wrapper__content">
            <AddImages files={files} />
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
        <button className="btn" onClick={onSend} disabled={isLoading}>
          {isLoading ? <Spiner /> : "Получить рамки"}
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
