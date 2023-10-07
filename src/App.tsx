import { useState, useEffect, useRef } from "react";
import FamilyTree from "./components/FamilyTree";
import "./App.scss";
import Header from "./container/Header";
interface Person {
  id: number;
  name: string;
  children?: Person[];
  parent?: Person | undefined;
  editMode?: boolean | undefined;
}

type Props = {};
const App = (props: Props) => {
  const [familyData, setFamilyData] = useState<Person>({
    id: 1,
    name: "Category",
    children: [],
    parent: undefined,
    editMode: undefined,
  });

  const [scale, setScale] = useState("1");

  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };
    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nxetX = e.clientX - coords.current.startX + coords.current.lastX;
      const nxetY = e.clientY - coords.current.startY + coords.current.lastY;

      box.style.top = `${nxetY}px`;
      box.style.left = `${nxetX}px`;
    };

    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    console.log();
    console.log();

    const cleanUp = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };
    return cleanUp;
  }, []);

  const moveComponent = (direction: string) => {
    if (!boxRef.current) return;

    const box = boxRef.current;
    const step = 10; // Шаг перемещения (можете изменить по вашему усмотрению)

    switch (direction) {
      case "up":
        box.style.top = `${parseInt(box.style.top || "0", 10) - step}px`;
        coords.current.lastY = coords.current.lastY - step;
        break;
      case "down":
        box.style.top = `${parseInt(box.style.top || "0", 10) + step}px`;

        coords.current.lastY = coords.current.lastY + step;
        break;
      case "left":
        box.style.left = `${parseInt(box.style.left || "0", 10) - step}px`;

        coords.current.lastX = coords.current.lastX - step;
        break;
      case "right":
        box.style.left = `${parseInt(box.style.left || "0", 10) + step}px`;

        coords.current.lastX = coords.current.lastX + step;
        break;
      default:
        break;
    }
  };

  return (
    <div className="app">
      <Header scale={scale} setScale={setScale} />

      <section className="centered">
        <button
          className="move_tree_btn up"
          onClick={() => moveComponent("up")}
        >
          &#8743;
        </button>
      </section>
      <section className="draggble_with_btns">
        <button
          className="move_btn_side left"
          onClick={() => moveComponent("left")}
        >
          &#60;
        </button>
        <div ref={containerRef} className="draggble-container">
          <FamilyTree
            scale={scale}
            boxRef={boxRef}
            setFamilyData={setFamilyData}
            familyData={familyData}
          />
        </div>
        <button
          className="move_btn_side right"
          onClick={() => moveComponent("right")}
        >
          &#62;
        </button>
      </section>
      <section className="centered">
        <button
          className="move_tree_btn bottom"
          onClick={() => moveComponent("down")}
        >
          &#8744;
        </button>
      </section>
    </div>
  );
};
export default App;
