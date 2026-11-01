## Summary

<!-- What changed and why. -->

## Verification

- [ ] `bun run typecheck`
- [ ] `bun run lint`
- [ ] `bun run test`
- [ ] `bun run build`
- [ ] `go build ./... && go vet ./...`

## Checklist

- [ ] Tests can fail: breaking the behavior on purpose turns them red
- [ ] No hardcoded colors or `any`
- [ ] Navigation uses React Router APIs
- [ ] Data paths cover loading / empty / error
- [ ] Paths, commands, and docs still match the code
