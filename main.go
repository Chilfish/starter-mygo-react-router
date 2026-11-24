package main

import (
	"log"
	"time"

	"github.com/egoist/mygo"

	"starter-mygo-react-router/internal/demo"
)

func main() {
	mygo.Bind(demo.Greeter{})
	mygo.Bind(demo.System{})
	mygo.Bind(demo.Searcher{})

	mygo.App.WhenReady(func() {
		win := mygo.NewWindow(mygo.WindowOptions{
			Title:           "Starter MyGo React Router",
			Width:           960,
			Height:          640,
			MinWidth:        480,
			MinHeight:       360,
			BackgroundColor: "light-dark(#f6f7f9, #0f1115)", // the page's background token in app/app.css
			// Opens where the user left it last time.
			StateKey: "main",
			// The frontend: devUrl during `mygo dev`, frontendDist
			// embedded by `mygo build` otherwise (see mygo.config.ts).
			URL: "/",
		})
		go func() {
			for t := range time.Tick(time.Second) {
				if demo.Tick.Emit(win, t) != nil {
					return // the window was closed
				}
			}
		}()
	})
	if err := mygo.App.Run(); err != nil {
		log.Fatal(err)
	}
}
