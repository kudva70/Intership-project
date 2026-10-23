
## Troubleshooting Knowledge Base

SignalDesk AI retrieves relevant troubleshooting guides using
TF-IDF vectorization and cosine similarity.

Each guide provides:
- Common symptoms
- Diagnostic checks
- A suggested next step
- A recommended support team
- A risk label

## Human Approval and Safety

The application proposes recommendations but does not execute
operational actions automatically. Human review is required
before any action is taken.

## Current Limitations

- The knowledge base contains sample records.
- Similarity does not establish the root cause.
- Team assignments and risk labels are preliminary suggestions.
- The system does not execute repairs or modify production systems.
