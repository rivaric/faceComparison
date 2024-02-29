export const FaceRect = ({
  x,
  y,
  width,
  height,
  onClick,
  isSelect,
  diffSize,
}) => {
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
        left: diffSize.diffWidth / 2 + validX,
        top: diffSize.diffHeight / 2 + validY,
        width: validWidth,
        height: validHeight,
        border: `2px solid ${isSelect ? "rgb(0, 205, 0)" : "red"}`,
        transition: "all 0.2s",
        zIndex: 10,
      }}
    />
  );
};
