# Simple Form UI 

This project was built with 
*  React 
*  TypeScript
*  Material UI (Button, TextField, Dialog)

using create-react-app

Testing framework used: 
*  Jest
*  Enzyme 
*  React Testing Library

## How to run and test 

To launch the app from localhost 3000:

### `yarn start`

Run all test suites:

### `yarn test`

## Code design

### Form control 

The form is composed of FormTextField and a submit button. 

The form maintains state of 
*  values (wired up with input control)
*  errors (field level validation error / undefined)

Submit button is disabled if any field level errors exist. 

### Modal control

The modal contains a number of different states that determine the differences of UI including modal title, body text, button text, button action and whether or not form will be rendered.

The states of the modal is determined by api call status, which uses useReducer and dispatches different actions to interact with the modal content accordingly. 