# Hospital Hub - Backend

> Tech Stack: Node.js, Express, Zod, Axios (dor external service)

## Local Setup

```bash
yarn && yarn dev
```

## API Reference

- `/ping` - pong
- `/clinics` - clinics search

## Clinic

| Param                  |        Type        |
| :--------------------- | :----------------: |
| id                     |      `number`      |
| createdTime            | `string(datetime)` |
| fields                 |      `object`      |
| fields.Name            |      `string`      |
| fields[Service Tvpe]   |     `string[]`     |
| fields.lat             |      `number`      |
| fields.lng             |      `number`      |
| fields.Address         |      `string`      |
| fields.State           |      `string`      |
| fields[Street Address] |      `string`      |
| fields.Suburb          |      `string`      |
| fields.Postcode        |      `string`      |
| fields[Geocode Cache]  |      `string`      |

### ping

Used to check the availability of the server

```http
  GET /ping
```

Response:

```text
  pong
```

### Get clinics

Used to get clinics and search by service type or location

| Query Param |          Type          | Description             |
| :---------- | :--------------------: | :---------------------- |
| `service`   | `string` \| `string[]` | Service type(s)         |
| `location`  |        `string`        | Search query by Address |

```http
  GET /clinics?service=Massage&location=newtown
```

Response:

```ts
{
  "isSuccess": true,
  "clinics": Clinic[]
}
```

400 Response:

```json
{
  "isSuccess": false,
  "message": "Invalid query params"
}
```

500 Response:

```json
{
  "isSuccess": false,
  "message": "Server Error"
}
```
