import { Arrow } from "../../assets/Arrow";

export const Slider = ({ slidId, setSlidId, prewiews }) => {
  const onClicklLeftArrow = () => {
    setSlidId((prevState) => prevState - 1);
  };
  const onClickRightArrow = () => {
    setSlidId((prevState) => prevState + 1);
  };

  const onClickDot = () => {};

  return (
    <>
      <div
        className="arrow_left"
        onClick={onClicklLeftArrow}
        style={{
          display: slidId === 0 ? "none" : "block",
        }}
      >
        <Arrow />
      </div>
      <div
        className="arrow_right"
        onClick={onClickRightArrow}
        style={{
          display: slidId === prewiews.length - 1 ? "none" : "block",
        }}
      >
        <Arrow />
      </div>
      <div className="dots">
        {prewiews.map((_, i) => (
          <div
            className={`dot ${slidId === i ? "dot_active" : ""}`}
            key={i}
          ></div>
        ))}
      </div>
    </>
  );
};
