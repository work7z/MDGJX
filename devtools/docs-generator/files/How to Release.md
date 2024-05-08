# Steps (Updated on 2024/4/3)

## 1. run the release pkg

1. check the version field in file `/modules/meta/release.json`
2. **ENSURE** that you **HAVE NOT** modified the ongoing version(meaning the available version)
3. **WRITE DOWN** release notes with your new version in `/devtools/docs-generator/files/CHANGELOG.md` (do follow the format, otherwise u will get error in next step)
4. Execute the command `cd $LAFTOOLS_ROOT && npm run fe-release-docs-full`
5. Push latest generated files to Git repo.

## 2. build and upload the pre-release binary to US machine

1. Trigger 'Manual Build and Upload to US for Pre-Release' on the page [https://github.com/work7z/LafTools/actions/workflows/M-pre-release-build-pkg-to-US.yml](https://github.com/work7z/LafTools/actions/workflows/M-pre-release-build-pkg-to-US.yml)

2. Check if the exit code is ZERO(end normally)

3. Sign in US machine, download these pkg in particular folder (e.g. /home/appuser/PkgRelease-dist/v2.1.30)

4. Download these files, and code signing these binary if possible

5. Uploaded these handled binary to both US machinese and CN COS

## 3. If everything is ok, then we push release.json to server2

TODO: will do it later, shall provide 1) manual job 2) steps 3) Go Live 4) LV check

1. Switch to the folder `/devtools/release`, which is a TS project for handling COS files

# Note

why you put installation files to COS for CN rather than just putting them in server? coz the bandwidth in China is too expensive... I dont' have enough money la.
