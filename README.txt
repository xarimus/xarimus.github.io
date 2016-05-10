Known issues:
Currently none :-)

Low-priority issues and enhancement ideas:
1. On mobile, the mousover/hover effect is persistent after clicking one of the nav-pill buttons.
2. formspree requires a subject, should be optional, need to find a way to supply default subject "none" (or similar) if none is given. In the meantime subject has been made a required field.

Fixed:
Actual mobile view not displaying correctly, appears to be based on "actual" pixels rather than device-width (zoomed out look)
--added <meta name="viewport" content="width=device-width, initial-scale=1"> to <head> to force mobile viewport
