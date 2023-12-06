// import logger from 'redux-logger';
import type { Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { isDevelopment } from 'chitility/dist/util/environment';
import forEach from 'lodash/forEach';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

let epic$: any;
let rootEpic: any;
let rootMiddleware: any[] = [
  // logger
];
// An array which is used to delete state keys when reducers are removed
// const keysToRemove: string[] = [];

// check existed appName when addEpic
const epicAppName: string[] = [];
let toolkitStore: any;
let initialized = false;
export function createStoreManager<S>(
  initialReducers: ReducersMapObject<S, any>,
  rootEffects: any[] = [],
  middlewares: any[] = [],
) {
  // Create an object which maps keys to reducers
  const reducers: any = {
    ...initialReducers,
    // additional reducer
  };

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers);

  // Config Effects
  /*
   * Trong document của nó nói sử dụng BehaviorSubject nhưng nếu như thế sẽ bị lỗi chỉ chạy thằng epic cuối cùng
   * Với cách sử dụng cũ là add mọi thứ vào rootEffects thì lại work, hoặc ít nhất là rootEffects không empty thì OK
   * */
  // epic$ = new ReplaySubject(combineEpics(...rootEffects));
  epic$ = new BehaviorSubject(combineEpics(...rootEffects));
  rootEpic = (action$: any, state$: any) =>
    epic$.pipe(mergeMap((epic: any) => epic(action$, state$)));

  const effectMiddleware = createEpicMiddleware();

  rootMiddleware = [...rootMiddleware, effectMiddleware, ...middlewares];

  const storeManager = {
    initialize: () => {
      if (initialized) {
        return;
      }
      toolkitStore = configureStore({
        reducer: combinedReducer,
        middleware: rootMiddleware as any,
        devTools: isDevelopment()
          ? {
              maxAge: 50,
              trace: true,
              traceLimit: 10,
            }
          : false,
      });

      effectMiddleware.run(rootEpic);
      initialized = true;
    },

    getStore: () => toolkitStore,

    /**
     * Add epic asynchronously
     * @param appName
     * @param epics
     */
    addEpics: (appName: string, epics: any[]) => {
      if (epicAppName.includes(appName)) {
        console.warn(`We already added epic for app with name: ${appName}`);
        return;
      }
      epicAppName.push(appName);
      epics.forEach((epic) => epic$.next(epic));
    },

    // The root reducer function exposed by this object
    // This will be passed to the store
    // reduce: (state: any, action: any) => {
    //   // If any reducers have been removed, clean up their state first
    //   if (keysToRemove.length > 0) {
    //     // eslint-disable-next-line no-param-reassign
    //     state = { ...state };
    //     for (let i = 0; i < keysToRemove.length; i++) {
    //       const key = keysToRemove[i];
    //       // eslint-disable-next-line no-param-reassign
    //       delete state[key];
    //     }
    //     keysToRemove = [];
    //   }
    //
    //   // Delegate to the combined reducer
    //   return combinedReducer(state, action);
    // },

    // Adds a new reducer with the specified key
    add: (key: string, reducer: Reducer<any>) => {
      if (!key || reducers[key]) {
        return;
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer;

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
      toolkitStore?.replaceReducer(combinedReducer);
    },

    mergeReducers: (objectReducer: any) => {
      forEach(objectReducer, (reducer, key) => {
        if (!key || reducers[key]) {
          return;
        }

        // Add the reducer to the reducer mapping
        reducers[key] = reducer;

        // Generate a new combined reducer
        combinedReducer = combineReducers(reducers);
      });
      toolkitStore?.replaceReducer(combinedReducer);

      return storeManager;
    },

    // Removes a reducer with the specified key
    // remove: (key: string) => {
    //   if (!key || !reducers[key]) {
    //     return;
    //   }
    //
    //   // Remove it from the reducer mapping
    //   delete reducers[key];
    //
    //   // Add the key to the list of keys to clean up
    //   keysToRemove.push(key);
    //
    //   // Generate a new combined reducer
    //   combinedReducer = combineReducers(reducers);
    //   toolkitStore?.replaceReducer(combinedReducer);
    // },

    getStateType: (): S => {
      throw new Error(
        'This method should not be called. It is for type inference only.',
      );
    },
  };

  storeManager.initialize();

  return storeManager;
}
