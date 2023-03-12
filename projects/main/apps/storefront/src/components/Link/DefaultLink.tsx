import Link from 'next/link';

export default function DefaultLink(props: { hrefData: any; children: any }) {
  return (
    <>
      <Link href={props.hrefData}>{props?.children}</Link>
    </>
  );
}
