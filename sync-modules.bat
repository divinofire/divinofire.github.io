@echo off

:start

robocopy "project-links\snake-js" "projects\snake-js" *.* /XD ".git" /S
robocopy "project-links\hello-vue-todo" "projects\hello-vue-todo" *.* /XD ".git" /S

echo syncing finished!

:end
