import { waitFor } from '../waitFor';
import { throwTestError } from '../error';
import { WaitOptions } from '../types';

/**
 * Waits for collection length to be not less than defined number.
 * If it is after timeout - throws exception.
 * @param collection Async function that returns array
 * @param minLength Expected collection minimum length
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export function waitForCollectionLengthToBeNotLessThan(
  collection: () => Promise<any[]>,
  minLength: number,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => collection().then((col) => col.length >= minLength),
    waitOptions,
  ).catch(async () =>
    throwTestError(
      `Expected collection length is not less than: ${minLength}, but was: ${await collection().then(
        (c) => c.length,
      )}`,
      collection,
    ),
  );
}
