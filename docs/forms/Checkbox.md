## TextField

### Example Usage

Default checkbox

```vue
<FormCheckbox v-model="MyValue" />
```

Default Radio

```vue
<FormCheckbox v-model="MyValue" radio />
```

Default Switch

```vue
<FormCheckbox v-model="MyValue" switch />
```

### Props

| PROP | TYPE | DEFAULT | DESCRIPTION |
| ---- | ---- | ------- | ----------- |
| `disabled` | Boolean | `false` | When the component is in disabled state | 
| `readonly` | Boolean | `false` | When the component is in read-only state | 
| `clearable` | Boolean | `false` | Allow the content to be cleared | 
| `characterCounter` | Boolean | `false` | Display a character counter | 
| `selectAll` | Boolean | `false` | Allow all content in field to be selected on click | 
| `noresize` | Boolean | `false` | On type `area` dont allow resizing | 
| `required` | Boolean | `false` | Display the required "*" next to the label content | 
| `errors` | Boolean | `false` | The component is in an error state | 
| `id` | String | `null` | The component ID which should refer to the `for` to match label id | 
| `variant` | String | `null` | The variant classes the component should use | 
| `variantLabel` | String | `null` | The variant classes the label should use | 
| `type` | String | `text` | ... | 
| `label` | String | `text` | ... | 
| `placeholder` | String | `text` | ... | 
| `name` | String | `text` | ... | 
| `maxlength` | String | `text` | ... | 
| `min` | String | `text` | ... | 
| `max` | String | `text` | ... | 
| `pattern` | String | `text` | ... | 
| `step` | String | `text` | ... | 
| `width` | String | `text` | ... | 
| `modelValue` | String | `text` | ... | 
| `value` | String | `text` | ... | 
| `decimals` | String | `text` | ... | 


### Slots

| SLOT | DESCRIPTION |
| ---- | ----------- |
| `default` | ... |

### Emits

| SLOT | DESCRIPTION |
| ---- | ----------- |
| `change` | ... |
| `update:modelValue` | Updates the value automatically |