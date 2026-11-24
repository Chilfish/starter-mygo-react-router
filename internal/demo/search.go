package demo

import (
	"context"
	"strings"
	"time"
)

// topics are the sample entries Searcher searches.
var topics = []string{
	"Bind a Go service",
	"Emit a typed event",
	"Stream values with a channel",
	"Cancel a call with AbortSignal",
	"Keep app state across mygo dev restarts",
	"Run the app on a phone",
	"Read and write the clipboard",
	"Open a URL in the browser",
}

// Searcher answers slowly, so a page can cancel the calls it no longer needs.
type Searcher struct{}

// Search returns the topics that contain query, after a short delay. The
// call stops early when the page aborts it, as typing another query does.
func (Searcher) Search(ctx context.Context, query string) ([]string, error) {
	select {
	case <-time.After(500 * time.Millisecond):
	case <-ctx.Done():
		return nil, ctx.Err()
	}

	query = strings.ToLower(strings.TrimSpace(query))
	matches := make([]string, 0, len(topics))
	for _, topic := range topics {
		if strings.Contains(strings.ToLower(topic), query) {
			matches = append(matches, topic)
		}
	}
	return matches, nil
}
