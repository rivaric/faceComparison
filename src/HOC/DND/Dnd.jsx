export const Dnd = ({ children, setDrag, onDrop }) => {
  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHendler = (e) => {
    e.preventDefault();
    setDrag(false);
    onDrop(e);
  };

  return (
    <div
      className="dnd"
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragStartHandler(e)}
      onDrop={(e) => onDropHendler(e)}
    >
      {children}
    </div>
  );
};
