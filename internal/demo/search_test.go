package demo

import (
	"context"
	"errors"
	"testing"
)

func TestSearch_returnsMatchingTopics(t *testing.T) {
	got, err := Searcher{}.Search(context.Background(), "channel")
	if err != nil {
		t.Fatalf("Search: %v", err)
	}
	if len(got) != 1 || got[0] != "Stream values with a channel" {
		t.Fatalf("Search(channel) = %q, want the channel topic", got)
	}
}

func TestSearch_canceledContextStopsTheCall(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	cancel()

	_, err := Searcher{}.Search(ctx, "channel")
	if !errors.Is(err, context.Canceled) {
		t.Fatalf("Search err = %v, want context.Canceled", err)
	}
}
