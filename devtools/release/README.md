# flow

1. download files from $PKG_DOWNLOAD_US_HOST
2. process the files
3. upload post-processed files to both $PKG_DOWNLOAD_US_HOST and $PKG_DOWNLOAD_CN_HOST(Tencent COS)
4. Done

# scripts

1. download-and-verify.sh
2. [CODE SIGNING]
3. upload-to-cos.sh

# what did you do to these files?

well, we just code signing the files locally, nothing else. The code signing services we use is mandatory to be running on local ONLY, so sad.

# where to download cos-cli?

Mac：wget https://cosbrowser.cloud.tencent.com/software/coscli/coscli-mac
Mac-m1：wget https://cosbrowser.cloud.tencent.com/software/coscli/coscli-mac-m1
Linux：wget https://cosbrowser.cloud.tencent.com/software/coscli/coscli-linux
Windows(git-bash): https://cosbrowser.cloud.tencent.com/software/coscli/coscli-windows.exe

Chinese: https://cloud.tencent.com/document/product/436/63144

# download to where?

just current working directory: devtools/release
