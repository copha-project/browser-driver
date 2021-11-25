const path = require('path')
const fs = require('fs')
const Utils = require('uni-utils')
const AdmZip = require("adm-zip")

const chrome_latest_version_url = 'https://chromedriver.storage.googleapis.com/LATEST_RELEASE'
const chrome_latest_download_url = 'https://chromedriver.storage.googleapis.com/#/chromedriver_mac64.zip'

async function updateChrome(ver='latest'){
    const version = await Utils.download(chrome_latest_version_url)
    const saveDir = path.join(__dirname,'../lib/')
    const saveFile = path.join(saveDir,'chrome.zip')
    await Utils.download(getDownloadLink(version),{savePath:saveFile})
    await unzip(saveFile)

    fs.chmodSync(path.join(saveDir,'chromedriver'),0o755)
    fs.unlinkSync(saveFile)

    function getDownloadLink(v) {
        return chrome_latest_download_url.replace('#',v)
    }
    function unzip(path) {
        var zip = new AdmZip(path);
        var zipEntries = zip.getEntries()
        zip.extractEntryTo(zipEntries[0].entryName,saveDir,false,true)
    }
}

async function main(){
    await updateChrome()
}

;(async ()=>{
    await main()
})()
