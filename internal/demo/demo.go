// Package demo contains the small Go services the starter's frontend calls to
// show how a React page talks to the host.
package demo

import (
	"runtime"
	"strings"
	"time"

	"github.com/egoist/mygo"
)

// Greeter is callable from the frontend: `mygo generate` turns its methods
// into typed TypeScript functions in app/mygo.ts.
type Greeter struct{}

// Greet returns a greeting for name.
func (Greeter) Greet(name string) string {
	name = strings.TrimSpace(name)
	if name == "" {
		name = "stranger"
	}
	return "Hello, " + name + "! This message comes from Go."
}

// SystemInfo describes the app and the machine it runs on.
type SystemInfo struct {
	Name      string `json:"name"`
	Version   string `json:"version"`
	OS        string `json:"os"`
	Arch      string `json:"arch"`
	GoVersion string `json:"goVersion"`
	Packaged  bool   `json:"packaged"`
	UserData  string `json:"userData"`
}

// System reports information about the running app and machine.
type System struct{}

// Info returns information about this app and the system it runs on.
func (System) Info() SystemInfo {
	userData, _ := mygo.App.Path(mygo.PathUserData)
	return SystemInfo{
		Name:      mygo.App.Name(),
		Version:   mygo.App.Version(),
		OS:        runtime.GOOS,
		Arch:      runtime.GOARCH,
		GoVersion: runtime.Version(),
		Packaged:  mygo.App.IsPackaged(),
		UserData:  userData,
	}
}

// Tick is sent to the page every second.
var Tick = mygo.NewEvent[time.Time]("tick")
