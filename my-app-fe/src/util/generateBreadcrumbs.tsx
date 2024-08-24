import { FoodBankOutlined } from "@mui/icons-material";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { ReactNode } from "react";

export const generateBreadcrumbs = (
  labels: string[],
  links: string[]
): ReactNode => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <a className="flex items-center gap-1" href="/">
          {<FoodBankOutlined />} Food Hero
        </a>

        {labels.map(
          (lab: string, idx: number) =>
            idx < labels.length - 1 && (
              <Link
                underline="hover"
                color="inherit"
                href={links.length - 1 >= idx ? links[idx] : "/"}
                key={idx}
              >
                {lab}
              </Link>
            )
        )}
        <Typography color="text.primary">
          {labels[labels.length - 1]}
        </Typography>
      </Breadcrumbs>
    </>
  );
};
