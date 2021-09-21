import { Button, Card, FormControl, Typography } from "@mui/material";
import { borderRadius, styled } from "@mui/system";

export const MenuSelectStyled = styled(FormControl)(({theme}) => ({
    paddingBottom: theme.spacing(2)
}));

export const CardStyled = styled(Card)(({theme}) => ({
    marginBottom: theme.spacing(8),
    borderRadius: theme.shape.borderRadius * 4
}));

export const OTHeader = styled(Typography)({
    color: "#da3743"
});

export const SubmitButton = styled(Button)({
    background: "#da3743"
});
  
