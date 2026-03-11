import { useRive } from "@rive-app/react-webgl2";

export default function RiveInteractive() {
  const { rive, RiveComponent } = useRive({
    src: "https://cdn.rive.app/animations/vehicles.riv",
    stateMachines: "bumpy",
    autoplay: true,
  });

  return (
    <div className="rive-card">
      <div className="rive-container">
        <RiveComponent />
      </div>
      <div className="rive-controls">
        <button onClick={() => rive?.play()}>Play</button>
        <button onClick={() => rive?.pause()}>Pause</button>
        <button onClick={() => rive?.reset()}>Reset</button>
      </div>
    </div>
  );
}
