declare module 'time-ago' {
  export function ago(
    date: Date | string | number,
    omitSuffix?: boolean,
  ): string;
}
