const locale = new Intl.Locale("en-US");
new Date(0).toLocaleString(locale); // "12/31/1969, 7:00:00 PM"
Intl.PluralRules
new Intl.Collator(locale).compare("a", "b"); // -1
var s = "Hello, world!";
s.toLocaleLowerCase(locale); // "hello, world!"
new Intl.RelativeTimeFormat(locale).format(0, "second"); // "in 0 seconds"

// interesting things:
// 1. only errors if event in EMap is all lowercase.
// 2. bivariance hack is required
// 3. Lowercase<T> is required
type EMap = { event: {} }
type Keys = keyof EMap
type EPlusFallback<C> = C extends Keys
  ? EMap[C]
  : "unrecognised event";
type VirtualEvent<T extends string> = { bivarianceHack(event: EPlusFallback<Lowercase<T>>): any; }['bivarianceHack'];
type KeysPlusString = Keys | (string & Record<never, never>);
declare const _virtualOn: (eventQrl: VirtualEvent<Keys>) => void;
export const virtualOn = <T extends KeysPlusString>(eventQrl: VirtualEvent<T>) => {
  _virtualOn(eventQrl);
};