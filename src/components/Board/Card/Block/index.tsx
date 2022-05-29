import { Box, BoxProps } from "@mui/material";
import { PropsWithChildren } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type BlockProps = BoxProps & {
  onRemove: () => void;
};

const Block = ({
  children,
  onRemove,
  ...props
}: PropsWithChildren<BlockProps>) => {
  return (
    <Box {...props}>
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
