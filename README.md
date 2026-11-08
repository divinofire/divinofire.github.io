# divinofire.github.io

Personal website of **Divine Enow**, served by GitHub Pages at <https://divinofire.github.io>.

Plain HTML, CSS and JavaScript. There is no build step and nothing to install: edit, commit, push,
and GitHub publishes the change within a minute or two.

## Folder map

```
index.html                  ← the whole homepage (all text lives here)
404.html                    ← "page not found" page
.nojekyll                   ← tells GitHub to publish files as-is (keep this file)
assets/
  css/style.css             ← colours, fonts, layout
  js/site-config.js         ← YOUR SETTINGS: email, LinkedIn, GitHub, CV path
  js/main.js                ← menu, animations, hides missing links/images
  fonts/                    ← IBM Plex Sans + Mono (self-hosted)
  docs/                     ← put cv.pdf here
  images/
    profile/headshot.jpg    ← your portrait (filled in)
    social/og-image.jpg     ← link preview image (filled in)
    icons/                  ← browser tab and phone icons
    projects/<project>/cover.jpg     ← one cover per project card
    research/<paper>/figure.jpg      ← one figure per research entry
archive/                    ← older web projects (snake game, Vue todo)
```

## Adding your pictures

Every image folder contains a short README saying the exact file name and size it expects.
The short version:

| Where it shows            | Put the file here                                         |
|---------------------------|-----------------------------------------------------------|
| SimpliGrade card          | `assets/images/projects/simpligrade/cover.jpg`            |
| FreshKeep card            | `assets/images/projects/freshkeep/cover.jpg`              |
| 3-RRS platform card       | `assets/images/projects/3rrs-platform/cover.jpg`          |
| Hybrid ECMS card          | `assets/images/projects/f1-hybrid-ecms/cover.jpg`         |
| Turbofan RUL card         | `assets/images/projects/turbofan-rul/cover.jpg`           |
| VEX V5 card               | `assets/images/projects/vex-v5-robotics/cover.jpg`        |
| ILC paper                 | `assets/images/research/ilc-ball-plate/figure.jpg`        |
| Inverted pendulum paper   | `assets/images/research/inverted-pendulum/figure.jpg`     |

Project covers are landscape 16:10 (about 1200 x 750 px); research figures are 4:3 (about 1200 x 900 px).
Until a file exists, a neat placeholder with the project's initials is shown, so nothing looks broken.
File names are case-sensitive on GitHub: use `cover.jpg`, not `Cover.JPG`.

## Common edits

- **Add your LinkedIn:** open `assets/js/site-config.js` and paste your profile URL into `linkedin: ""`.
- **Add your CV:** upload `assets/docs/cv.pdf`. The download buttons appear automatically.
- **Add a date to an experience entry:** in `index.html`, find the entry and type the date inside
  `<span class="when"></span>`, for example `<span class="when">2024</span>`.
- **Add a new project:** copy one `<article class="project-card ...">` block in `index.html`,
  change the text, and create a matching folder in `assets/images/projects/`.

## Preview locally

Open `index.html` in a browser, or for an exact preview run `python -m http.server` in this folder
and visit <http://localhost:8000>. (The CV button only checks for the PDF when served over http.)
