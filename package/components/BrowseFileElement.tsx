// File input element

import React, { memo } from 'react';
import * as MUI from '@material-ui/core';

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

  const theme = MUI.useTheme();

  const { fileNotFound, onBrowse, onClear, ...elementProps } = props;

  return (
    <ParameterElement {...elementProps}>
      <MUI.Grid container direction='row' wrap='nowrap' alignItems='center' spacing={1}>
        {/* Path field */}

        <MUI.Grid item style={{ flexGrow: 1 }}>
          <TextInput
            value={props.value}
            tooltip={props.fileNotFound ? 'File not found' : ''}
            size={elementProps.dense ? 'small' : 'medium'}
            fullWidth
            style={{
              backgroundColor: props.fileNotFound ? '#ffd69b' : 'initial'
            }}
            disabled={true}
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
              style: {
                fontSize: elementProps.dense ? theme.spacing(1.7) : 'initial',
                paddingLeft: theme.spacing(1)
              }
            }}
          />
        </MUI.Grid>

        {/* Browse button */}

        <MUI.Grid item>
          <IconButton
            icon={
              <Icon
                name='mdi-folder'
                size={elementProps.dense ? 'tiny' : 'small'}
                color={props.disabled ? 'disabled' : 'primary'}
              />
            }
            disabled={props.disabled}
            size='small'
            onClick={props.onBrowse}
          />
        </MUI.Grid>
      </MUI.Grid>
    </ParameterElement>
  );
});
