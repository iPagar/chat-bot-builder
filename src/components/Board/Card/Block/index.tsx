import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type BlockProps = {
  onRemove: () => void;
};

const Block = ({ children, onRemove }: PropsWithChildren<BlockProps>) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        onClick={() => {
          onRemove();
        }}
      >
        <DeleteIcon />
      </Box>
      {children}
    </Box>
  );
};

export default Block;
