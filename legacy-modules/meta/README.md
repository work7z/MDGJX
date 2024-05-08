# note

If there is any dependencies or break changes that need to be fully reinstalled, then will ask user please install the latset version instead of just internal release.

# current.json

if any dependency or project sturcutred is changed, please increase the version to notify user thtat this version need to be reinstalled rather than dynamic update

# release.json

to specific current version, the release.json will be used to ...

# where to run 

npm run fe-release-docs


# how to upload

run below commands

```bash
git tag rel-v20240403-1
git push origin rel-v20240403-1
```

every time you push it to remote, the GitHub will start working on this
