import React, { useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as LUI from 'lindale-ui';
import * as MUI from '@material-ui/core';
import * as MUIIcons from '@material-ui/icons';
import { middleEllipsisStyle } from 'lindale-ui';

function Group(props: { title: string; children: React.ReactNode }) {
  return (
    <MUI.Grid item>
      <MUI.Card elevation={3}>
        <MUI.CardHeader title={props.title} />
        <MUI.CardContent>{props.children}</MUI.CardContent>
      </MUI.Card>
    </MUI.Grid>
  );
}

function App() {
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [showDialogOverlay, setShowDialogOverlay] = React.useState(false);
  const [groupOpen, setGroupOpen] = React.useState(false);
  const [numberValue, setNumberValue] = React.useState(10);
  const [textValue, setTextValue] = React.useState('text');

  const colorPickerButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <MUI.Grid container direction='column' spacing={2}>
      {/* Button */}

      <Group title='<Button />'>
        <MUI.Grid container direction='row' spacing={1}>
          <MUI.Grid item>
            <LUI.Button variant='contained' color='secondary' tooltip='Some details'>
              Button
            </LUI.Button>
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Button variant='outlined' color='primary'>
              Button
            </LUI.Button>
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Button variant='text'>Button</LUI.Button>
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Button variant='text' disabled tooltip='This is disabled'>
              Button
            </LUI.Button>
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Button variant='outlined' loadingProgress={0} tooltip='This is loading'>
              Button
            </LUI.Button>
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Button variant='outlined' loadingProgress={65}>
              Button
            </LUI.Button>
          </MUI.Grid>
        </MUI.Grid>

        <MUI.Grid container direction='row' spacing={1}>
          <MUI.Grid item>
            <LUI.ButtonWithMenu
              options={useMemo(
                () => [
                  { label: 'A', onClick: () => alert('Selected A') },
                  { label: 'B', onClick: () => alert('Selected B') },
                  { label: 'C', onClick: () => alert('Selected C') }
                ],
                []
              )}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.ButtonWithMenu
              options={useMemo(
                () => [
                  { label: 'A (immediate)', onClick: () => alert('Selected A') },
                  { label: 'B (immediate)', onClick: () => alert('Selected B') },
                  { label: 'C (immediate)', onClick: () => alert('Selected C') }
                ],
                []
              )}
              immediateAction
            />
          </MUI.Grid>
        </MUI.Grid>
      </Group>

      {/* Select */}

      <Group title='<Select />'>
        <MUI.Grid container direction='row' spacing={1} alignItems='flex-end'>
          <MUI.Grid item>
            <LUI.Select
              value='1'
              options={useMemo(
                () => [
                  { value: '1', label: 'Option 1' },
                  { value: '2', label: 'Option 2' },
                  { value: '3', label: 'Option 3' }
                ],
                []
              )}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Select
              value='1'
              options={useMemo(
                () => [
                  { value: '1', label: 'Normal' },
                  { value: '2', label: 'Disabled', disabled: true },
                  { value: '3', label: 'Icon', icon: <LUI.Icon name='mdi-bike' /> }
                ],
                []
              )}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Select
              value='1'
              options={useMemo(
                () => [
                  { value: '1', label: 'Smaller option 1' },
                  { value: '2', label: 'Smaller option 2' },
                  { value: '3', label: 'Smaller option 3' }
                ],
                []
              )}
              dense
            />
          </MUI.Grid>
        </MUI.Grid>

        <MUI.Grid item container direction='column' spacing={1} style={{ width: '300px' }}>
          <MUI.Grid item>
            <LUI.SelectElement
              name='A select element'
              actionCols={8}
              selectProps={useMemo(
                () => ({
                  value: '1',
                  options: [
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]
                }),
                []
              )}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.SelectElement
              name='A smaller element'
              dense
              actionCols={6}
              selectProps={useMemo(
                () => ({
                  value: '1',
                  options: [
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' }
                  ]
                }),
                []
              )}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.SelectElement
              name='Another element'
              actionCols={4}
              selectProps={useMemo(
                () => ({
                  value: '1',
                  options: [
                    { value: '1', label: 'Normal' },
                    { value: '2', label: 'Disabled', disabled: true },
                    { value: '3', label: 'Icon', icon: <LUI.Icon name='mdi-bike' /> }
                  ]
                }),
                []
              )}
            />
          </MUI.Grid>
        </MUI.Grid>
      </Group>

      {/* Checkbox */}

      <Group title='<Checkbox />'>
        <MUI.Grid container direction='row' alignItems='center'>
          <MUI.Grid item>
            <LUI.Checkbox
              tooltip='This is a checkbox'
              color='primary'
              onChange={(checked: boolean) => console.log('checkbox', checked)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Checkbox tooltip='This is a smaller checkbox' color='secondary' size='small' />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Checkbox tooltip='This is a locked checkbox' checked />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Checkbox tooltip='This is a disabled checkbox' disabled />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Checkbox
              tooltip='With custom icons'
              icon={<MUIIcons.AccessAlarm color='primary' />}
              checkedIcon={<LUI.Icon name='mdi-cog' color='secondary' />}
            />
          </MUI.Grid>
        </MUI.Grid>

        <MUI.Grid item container direction='column' style={{ width: '500px' }}>
          <MUI.Grid item>
            <LUI.CheckboxElement name='A checkbox element' />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.CheckboxElement name='A disabled one' disabled tooltip='Some details' />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.CheckboxElement
              name='A small one'
              tooltip='Teeny-tiny'
              checkboxProps={{ size: 'small' }}
            />
          </MUI.Grid>
        </MUI.Grid>
      </Group>

      {/* Switch */}

      <Group title='<Switch />'>
        <MUI.Grid container direction='row' alignItems='center'>
          <MUI.Grid item>
            <LUI.Switch
              tooltip='This is a switch'
              color='primary'
              onChange={(checked) => console.log('switch', checked)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Switch tooltip='This is a smaller switch' color='secondary' size='small' />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Switch tooltip='This is a locked switch' checked />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Switch tooltip='This is a disabled switch' disabled />
          </MUI.Grid>
        </MUI.Grid>

        <MUI.Grid item container direction='column' style={{ width: '500px' }}>
          <MUI.Grid item>
            <LUI.SwitchElement
              name='A switch element'
              tooltip='Switch?'
              switchProps={{ color: 'primary' }}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.SwitchElement
              name='A disabled one'
              tooltip='Cannot work!'
              disabled
              switchProps={{ checked: true }}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.SwitchElement name='A small one' dense />
          </MUI.Grid>
        </MUI.Grid>
      </Group>

      {/* Slider */}

      <Group title='<Slider />'>
        <MUI.Grid container direction='column' style={{ width: '500px' }}>
          <MUI.Grid item>
            <LUI.Slider min={0} max={10} value={5} valueLabelDisplay='on' startLabel='Zero' />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Slider max={10} valueLabelDisplay='auto' color='secondary' endLabel='100%' />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Slider
              max={10}
              valueLabelDisplay='auto'
              color='secondary'
              startLabel='From'
              endLabel='To'
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Slider min={0} defaultValue={2} max={10} marks />
          </MUI.Grid>
        </MUI.Grid>

        <MUI.Grid item container direction='column' style={{ width: '500px' }}>
          <MUI.Grid item>
            <LUI.SliderElement name='A slider element' tooltip='Details here' actionCols={4} />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.SliderElement
              name='Another one'
              tooltip='More details'
              actionCols={10}
              sliderProps={{ min: -100, max: -50, color: 'secondary' }}
            />
          </MUI.Grid>
        </MUI.Grid>
      </Group>

      {/* Text input */}

      <Group title='<TextInput />'>
        <MUI.Grid container direction='row' alignItems='flex-end' spacing={2}>
          <MUI.Grid item>
            <LUI.TextInput
              tooltip='Some text (instant update)'
              value={textValue}
              instantUpdate
              onChange={(value) => setTextValue(value)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.TextInput
              tooltip='Some text (late update)'
              value={textValue}
              onChange={(value) => setTextValue(value)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.TextInput
              tooltip='Some smaller text'
              size='small'
              value={textValue}
              onChange={(value) => setTextValue(value)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.TextInput
              tooltip='Some disabled text'
              disabled
              value={textValue}
              onChange={(value) => setTextValue(value)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.TextInput tooltip='Some error text' error value='oh no!' />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.TextInput
              tooltip='Some outlined text'
              variant='outlined'
              value={textValue}
              onChange={(value) => setTextValue(value)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.TextInput
              tooltip='Some filled text'
              variant='filled'
              value={textValue}
              onChange={(value) => setTextValue(value)}
            />
          </MUI.Grid>
        </MUI.Grid>

        <MUI.Grid container direction='column' spacing={2} style={{ width: '500px' }}>
          <MUI.Grid item>
            <LUI.TextElement name='A text element' textInputProps={{ value: textValue }} />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.TextElement
              name='A disabled text element'
              disabled
              textInputProps={{ value: textValue }}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.TextElement
              name='A smaller text element'
              dense
              textInputProps={{ value: textValue }}
            />
          </MUI.Grid>
        </MUI.Grid>
      </Group>

      {/* Number input */}

      <Group title='<NumberInput />'>
        <MUI.Grid container direction='row' alignItems='flex-end' spacing={2}>
          <MUI.Grid item>
            <LUI.NumberInput
              tooltip='Some number (instant update)'
              value={numberValue}
              instantUpdate
              onChange={(value) => setNumberValue(value)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.NumberInput
              tooltip='Some number (late update)'
              value={numberValue}
              onChange={(value) => setNumberValue(value)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.NumberInput
              tooltip='Some smaller number'
              size='small'
              value={numberValue}
              onChange={(value) => setNumberValue(value)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.NumberInput
              tooltip='Some number with a unit'
              unit='Kopek'
              value={numberValue}
              onChange={(value) => setNumberValue(value)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.NumberInput
              tooltip='Some disabled number'
              disabled
              value={numberValue}
              onChange={(value) => setNumberValue(value)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.NumberInput tooltip='Some error number' error value={666} />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.NumberInput
              tooltip='Some outlined number'
              variant='outlined'
              value={numberValue}
              onChange={(value) => setNumberValue(value)}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.NumberInput
              tooltip='Some filled number'
              variant='filled'
              value={numberValue}
              onChange={(value) => setNumberValue(value)}
            />
          </MUI.Grid>
        </MUI.Grid>

        <MUI.Grid container direction='column' spacing={2} style={{ width: '500px' }}>
          <MUI.Grid item>
            <LUI.NumberElement name='A number element' textInputProps={{ value: numberValue }} />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.NumberElement
              name='A disabled number element'
              disabled
              textInputProps={{ value: numberValue }}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.NumberElement
              name='A smaller number element'
              dense
              textInputProps={{ value: numberValue }}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.NumberDuoElement
              name='A double element'
              inputProps1={useMemo(
                () => ({ value: numberValue, min: 5, max: 15, tooltip: 'First value' }),
                []
              )}
              inputProps2={useMemo(
                () => ({ value: 20, min: 10, decimals: 3, tooltip: 'Second value' }),
                []
              )}
            />
          </MUI.Grid>
        </MUI.Grid>
      </Group>

      {/* Icons */}

      <Group title='<Icon /> + <IconButton />'>
        <MUI.Grid container direction='row' spacing={1}>
          <MUI.Grid item>
            <LUI.Icon name='mdi-adjust' color='primary' />
          </MUI.Grid>
          <MUI.Grid item>
            <LUI.Icon name='mdi-account' color='secondary' size='tiny' />
          </MUI.Grid>
          <MUI.Grid item>
            <LUI.Icon name='mdi-folder-move' style={{ color: 'greenyellow' }} size='small' />
          </MUI.Grid>
          <MUI.Grid item>
            <LUI.Icon name='mdi-all-inclusive' size='medium' />
          </MUI.Grid>
          <MUI.Grid item>
            <LUI.Icon name='mdi-bike' tooltip='Fast bike! Weeeee' size='large' />
          </MUI.Grid>
          <MUI.Grid item>
            <LUI.Icon name='does-not-exist' />
          </MUI.Grid>
        </MUI.Grid>

        <MUI.Grid item container direction='row' spacing={1}>
          <MUI.Grid item>
            <LUI.Icon name='l-icon-grid-check' color='primary' />
          </MUI.Grid>
          <MUI.Grid item>
            <LUI.Icon name='l-icon-3dbazaar' color='secondary' size='tiny' />
          </MUI.Grid>
          <MUI.Grid item>
            <LUI.Icon name='l-icon-brush-plus' style={{ color: 'gold' }} size='small' />
          </MUI.Grid>
          <MUI.Grid item>
            <LUI.Icon name='l-icon-skatter' size='medium' />
          </MUI.Grid>
          <MUI.Grid item>
            <LUI.Icon name='l-icon-zoom-extents' size='large' />
          </MUI.Grid>
        </MUI.Grid>

        <MUI.Grid item container direction='row' spacing={1}>
          <MUI.Grid item>
            <LUI.IconButton
              icon={<LUI.Icon name='l-icon-brush-plus' color='secondary' />}
              tooltip='An interactive button'
              onClick={() => alert('clicked')}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.IconButton
              icon={<LUI.Icon name='mdi-bike' color='primary' />}
              tooltip='Another button'
              onClick={() => alert('clicked')}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.IconButton
              icon={<LUI.Icon name='l-icon-grid-check' />}
              tooltip='A disabled button'
              onClick={() => alert('clicked')}
              disabled
            />
          </MUI.Grid>
        </MUI.Grid>
      </Group>

      {/* DotProgress */}

      <Group title='<DotProgress />'>
        <MUI.Grid container direction='column' spacing={2}>
          <MUI.Grid item>
            <LUI.DotProgress count={10} value={5} variant='single' />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.DotProgress count={10} value={5} variant='upto' />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.DotProgress count={10} value={100} variant='single' />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.DotProgress count={-100} value={5} variant='single' />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.DotProgress count={10} value={-100} variant='single' />
          </MUI.Grid>
        </MUI.Grid>
      </Group>

      {/* Browse file */}

      <Group title='<BrowseFile />'>
        <MUI.Grid container direction='column' spacing={2} style={{ width: '600px' }}>
          <MUI.Grid item>
            <LUI.BrowseFileElement
              name='Some file'
              onBrowse={() => alert('browse')}
              onClear={() => alert('clear')}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.BrowseFileElement
              name='Another file'
              value='C:/some/fake/path'
              fileNotFound
              onBrowse={() => alert('browse')}
              onClear={() => alert('clear')}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.BrowseFileElement
              name='Yet another file'
              value='C:/some/fake/and/veryyyyyyyyyyyyyyy/long/path'
              onBrowse={() => alert('browse')}
              onClear={() => alert('clear')}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.BrowseFileElement
              name='A disabled one'
              disabled
              value='C:/some/fake/path'
              onBrowse={() => alert('browse')}
              onClear={() => alert('clear')}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.BrowseFileElement
              name='A smaller one'
              dense
              value='C:/some/fake/path'
              onBrowse={() => alert('browse')}
              onClear={() => alert('clear')}
            />
          </MUI.Grid>
        </MUI.Grid>
      </Group>

      {/* Middle ellipsis */}

      <Group title='<MiddleEllipsis />'>
        <MUI.Grid container direction='column' spacing={2}>
          <MUI.Grid item style={{ width: '200px' }}>
            <LUI.MiddleEllipsis ellipsedText='hello this is some long text long text long text long text long text long text long text long text'>
              <span style={middleEllipsisStyle}>
                hello this is some long text long text long text long text long text long text long
                text long text
              </span>
            </LUI.MiddleEllipsis>
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.MiddleEllipsis
              width={100}
              ellipsedText='hello this is some long text long text long text long text long text long text long text long text'
            >
              <span style={middleEllipsisStyle}>
                hello this is some long text long text long text long text long text long text long
                text long text
              </span>
            </LUI.MiddleEllipsis>
          </MUI.Grid>
        </MUI.Grid>
      </Group>

      {/* Color picker */}

      <Group title='<ColorPicker />'>
        <MUI.Grid container direction='row' spacing={2}>
          <MUI.Grid item>
            <LUI.ColorPicker
              open
              onClose={() => {}}
              variant='chrome'
              value={useMemo(() => ({ r: 255, g: 0, b: 0 }), [])}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.ColorPicker
              open
              onClose={() => {}}
              variant='compact'
              value={useMemo(() => ({ r: 0, g: 255, b: 0 }), [])}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.ColorPicker
              open
              onClose={() => {}}
              disabled
              value={useMemo(() => ({ r: 0, g: 0, b: 255 }), [])}
            />
          </MUI.Grid>

          <MUI.Grid item>
            <LUI.Button
              variant='outlined'
              onClick={() => setShowColorPicker(true)}
              ref={colorPickerButtonRef}
            >
              Show color picker
            </LUI.Button>
            <LUI.ColorPicker
              open={showColorPicker}
              onClose={() => setShowColorPicker(false)}
              disabled
              value={useMemo(() => ({ r: 0, g: 0, b: 255 }), [])}
              anchorEl={colorPickerButtonRef.current}
            />
          </MUI.Grid>
        </MUI.Grid>

        <MUI.Grid item>
          <LUI.ColorElement
            name='A nice color'
            tooltip='Very very nice'
            pickerProps={useMemo(
              () => ({ value: { r: 255, g: 0, b: 128 }, variant: 'compact' }),
              []
            )}
          />
        </MUI.Grid>
      </Group>

      {/* Accordion */}

      <Group title='Accordion'>
        <LUI.Accordion header={<MUI.Typography variant='h6'>Accordion title</MUI.Typography>}>
          <MUI.Typography variant='body1'>Accordion content</MUI.Typography>
        </LUI.Accordion>
      </Group>

      {/* Toggleable group */}

      <Group title='<ToggleableGroup />'>
        <LUI.ToggleableGroup
          name='A toggleable group'
          open={groupOpen}
          onChange={() => setGroupOpen(!groupOpen)}
        >
          <MUI.Typography variant='body1'>Group content</MUI.Typography>
        </LUI.ToggleableGroup>
      </Group>

      {/* DialogOverlay */}

      <Group title='<DialogOverlay />'>
        <LUI.Button variant='outlined' onClick={() => setShowDialogOverlay(!showDialogOverlay)}>
          Show
        </LUI.Button>
        <LUI.DialogOverlay
          open={showDialogOverlay}
          title='A dialog overlay'
          actions={[{ label: 'Close', action: () => setShowDialogOverlay(false) }]}
          onClose={() => setShowDialogOverlay(false)}
        >
          <MUI.Typography>Hello there</MUI.Typography>
        </LUI.DialogOverlay>
      </Group>

      {/* ParameterElement */}

      <Group title='<ParameterElement />'>
        <MUI.Grid container direction='column'>
          <MUI.Grid item style={{ width: '400px', border: '1px solid lightgrey' }}>
            <LUI.ParameterElement name='A parameter name' actionCols={3}>
              <div style={{ background: 'gold' }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Grid>

          <MUI.Grid item style={{ width: '400px', border: '1px solid lightgrey' }}>
            <LUI.ParameterElement name='A parameter name' actionCols={6}>
              <div style={{ background: 'gold' }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Grid>

          <MUI.Grid item style={{ width: '400px', border: '1px solid lightgrey' }}>
            <LUI.ParameterElement name='A parameter name' actionCols={9}>
              <div style={{ background: 'gold' }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Grid>

          <MUI.Grid item style={{ width: '600px', border: '1px solid lightgrey' }}>
            <LUI.ParameterElement name='A parameter name' nameAlign='left' actionAlign='center'>
              <div style={{ background: 'gold' }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Grid>

          <MUI.Grid item style={{ width: '600px', border: '1px solid lightgrey' }}>
            <LUI.ParameterElement name='A parameter name' nameAlign='center' actionAlign='right'>
              <div style={{ background: 'gold' }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Grid>

          <MUI.Grid item style={{ width: '600px', border: '1px solid lightgrey' }}>
            <LUI.ParameterElement name='A parameter name' nameAlign='right' actionAlign='left'>
              <div style={{ background: 'gold' }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Grid>
        </MUI.Grid>
      </Group>
    </MUI.Grid>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
