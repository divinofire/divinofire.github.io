# divinofire.github.io

Personal website of **Divine Enow**, served by GitHub Pages at <https://divinofire.github.io>.

Plain HTML, CSS and JavaScript, plus Markdown posts. GitHub Pages builds the site with Jekyll on its
own servers, so there is nothing to install: edit, commit, push, and the change is live within a minute or two.

## Writing a post

1. Copy the folder `posts/_new-post-template/` and rename the copy, e.g. `posts/my-new-post/`
   (lowercase words joined by hyphens). That name becomes the link: `enowdivine.com/posts/my-new-post/`.
2. Put the post's pictures in that folder, including `cover.jpg`.
3. Edit `index.md`: fill in the title, date, description, cover and tags at the top, then write the post in Markdown.
4. Commit and push. The post appears on `/posts/`, in the "Latest writing" strip on the homepage and in the RSS feed.

YouTube videos go in with `{% include youtube.html id="VIDEO_ID" title="..." %}`.
If the site stops updating after a push, the post's top section (between the `---` lines) usually has a typo;
GitHub shows the error under the repository's Actions tab.

## Folder map

```
index.html                  ← the homepage text
_config.yml                 ← site name, address and Jekyll settings
_layouts/default.html       ← shared page frame: <head>, link previews, footer
_layouts/post.html          ← how a single post page looks
_includes/                  ← header menu, post card, share button, YouTube player
posts/index.html            ← the "all posts" page (lists posts automatically)
posts/<post-name>/index.md  ← one folder per post, with its pictures
feed.xml                    ← RSS feed of the posts
404.html                    ← "page not found" page
assets/
  css/style.css             ← colours, fonts, layout
  css/posts.css             ← styles for posts
  js/site-config.js         ← YOUR SETTINGS: email, LinkedIn, GitHub, CV path
  js/main.js                ← menu, animations, hides missing links/images
  js/posts.js               ← share buttons, tag filter, YouTube player
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
