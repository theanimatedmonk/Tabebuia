import Rive from "@rive-app/react-webgl2";

export default function RiveSimple() {
  return (
    <div className="rive-container">
      <Rive
        src="https://cdn.rive.app/animations/vehicles.riv"
        stateMachines="bumpy"
      />
    </div>
  );
}
