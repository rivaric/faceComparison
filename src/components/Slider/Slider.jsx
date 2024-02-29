import { Arrow } from "../../assets/icons/Arrow";

export const Slider = ({ slidId, setSlidId, prewiews }) => {
  const onClicklLeftArrow = () => {
    setSlidId((prevState) => prevState - 1);
  };
  const onClickRightArrow = () => {
    setSlidId((prevState) => prevState + 1);
  };

  const onClickDot = (i) => {
    setSlidId(i);
  };

  return (
    <>
      <div
        className="arrow_left"
        onClick={onClicklLeftArrow}
        style={{
          display: slidId === 0 && prewiews ? "none" : "block",
        }}
      >
        <Arrow />
      </div>
      <div
        className="arrow_right"
        onClick={onClickRightArrow}
        style={{
          display:
            slidId === prewiews.length - 1 || prewiews.length < 1
              ? "none"
              : "block",
        }}
      >
        <Arrow />
      </div>
      <div className="dots">
        {prewiews.length > 1 &&
          prewiews.map((_, i) => (
            <div
              onClick={() => onClickDot(i)}
              className={`dot ${slidId === i ? "dot_active" : ""}`}
              key={i}
            ></div>
          ))}
      </div>
    </>
  );
};
