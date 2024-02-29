export const FaceRect = ({ x, y, width, height, onClick }) => {
  const validX = isNaN(x) ? 0 : x;
  const validY = isNaN(y) ? 0 : y;
  const validWidth = isNaN(width) ? 0 : width;
  const validHeight = isNaN(height) ? 0 : height;

  return (
    <div
      onClick={onClick}
      className="face"
      style={{
        cursor: "pointer",
        position: "absolute",
        left: validX,
        top: validY,
        width: validWidth,
        height: validHeight,
        border: "2px solid red",
        transition: "all 0.2s",
        zIndex: 10,
      }}
    />
  );
};
