import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import e404img from "../../assets/error-404.jpg";
import { els } from "./strings/strings";
import { styleXl, styleLg, styleMd, styleSm, styleXs } from "./styles/style";

export const E404 = () => {
  const theme = useTheme();
  let st = styleXl;

  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isXs = useMediaQuery(theme.breakpoints.up("xs"));

  if (isXl) {
    st = styleXl;
  } else if (isLg) {
    st = styleLg;
  } else if (isMd) {
    st = styleMd;
  } else if (isSm) {
    st = styleSm;
  } else if (isXs) {
    st = styleXs;
  }

  return (
    <Box sx={st.parentBox}>
      <img alt='Background' src={e404img} style={st.imgSize} />
      <Box sx={st.contentBox}>
        <Typography sx={st.firstTextStyle}>{els.firstText}</Typography>
        <Typography sx={st.secondTextStyle}>{els.secondText}</Typography>
      </Box>
    </Box>
  );
};
