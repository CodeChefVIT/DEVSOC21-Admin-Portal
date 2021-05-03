
const base = 'https://devsoc-api.codechefvit.com'

// index
function load (token) {
  const xhr1 = new XMLHttpRequest()
  xhr1.withCredentials = false
  xhr1.responseType = 'json'

  xhr1.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.response.teams)
      const teamlist = this.response.teams
      window.localStorage.setItem('teams', JSON.stringify(teamlist))
      document.getElementById('count').innerHTML = teamlist.length
      let htmlString = ''
      let i
      for (i = 0; i < teamlist.length; i++) {
        let memlist = ''
        let j
        for (j = 0; j < teamlist[i].users.length; j++) {
          memlist = memlist + ' | ' + teamlist[i].users[j].name
        }
        const id = teamlist[i].leader._id
        htmlString = htmlString +
      `
      <div class="summary">

      <div class="text">
          <h1 class="team">Team ${teamlist[i].name}</h1>
          <h1 class="members"> Members - ${teamlist[i].users.length} </h1>
          <h1 class="submitted"> ${teamlist[i].submission.status}</h1>
      </div>
      <p class="names">${memlist}</p>
      <div class="lrow">
      <div class="lrow1">
      <select name="qualifiedstatus" class="dropdown" onchange="patch1(this.value,'${teamlist[i]._id}')">
          <option value="" disabled selected>Select Status</option>
          <option value="Shortlisted For DEVSOC'21">Shortlisted For DEVSOC'21</option>
          <option value="Not Shortlisted For DEVSOC'21">Not Shortlisted For DEVSOC'21</option>
          <option value="Shortlisted For Round 2">Shortlisted For Round 2</option>
          <option value="Not Shortlisted For Round 2">Not Shortlisted For Round 2</option>
          <option value="Selected For Final Round">Selected For Final Round</option>
      </select>
      <!--<button type="submit" class="zip">
          <img src="zip.png" alt="Save icon" />
      </button>-->
      </div>
      <a class="submit1" onclick="myfunction('${teamlist[i]._id}')">Submission details > </a>
      </div>
  </div>
      `
      }
      document.getElementsByClassName('cont')[0].innerHTML = htmlString
    }
  })

  xhr1.open('GET', 'https://devsoc-api.codechefvit.com/admin/all')
  xhr1.setRequestHeader('Authorization', 'Bearer ' + token)

  xhr1.send()
}

function patch1 (a, b) {
  console.log('yes')
  const jwttoken = window.localStorage.getItem('jwttoken')
  const data = JSON.stringify({
    teamId: b,
    status: a
  })

  const xhr = new XMLHttpRequest()
  xhr.withCredentials = false
  xhr.responseType = 'json'

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.response)
    }
  })

  xhr.open('PATCH', 'https://devsoc-api.codechefvit.com/admin/status')
  xhr.setRequestHeader('Authorization', 'Bearer ' + jwttoken)
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.send(data)
}

function display (teamlist) {
  document.getElementById('count').innerHTML = teamlist.length
  let htmlString = ''
  let i
  for (i = 0; i < teamlist.length; i++) {
    let memlist = ''
    let j
    for (j = 0; j < teamlist[i].users.length; j++) {
      memlist = memlist + ' | ' + teamlist[i].users[j].name
    }
    const id = teamlist[i].leader._id
    htmlString = htmlString +
      `
      <div class="summary">

      <div class="text">
          <h1 class="team">Team ${teamlist[i].name}</h1>
          <h1 class="members"> Members - ${teamlist[i].users.length} </h1>
          <h1 class="submitted"> ${teamlist[i].submission.status}</h1>
      </div>
      <p class="names">${memlist}</p>
      <div class="lrow">
      <div class="lrow1">
      <select name="qualifiedstatus" class="dropdown" onchange="patch1(this.value,'${teamlist[i]._id}')">
          <option value="" disabled selected>Select Status</option>
          <option value="Shortlisted For DEVSOC'21">Shortlisted For DEVSOC'21</option>
          <option value="Not Shortlisted For DEVSOC'21">Not Shortlisted For DEVSOC'21</option>
          <option value="Shortlisted For Round 2">Shortlisted For Round 2</option>
          <option value="Not Shortlisted For Round 2">Not Shortlisted For Round 2</option>
          <option value="Selected For Final Round">Selected For Final Round</option>
      </select>

      <!--<button type="submit" class="zip">
          <img src="zip.png" alt="Save icon" />
      </button>-->
      </div>
      <a class="submit1" onclick="myfunction('${teamlist[i]._id}')">Submission details > </a>
      </div>
  </div>
      `
  }
  document.getElementsByClassName('cont')[0].innerHTML = htmlString
}
// index
const searchBar = document.getElementById('search')
searchBar.addEventListener('keyup', (e) => {
  document.getElementById('filterteams').selectedIndex = 0
  const teamnames = JSON.parse(window.localStorage.getItem('teams'))
  const searchString = e.target.value.toLowerCase()

  const filteredCharacters = teamnames.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString)
    )
  })
  if (filteredCharacters.length === 0) {
    document.getElementsByClassName('cont')[0].innerHTML = 'No Results Found'
  } else {
    document.getElementsByClassName('cont')[0].innerHTML = ''
    display(filteredCharacters)
  }
})


