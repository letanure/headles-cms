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
  // group: 'basic' | 'validate' | 'input'
  name: string
  is:
    | 'el-input-number'
    | 'el-input'
    | 'el-radio-group'
    | 'el-select'
    | 'el-switch'
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
  value: 0,
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
  name: 'show-word-limit',
  is: 'el-switch',
  value: false,
}

const propShowPassword: InputProp = {
  name: 'show-password',
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

// autocomplete
// max
// min
// step
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

const InputTypes: { [index: string]: InputConfig } = {
  [InputText.type]: InputText,
  [InputEmail.type]: InputEmail,
  [InputUrl.type]: InputUrl,
  [InputTel.type]: InputTel,
  [InputPassword.type]: InputPassword,
  [InputTextarea.type]: InputTextarea,
}

export default InputTypes
