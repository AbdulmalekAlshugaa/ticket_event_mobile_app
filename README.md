# Event-App

I have implemented the best practices of separation of concerns and utilized the saga pattern design to handle side effects.

# Task

Create a simple React Native application that displays a list of of event fetched from ticketmaster
API. The app should have two screens: search screen and event details screen only .
When the user taps on a item, the app should navigate to the event details screen
and display its details..

# Exploration

The task description outlines the creation of an application that interacts with an API. This API provides an array of objects, each including event details like name, description, image, and price. However, what if we aim to enhance this project professionally by integrating advanced techniques such as employing a side effect library like Saga, alongside Redux and React Query? While this might appear excessive for the scope of this assessment, the objective is to demonstrate our capability to develop a real-world application to the hiring manager. Let's embrace the challenge and proceed.

## Saga pattern

saga pattern is a sequence of transactions that updates each service and publishes a message or event to trigger the next transaction step. Heere is the design of implementing saga pattern design:

![1_LMIPRZvZmoga-HpeMAAdOw](https://github.com/AbdulmalekAlshugaa/E-Commerce-App/assets/33663456/52633a49-97b9-4a70-9670-ab3de0f82b7c)
![CibAZdDVEAEOng4](https://github.com/AbdulmalekAlshugaa/E-Commerce-App/assets/33663456/ff43149f-aa4a-4a45-9ad0-996b9cab206d)

The above two screenshots shows how we utilized saga pattern design within our project . Saga yields pure objects called effects. Effect is simple javascript object that contains commands that will be executed by a middleware. What are these commands? Commands involve actions like invoking asynchronous functions, dispatching an action to the store, etc. Redux-saga provides some helper effects wrapping internal functions to spawn tasks when some specific actions are dispatched to the Store . source : https://medium.com/nerd-for-tech/saga-pattern-971d59be3722

## Tech stack

1. Redux-toolkit
   3 Redux-Saga
2. Interactive UI
3. react-native-paper
4. React Query
5. React Navigation

## How to run

```bash
  yarn install
  expo start
  yarn test // to check all test cases
```

### implementation

| Home Page                                                                                                                                                                         | Search Page                                                                                                                                                                       | Filter Page                                                                                                                                                                       | Details                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Simulator Screen Shot - iPhone 13 - 2023-12-04 at 00 40 08](https://github.com/AbdulmalekAlshugaa/ticket_event_mobile_app/assets/33663456/9a7325c8-29dc-4d29-9340-6415df330ace) | ![Simulator Screen Shot - iPhone 13 - 2023-12-01 at 00 42 05](https://github.com/AbdulmalekAlshugaa/ticket_event_mobile_app/assets/33663456/6884ac20-f83d-40fd-9893-0c7fef1cd133) | ![Simulator Screen Shot - iPhone 13 - 2023-12-01 at 00 42 12](https://github.com/AbdulmalekAlshugaa/ticket_event_mobile_app/assets/33663456/c7254ae3-0701-41de-ab94-19213fb616e4) | ![Simulator Screen Shot - iPhone 13 - 2023-12-01 at 00 44 59](https://github.com/AbdulmalekAlshugaa/ticket_event_mobile_app/assets/33663456/29464a54-49c2-4367-a157-84cbecbff1d2) |

### Unit Test

|![Screenshot 2023-12-01 at 1 20 31 AM](https://github.com/AbdulmalekAlshugaa/ticket_event_mobile_app/assets/33663456/261767e6-b5b9-4e28-8650-3b8425cfdbcb)|
