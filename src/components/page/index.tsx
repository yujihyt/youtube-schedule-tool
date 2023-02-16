import { Helmet } from "react-helmet-async";

import { PageHeader } from '@ant-design/pro-layout';
import clsx from "clsx";
import Conditional from "conditional-wrap";

import { Container } from "../container";
import classes from "./style.module.less";

interface PageProps extends React.ComponentProps<typeof PageHeader> {
  helmet?: React.ReactNode;
  helmetProps?: React.ComponentProps<typeof Helmet>;
  contained?: boolean;
  children: React.ReactNode;
}

export function Page({ children, contained = false, footer, helmet, helmetProps, ...rest }: PageProps) {
  return (
    <>
      {(helmetProps || helmet) && <Helmet {...helmetProps}>{helmet}</Helmet>}
      <Conditional condition={contained} wrap={(el) => <Container>{el}</Container>}>
        <>
          <PageHeader footer={footer} className={clsx(classes.header, contained && classes.contained)} {...rest} />
          <div className={classes.page}>{children}</div>
        </>
      </Conditional>
    </>
  );
}