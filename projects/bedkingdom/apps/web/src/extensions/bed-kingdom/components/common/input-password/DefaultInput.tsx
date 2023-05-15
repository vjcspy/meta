import { TextField } from '@mui/material';
import { generateRandomString } from '@vjcspy/r/build/util/randomId';
import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';

const DefaultInput: React.FC<{
  control: any;
  label?: string;
  name?: string;
  rows?: number; // Multiple line
  rules?: any;
  error?: boolean;
  helperText?: string;
  onBlur?: any;
  maxLength?: number;
}> = React.memo((props) => {
  const InputRender = useCallback(
    // @ts-ignore
    ({ field }) => {
      return (
        <TextField
          sx={{
            width: '100%',
          }}
          {...field}
          error={!!props.error}
          helperText={props.error ? props.helperText : ''}
          label={props.label}
          rows={props.rows ?? 1}
          multiline={props.rows && props.rows > 1}
          variant="outlined"
          autoComplete="1233123"
          autoFocus={true}
          onBlur={props?.onBlur}
          maxLength={props?.maxLength}
        />
      );
    },
    [props.error, props.label, props.helperText]
  );
  return (
    <>
      {props.control ? (
        <Controller
          name={props.name ?? generateRandomString()}
          control={props.control}
          rules={props.rules}
          defaultValue=""
          render={InputRender}
        />
      ) : (
        // @ts-ignore
        InputRender({})
      )}
    </>
  );
});

export default DefaultInput;
