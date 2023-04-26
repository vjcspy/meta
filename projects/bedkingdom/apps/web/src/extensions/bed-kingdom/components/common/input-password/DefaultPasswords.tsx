import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

const DefaultPasswords: React.FC<{
  label?: string;
  name: string;
  control: any;
  rules?: any;
  error?: any;
  helperText?: string;
}> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue=""
      render={({ field }) => (
        <TextField
          sx={{
            width: '100%',
          }}
          label={props.label}
          error={!!props.error}
          helperText={props.error ? props.helperText : ''}
          variant="outlined"
          type={showPassword ? 'text' : 'password'} // <-- This is where the magic happens
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
              maxLength: 50,
          }}
          {...field}
        />
      )}
    />
  );
};

export default DefaultPasswords;
