import { useState } from "react";
import Tabebuia from "./Tabebuia";
import "./SpotABloom.css";

const bloomOptions = [
  { id: "budding", emoji: "\uD83C\uDF31", label: "Budding" },
  { id: "partial", emoji: "\uD83C\uDF38", label: "Partial Bloom" },
  { id: "peak", emoji: "\uD83C\uDF3A", label: "Peak Bloom" },
  { id: "full-glory", emoji: "\uD83C\uDF39", label: "Full Glory" },
  { id: "fading", emoji: "\uD83C\uDF42", label: "Fading" },
];

/**
 * SpotABloom — A card component with bloom stage buttons and the Tabebuia animation.
 *
 * @param {Object}  props
 * @param {string}  [props.defaultStage="budding"] - Initial bloom stage
 * @param {Function} [props.onStageChange]         - Called with the new stage id on selection
 * @param {string}  [props.src]                    - Path to .riv file (forwarded to Tabebuia)
 * @param {string}  [props.className]              - Additional CSS class on the card
 */
export default function SpotABloom({
  defaultStage = "budding",
  onStageChange,
  src,
  className = "",
}) {
  const [stage, setStage] = useState(defaultStage);

  const handleSelect = (id) => {
    setStage(id);
    onStageChange?.(id);
  };

  return (
    <div className={`bloom-card ${className}`.trim()}>
      <h2 className="bloom-title">Spot a Bloom</h2>

      <div className="bloom-image-area">
        <Tabebuia
          stage={stage}
          width={364}
          height={228}
          {...(src && { src })}
        />
      </div>

      <p className="bloom-question">How much is it blooming?</p>

      <div className="bloom-options">
        {bloomOptions.map((option) => (
          <button
            key={option.id}
            className={`bloom-option ${stage === option.id ? "selected" : ""}`}
            onClick={() => handleSelect(option.id)}
          >
            <span className="bloom-option-emoji">{option.emoji}</span>
            <span className="bloom-option-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
