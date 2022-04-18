// File input element

import React, { memo } from 'react';
import * as MUI from '@mui/material';

import { Icon, IconButton } from './Icon';
import { ParameterElement, ParameterElementProps } from './ParameterElement';
import { TextInput } from './TextInput';

export type BrowseFileElementProps = {
  value?: string;
  onBrowse?: () => void;
  onClear?: () => void;

  // It's the responsibility of the parent to check if selected files exist
  // because the implementation depends on the context (Electron app, C++ addon...).
  fileNotFound?: boolean;
} & ParameterElementProps;

export const BrowseFileElement = memo(function BrowseFileElement(props: BrowseFileElementProps) {
  props = {
    fileNotFound: false,
    ...props
  };

  const { value, fileNotFound, onBrowse, onClear, ...elementProps } = props;

  return (
    <ParameterElement {...elementProps}>
      <MUI.Stack direction='row' alignItems='center' spacing={1}>
        {/* Path field */}

        <TextInput
          disabled={true}
          value={value}
          tooltip={fileNotFound ? 'File not found' : ''}
          size={elementProps.dense ? 'tiny' : 'medium'}
          fullWidth
          sx={{
            backgroundColor: props.fileNotFound ? '#ffd69b' : 'initial'
          }}
          InputProps={{
            endAdornment: props.value && props.value != '' && props.onClear && (
              <IconButton
                icon={
                  <Icon
                    name='mdi-close'
                    size='tiny'
                    color={props.disabled ? 'disabled' : 'default'}
                  />
                }
                size='small'
                disabled={props.disabled}
                onClick={props.onClear}
              />
            ),
            sx: {
              fontSize: (theme: MUI.Theme) => (elementProps.dense ? theme.spacing(1.7) : 'initial'),
              paddingLeft: (theme: MUI.Theme) => theme.spacing(1)
            }
          }}
        />

        {/* Browse button */}

        <IconButton
          icon={
            <Icon
              name='mdi-folder'
              size={elementProps.dense ? 'tiny' : 'small'}
              color={props.disabled ? 'disabled' : 'primary'}
            />
          }
          size='small'
          disabled={props.disabled}
          onClick={props.onBrowse}
        />
      </MUI.Stack>
    </ParameterElement>
  );
});
