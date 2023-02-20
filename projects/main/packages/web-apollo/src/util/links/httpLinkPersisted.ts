/* tslint:disable */
import { DefinitionNode } from 'graphql';
import {
  ApolloLink,
  createSignalIfSupported,
  fallbackHttpConfig,
  fromError,
  HttpOptions,
  Observable,
  parseAndCheckHttpResponse,
  selectHttpOptionsAndBody,
  selectURI,
  serializeFetchParameter,
  UriFunction as _UriFunction,
} from '@apollo/client';

// For backwards compatibility.
// export import FetchOptions = HttpLinkPersisted.Options;
// export import UriFunction = HttpLinkPersisted.UriFunction;

export namespace HttpLinkPersisted {
  //TODO Would much rather be able to export directly
  export type UriFunction = _UriFunction;

  export interface Options extends HttpOptions {
    fetch: any;
  }
}

let registerCount: any = {};
setTimeout(() => {
  registerCount = {};
}, 60000);

const hashString = (str: string) => {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const createHttpLink = (
  linkOptions: HttpLinkPersisted.Options = { fetch }
) => {
  const {
    uri = '/graphql',
    // use default global fetch if nothing passed in
    fetch: fetcher,
    includeExtensions,
    ...requestOptions
  } = linkOptions;

  // dev warnings to ensure fetch is present
  //   checkFetcher(fetcher);

  const linkConfig = {
    http: { includeExtensions },
    options: requestOptions.fetchOptions,
    credentials: requestOptions.credentials,
    headers: requestOptions.headers,
  };

  return new ApolloLink((operation) => {
    let chosenURI = selectURI(operation, uri);

    const context = operation.getContext();

    // `apollographql-client-*` headers are automatically set if a
    // `clientAwareness` object is found in the context. These headers are
    // set first, followed by the rest of the headers pulled from
    // `context.headers`. If desired, `apollographql-client-*` headers set by
    // the `clientAwareness` object can be overridden by
    // `apollographql-client-*` headers set in `context.headers`.
    const clientAwarenessHeaders: any = {};
    if (context.clientAwareness) {
      const { name, version } = context.clientAwareness;
      if (name) {
        clientAwarenessHeaders['apollographql-client-name'] = name;
      }
      if (version) {
        clientAwarenessHeaders['apollographql-client-version'] = version;
      }
    }

    const contextHeaders = { ...clientAwarenessHeaders, ...context.headers };

    const contextConfig = {
      http: context.http,
      options: context.fetchOptions,
      credentials: context.credentials,
      headers: contextHeaders,
    };

    //uses fallback, link, and then context to build options
    const { options, body } = selectHttpOptionsAndBody(
      operation,
      fallbackHttpConfig,
      linkConfig,
      contextConfig
    );

    let controller: any;
    if (!(options as any).signal) {
      const { controller: _controller, signal } = createSignalIfSupported();
      controller = _controller;
      if (controller) (options as any).signal = signal;
    }

    // If requested, set method to GET if there are no mutations.
    const definitionIsMutation = (d: DefinitionNode) => {
      return d.kind === 'OperationDefinition' && d.operation === 'mutation';
    };

    if (!operation.query.definitions.some(definitionIsMutation as any)) {
      options.method = 'GET';
    }
    if (options.method === 'GET') {
      const { newURI } = rewriteURIForGET(
        chosenURI,
        body as any,
        hashString(operation.operationName)
      );
      chosenURI = newURI;
    } else {
      try {
        (options as any).body = serializeFetchParameter(body, 'Payload');
      } catch (parseError) {
        return fromError(parseError);
      }
    }

    return new Observable((observer) => {
      fetchQuery(fetcher, observer, chosenURI, body, operation, options);

      return () => {
        // XXX support canceling this request
        // https://developers.google.com/web/updates/2017/09/abortable-fetch
        if (controller) controller.abort();
      };
    });
  });
};

// For GET operations, returns the given URI rewritten with parameters, or a
// parse error.
function rewriteURIForGET(chosenURI: string, body: Body, hash: number) {
  // Implement the standard HTTP GET serialization, plus 'extensions'. Note
  // the extra level of JSON serialization!
  const queryParams: any[] = [];
  const addQueryParam = (key: string, value: any) => {
    // if (typeof value === 'object') {
    //   value = JSON.stringify(value);
    //   value = value.replaceAll('"', '');
    //   value = value.replaceAll("'", '');
    // }
    // queryParams.push(`${key}=${value}`);
    queryParams.push(`${key}=${encodeURIComponent(JSON.stringify(value))}`);
  };

  addQueryParam('hash', `${hash}`);
  // @ts-ignore
  const variables: any = body?.variables;
  if (variables) {
    for (const variablesKey in variables) {
      addQueryParam(variablesKey, variables[variablesKey]);
    }
  }
  const queryParamsPrefix = chosenURI.indexOf('?') === -1 ? '?' : '&';
  const newURI = chosenURI + queryParamsPrefix + queryParams.join('&');
  return { newURI };
}

function fetchQuery(
  fetcher: any,
  observer: any,
  chosenURI: any,
  body: any,
  operation: any,
  options: any
) {
  const _start = performance.now();
  fetcher(chosenURI, options)
    .then((response: any) => {
      operation.setContext({ response });
      console.info(
        'operator response',
        operation.operationName,
        'chosenURI',
        chosenURI,
        'variable',
        body.variables,
        'status',
        response.status,
        '+time',
        Math.round(performance.now() - _start)
        // 'result',
        // result
      );
      return response;
    })
    .then(parseAndCheckHttpResponse(operation))
    .then((result: any) => {
      // we have data and can send it to back up the link chain
      observer.next(result);
      observer.complete();
      return result;
    })
    .catch((err: any) => {
      if (
        err?.result?.code == '410' &&
        err?.result?.message == 'Query hash is unknown' &&
        !(
          !isNaN(registerCount[operation.operationName]) &&
          registerCount[operation.operationName] > 1
        )
      ) {
        console.info('query not registered', chosenURI, err.result);
        return fetchPersistentQuery(
          fetcher,
          observer,
          chosenURI,
          body,
          operation,
          options
        );
      }

      // fetch was cancelled, so it's already been cleaned up in to unsubscribe
      if (err.name === 'AbortError') {
        return;
      }

      // if it is a network error, BUT there is graphql result info
      // fire the next observer before calling error
      // this gives apollo-client (and react-apollo) the `graphqlErrors` and `networErrors`
      // to pass to UI
      // this should only happen if we *also* have data as part of the response key per
      // the spec
      if (err.result && err.result.errors && err.result.data) {
        // if we don't call next, the UI can only show networkError because AC didn't
        // get any graphqlErrors
        // this is graphql execution result info (i.e. errors and possibly data)
        // this is because there is no formal spec how errors should translate to
        // http status codes. So an auth error (401) could have both data
        // from a public field, errors from a private field, and a status of 401
        // {
        //  user { // this will have errors
        //    firstName
        //  }
        //  products { // this is public so will have data
        //    cost
        //  }
        // }
        //
        // the result of above *could* look like this:
        // {
        //   data: { products: [{ cost: "$10" }] },
        //   errors: [{
        //      message: 'your session has timed out',
        //      path: []
        //   }]
        // }
        // status code of above would be a 401
        // in the UI you want to show data where you can, errors as data where you can
        // and use correct http status codes
        observer.next(err.result);
      }
      observer.error(err);
    });
}

function fetchPersistentQuery(
  fetcher: any,
  observer: any,
  chosenURI: any,
  body: any,
  operation: any,
  options: any
) {
  registerCount[operation.operationName] = isNaN(
    registerCount[operation.operationName]
  )
    ? 1
    : registerCount[operation.operationName] + 1;
  fetch(chosenURI, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: body.query }),
  })
    .then((response) => {
      if (response.status === 201) {
        console.log(`registered ${operation.operationName}, re-fetch query`);
        fetchQuery(fetcher, observer, chosenURI, body, operation, options);
      }
    })
    .catch((err: any) => {
      console.log('register query error', err);
      if (err.result && err.result.errors && err.result.data) {
        observer.next(err.result);
      }
      observer.error(err);
    });
}

export class HttpLinkPersisted extends ApolloLink {
  constructor(opts?: HttpLinkPersisted.Options) {
    super(createHttpLink(opts).request);
  }
}
