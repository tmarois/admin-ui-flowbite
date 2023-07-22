## Labels

### Example Usage

```vue
<FormLabel title="Label Name" tooltip="Please type your name here" required />
```

### Props

| PROP | TYPE | DEFAULT | DESCRIPTION |
| ---- | ---- | ------- | ----------- |
| `disabled` | Boolean | `false` | When the label is in disabled state | 
| `required` | Boolean | `false` | Disable the required "*" next to the label content | 
| `errors` | Boolean | `false` | The label is in an error state | 
| `title` | String | `null` | The label content | 
| `id` | String | `null` | The label ID which should refer to the `for` to match input id | 
| `variant` | String | `null` | The variant classes the label should use | 
| `variantTooltip` | String | `null` | The variant classes the tooltip should use | 
| `tooltip` | String | `null` | The tooltip content, null means no tooltip | 
| `tooltipPosition` | String | `top` | The position of the tooltip | 
| `tooltipIconSize` | Number | `4` | The size of the tooltip icon | 

### Slots

| SLOT | DESCRIPTION |
| ---- | ----------- |
| `default` | The default content for this label (replaces `title` prop) |
| `tooltip-icon` | The slot to replace the tooltip icon |
| `icon` | The slot to prepend an icon before label content |