import { useEffect, useState } from "react";
import "./App.css";
import useAxios from "./custom-hook";

function App() {
  const [isClicked, setClicked] = useState<boolean>(false);
  const { response, error, isLoading, clicks, setClicks } = useAxios(
    isClicked,
    setClicked
  );

  useEffect(() => {
    return () => {
      if (!isClicked && clicks !== 0) {
        setClicks(0);
      }
    };
  }, [isClicked]);

  const handleClick = () => {
    setClicks(clicks + 1);
    setClicked(true);
  };

  return (
    <div className="App">
      <button
        type="button"
        className="click-btn"
        disabled={isLoading}
        onClick={() => handleClick()}
      >
        Кликнуть
      </button>
      <div className="counter-client">Кликнули {clicks} раз(а)</div>
      <div className="counter-server">По версии сервера: {response}</div>
      {isLoading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
