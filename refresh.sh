#!/bin/bash 

CURRENT_WID=$(xdotool getwindowfocus)
WID=$(xdotool search --name "feh")
xdotool windowactivate "$WID"
xdotool key r
xdotool windowactivate $CURRENT_WID




