import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Wrap } from './DarkModeToggle.styled';

const IOSSwitch = styled((props: any) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme ? '#7B0A75' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: !theme ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: !theme ? '#E9E9EA' : '#E9E9EA',
      opacity: 1,
    },
  }));
export const DarkModeToggle = ({ theme, toggleTheme }) => {
    return(
        <Wrap>
            <FormControlLabel
                control={
                    <IOSSwitch 
                    sx={{ m: 1 }} 
                    checked={theme == 'dark'} 
                    onChange={toggleTheme}
                    theme={theme == 'dark'}
                    />}
                label=""
            />
      </Wrap>
    );
}