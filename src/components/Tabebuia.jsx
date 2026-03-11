import { useEffect, useRef, useCallback } from "react";
import { useRive } from "@rive-app/react-webgl2";

const STAGES = ["budding", "partial", "peak", "full-glory", "fading"];

/**
 * Tabebuia — A Rive-powered bloom animation component.
 *
 * @param {Object} props
 * @param {"budding"|"partial"|"peak"|"full-glory"|"fading"} props.stage - Bloom stage to display
 * @param {number}  [props.width=400]  - Width in pixels
 * @param {number}  [props.height]     - Height in pixels (defaults to width × 0.625)
 * @param {string}  [props.src="/tabebuia_rosea.riv"] - Path to .riv file
 * @param {string}  [props.artboard="Tabebuia"]       - Artboard name in the .riv file
 * @param {string}  [props.stateMachine="Tabebuia"]    - State machine name
 * @param {string}  [props.viewModel="Tabebuia"]       - ViewModel name
 * @param {string}  [props.className]  - Additional CSS class
 * @param {Object}  [props.style]      - Additional inline styles
 */
export default function Tabebuia({
  stage = "budding",
  width = 400,
  height,
  src = "/tabebuia_rosea.riv",
  artboard = "Tabebuia",
  stateMachine = "Tabebuia",
  viewModel = "Tabebuia",
  className = "",
  style = {},
}) {
  const riveRef = useRef(null);
  const vmRef = useRef(null);
  const readyRef = useRef(false);
  const pendingStageRef = useRef(stage);

  const { rive, RiveComponent } = useRive({
    src,
    artboard,
    stateMachines: stateMachine,
    autoplay: true,
    autoBind: false,
  });

  const bindStage = useCallback((stageName) => {
    if (!riveRef.current || !vmRef.current) return;
    if (!STAGES.includes(stageName)) {
      console.warn(`[Tabebuia] Unknown stage "${stageName}". Expected one of: ${STAGES.join(", ")}`);
      return;
    }
    const vmi = vmRef.current.instanceByName(stageName);
    if (vmi) {
      riveRef.current.bindViewModelInstance(vmi);
    }
  }, []);

  // Initialize: get ViewModel ref and bind the initial stage
  useEffect(() => {
    if (!rive) return;
    riveRef.current = rive;

    const vm = rive.viewModelByName(viewModel);
    if (!vm) {
      console.error(`[Tabebuia] ViewModel "${viewModel}" not found`);
      return;
    }
    vmRef.current = vm;
    readyRef.current = true;

    bindStage(pendingStageRef.current);
  }, [rive, viewModel, bindStage]);

  // React to stage prop changes
  useEffect(() => {
    pendingStageRef.current = stage;
    if (readyRef.current) {
      bindStage(stage);
    }
  }, [stage, bindStage]);

  const resolvedHeight = height ?? Math.round(width * 0.625);

  return (
    <div
      className={`tabebuia ${className}`.trim()}
      style={{
        width,
        height: resolvedHeight,
        overflow: "hidden",
        ...style,
      }}
    >
      <RiveComponent
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export { STAGES };
