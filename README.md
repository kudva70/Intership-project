## Similar Incident Retrieval

SignalDesk AI uses TF-IDF vectorization and cosine similarity
to retrieve up to three relevant incidents from a local sample
dataset.

Each result includes its incident ID, category, priority,
similarity score, and recorded resolution.

### Current limitations
- Results depend on the quality and size of the sample dataset.
- Similar wording does not guarantee the same root cause.
- Similarity scores are not confidence probabilities.
- Suggested resolutions require human review.