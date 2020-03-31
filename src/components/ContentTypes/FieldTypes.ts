interface InputConfig {
  type: string
  props: Array<InputProp>
}

interface InputPropOption {
  label: string
  value: any
}

interface InputPropOptions extends Array<InputPropOption> {}

interface InputProp {
  name: string
  is:
    | 'el-color-picker'
    | 'el-input-number'
    | 'el-input'
    | 'el-radio-group'
    | 'el-select'
    | 'el-switch'
    | 'select-icon'
    | 'defatulTypeValue'
  value: String | Boolean | Number | null | undefined
  placeholder?: String
  min?: Number
  step?: Number
  filterable?: Boolean
  custom?: String
  options?: InputPropOptions
}

const propName: InputProp = {
  name: 'name',
  is: 'el-input',
  value: '',
}

const propLabel: InputProp = {
  name: 'label',
  is: 'el-input',
  value: null,
}

const propValue: InputProp = {
  name: 'value',
  is: 'el-input',
  value: null,
}

const propPlaceholder: InputProp = {
  name: 'placeholder',
  is: 'el-input',
  value: null,
}

const propSize: InputProp = {
  name: 'size',
  is: 'el-radio-group',
  value: 'default',
  options: [
    { value: 'default', label: 'Default' },
    { value: 'mini', label: 'Mini' },
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
  ],
}

const propPrefixIcon: InputProp = {
  name: 'prefixIcon',
  is: 'el-select',
  value: null,
  placeholder: 'Select',
  filterable: true,
  custom: 'icon',
  options: [
    { value: null, label: 'None' },
    { value: 'el-icon-date', label: 'Date' },
    { value: 'el-icon-search', label: 'Search' },
  ],
}

const propSuffixIcon: InputProp = {
  name: 'suffixIcon',
  is: 'el-select',
  value: null,
  placeholder: 'Select',
  filterable: true,
  custom: 'icon',
  options: [
    { value: null, label: 'None' },
    { value: 'el-icon-date', label: 'Date' },
    { value: 'el-icon-search', label: 'Search' },
  ],
}

const propMaxlength: InputProp = {
  name: 'maxlength',
  is: 'el-input-number',
  value: 9999,
}

const propMinlength: InputProp = {
  name: 'minlength',
  is: 'el-input-number',
  value: null,
}

const propClearable: InputProp = {
  name: 'clearable',
  is: 'el-switch',
  value: false,
}

const propDisabled: InputProp = {
  name: 'disabled',
  is: 'el-switch',
  value: false,
}

const propReadonly: InputProp = {
  name: 'readonly',
  is: 'el-switch',
  value: false,
}

const propAutofocus: InputProp = {
  name: 'autofocus',
  is: 'el-switch',
  value: false,
}

const propShowWordLimit: InputProp = {
  name: 'showWordLimit',
  is: 'el-switch',
  value: false,
}

const propShowPassword: InputProp = {
  name: 'showPassword',
  is: 'el-switch',
  value: false,
}

const propRows: InputProp = {
  name: 'rows',
  is: 'el-input-number',
  value: 2,
  min: 1,
  step: 1,
}

const propResize: InputProp = {
  name: 'resize',
  is: 'el-radio-group',
  value: 'none',
  options: [
    { value: 'none', label: 'none' },
    { value: 'both', label: 'both' },
    { value: 'horizontal', label: 'horizontal' },
    { value: 'vertical', label: 'vertical' },
  ],
}

const propAutosize: InputProp = {
  name: 'autosize',
  is: 'el-switch',
  value: null,
  //  Can accept an object, e.g. { minRows: 2, maxRows: 6 }	boolean / object	—	false
}

const propWidth: InputProp = {
  name: 'width',
  is: 'el-input-number',
  value: 9999,
}

// autocomplete
const propMax: InputProp = {
  name: 'max',
  is: 'el-input-number',
  value: null,
}

const propMin: InputProp = {
  name: 'min',
  is: 'el-input-number',
  value: null,
}

