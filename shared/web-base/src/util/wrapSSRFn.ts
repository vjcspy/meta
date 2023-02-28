const forceDisableSSr = process.env.NEXT_PUBLIC_FORCE_DISABLE_SSR;

export const wrapSSRFn = (
  Page: any,
  WrapperPage: any,
  getInitialPropsFn: ((c: any) => Promise<any>) | undefined = undefined,
  getServerSidePropsFn: any | undefined = undefined,
  ssr = false,
  force = false
) => {
  if (forceDisableSSr === 'true') {
    return WrapperPage;
  }

  /*
   * Ở đấy sử dụng điều kiện ssr là hoặc sẽ làm cho những component không sử dụng
   * bất cứ request sever side fetching data bị force sang kiểu SSR.
   * Tuy nhiên đó là bắt buộc vì apollo cần phải  check tất cả component
   * Vì thế config ssr sẽ hiểu là: PAGE ĐƯỢC RENDER THEO KIỂU SSR HAY LÀ CSR.
   *
   * Để improve performance Tất cả các page kiểu SSR đều sẽ được cache bằng vanish
   * */
  if (ssr || force) {
    WrapperPage.getInitialProps = async (ctx: any) => {
      let ssp = {},
        fnP = {};

      // When redirecting, the response is finished.
      // No point in continuing to render
      if (ctx.res && ctx.res.writableEnded) {
        console.warn(
          'When redirecting, the response is finished will not do getInitialPropsFn'
        );
        return ssp;
      }

      if (getInitialPropsFn) {
        // Như thế này mới đúng thứ tự
        fnP = await getInitialPropsFn(ctx);
      }

      // chú ý thứ tự lấy data :)) Như thế này đang là driver ở ngoài cùng sẽ lấy trước
      // @ts-ignore
      if (Page.getInitialProps) {
        // @ts-ignore
        ssp = await Page.getInitialProps(ctx);
      }

      return Object.assign({}, ssp, fnP);
    };
  }

  if (getServerSidePropsFn) {
    console.warn('Not yet support `getServerSideProps`');
  }

  // if (
  //   typeof Page.getServerSideProps === 'function' ||
  //   (ssr && getServerSidePropsFn) ||
  //   force === 'SS' ||
  //   force === 'BOTH'
  // ) {
  //   WrapperPage.getServerSideProps = async (ctx: any) => {
  //     let ssp = {},
  //       fnP = {};
  //     // @ts-ignore
  //     if (PageComponent.getServerSideProps) {
  //       // @ts-ignore
  //       ssp = await Page.getServerSideProps(ctx);
  //     }
  //
  //     if (getServerSidePropsFn) {
  //       fnP = await getServerSidePropsFn(ctx);
  //     }
  //
  //     return {
  //       ...ssp,
  //       ...fnP,
  //     };
  //   };
  // }

  return WrapperPage;
};
