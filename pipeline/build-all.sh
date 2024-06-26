#!/bin/bash 
# this script is designated for building this whole project.  
# version will be retrieved from the file package.json
set -e

source ~/.zshrc

echo "[I] MDGJX_ROOT=$MDGJX_ROOT"

chmod +x $MDGJX_ROOT/pipeline/tools/get-web2-version.sh
crtVersion=`$MDGJX_ROOT/pipeline/tools/get-web2-version.sh`

if [ -z $crtVersion ]; then
    echo "[E] crtVersion is required."
    exit 1
fi
echo "[I] crtVersion: $crtVersion"

echo "[I] preparing for dev copy files"

echo "[I] LafTools is located at $MDGJX_ROOT"
cd $MDGJX_ROOT
echo "[I] PWD: $(pwd)"
distDir=$MDGJX_ROOT/dist

clean-bundle(){
    echo "[I] $(date) Working..."
    echo "[I] PWD: $(pwd)"
    echo "[I] Removing dist dir: $distDir"
    [ -d $distDir ] && rm -rf $distDir  

    # dist dir
    mkdir -p $distDir
    # pkg
    pkgDir=$distDir/pkg
    [ -d $pkgDir ] && rm -rf $pkgDir
    mkdir -p $pkgDir
    # docker
    dockerDir=$distDir/docker
    [ -d $dockerDir ] && rm -rf $dockerDir
    mkdir -p $dockerDir
}

