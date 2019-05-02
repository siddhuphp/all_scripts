var ObjectList = []
// var licenseStatus


function requestLicense () {
  chrome.identity.getAuthToken({ 'interactive': true }, function (token) {

    // Use the token.
    var CWS_LICENSE_API_URL = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/'
    var req = new XMLHttpRequest()

    req.open('GET', CWS_LICENSE_API_URL + chrome.runtime.id)
    req.setRequestHeader('Authorization', 'Bearer ' + token)
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        var license = JSON.parse(req.responseText)
        // chrome.storage.sync.set({'license': license}, function () {})
        // verifyAndSaveLicense(license)
        var licenseStatus = getAccessLevel(license)
        // window.alert(licenseStatus)

        // for test
        // licenseStatus="FULL"

        if ((licenseStatus == 'NONE') || (licenseStatus == 'FREE_TRIAL_EXPIRED')) {
          document.getElementById('download1').disabled = 'true'
        }
      }
    }
    req.send()
  })
}

function getAccessLevel (license) {

  // Comparing the createdDate to the current date will tell you how long the user has been using the free trial.
  // window.alert("phase2 "+license.result)
  if (license.result && license.accessLevel == 'FULL') {
    console.log('Fully paid & properly licensed.')
    var licenseStatus = 'FULL'
  } else if (license.result && license.accessLevel == 'FREE_TRIAL') {
    var daysAgoLicenseIssued = Date.now() - parseInt(license.createdTime, 10)
    daysAgoLicenseIssued = daysAgoLicenseIssued / 1000 / 60 / 60 / 24
    if (daysAgoLicenseIssued <= TRIAL_PERIOD_DAYS) {
      console.log('Free trial, still within trial period')
      licenseStatus = 'FREE_TRIAL'
    } else {
      console.log('Free trial, trial period expired.')
      licenseStatus = 'FREE_TRIAL_EXPIRED'
    }
  } else {
    console.log('No license ever issued.')
    licenseStatus = 'NONE'
  }
  return licenseStatus
}

// popup Display.
function showObjectList () {
  document.getElementById('d0').innerText = ObjectList[0]
  document.getElementById('d1').innerText = ObjectList[1]
  // document.getElementById('d2').innerText = ObjectList[2]
  document.getElementById('d3').innerText = ObjectList[3]
  document.getElementById('d4').innerText = ObjectList[4]
  //document.getElementById('d5').innerText = ObjectList[5]
  // document.getElementById('d6').innerText = ObjectList[6]
  // document.getElementById('d7').innerText = ObjectList[7]
  //document.getElementById('d8').innerText = ObjectList[8]
  document.getElementById('d9').innerText = ObjectList[9]

  var v_label = document.createElement('v_label')
  var imageTable = document.getElementById('images')

  for (var i = 10; i < ObjectList.length; ++i) {
    var img = document.createElement('img')
    img.setAttribute('src', ObjectList[i])
    img.setAttribute('height', '80')
    img.setAttribute('width', '80')
    img.style.margin = '2px'
    img.style.border = '1px solid #e6e6fa'
    v_label.appendChild(img)

    var row = document.createElement('tr')
    var col0 = document.createElement('td')
    var col1 = document.createElement('td')

    col0.innerText = i - 9
    col0.style.textAlign = 'left'
    col1.id = 'd' + i + ''
    col1.contentEditable = true
    col1.style.textAlign = 'left'
    col1.innerText = ObjectList[i]
    row.appendChild(col0)
    row.appendChild(col1)
    imageTable.appendChild(row)
  }

  document.getElementById('images_small').appendChild(v_label)

  // document.getElementById('label_id').innerText = "Got Images Numbers:  " + String(ObjectList.length-10)

  // requestLicense()

  // get option setup
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function (items)
  {
    document.getElementById('msg').style.fontSize = items.favoriteColor
    document.getElementById('download0').style.fontSize = items.favoriteColor
    document.getElementById('download1').style.fontSize = items.favoriteColor
    document.getElementById('body').style.fontSize = items.favoriteColor
    // document.getElementById('images').style.fontSize = items.favoriteColor
    document.getElementById('images').hidden = items.likesColor
  })
}

