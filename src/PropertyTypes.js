const _valueStatus = `"loading" | "unavailable" | "available"`;
// 4.1
const ActionValue = `interface ActionValue {
    readonly canExecute: boolean;
    readonly isExecuting: boolean;
    execute(): void;
}`;
// 4.2
const DynamicValue = `interface DynamicValue<T> {
    status: ${_valueStatus},
    value: T | undefined
}`;
// 4.3
const EditableValue = `interface EditableValue<T> {
    status: ${_valueStatus};
    readOnly: boolean;

    value: T | undefined;
    setValue(value: T | undefined): void;
    validation: string | undefined;
    setValidator(validator?: (value: T | undefined) => string | undefined): void;

    displayValue: string;
    setTextValue(value: string): void;

    formatter: ValueFormatter<T>;
    setFormatter(formatter: ValueFormatter<T> | undefined): void;

    universe?: T[];
}`;
// 4.4
const IconValue = `DynamicValue<IconValue> {
    status: ${_valueStatus},
    value: IconValue | undefined
}

interface GlyphIcon {
    type: "glyph";
    iconClass: string;
}
interface WebImageIcon {
    type: "image";
    iconUrl: string;
}
interface NativeImageIcon {
    type: "image";
    iconUrl: Readonly<ImageURISource>;
}

export type WebIcon = GlyphIcon | WebImageIcon | undefined;
export type NativeIcon = GlyphIcon | NativeImageIcon | undefined;
export type IconValue = WebIcon | NativeIcon;
`;
// 4.5 ImageValue
const ImageValue = `DynamicValue<ImageValue> {
    status: ${_valueStatus},
    value: ImageValue | undefined
}
export interface WebImage {
    uri: string;
    altText?: string;
}

export type NativeImage = Readonly<ImageURISource | string | number>;
export type ImageValue = WebImage | NativeImage;`;
// 4.6 FileValue
const FileValue = `DynamicValue<FileValue> {
    status: ${_valueStatus},
    value: FileValue | undefined
}
interface FileValue {
    uri: string;
}`;
// 4.7 ListValue
const ListValue = `interface ListValue {
    status: ${_valueStatus};
    offset: number;
    limit: number;
    setOffset(offset: number): void;
    setLimit(limit: Option<number>): void;
    items?: ObjectItem[];
    hasMoreItems?: boolean;
    totalCount?: number;
}
interface ObjectItem {
  id: GUID
}`;
//4.8 ListActionValue
const ListActionValue = `type ListActionValue = (item: ObjectItem) => ActionValue;`;
//4.9 ListAttributeValue
const ListAttributeValue = `type ListAttributeValue = (item: ObjectItem) => EditableValue<AttributeValue>;`;
// 4.10 ListWidgetValue
const ListWidgetValue = `type ListWidgetValue = (item: ObjectItem) => ReactNode;`;

const action = ActionValue,
  attribute = EditableValue,
  boolean = DynamicValue,
  decimal = DynamicValue,
  enumeration = DynamicValue,
  integer = DynamicValue,
  string = DynamicValue,
  expression = DynamicValue,
  textTemplate = DynamicValue,
  icon = IconValue,
  image = ImageValue,
  file = FileValue,
  datasource = ListValue,
  object = `// See the defintion in your XML file for more details`;

module.exports = {
  action,
  attribute,
  boolean,
  decimal,
  enumeration,
  integer,
  string,
  expression,
  textTemplate,
  object,
  datasource,
  icon,
  image,
  file,
};
