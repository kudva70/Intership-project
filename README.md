
## Incident Classification and Priority

SignalDesk AI currently uses rule-based keyword matching to
classify incidents and estimate their priority.

### Categories
- Security
- Database
- Network
- Application / Backend
- Performance
- General

### Priority levels
- High
- Medium
- Low

### Explainability
The API returns a reason for both the selected category and
priority, helping users understand the result.

### Current limitations
- Keyword rules can misclassify ambiguous reports.
- Priority is an estimate, not a guaranteed severity assessment.
- The classifier is rule-based; it is not a trained ML model.
- Human review is required before taking operational action.

### API endpoint
POST `/incidents/analyze`

Accepts an incident title and description and returns the
incident details, category, priority, and explanations.
