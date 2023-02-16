import classes from "./style.module.less";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ children, ...rest }: ContainerProps) {
  return (
    <div className={classes.container} {...rest}>
      {children}
    </div>
  );
}
