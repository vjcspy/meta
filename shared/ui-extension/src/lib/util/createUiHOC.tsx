import React, { useMemo } from "react";
import { deepMerge } from "./deepMerge";


type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
        k: infer I
    ) => void
    ? I
    : never;

type BrandedHOC<TInjected> = {
  <TExtraProps>(Component: React.ComponentType<TInjected & TExtraProps>): React.ComponentType<TExtraProps>;
  __injectedProps?: TInjected; // Brand metadata
};

export function createHOC<TInjected>(
    hookFn: (props: any) => TInjected,
    displayName?: string
): BrandedHOC<TInjected> {
  return ((Component: React.ComponentType<any>) => {
    const UiHOC = (props1: any) => {
      const hookData = hookFn(props1);

      const newProps = useMemo(
          () => deepMerge(props1, hookData),
          [hookData, props1] );
      return <Component {...newProps} />;
    };
    const oriDisplayName = Component.displayName || Component.name || '';
    UiHOC.displayName = `${displayName}(${oriDisplayName})`;

    return UiHOC;
  }) as BrandedHOC<TInjected>;
}

type ExtractInjected<T> = T extends BrandedHOC<infer I> ? I : unknown;

type ExtractAllInjected<HOCs extends readonly any[]> =
    HOCs extends readonly [infer First, ...infer Rest]
        ? ExtractInjected<First> | (Rest extends readonly any[] ? ExtractAllInjected<Rest> : never)
        : never;

export type CombinedProps<HOCs extends readonly any[]> =
    UnionToIntersection<ExtractAllInjected<HOCs>>;

export function combineHOC<HOCs extends readonly BrandedHOC<any>[]>(
    ...hocs: [...HOCs]
) {
  return <TExtraProps = {}>(
      Component: React.ComponentType<CombinedProps<HOCs> & TExtraProps>
  ): React.ComponentType<TExtraProps> => {
    const _withHocs = [...hocs].reverse().reduce((ComponentWithHoc, hoc) => {
      return hoc(ComponentWithHoc);
    }, Component as any);

    _withHocs.OriginComponent = Component;

    return _withHocs;
  };}


// const hoc1 = createHOC(() => ({
//     a: 1
// }), 'hoc1');
//
//
// const hoc2 = createHOC(() => ({b: "2", c: false}), 'hoc2');

// const TestComponent = (props: CombinedProps<[typeof hoc1, typeof hoc2]>) => {
//   return <>{props.a}{props.b}</>;
// };

// combineHOC(hoc1, hoc2)((props => {
//   return <>{props?.a}{props.b}</>
// }))

// combineHOC(hoc1, hoc2)
