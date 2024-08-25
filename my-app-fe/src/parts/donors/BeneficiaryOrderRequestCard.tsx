import { SentimentSatisfiedAltOutlined } from "@mui/icons-material";
import { Button, Card, Typography } from "@mui/material";
import AcceptOrderModal from "./AcceptOrderModal";
import { useState } from "react";

export interface BeneficiaryOrderRequestCardProps {
  orderId: string;
  beneficiaryName: string;
  numOfMealsRequested: number;
  subtitles: string[];
  accepted?: boolean;
}

const BeneficiaryOrderRequestCard: React.FC<
  BeneficiaryOrderRequestCardProps
> = ({
  orderId,
  beneficiaryName,
  numOfMealsRequested,
  subtitles,
  accepted = false,
}: BeneficiaryOrderRequestCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [acc, setAcc] = useState(accepted);
  return (
    <>
      <Card className="p-4 mb-2">
        <div className="flex flex-row items-center gap-2">
          <SentimentSatisfiedAltOutlined />
          <Typography variant="subtitle1"> {beneficiaryName}</Typography>
        </div>
        <Typography fontWeight="bold">{`${numOfMealsRequested} meals`}</Typography>
        {subtitles.map((txt: string, idx: number) => (
          <Typography key={idx}>{txt}</Typography>
        ))}

        <Button
          variant="outlined"
          className="!mt-2 w-full"
          onClick={() => setIsModalOpen(true)}
          disabled={acc}
        >
          {acc ? "Accepted" : "Accept"}
        </Button>
      </Card>
      <AcceptOrderModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={() => {
          setAcc(true);
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default BeneficiaryOrderRequestCard;
