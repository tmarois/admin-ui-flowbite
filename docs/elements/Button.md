## Buttons

### Example Usage

```vue
<ElementButton>Save</ElementButton>
```

### Props

| PROP | TYPE | DEFAULT | DESCRIPTION |
| ---- | ---- | ------- | ----------- |
| `loading` | Boolean | `false` | When a button is in loading state | 
| `disabled` | Boolean | `false` | When a button is in disabled state | 
| `tag` | String | `button` | The html tag for this button | 
| `target` | String | `null` | The _target for this button if link | 
| `to` | String | `null` | The href location for this button | 
| `href` | String | `null` | The alias of `to` and to use as a link | 
| `circle` | Boolean | `false` | Make the button a circle | 
| `ghost` | Boolean | `false` | Button has no border or background | 
| `outlined` | Boolean | `false` | Button has only a border | 

### Slots

| SLOT | DESCRIPTION |
| ---- | ----------- |
| `default` | The default slot for the button content |
| `icon` | Slot for the icon before button content |
| `icon-after` | Slot for the icon after button content |