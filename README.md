# query-params-kit

Framework-agnostic utilities for reading URL query parameters.

Works in Node.js and the browser. Ships ESM and CommonJS, with TypeScript types included. No runtime dependencies.

## Install

```bash
npm install query-params-kit
```

## Usage

```ts
import { getAllQueryParams } from "query-params-kit";

getAllQueryParams("?name=Ashish&role=developer");
// { name: "Ashish", role: "developer" }

getAllQueryParams("?userId=123&userId=456&userId=789");
// { userId: ["123", "456", "789"] }

getAllQueryParams(new URLSearchParams("userId=123&status=active"));
// { userId: "123", status: "active" }

getAllQueryParams("?name=Ashish%20Kumar&city=New%20Delhi");
// { name: "Ashish Kumar", city: "New Delhi" }
```

A leading `?` is optional:

```ts
getAllQueryParams("name=Ashish&role=developer");
```

## API

### `getAllQueryParams(input)`

Parses a query string or `URLSearchParams` into a plain object.

| Argument | Type | Description |
| --- | --- | --- |
| `input` | `string \| URLSearchParams` | Query string (`"?a=1"` or `"a=1"`) or a `URLSearchParams` instance |

**Returns:** `QueryParams` — `Record<string, string | string[]>`

Behavior:

- Unique keys are returned as strings
- Duplicate keys are returned as arrays, in the order they appear
- Percent-encoded values are decoded
- Empty values are kept as `""`
- An empty input returns `{}`

```ts
getAllQueryParams("?name=&status=active");
// { name: "", status: "active" }

getAllQueryParams("");
// {}
```

## Types

```ts
type QueryParamValue = string | string[];
type QueryParams = Record<string, QueryParamValue>;
```

## License

MIT
