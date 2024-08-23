import { SentimentSatisfiedAltOutlined } from "@mui/icons-material";
import { Button, Card, Typography } from "@mui/material";

export interface BeneficiaryOrderRequestCardProps {
  beneficiaryName: string;
  numOfMealsRequested: number;
  subtitles: string[];
}

const BeneficiaryOrderRequestCard: React.FC<
  BeneficiaryOrderRequestCardProps
> = ({
  beneficiaryName,
  numOfMealsRequested,
  subtitles,
}: BeneficiaryOrderRequestCardProps) => {
  return (
    <Card className="p-4 mb-2">
      <div className="flex flex-row items-center gap-2">
        <SentimentSatisfiedAltOutlined />
        <Typography variant="subtitle1"> {beneficiaryName}</Typography>
      </div>
      <Typography fontWeight="bold">{`${numOfMealsRequested} meals`}</Typography>
      {subtitles.map((txt: string, idx: number) => (
        <Typography key={idx}>{txt}</Typography>
      ))}

      <Button variant="outlined" className="!mt-2 w-full">
        Accept
      </Button>
    </Card>
  );
};

export default BeneficiaryOrderRequestCard;
