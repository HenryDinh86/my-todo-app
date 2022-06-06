import { useMediaQuery, useTheme } from '@mui/material';

/**
 *
 * @param {string} breakpoint
 * @returns
 */

export const useMediaQueries = (breakpoint) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
};