build-bundle(){
    bundleMode=$1

    targetFile=./modules/web/src/meta/info.tsx
    if [ ! -f $targetFile ]; then
        echo "[E] $targetFile is not found."
        exit 1
    fi

    echo "
import { AppInfoClz } from \"./types\"


    export default {
    \"version\": \"$crtVersion\",
    \"releaseDate\": \"$(date +%Y-%m-%d)\",
    \"timestamp\": \"$(date +%s)\"
    } satisfies AppInfoClz
    " > $targetFile


    if [ -z jq ]; then
        echo "[E] jq is not installed, please install jq first."
        exit 1
    fi

    source ./pipeline/env.sh
    mode=$1

    # crossPlatformDir=$MDGJX_ROOT/cross-platform
    # if [ ! -d $crossPlatformDir ]; then
    #     echo "[I] downloading runtime nodejs"
    #     ./pipeline/fetch-runtime-nodejs.sh &> /dev/null
    # else 
    #     echo "[I] runtime nodejs already exists in $crossPlatformDir, skip downloading."
    # fi


    # building LafTools with dev commands
    build-cmd(){
        echo "[I] building cmd"

        echo "[I] built cmd"
    }

    build-core(){

        cd $MDGJX_ROOT

        platformName=$1
        platformArch=$2
        platformGoFile=$3
        platformExt=bin
        argGOOS=$4
        osPatchDir=$MDGJX_ROOT/os-patch/$platformName
        platformDistDir=$MDGJX_ROOT/dist/os/$platformName/
        echo "--------- CORE $platformName BEGIN ---------"
        echo "[I] building be core"
        osScriptFile=$argGOOS
        if [ $platformName == "windows-x64" ] || [ $platformName == "windows-arm64" ]; then
            platformExt=exe
        fi
        
        mkdir -p $platformDistDir
        if [ "$bundleMode" != "no-nodejs" ]; then
            mkdir -p $platformDistDir/bin
        else
            [ -d $platformDistDir/bin ] && rm -rf $platformDistDir/bin
        fi
        echo "[I] building [$platformName]"
        # GOOS=$argGOOS GOARCH=$platformArch go build -o $platformDistDir/core.$platformExt core/app.go 

        echo "[I] copying os-patch..."

        if [ -d $osPatchDir ];then 
            cp -a $osPatchDir/* $platformDistDir
        fi

        echo "[I] copying resources and web..."

        # cp -a ./dist/resources $platformDistDir
        cp -a ./dist/web/dist $platformDistDir/core

        mkdir -p $platformDistDir/info
        echo "$platformName" > $platformDistDir/info/platform.txt
        echo "$crtVersion" > $platformDistDir/info/version.txt
        echo "$(date +%Y-%m-%d)" > $platformDistDir/info/releaseDate.txt

        cp -a ./pipeline/parcel/scripts/$osScriptFile/* $platformDistDir

        preDIR=$(pwd)
        echo "[I] copying bootstrap and scripts..."
        cd $MDGJX_ROOT/modules/bootstrap
        npm i -S -D --force
        if [ $? -ne 0 ]; then
            echo "[E] bootstrap install failed."
            exit 1
        fi
        npm run build
        if [ $? -ne 0 ]; then
            echo "[E] bootstrap build failed."
            exit 1
        fi
        mkdir -p $platformDistDir/boot
        cp -a $MDGJX_ROOT/modules/bootstrap/dist/* $platformDistDir/boot/
        if [ -d temp ];then 
            rm -rf temp
        fi
        mkdir temp
        cd temp
        cp ../package.json .
        npm install --omit=dev --force 
        if [ $? -ne 0 ]; then
            echo "[E] bootstrap install failed."
            exit 1
        fi
        cp -a ./node_modules $platformDistDir/boot/
        cd $preDIR

        echo "[I] built"
    }

    build-res(){
        cp -a ./resources/ ./dist/resources
        uglifyAllJSONInDir "./dist/resources"   
    }

    build-fe(){
        echo "[I] building fe"
        chmod +x $MDGJX_ROOT/pipeline/build-fe.sh
        $MDGJX_ROOT/pipeline/build-fe.sh
        echo "[I] built fe"
    }

    build-be(){
        if [[ $mode = "linux" ]]; then
            build-core linux-x64 amd64 "core/app_unix.go" linux
            build-core linux-arm64 arm64 "core/app_unix.go" linux
        else
            build-core windows-x64 amd64 "core/app_windows.go" windows
            build-core windows-arm64 arm64 "core/app_windows.go" windows
            build-core linux-x64 amd64 "core/app_unix.go" linux
            build-core linux-arm64 arm64 "core/app_unix.go" linux
            build-core darwin-x64 amd64 "core/app_unix.go" darwin
            build-core darwin-arm64 arm64 "core/app_unix.go" darwin
        fi
    }

    build-extra(){
        echo "[I] building extra"
    }

    refining(){
        echo "[I] refining resources.."
        find ./pipeline -iname "*.bin" -exec chmod 755 {} \;
        find ./dist -iname "*.bin" -exec chmod 755 {} \;
        find ./dist -iname "*.sh" -exec chmod 755 {} \;
        find ./dist -iname "*.command" -exec chmod 755 {} \;
        find ./dist -iname "ph" -exec rm -f {} \;
    }

    package-for(){
        platformName=$1
        packageType=$2
        platformDistDir=$MDGJX_ROOT/dist/os/$platformName/
        if [ -z $packageType ]; then
            packageType=tar.gz
        fi
        echo "[I] packaging for $platformName"
        (
            cd $platformDistDir
            fileName=
            subDirName=MDGJX-${crtVersion}-$platformName-minimal
            osPkgDir=$MDGJX_ROOT/dist/os-pkg
            if [ ! -d $osPkgDir ]; then
                mkdir -p $osPkgDir
            fi
            subDir=$osPkgDir/$subDirName
            echo "subdirname: $subDirName"
            echo "subdir: $subDir"
            if [ -d $subDir ]; then
                rm -rf $subDir
            fi
            pkgDir=$MDGJX_ROOT/dist/pkg
            mkdir -p $subDir
            mkdir -p $subDir/info
            cp -a * $subDir
            cd $osPkgDir
            if [ $packageType == "zip" ]; then
                fileName=MDGJX-${crtVersion}-$platformName-minimal.zip
                zip -q -r $fileName ./$subDirName &> /dev/null
            else
                fileName=MDGJX-${crtVersion}-$platformName-minimal.tar.gz
                tar -zcf $fileName ./$subDirName &> /dev/null
            fi
            rm -rf $subDir
            mv $fileName $pkgDir
            # do verify 
            cd $pkgDir
            echo "[I] verifying $fileName"
            if [ $packageType == "zip" ]; then
                unzip -l $fileName &> /dev/null
            else
                tar -ztf $fileName &> /dev/null
            fi
            echo "[I] file size: $(du -sh $fileName | awk '{print $1}')"
        )
    }
    package-all(){
        echo "[I] packaging all platforms"
        if [[ "$ONLY_WIN_BINARY" = "true" ]]; then
            package-for windows-x64 zip
        elif [[ $mode = "linux" ]]; then
            package-for linux-x64
            package-for linux-arm64
        else
            package-for windows-x64 zip
            package-for windows-arm64 zip
            package-for linux-x64
            package-for linux-arm64
            package-for darwin-x64
            package-for darwin-arm64
        fi
        (
            cd $MDGJX_ROOT/dist/pkg
            echo "[I] calculating sha256 for $fileName"
            sha256sum * > ./SHA256SUM.txt
        )
        echo "[I] packaged all platforms"
    }

    dockerize-laftools(){
        platformName=$1
        echo "[I] dockerizing laftools for $platformName"
        subDockerDir=$dockerDir/$platformName
        mkdir -p $subDockerDir
        (
            cd $subDockerDir
            cp ../../pkg/*$platformName-minimal.tar.gz ./linux.tar.gz
            cp $MDGJX_ROOT/pipeline/parcel/docker/* ./
            rm -rf ./node-v20.12.0-$platformName
            curl https://cdn.npmmirror.com/binaries/node/v20.12.0/node-v20.12.0-$platformName.tar.gz -O
            tar -xzf node-v20.12.0-$platformName.tar.gz
            find . -iname "*.sh" -exec chmod 755 {} \;
            ls -ahlrt
            mv node-v20.12.0-$platformName node

            echo "[I] build docker image for $platformName"
            # docker rmi codegentoolbox/laftools-$platformName:$crtVersion
            # docker rmi codegentoolbox/laftools-$platformName:latest
            # docker rmi codegentoolbox/laftools-$platformName:devops
            docker build -t codegentoolbox/laftools-$platformName:$crtVersion -f ./Dockerfile .
            docker build -t codegentoolbox/laftools-$platformName:latest -f ./Dockerfile .
            docker build -t codegentoolbox/laftools-$platformName:devops -f ./Dockerfile .

            docker images
            if [ $? -ne 0 ]; then
                echo "[E] docker build failed for $platformName"
                exit 1
            fi

            # if [ $platformName == "linux-x64" ]; then
            #     testImgName=codegentoolbox/laftools-$platformName:devops
            #     echo "testing docker container for $platformName, docker image: $testImgName"
            #     cd $MDGJX_ROOT/pipeline 
            #     chmod +x ./test-docker.sh $testImgName
            #     ./test-docker.sh 
            # fi

            # if [ "$DOCKER_PKG_BUILD_MODE" = "true" ]; then
            #     echo "[I] will test and push docker container for $platformName"
            #     echo "[I] pushing docker image for $platformName"
            #     docker push codegentoolbox/laftools-$platformName:$crtVersion
            #     docker push codegentoolbox/laftools-$platformName:latest
            # fi
            if [ $platformName == "linux-x64" ]; then
                echo "[I] building other tag"
                docker build -t codegentoolbox/laftools-$platformName:$crtVersion -f ./Dockerfile .
                docker save codegentoolbox/laftools-$platformName:$crtVersion > $MDGJX_ROOT/dkout.tmp 
                zip -r $MDGJX_ROOT/pipeline-server.zip $MDGJX_ROOT/pipeline/server
                gzip $MDGJX_ROOT/dkout.tmp
                echo "[I] docker output file: $MDGJX_ROOT/dkout.tmp.gz, size is $(du -sh $MDGJX_ROOT/dkout.tmp.gz | awk '{print $1}')"
            fi
        )
    }

    run-test-all(){
        cd $MDGJX_ROOT/pipeline
        chmod +x ./test-all.sh
        ./test-all.sh
        if [ $? -ne 0 ]; then
            echo "[E] test failed."
            exit 1
        else 
            echo "[I] $(date) run-test-all PASSED"
        fi
    }

    docker-all(){
        if [ "$DOCKER_PKG_BUILD_MODE" = "false" ]; then
            echo "[I] docker build mode is disabled, will skip docker build."
            return;
        fi
        if [[ "$ONLY_WIN_BINARY" = "true" ]]; then
            echo "[I] only windows binary, will skip docker build."
            return;
        fi
        # check if docker command is available
        if [ -z $(which docker) ]; then
            echo "[E] docker command is not available, will ignore this part. To run it, please install docker first."
            return;
        fi
        dockerize-laftools linux-x64
        dockerize-laftools linux-arm64

        echo "[D] Docker Details"
        docker images
    }

    # [BEGIN]
    # build core and fe
    build-cmd
    build-res
    build-fe 
    build-be
    build-extra
    # refine resources
    refining
    # package as zip and tar.gz
    package-all

    # build docker images
    docker-all

    # [END]

    echo "[I] location: `pwd` and dist dir: $distDir"

}

clean-bundle
build-bundle

echo "[I] $(date) Done."
