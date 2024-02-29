import { Download } from "../../assets/icons/Download";

export const AddImages = ({ files }) => {
  const addImage = () => {
    document.getElementById("addImage").click();
  };

  return (
    <div
      className="add"
      onClick={addImage}
      style={{ display: `${files.length !== 0 ? "none" : "flex"}` }}
    >
      <div className="add__icon">
        <Download />
      </div>
      Выбeрите или перетащить изображения
    </div>
  );
};
