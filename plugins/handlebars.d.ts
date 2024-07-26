declare module "*.hbs" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _: (props: Record<string, any>) => string;
  export default _;
}
