import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

const isNumberRegx = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/;

const DefaultPassword: React.FC<{
  label?: string;
  name: string;
  control: any;
  rules?: any;
  error?: any;
  helperText?: string;
}> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(0);

  const showMessage = useCallback(() => {
    if (props.error) {
      switch (props?.error?.type) {
        case 'required':
          return props.helperText;
        case 'minLength':
          return 'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.\n';
      }
    }

    return props.error ? props.helperText : '';
  }, [props.error]);

  const [passwordVadility, setPasswordVadility] = useState<{
    minChar: any;
    number: any;
    specialChar: any;
  }>({
    minChar: null,
    number: null,
    specialChar: null,
  });

  const handleChangePassword = useCallback((e: any) => {
    const passwordValue = e.target.value;

    setValue(passwordValue.length);
    setPasswordVadility({
      minChar: passwordValue.length >= 8,
      number: isNumberRegx.test(passwordValue),
      specialChar: specialCharacterRegx.test(passwordValue),
    });
  }, []);

  const textStrength = useMemo(() => {
    if (passwordVadility?.minChar && passwordVadility?.number) {
      return {
        highlightClass: 'text-green-600',
        textShow: 'Very Strong',
      };

      if (passwordVadility?.specialChar) {
        return { highlightClass: 'text-green-600', textShow: 'Strong' };
      }
    } else {
      return { highlightClass: 'text-red-600', textShow: 'Weak' };
    }
  }, [passwordVadility]);

  return (
    <>
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
            helperText={showMessage()}
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
            {...field}
            onChange={(e: any) => {
              field.onChange(e.target.value.trim());
              handleChangePassword(e);
            }}
          />
        )}
      />

      <div className="password-strength-meter mt-3 bg-gray-50 p-2">
        Password Strength:
        {/*neu strong thay class text-red-600 = text-green-600 thay text- no pass theo cac trang thai*/}
        {value === 0 ? (
          <span className="text-red-600 font-bold pl-2">No Password</span>
        ) : (
          <span className={`font-bold pl-2 ${textStrength?.highlightClass}`}>
            {textStrength?.textShow}
          </span>
        )}
      </div>
    </>
  );
};

export default DefaultPassword;
