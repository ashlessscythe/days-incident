# Days Without Incidents

![](./image.png)

Tracker days since last safety incident.

Safety cross will fill in as days progress.

### Configuration and Overrides

Set `daysAgoOverride` and `todaysDateOverride` in `./ui/mocks/data.json` to test different scenarios. Example:

```json
{
  "latest": {
    "detail": "Osha recordable incident, no loss time",
    "lastIncidentDate": "2024-05-01T13:00",
    "daysAgoOverride": "30",
    "todaysDateOverride": "2024-06-01T00:00",
    "status": "resolved"
  }
}

```