function CopyClipboard () {
  //updateObjectList()
  execCopy(clipboardCsvString())
  window.close()
}

function downloadCsvImage () {

  /*
  var createDataUriFromString = 'data:text/csv,' + encodeURIComponent(downloadCsvString())
  var link = document.createElement('a')
  
  link.download =ObjectList[0]+"-download.csv"
  link.href = createDataUriFromString
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  */

  updateObjectList()
  chrome.runtime.sendMessage({
    action: 'download',
    ObjectList: ObjectList
  })

  window.close()
}

// Make CSV String

function clipboardCsvString () {
  var str = '\uFEFF'

  str += 'Product ID' + '\t' + 'Product Name' + '\t' + 'Category' + '\t' + 'ShipFee' + '\t' + 'Product Price' + '\t' + 'Weight(kg)' + '\t' + 'Product Description(html)' + '\t' + 'Products Url' + '\t' + 'Package Size' + '\t' + 'Option' + '\t'
  str += '\r\n'

  for (var i = 0; i < ObjectList.length; ++i) {
    if (i < 10) {

      // str += ObjectList[i].replace('"', '""')+"\t" 
      if(ObjectList[i]==null){ObjectList[i]=""};
      str += ObjectList[i] + '\t'
    }else {
      str += '\r\n'
      if (i == 10) {
        str += '\r\n'
        str += '\r\n'
        str += 'Product ID' + '\t' + 'Image Url' + '\t'
        str += '\r\n'
      }

      // str += ObjectList[0].replace('"', '""') +"\t"+ ObjectList[i].replace('"', '""')
      str += ObjectList[0] + '\t' + ObjectList[i]
    }
  }
  str += '\r\n'
  return str
}

function execCopy (string) {
  var temp = document.createElement('textarea')

  temp.value = string
  temp.selectionStart = 0
  temp.selectionEnd = temp.value.length

  var s = temp.style
  s.position = 'fixed'
  s.left = '-100%'

  document.body.appendChild(temp)
  temp.focus()
  var result = document.execCommand('copy')
  temp.blur()
  document.body.removeChild(temp)
 
  return result
}

function updateObjectList () {
  ObjectList[0] = document.getElementById('d0').innerText
  ObjectList[1] = document.getElementById('d1').innerText
  // ObjectList[2]=document.getElementById('d2').innerText
  ObjectList[3]=document.getElementById('d3').innerText
  ObjectList[4] = document.getElementById('d4').innerText
  //ObjectList[5] = document.getElementById('d5').innerText
  //ObjectList[8] = document.getElementById('d8').innerText
  ObjectList[9] = document.getElementById('d9').innerText

  var imageTable = document.getElementById('images')
  for (var i = 10; i < ObjectList.length; ++i) {
    num = 'd' + i + ''
    ObjectList[i] = document.getElementById(num).innerText
  }
}

function popupDisplay()
{
  
  document.getElementById('msg').innerHTML = chrome.i18n.getMessage('msg');
  document.getElementById('download0').innerHTML = chrome.i18n.getMessage('copy');
  document.getElementById('download1').innerHTML = chrome.i18n.getMessage('download');
  document.getElementById('or').innerHTML = chrome.i18n.getMessage('or');
  
}

chrome.extension.onRequest.addListener(function (Object_Arrays) {
  for (var index in Object_Arrays) {
    ObjectList.push(Object_Arrays[index])
  }
  popupDisplay();
  showObjectList();
})

// Set up event handlers and inject send_links.js into all frames in the active
// tab.
window.onload = function () {

  // document.getElementById('filter').onkeyup = filterLinks
  // document.getElementById('regex').onchange = filterLinks

  document.getElementById('download0').onclick = CopyClipboard
  document.getElementById('download1').onclick = downloadCsvImage
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
      function (activeTabs) {
        chrome.tabs.executeScript(
          activeTabs[0].id, {file: 'scraper.js', allFrames: false})
      })
  })
}
