const numberUnitRegex = new RegExp(/^-?\d+(\.\d+)?(m|cm|mm|'|")?$/);

export function isNumberDescription(x)
{
    // Number?
    if (typeof x === 'number')
        return true;

    // String representing a number with a unit?
    return typeof x === 'string' && x.match(numberUnitRegex);
}

export function numberUnitProp(props, propName, componentName)
{
    const value = props[propName];

    if (value === undefined)
        throw new Error(`${componentName}: "${propName}" prop is required`);

    if (!isNumberDescription(value))
        throw new Error(`${componentName}: "${propName}" prop (${typeof value} with value ${value}) must be a number or string representing a number with a unit`);
}

export function numberUnitPropArray(props, propName, componentName)
{
    const values = props[propName];

    if (values === undefined || !(values instanceof Array))
        throw new Error(`${componentName}: "${propName}" array prop is required`);

    values.every(isNumberDescription)
}
