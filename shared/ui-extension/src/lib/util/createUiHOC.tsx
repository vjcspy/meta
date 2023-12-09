import React from 'react';

// const getPropsName = (displayName: string) => {
//   const regexPropsName = new RegExp(/^(With)(.*)(Props)$/);
//   if (regexPropsName.exec(displayName)?.length === 4) {
//     return true;
//   } else {
//     const regexWithoutPropsName = new RegExp(/^(with)(.*)/);
//     const withoutPropsName = regexWithoutPropsName.exec(displayName);
//     if (withoutPropsName && withoutPropsName.length === 3) {
//       return 'With' + withoutPropsName[2] + 'Props';
//     }
//   }
//
//   return false;
// };
//
// export const createUiHOC = (
//   hookFn: (props: any) => { [key: string]: any },
//   displayName: string | string[]
// ): UiHOC => {
//   /*
//    * props1 được Extension truyền vào
//    * */
//   const hoc = (
//     Component: ComponentType<any>,
//     props1: any
//   ): ComponentType<any> => {
//     const UiHOC: React.FC = React.memo((props2) => {
//       const hookData = hookFn({ ...props1, ...props2 });
//       return <Component {...hookData} {..._.merge(hookData, props2)} />;
//     });
//
//     const oriDisplayName =
//       Component.displayName || Component.name || 'Component';
//     UiHOC.displayName = `${displayName}(${oriDisplayName})`;
//
//     return UiHOC;
//   };
//   if (_.isString(displayName)) {
//     HOCManager.getInstance().addHOC(displayName, hoc);
//     const propsDisplayName = getPropsName(displayName);
//     if (typeof propsDisplayName === 'string') {
//       HOCManager.getInstance().addHOC(propsDisplayName, hoc);
//     }
//   } else if (_.isArray(displayName)) {
//     _.forEach(displayName, (name: string) => {
//       HOCManager.getInstance().addHOC(name, hoc);
//       const propsDisplayName = getPropsName(name);
//       if (typeof propsDisplayName === 'string') {
//         HOCManager.getInstance().addHOC(propsDisplayName, hoc);
//       }
//     });
//   }
//
//   return hoc;
// };

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

export function createUiHOC<TProps, TInjectedKeys extends keyof TProps>(
  hookFn: (props: any) => Pick<TProps, TInjectedKeys>,
  displayName: string,
) {
  return function hoc(Component: React.ComponentType<TProps>) {
    const UiHOC = (props1: Omit<TProps, TInjectedKeys>) => {
      const hookData = hookFn({ ...props1 });

      return (
        <Component
          {...({
            ...props1,
            state: {
              // @ts-ignore
              ...props1?.state,
              // @ts-ignore
              ...hookData?.state,
            },
            actions: {
              // @ts-ignore
              ...props1?.actions,
              // @ts-ignore
              ...hookData?.actions,
            },
          } as any)}
        />
      );
    };

    const oriDisplayName = Component.displayName || Component.name || '';
    UiHOC.displayName = `${displayName}(${oriDisplayName})`;

    return UiHOC;
  };
}

type HOCType<TProps, TInjectedKeys extends keyof TProps> = (
  Component: React.ComponentType<any>,
) => React.ComponentType<Omit<TProps, TInjectedKeys>>;

type PropsType<HOCFns> = HOCFns extends HOCType<infer P, never>[] ? P : never;

export function combineHOC<Fns extends HOCType<any, any>[]>(
  ...objs: [...Fns]
): (
  component: React.ComponentType<
    UnionToIntersection<PropsType<Fns>> &
      Record<Exclude<string, keyof UnionToIntersection<PropsType<Fns>>>, any>
  >,
) => any;

export function combineHOC(...objs: [...any]) {
  return (Component: React.ComponentType<any>) => {
    const _withHocs = objs.reduce((ComponentWithHoc, hoc) => {
      return hoc(ComponentWithHoc);
    }, Component);

    _withHocs.OriginComponent = Component;

    return _withHocs;
  };
}
//
// const hoc1 = createUiHOC(() => ({
//     a: 1
// }), 'hoc1');
// const hoc2 = createUiHOC(() => ({b: "2", c: false}), 'hoc2');
//
// combineHOC(hoc1, hoc2)(props => {
//     return <>{props?.a}{props?.product}</>
// })
