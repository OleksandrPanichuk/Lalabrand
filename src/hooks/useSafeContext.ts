import { type Context, useContext } from 'react';

type ErrorSettings = {
  parentComponent: string;
  component: string;
};

export const useSafeContext = <T>(
  context: Context<T>,
  errSettings?: ErrorSettings,
) => {
  const ctx = useContext(context);

  if (ctx !== null) {
    return ctx;
  }

  let err: Error;
  if (errSettings) {
    const { component, parentComponent } = errSettings;
    err = new Error(
      `<${component} /> is missing a parent <${parentComponent} /> component.`,
    );
  } else {
    err = new Error(
      `Component is missing a proper parent component with context provider.`,
    );
  }

  if (Error.captureStackTrace) Error.captureStackTrace(err, useSafeContext);
  throw err;
};