const propStep: InputProp = {
  name: 'step',
  is: 'el-input-number',
  value: 1,
}

const propStepStrictly: InputProp = {
  name: 'stepStrictly',
  is: 'el-switch',
  value: false,
}

const propPrecision: InputProp = {
  name: 'precision',
  is: 'el-input-number',
  value: null,
}

const propControls: InputProp = {
  name: 'controls',
  is: 'el-switch',
  value: true,
}

const propControlsPosition: InputProp = {
  name: 'controlsPosition',
  is: 'el-radio-group',
  value: 'default',
  options: [
    { value: 'default', label: 'Default' },
    { value: 'right', label: 'Right' },
  ],
}

const propActiveText: InputProp = {
  name: 'activeText',
  is: 'el-input',
  value: '',
}

const propInactiveText: InputProp = {
  name: 'inactiveText',
  is: 'el-input',
  value: '',
}

const propActiveIconClass: InputProp = {
  name: 'activeIconClass',
  is: 'select-icon',
  value: '',
}

const propInactiveIconClass: InputProp = {
  name: 'inactiveIconClass',
  is: 'select-icon',
  value: '',
}

const propActiveColor: InputProp = {
  name: 'activeColor',
  is: 'el-color-picker',
  value: '',
}

const propInactiveColor: InputProp = {
  name: 'inactiveColor',
  is: 'el-color-picker',
  value: '',
}

const propActiveValue: InputProp = {
  name: 'activeValue',
  is: 'defatulTypeValue',
  value: '',
}

const propInactiveValue: InputProp = {
  name: 'inactiveValue',
  is: 'defatulTypeValue',
  value: '',
}

// tabindex
// validate-event

const InputText: InputConfig = {
  type: 'text',
  props: [
    propName,
    propLabel,
    propValue,
    propPlaceholder,
    propSize,
    propPrefixIcon,
    propSuffixIcon,
    propMaxlength,
    propMinlength,
    propClearable,
    propDisabled,
    propReadonly,
    propAutofocus,
    propShowWordLimit,
  ],
}

const InputEmail: InputConfig = {
  type: 'email',
  props: { ...InputText.props },
}

const InputUrl: InputConfig = {
  type: 'url',
  props: { ...InputText.props },
}

const InputTel: InputConfig = {
  type: 'tel',
  props: { ...InputText.props },
}

const InputPassword = {
  type: 'password',
  props: {
    ...InputText.props,
    propShowPassword,
  },
}

const InputTextarea = {
  type: 'textarea',
  props: {
    ...InputText.props,
    propRows,
    propResize,
    propAutosize,
  },
}

const InputNumber: any = {
  type: 'number',
  props: {
    propName,
    propLabel,
    propValue,
    propPlaceholder,
    propSize,
    propDisabled,
    propControls,
    propControlsPosition,
    propMax,
    propMin,
    propPrecision,
    propStep,
    propStepStrictly,
  },
}

const InputSwitch: any = {
  type: 'switch',
  props: {
    propName,
    propLabel,
    propDisabled,
    propWidth: { ...propWidth, value: 40 },
    propActiveIconClass,
    propInactiveIconClass,
    propActiveText,
    propInactiveText,
    propActiveValue: { ...propActiveValue, value: true },
    propInactiveValue: { ...propInactiveValue, value: false },
    propActiveColor: { ...propActiveColor, value: '#409EFF' },
    propInactiveColor: { ...propInactiveColor, value: '#C0CCDA' },
  },
}

const InputTypes: { [index: string]: InputConfig } = {
  [InputEmail.type]: InputEmail,
  [InputNumber.type]: InputNumber,
  [InputPassword.type]: InputPassword,
  [InputSwitch.type]: InputSwitch,
  [InputTel.type]: InputTel,
  [InputText.type]: InputText,
  [InputTextarea.type]: InputTextarea,
  [InputUrl.type]: InputUrl,
}

export default InputTypes
