import "./Header.scss";

type Props = {
  scale: string;
  setScale: (value: string) => void;
};

const Header = ({ scale, setScale }: Props) => {
  const handleIncrease = () => {
    const options = [
      "0.25",
      "0.30",
      "0.40",
      "0.50",
      "0.60",
      "0.70",
      "0.80",
      "0.90",
      "1",
      "1.25",
      "1.50",
    ];
    const currentIndex = options.indexOf(scale);
    if (currentIndex < options.length - 1) {
      setScale(options[currentIndex + 1]);
    }
  };

  const handleDecrease = () => {
    const options = [
      "0.25",
      "0.30",
      "0.40",
      "0.50",
      "0.60",
      "0.70",
      "0.80",
      "0.90",
      "1",
      "1.25",
      "1.50",
    ];
    const currentIndex = options.indexOf(scale);
    if (currentIndex > 0) {
      setScale(options[currentIndex - 1]);
    }
  };

  return (
    <header>
      <div className="main-logo">
        <span className="logotype">
          Services<span className="logotype-0">O</span>
        </span>
      </div>
      <div className="size-options-box">
        <div className="to-center-options">
          <button className="list-view-btn">LIST VIEW</button>
          <button className="to-center-btn" onClick={() => setScale("1")}>
            &oplus;
          </button>
        </div>
        <div className="scale-options">
          <button className="decrement-btn" onClick={handleDecrease}>
            -
          </button>
          <select
            className="select-scale"
            value={scale}
            onChange={(e) => setScale(e.target.value)}
          >
            <option value="0.25">25%</option>
            <option value="0.30">30%</option>
            <option value="0.40">40%</option>
            <option value="0.50">50%</option>
            <option value="0.60">60%</option>
            <option value="0.70">70%</option>
            <option value="0.80">80%</option>
            <option value="0.90">90%</option>
            <option value="1">100%</option>
            <option value="1.25">125%</option>
            <option value="1.50">150%</option>
          </select>
          <button className="increment-btn" onClick={handleIncrease}>
            +
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
