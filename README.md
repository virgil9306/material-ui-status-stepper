# material-ui-status-stepper

Material UI-inspired vertical status stepper that shows statuses as colorful cards, along with other visual changes

## How to use this

  * Clone the repo: `git clone https://github.com/virgil9306/material-ui-status-stepper`
  * Install the dependencies: `cd material-ui-status-stepper && npm install`
  * Pack it (if you make any changes): `npm run pack`
  * Import it (```import StatusStepper from 'material-ui-status-stepper';```)
  * Use it!

## Configuration

| Prop name         | Sample value                 | Effect                                                                            |
|-------------------|------------------------------|-----------------------------------------------------------------------------------|
| currentStatus     | `'INACTIVE'`                | Current status to show as active                                                  |
| statuses          | (See Example Statuses below) | Statuses to display                                                               |
| titleStyle        | `{fontSize: 24}`            | Override style for dialog title                                                   |
| expandToggleOpen  | `<p>Open</p>`               | Toggle to open expandBody (TODO)                                                  |
| expandToggleClose | `<p>Close</p>`              | Toggle to close expandBody (TODO)                                                 |
| expandBody        | (Any React component)        | The contents of the expanded dialog when `expandToggleOpen` is clicked (TODO) |

### Example Statuses

```
const steps = [
    {
        title: 'Inactive', // Title to display
        status: 'INACTIVE', // Status identifier (same as what you pass into currentStatus)
        completed: false, // All statuses preceding currentStatus will be marked as completed = true
        hint: ( // TODO (Contents in expanded version)
            <ol style={styles.hint}>
                <li>Something</li>
                <li>Something else</li>
            </ol>
        ),
        actions: [ // Will be displayed as material-ui button(s). (Ideally keep to ~3 items.)
            {
                name: 'NEXT',
                callback: this.handleClickNext,
                style: {width: 88},
            }
        ],
        colors: {
            background: 'blue', // Background color of card-style header
            text: 'black' // text color of card-style header
        },
        hideIfNotActive: true // If this status is not the current status, don't display it
    }
];
```

## Roadmap

* Expandable support (with React component props `expandToggleOpen`, `expandToggleClose`, and `expandBody`)
* Add full testing
* Example page
* Code coverage to 100%
* More customizable styles
