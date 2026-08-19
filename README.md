# query-params-kit

Framework-agnostic utilities for reading URL query parameters.

Works in Node.js and the browser. Ships ESM and CommonJS, with TypeScript types included. No runtime dependencies.

## Getting started

```bash
npm install query-params-kit
```

```ts
import { getAllQueryParams } from "query-params-kit";

const params = getAllQueryParams("?name=Ashish&role=developer");
// { name: "Ashish", role: "developer" }
```

## Usage

Duplicate keys are collected into arrays:

```ts
getAllQueryParams("?userId=123&userId=456&userId=789");
// { userId: ["123", "456", "789"] }
```

You can pass a query string (with or without `?`) or `URLSearchParams`:

```ts
getAllQueryParams("name=Ashish&role=developer");

getAllQueryParams(new URLSearchParams("userId=123&status=active"));
// { userId: "123", status: "active" }

getAllQueryParams("?name=Ashish%20Kumar&city=New%20Delhi");
// { name: "Ashish Kumar", city: "New Delhi" }
```

## API

### `getAllQueryParams(input)`

Parses a query string or `URLSearchParams` into a plain object.

| Argument | Type | Description |
| --- | --- | --- |
| `input` | `string \| URLSearchParams` | Query string (`"?a=1"` or `"a=1"`) or a `URLSearchParams` instance |

**Returns:** `QueryParams` — `Record<string, string | string[]>`

- Unique keys are strings
- Duplicate keys become arrays, in the order they appear
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
