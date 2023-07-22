## Tooltips

### Example Usage

```vue
<span 
    data-tooltip-target="tooltip-123" 
    data-tooltip-placement="top"
>Hover to see tooltip</span>

<ElementTooltip id="tooltip-123">My Tooltip Content</ElementTooltip>
```

### Data Attributes

Rendering a tooltip on other elements, you need to use these data attributes

| ATTR | DESCRIPTION |
| ---- | ----------- |
| `data-tooltip-target` | The html target for this tooltip | 
| `data-tooltip-placement` | The position of the tooltip `top`, `right`, `left`, `bottom` | 

### Props

| PROP | TYPE | DEFAULT | DESCRIPTION |
| ---- | ---- | ------- | ----------- |
| `id` | String | `null` | The tooltip ID, this should always be unique | 
| `variant` | String | `null` | The variant classes the tooltip should use | 

### Slots

| SLOT | DESCRIPTION |
| ---- | ----------- |
| `default` | The default content of this tooltip |