import { LinearProgress, styled } from "@mui/material";

const GradientProgressBar = styled(LinearProgress)<{ fraction: number }>(
  ({ fraction }) => ({
    height: 12,
    borderRadius: 5,
    "& .MuiLinearProgress-bar": {
      backgroundImage:
        fraction >= 0.75
          ? "linear-gradient(270deg, #ff0000, #ff4f5f, #ff0000)"
          : "linear-gradient(270deg, #77dd77, #ffb347, #77dd77)",
      backgroundSize: "200% 200%",
      animation: "gradient 10s ease infinite",
    },
    "@keyframes gradient": {
      "0%": {
        backgroundPosition: "0% 50%",
      },
      "50%": {
        backgroundPosition: "100% 50%",
      },
      "100%": {
        backgroundPosition: "0% 50%",
      },
    },
  })
);

export interface ProgressBarProps {
  fraction: number; // 0 ≤ fraction ≤ 1
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  fraction,
}: ProgressBarProps) => {
  return (
    <GradientProgressBar
      variant="determinate"
      value={fraction * 100}
      fraction={fraction}
    />
  );
};

export default ProgressBar;
