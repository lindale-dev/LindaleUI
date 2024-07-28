import * as MUIIcons from "@mui/icons-material";
import * as MUI from "@mui/material";
import { StrictMode, useCallback, useMemo, useRef, useState } from "react";
import * as LUI from "./index";
import { middleEllipsisStyle } from "./index";

function Group(props: { title: string; children: React.ReactNode }) {
  return (
    <MUI.Card elevation={3}>
      <MUI.CardHeader title={props.title} />
      <MUI.CardContent>
        <MUI.Stack direction="column" spacing={2}>
          {props.children}
        </MUI.Stack>
      </MUI.CardContent>
    </MUI.Card>
  );
}

function App() {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showDialogOverlay1, setShowDialogOverlay1] = useState(false);
  const [showDialogOverlay2, setShowDialogOverlay2] = useState(false);
  const [showDialogOverlay3, setShowDialogOverlay3] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const [numberValue, setNumberValue] = useState(5);
  const [textValue, setTextValue] = useState("text");

  const colorPickerButtonRef = useRef<HTMLButtonElement>(null);

  const renderButtons = useCallback(
    (variant: MUI.ButtonProps["variant"]) => (
      <>
        <MUI.Stack direction="row" spacing={1}>
          <LUI.Button variant={variant} size="small" tooltip="Small button">
            Button
          </LUI.Button>

          <LUI.Button variant={variant} size="medium" tooltip="Medium button">
            Button
          </LUI.Button>

          <LUI.Button variant={variant} size="large" tooltip="Large button">
            Button
          </LUI.Button>

          <LUI.Button variant={variant} color="secondary">
            Button
          </LUI.Button>

          <LUI.Button variant={variant} disabled tooltip="This is disabled">
            Button
          </LUI.Button>

          <LUI.Button
            variant={variant}
            loadingProgress={0}
            tooltip="This is loading"
          >
            Button
          </LUI.Button>

          <LUI.Button variant={variant} loadingProgress={65}>
            Button
          </LUI.Button>
        </MUI.Stack>

        <MUI.Stack direction="row" spacing={1}>
          {/* Box needed or the group will fill the available height */}
          <LUI.Box>
            <LUI.ButtonWithMenu
              variant={variant}
              size="small"
              options={[
                { label: "A", onClick: () => alert("Clicked A") },
                { label: "B", onClick: () => alert("Clicked B") },
                { label: "C", onClick: () => alert("Clicked C") },
              ]}
            />
          </LUI.Box>

          <LUI.Box>
            <LUI.ButtonWithMenu
              variant={variant}
              size="medium"
              options={[
                { label: "A", onClick: () => alert("Clicked A") },
                { label: "B", onClick: () => alert("Clicked B") },
                { label: "C", onClick: () => alert("Clicked C") },
              ]}
            />
          </LUI.Box>

          <LUI.Box>
            <LUI.ButtonWithMenu
              variant={variant}
              size="large"
              options={[
                { label: "A", onClick: () => alert("Clicked A") },
                { label: "B", onClick: () => alert("Clicked B") },
                { label: "C", onClick: () => alert("Clicked C") },
              ]}
            />
          </LUI.Box>

          <LUI.ButtonWithMenu
            variant={variant}
            color="secondary"
            immediateAction
            options={[
              { label: "A (immediate)", onClick: () => alert("Clicked A") },
              { label: "B (immediate)", onClick: () => alert("Clicked B") },
              { label: "C (immediate)", onClick: () => alert("Clicked C") },
            ]}
          />
        </MUI.Stack>
      </>
    ),
    [],
  );

  const renderSelects = useCallback((variant: MUI.SelectProps["variant"]) => {
    const options = [
      { value: "1", label: "Normal" },
      { value: "2", label: "Disabled", disabled: true },
      {
        value: "3",
        label: "Icon",
        icon: <LUI.Icon name="mdi-bike" size="tiny" />,
      },
    ];
    return (
      <>
        <MUI.Stack direction="row" spacing={1} alignItems="flex-end">
          <LUI.Select
            variant={variant}
            size="tiny"
            value="1"
            options={options}
          />
          <LUI.Select
            variant={variant}
            size="small"
            value="1"
            options={options}
          />
          <LUI.Select
            variant={variant}
            size="medium"
            value="1"
            options={options}
          />
        </MUI.Stack>

        <MUI.Stack direction="column" spacing={1} style={{ width: "300px" }}>
          <LUI.SelectElement
            name="A select element"
            actionCols={8}
            selectProps={{ variant, value: "1", options }}
          />

          <LUI.SelectElement
            name="Another element"
            actionCols={4}
            selectProps={{ variant, value: "1", options }}
          />

          <LUI.SelectElement
            name="A smaller element"
            dense
            actionCols={6}
            selectProps={{ variant, value: "1", options }}
          />
        </MUI.Stack>
      </>
    );
  }, []);

  const renderTextInputs = useCallback(
    (variant: MUI.TextFieldProps["variant"]) => {
      const change = (value: string) => setTextValue(value);

      return (
        <>
          <MUI.Stack direction="row" alignItems="flex-end" spacing={2}>
            <LUI.TextInput
              tooltip="Tiny text"
              size="tiny"
              variant={variant}
              value={textValue}
              onChange={change}
            />

            <LUI.TextInput
              tooltip="Small text"
              size="small"
              variant={variant}
              value={textValue}
              onChange={change}
            />

            <LUI.TextInput
              tooltip="Medium text"
              size="medium"
              variant={variant}
              value={textValue}
              onChange={change}
            />

            <LUI.TextInput
              tooltip="Instant update"
              variant={variant}
              value={textValue}
              onChangeCommitted={change}
            />

            <LUI.TextInput
              tooltip="Disabled text"
              variant={variant}
              disabled
              value={textValue}
              onChange={change}
              onChangeCommitted={change}
            />

            <LUI.TextInput
              tooltip="Error text"
              variant={variant}
              error
              value="oh no!"
            />
          </MUI.Stack>

          <MUI.Stack direction="column" spacing={2} style={{ width: "500px" }}>
            <LUI.TextElement
              name="A text element"
              textInputProps={{ variant, value: textValue }}
            />

            <LUI.TextElement
              name="Disabled text element"
              disabled
              textInputProps={{ variant, value: textValue }}
            />

            <LUI.TextElement
              name="Smaller text element"
              dense
              textInputProps={{ variant, value: textValue }}
            />
          </MUI.Stack>
        </>
      );
    },
    [textValue],
  );

  const renderNumberInputs = useCallback(
    (variant: LUI.NumberInputProps["variant"]) => {
      const change = (value: number) => setNumberValue(value);

      const commonProps = {
        value: numberValue,
        min: -100,
        max: 100,
      };

      return (
        <>
          <MUI.Stack direction="row" alignItems="flex-end" spacing={2}>
            <LUI.NumberInput
              tooltip="Tiny number"
              variant={variant}
              size="tiny"
              onChangeCommitted={change}
              {...commonProps}
            />

            <LUI.NumberInput
              tooltip="Small number"
              variant={variant}
              size="small"
              onChangeCommitted={change}
              {...commonProps}
            />

            <LUI.NumberInput
              tooltip="Medium number"
              variant={variant}
              size="medium"
              onChangeCommitted={change}
              {...commonProps}
            />

            <LUI.NumberInput
              tooltip="Instant update"
              variant={variant}
              size="medium"
              onChange={change}
              {...commonProps}
            />

            <LUI.NumberInput
              tooltip="Number with a unit"
              variant={variant}
              unit="Kopek"
              onChangeCommitted={change}
              {...commonProps}
            />

            <LUI.NumberInput
              tooltip="Disabled number"
              variant={variant}
              disabled
              onChangeCommitted={change}
              {...commonProps}
            />

            <LUI.NumberInput
              tooltip="Some error number"
              variant={variant}
              error
              {...commonProps}
            />
          </MUI.Stack>

          <MUI.Stack direction="column" spacing={2} style={{ width: "500px" }}>
            <LUI.NumberElement
              name="A number element"
              textInputProps={{ variant, value: numberValue }}
            />

            <LUI.NumberElement
              name="A disabled number element"
              disabled
              textInputProps={{ variant, value: numberValue }}
            />

            <LUI.NumberElement
              name="A smaller number element"
              dense
              textInputProps={{ variant, value: numberValue }}
            />

            <LUI.NumberElement
              name="An instant number element"
              textInputProps={{
                variant,
                value: numberValue,
                onChange: (x: number) => console.log("instant update", x),
                onChangeCommitted: (x: number) => {
                  console.log("final update", x);
                  change(x);
                },
              }}
            />

            <LUI.NumberDuoElement
              name="A double element"
              inputProps1={{
                variant,
                value: numberValue,
                min: 5,
                max: 15,
                tooltip: "First value",
              }}
              inputProps2={{
                variant,
                value: 20,
                min: 10,
                decimals: 3,
                tooltip: "Second value",
              }}
              linked={false}
              onToggleLinked={() => {}}
            />
          </MUI.Stack>
        </>
      );
    },
    [numberValue],
  );

  return (
    <MUI.Stack spacing={2}>
      {/* Button */}

      <Group title="<Button />">
        {renderButtons("contained")}
        <MUI.Divider />
        {renderButtons("outlined")}
        <MUI.Divider />
        {renderButtons("text")}
      </Group>

      {/* Select */}

      <Group title="<Select />">
        {renderSelects("standard")}
        <MUI.Divider />
        {renderSelects("filled")}
        <MUI.Divider />
        {renderSelects("outlined")}
      </Group>

      {/* Checkbox */}

      <Group title="<Checkbox />">
        <MUI.Stack direction="row" alignItems="center">
          <LUI.Checkbox
            tooltip="This is a checkbox"
            onChange={useCallback(
              (checked: boolean) => console.log("checkbox", checked),
              [],
            )}
          />

          <LUI.Checkbox
            tooltip="This is a smaller checkbox"
            color="secondary"
            size="small"
          />

          <LUI.Checkbox tooltip="This is a locked checkbox" checked />

          <LUI.Checkbox tooltip="This is a disabled checkbox" disabled />

          <LUI.Checkbox
            tooltip="With custom icons"
            icon={useMemo(
              () => (
                <MUIIcons.AccessAlarm color="primary" />
              ),
              [],
            )}
            checkedIcon={useMemo(
              () => (
                <LUI.Icon name="mdi-cog" color="secondary" />
              ),
              [],
            )}
          />
        </MUI.Stack>

        <MUI.Stack direction="column" style={{ width: "500px" }}>
          <LUI.CheckboxElement name="A checkbox element" />

          <LUI.CheckboxElement
            name="A disabled one"
            disabled
            tooltip="Some details"
          />

          <LUI.CheckboxElement
            name="A small one"
            tooltip="Teeny-tiny"
            checkboxProps={useMemo(
              () => ({
                size: "small",
              }),
              [],
            )}
          />
        </MUI.Stack>
      </Group>

      {/* Switch */}

      <Group title="<Switch />">
        <MUI.Stack direction="row" alignItems="center">
          <LUI.Switch
            tooltip="This is a switch"
            color="primary"
            onChange={useCallback(
              (checked: unknown) => console.log("switch", checked),
              [],
            )}
          />

          <LUI.Switch
            tooltip="This is a smaller switch"
            color="secondary"
            size="small"
          />

          <LUI.Switch tooltip="This is a locked switch" checked />

          <LUI.Switch tooltip="This is a disabled switch" disabled />
        </MUI.Stack>

        <MUI.Stack direction="column" style={{ width: "500px" }}>
          <LUI.SwitchElement
            name="A switch element"
            tooltip="Switch?"
            switchProps={useMemo(() => ({ color: "primary" }), [])}
          />

          <LUI.SwitchElement
            name="A disabled one"
            tooltip="Cannot work!"
            disabled
            switchProps={useMemo(() => ({ checked: true }), [])}
          />

          <LUI.SwitchElement name="A small one" dense />
        </MUI.Stack>
      </Group>

      {/* Slider */}

      <Group title="<Slider />">
        <MUI.Stack direction="column" style={{ width: "500px" }}>
          <LUI.Slider
            min={0}
            max={10}
            value={5}
            valueLabelDisplay="on"
            startLabel="Zero"
          />

          <LUI.Slider
            max={10}
            valueLabelDisplay="auto"
            color="secondary"
            endLabel="100%"
          />

          <LUI.Slider
            max={10}
            valueLabelDisplay="auto"
            color="secondary"
            startLabel="From"
            endLabel="To"
          />

          <LUI.Slider min={0} defaultValue={2} max={10} marks />
        </MUI.Stack>

        <MUI.Stack direction="column" style={{ width: "500px" }}>
          <LUI.SliderElement
            name="A slider element"
            tooltip="Details here"
            actionCols={4}
          />

          <LUI.SliderElement
            name="Instant update"
            actionCols={6}
            sliderProps={{
              onChange: (x: number) => console.log("instant update", x),
              onChangeCommitted: (x: number) => console.log("final update", x),
            }}
          />

          <LUI.SliderElement
            name="Another one"
            tooltip="More details"
            actionCols={10}
            sliderProps={useMemo(
              () => ({ min: -100, max: -50, color: "secondary" }),
              [],
            )}
          />
        </MUI.Stack>
      </Group>

      {/* Text input */}

      <Group title="<TextInput />">
        {renderTextInputs("standard")}
        <MUI.Divider />
        {renderTextInputs("filled")}
        <MUI.Divider />
        {renderTextInputs("outlined")}
      </Group>

      {/* Number input */}

      <Group title="<NumberInput />">
        {renderNumberInputs("standard")}
        <MUI.Divider />
        {renderNumberInputs("filled")}
        <MUI.Divider />
        {renderNumberInputs("outlined")}
      </Group>

      {/* Icons */}

      <Group title="<Icon /> + <IconButton />">
        <MUI.Stack direction="row" spacing={1}>
          <LUI.Icon name="mdi-adjust" color="primary" />

          <LUI.Icon name="mdi-account" color="secondary" size="tiny" />

          <LUI.Icon
            name="mdi-folder-move"
            style={{ color: "greenyellow" }}
            size="small"
          />

          <LUI.Icon name="mdi-all-inclusive" size="medium" />

          <LUI.Icon name="mdi-bike" tooltip="Fast bike! Weeeee" size="large" />

          <LUI.Icon name="does-not-exist" />
        </MUI.Stack>

        <MUI.Stack direction="row" spacing={1}>
          <LUI.Icon name="l-icon-grid-check" color="primary" />

          <LUI.Icon name="l-icon-3dbazaar" color="secondary" size="tiny" />

          <LUI.Icon
            name="l-icon-brush-plus"
            style={{ color: "gold" }}
            size="small"
          />

          <LUI.Icon name="l-icon-skatter" size="medium" />

          <LUI.Icon name="l-icon-zoom-extents" size="large" />
        </MUI.Stack>

        <MUI.Stack direction="row" spacing={1}>
          <LUI.IconButton
            icon={<LUI.Icon name="l-icon-brush-plus" color="secondary" />}
            tooltip="An interactive button"
            onClick={() => alert("clicked")}
          />

          <LUI.IconButton
            icon={<LUI.Icon name="mdi-bike" color="primary" />}
            tooltip="Another button"
            onClick={() => alert("clicked")}
          />

          <LUI.IconButton
            icon={<LUI.Icon name="l-icon-grid-check" />}
            tooltip="A disabled button"
            onClick={() => alert("clicked")}
            disabled
          />
        </MUI.Stack>
      </Group>

      {/* DotProgress */}

      <Group title="<DotProgress />">
        <MUI.Stack direction="column" spacing={2}>
          <LUI.DotProgress count={10} value={5} variant="single" />

          <LUI.DotProgress count={10} value={5} variant="upto" />

          <LUI.DotProgress count={10} value={100} variant="single" />

          <LUI.DotProgress count={-100} value={5} variant="single" />

          <LUI.DotProgress count={10} value={-100} variant="single" />
        </MUI.Stack>
      </Group>

      {/* Browse file */}

      <Group title="<BrowseFile />">
        <MUI.Stack direction="column" spacing={2} style={{ width: "600px" }}>
          <LUI.BrowseFileElement name="Some file" />

          <LUI.BrowseFileElement
            name="Missing file"
            value="C:/some/fake/path"
            fileNotFound
          />

          <LUI.BrowseFileElement
            name="Yet another file"
            value="C:/some/fake/and/veryyyyyyyyyyyyyyy/long/path"
          />

          <LUI.BrowseFileElement
            name="A disabled one"
            disabled
            value="C:/some/fake/path"
          />

          <LUI.BrowseFileElement
            name="A smaller one"
            dense
            value="C:/some/fake/path"
          />
        </MUI.Stack>
      </Group>

      {/* Middle ellipsis */}

      <Group title="<MiddleEllipsis />">
        <MUI.Stack direction="column" spacing={2}>
          <MUI.Stack style={{ width: "200px" }}>
            <LUI.MiddleEllipsis ellipsedText="hello this is some long text long text long text long text long text long text long text long text">
              <span style={middleEllipsisStyle}>
                hello this is some long text long text long text long text long
                text long text long text long text
              </span>
            </LUI.MiddleEllipsis>
          </MUI.Stack>

          <LUI.MiddleEllipsis
            width={100}
            ellipsedText="hello this is some long text long text long text long text long text long text long text long text"
          >
            <span style={middleEllipsisStyle}>
              hello this is some long text long text long text long text long
              text long text long text long text
            </span>
          </LUI.MiddleEllipsis>
        </MUI.Stack>
      </Group>

      {/* Color picker */}

      <Group title="<ColorPicker />">
        <MUI.Stack direction="row" spacing={2}>
          <LUI.ColorPicker
            open
            onClose={() => {}}
            variant="chrome"
            value={useMemo(() => ({ r: 255, g: 0, b: 0 }), [])}
          />

          <LUI.ColorPicker
            open
            onClose={() => {}}
            variant="compact"
            value={useMemo(() => ({ r: 0, g: 255, b: 0 }), [])}
          />

          <LUI.ColorPicker
            open
            onClose={() => {}}
            disabled
            value={useMemo(() => ({ r: 0, g: 0, b: 255 }), [])}
          />

          <LUI.Button
            variant="outlined"
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
        </MUI.Stack>

        <LUI.ColorElement
          name="A nice color"
          tooltip="Very very nice"
          pickerProps={useMemo(
            () => ({ value: { r: 255, g: 0, b: 128 }, variant: "compact" }),
            [],
          )}
        />
      </Group>

      {/* Accordion */}

      <Group title="<Accordion />">
        <LUI.Accordion
          header={<MUI.Typography variant="h6">Accordion title</MUI.Typography>}
        >
          <MUI.Typography variant="body1">Accordion content</MUI.Typography>
        </LUI.Accordion>
      </Group>

      {/* Toggleable group */}

      <Group title="<ToggleableGroup />">
        <LUI.ToggleableGroup
          name="A toggleable group"
          open={groupOpen}
          onChange={useCallback(
            () => setGroupOpen((oldValue) => !oldValue),
            [],
          )}
        >
          <MUI.Typography variant="body1">Group content</MUI.Typography>
        </LUI.ToggleableGroup>
      </Group>

      {/* DialogOverlay */}

      <Group title="<DialogOverlay />">
        <LUI.Button
          variant="outlined"
          onClick={() => setShowDialogOverlay1(!showDialogOverlay1)}
        >
          Show dialog with title and actions
        </LUI.Button>
        <LUI.DialogOverlay
          open={showDialogOverlay1}
          title="A dialog overlay"
          actions={[
            { label: "Close", action: () => setShowDialogOverlay1(false) },
            { label: "A", action: () => alert("ha!"), color: "error" },
            { label: "B", action: () => alert("ha!"), color: "secondary" },
            { label: "C", action: () => alert("ha!"), color: "success" },
          ]}
          onClose={() => setShowDialogOverlay1(false)}
        >
          <MUI.Typography>Hello there</MUI.Typography>
        </LUI.DialogOverlay>

        <LUI.Button
          variant="outlined"
          onClick={() => setShowDialogOverlay2(!showDialogOverlay2)}
        >
          Show dialog without title
        </LUI.Button>
        <LUI.DialogOverlay
          open={showDialogOverlay2}
          actions={[
            { label: "Close", action: () => setShowDialogOverlay2(false) },
          ]}
          onClose={() => setShowDialogOverlay2(false)}
        >
          <MUI.Typography>Hello there</MUI.Typography>
        </LUI.DialogOverlay>

        <LUI.Button
          variant="outlined"
          onClick={() => setShowDialogOverlay3(!showDialogOverlay3)}
        >
          Show dialog without actions
        </LUI.Button>
        <LUI.DialogOverlay
          open={showDialogOverlay3}
          title="A dialog overlay"
          onClose={() => setShowDialogOverlay3(false)}
        >
          <MUI.Typography>Hello there</MUI.Typography>
        </LUI.DialogOverlay>
      </Group>

      {/* ParameterElement */}

      <Group title="<ParameterElement />">
        <MUI.Stack direction="column">
          <MUI.Stack style={{ width: "400px", border: "1px solid lightgrey" }}>
            <LUI.ParameterElement name="A parameter name" actionCols={3}>
              <div style={{ background: "gold" }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Stack>

          <MUI.Stack style={{ width: "400px", border: "1px solid lightgrey" }}>
            <LUI.ParameterElement name="A parameter name" actionCols={6}>
              <div style={{ background: "gold" }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Stack>

          <MUI.Stack style={{ width: "400px", border: "1px solid lightgrey" }}>
            <LUI.ParameterElement name="A parameter name" actionCols={9}>
              <div style={{ background: "gold" }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Stack>

          <MUI.Stack style={{ width: "600px", border: "1px solid lightgrey" }}>
            <LUI.ParameterElement
              name="A parameter name"
              nameAlign="left"
              actionAlign="center"
            >
              <div style={{ background: "gold" }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Stack>

          <MUI.Stack style={{ width: "600px", border: "1px solid lightgrey" }}>
            <LUI.ParameterElement
              name="A parameter name"
              nameAlign="center"
              actionAlign="right"
            >
              <div style={{ background: "gold" }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Stack>

          <MUI.Stack style={{ width: "600px", border: "1px solid lightgrey" }}>
            <LUI.ParameterElement
              name="A parameter name"
              nameAlign="right"
              actionAlign="left"
            >
              <div style={{ background: "gold" }}>A parameter value</div>
            </LUI.ParameterElement>
          </MUI.Stack>
        </MUI.Stack>
      </Group>
    </MUI.Stack>
  );
}

const theme = MUI.createTheme();

LUI.renderWhenLoaded(
  <StrictMode>
    <MUI.ThemeProvider theme={theme}>
      <App />
    </MUI.ThemeProvider>
  </StrictMode>,
);