function patch1 (a, b) {
  console.log('yes')
  const jwttoken = window.localStorage.getItem('jwttoken')
  const data = JSON.stringify({
    teamId: b,
    status: a
  })

  const xhr = new XMLHttpRequest()
  xhr.withCredentials = false
  xhr.responseType = 'json'

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.response)
    }
  })

  xhr.open('PATCH', 'https://devsoc-api.codechefvit.com/admin/status')
  xhr.setRequestHeader('Authorization', 'Bearer ' + jwttoken)
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.send(data)
}


// team_details
function myfunction (a) {
  const jwttoken = window.localStorage.getItem('jwttoken')
  const xhr = new XMLHttpRequest()
  xhr.withCredentials = false
  xhr.responseType = 'json'

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.response.team)
      window.localStorage.setItem('teaminfo', JSON.stringify(this.response.team))
      const newWindow = window.open('team_details.html')
      const teaminfo = JSON.parse(window.localStorage.getItem('teaminfo'))
      newWindow.onload = function () {
        newWindow.console.log(teaminfo)
        newWindow.document.getElementById('team').innerHTML = 'Team ' + teaminfo.name
        let i
        let memname = ''
        for (i = 0; i < teaminfo.users.length; i++) {
          memname += teaminfo.users[i].name + ' | '
        }
        newWindow.document.getElementById('options').innerHTML =
        `
        <select name="qualifiedstatus" class="dropdown" id="updatestat" onchange="patch1(this.value,'${teaminfo._id}')">
      <option value="" disabled selected>Select Status</option>
      <option value="Shortlisted For DEVSOC'21">Shortlisted For DEVSOC'21</option>
      <option value="Not Shortlisted For DEVSOC'21">Not Shortlisted For DEVSOC'21</option>
      <option value="Shortlisted For Round 2">Shortlisted For Round 2</option>
      <option value="Not Shortlisted For Round 2">Not Shortlisted For Round 2</option>
      <option value="Selected For Final Round">Selected For Final Round</option>
    </select>
        `
        let ii
        for(ii=1;ii<6;ii++){
          if(newWindow.document.getElementById('updatestat').options[ii].value==teaminfo.submission.status){
            newWindow.document.getElementById('updatestat').options[ii].setAttribute('selected', true);
          }
        }
        newWindow.document.getElementById('names').innerHTML = memname
        newWindow.document.getElementById('submitted').innerHTML = '| ' + teaminfo.submission.status
        newWindow.document.getElementById('members').innerHTML = '| Members- ' + teaminfo.users.length
        if (teaminfo.submission.status != 'Not Submitted') {
          newWindow.document.getElementById('name').value = teaminfo.submission.name
          newWindow.document.getElementById('msg').value = teaminfo.submission.videolink
          newWindow.document.getElementById('repolink').value = teaminfo.submission.githubLink

          let clean = window.DOMPurify.sanitize(marked(teaminfo.submission.description))
          const reg = /script/ig
          /* |iframe|form|object|embed|link|head|meta */

          const scripts = ['script', 'iframe', 'form', 'object', 'embed', 'link', 'head', 'meta', 'alert', 'style', 'img', 'body', 'html']

          for (let k = 0; k < scripts.length; k++) {
            clean = clean.replaceAll(scripts[k], '')
          }

          newWindow.console.log(clean)
          // let clean = DOMPurify.sanitize( marked(teaminfo.submission.description) , {USE_PROFILES: {html: true}} )
          newWindow.document.getElementById('projdesc').innerHTML = clean
        }
      }
    }
  })

  xhr.open('GET', 'https://devsoc-api.codechefvit.com/admin/team/' + a.toString())
  xhr.setRequestHeader('Authorization', 'Bearer ' + jwttoken)
  xhr.send()
}
// index
const a = document.getElementById('filterteams')

a.addEventListener('click', function () {
  const teamnames = JSON.parse(window.localStorage.getItem('teams'))
  const optiontext = a.options[a.selectedIndex].text
  const filteredCharacters = teamnames.filter((character) => {
    return (
      character.submission.status == optiontext
    )
  })
  if (filteredCharacters.length === 0 && optiontext != 'All') {
    document.getElementsByClassName('cont')[0].innerHTML = 'No Results Found'
  } else if (filteredCharacters.length === 0 && optiontext == 'All') {
    display(teamnames)
  } else {
    document.getElementsByClassName('cont')[0].innerHTML = ''
    display(filteredCharacters)
  }
})


  xhr.send(data)
}
