**Redux** is state management framework that affects Deer’s design, here we go through the architecture and some concepts that will be helpful.

**This figure shows how components of Redux are connected and their interactions**

[[https://github.com/abahmed/Deer/blob/develop/docs/redux.png]]

### The store

Redux uses a single store to be the single source of truth, so the state of application is stored in an object tree in the store.

State is read-only and the only way to change the state is to emit an action, an object describing what happened. These changes are made with reducers.

When the store needs to know how an action changes the state, it asks the reducers.

**Here is a list of store’s role**
* Holds application state
* Allows access to state via getState() method
* Allows state to be updated via dispatch(action) method


### Reducers

**Reducers** are _Pure Functions_ (synchronous) that you write which handle dispatched actions and can actually change the state. A reducer takes in current state as an argument and can only modify the state by returning a new state.

> Pure functions are functions that always evaluate the same result given the same arguments.

If the state has multiple independent components that can be changed individually, we can make multiple reducers, such that each reducer is responsible for changing certain components of the state. To manage this process, we need a special reducer called the root reducer.

**The root reducer is responsible for**
* Figuring out which parts of the state should be handled by which reducer, based on the state object’s keys.
* Accumulating the changes made by each individual reducer after finishing its job, and producing the new state object.

This new state object is in turn sent to the store to be announced as the new official state.


### Middlewares

In Redux, a middleware is used to intercept dispatched actions before they make it to the reducer. This means that when you call dispatch on an action, the action goes through a (or many) middleware before hitting the reducer.

The order of execution is actually the order in which you pass the middleware to the store. 

At any point in a middleware, you can chose to stop forwarding the action, which will end the cycle.

**Middlewares can be used for**
* Making asynchronous requests, as this cannot be done through reducers
* Applying logic (place logic in one place instead of being spread across reducers. For example logger)
* filtering to all actions

**_NOTE:_ Middleware does not change the state, instead it can dispatch actions.**


### Action Creator
Returns a formatted action object.


### Mapper
To connect the store to the views, Redux needs _react-redux_ package. It allows us to separate presentational components which are implemented using **React** (how things look) and container components (how things work).

This mapper connects container components to presentational components to the Redux store and uses Action creator to dispatch actions with proper parameters and maps actions to presentational components.


### This an example of the workflow

1. The view requests an action. The action creator formats it and returns it.
2. The view dispatches the action.
3. The store receives the action. It sends the current state tree and the action to middleware (if they exist) then the root reducer.
4. The root reducer cuts apart the state tree into slices. Then it passes each slice to the sub-reducer that knows how to deal with it.
5. The sub-reducer copies the slice and makes changes to the copy. It returns the copy of the slice to the root reducer.
6. Once all of the sub-reducers have returned their slice copies, the root reducer pastes all of them together to form the whole updated state tree, which it returns to the store. The store replaces the old state tree with the new one.
7. The store tells the view layer binding that there’s new state.
8. The view layer binding asks the store to send over the new state.
9. The view layer binding triggers a rerender.


### References

1. https://redux.js.org
2. https://designingforscale.com/understanding-redux-middleware-and-writing-custom-ones/
3. https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6