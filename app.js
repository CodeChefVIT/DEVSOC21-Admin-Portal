const base = 'https://devsoc-test.herokuapp.com'

const data = JSON.stringify({
  email: 'ccisbest@gmail.com',
  password: 'enimasinobhaniyo'
})

const xhr = new XMLHttpRequest()
xhr.withCredentials = false
xhr.responseType = 'json'

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === 4) {
    load(this.response.token)
  }
})

xhr.open('POST', base + '/admin/login')
xhr.setRequestHeader('Content-Type', 'application/json')

xhr.send(data)

function load (token) {
  const xhr1 = new XMLHttpRequest()
  xhr1.withCredentials = false
  xhr1.responseType = 'json'

  xhr1.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.response.teams)
      const teamlist = this.response.teams
      display(teamlist)
      window.localStorage.setItem('teams', JSON.stringify(teamlist))
    }
  })

  xhr1.open('GET', 'https://devsoc-test.herokuapp.com/admin/all')
  xhr1.setRequestHeader('Authorization', 'Bearer ' + token)

  xhr1.send()
}

function display (teamlist) {
  document.getElementById('count').innerHTML = teamlist.length
  let htmlString = ''
  let i
  for (i = 0; i < teamlist.length; i++) {
    let memlist = ''
    let j
    for (j = 0; j < teamlist[i].users.length; j++) {
      memlist = memlist + ' ' + teamlist[i].users[j].name
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
      <select name="qualifiedstatus" class="dropdown">
          <option>Shortlisted For DEVSOC'21</option>
          <option>Not Shortlisted For DEVSOC'21</option>
          <option>Shortlisted For Round 2</option>
          <option>Not Shortlisted For Round 2</option>
          <option>Selected For Final Round</option>
      </select>

      <!--<button type="submit" class="zip">
          <img src="zip.png" alt="Save icon" />
      </button>-->
      </div>
      <a href="team_details.html" class="submit1" onclick="myfunction('${teamlist[i].leader._id}')">Submission details > </a>
      </div>
  </div>
      `
  }
  document.getElementsByClassName('cont')[0].innerHTML = htmlString
}

const searchBar = document.getElementById('search')
searchBar.addEventListener('keyup', (e) => {
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

function myfunction (a) {
  alert(a)
}

const a = document.getElementById('filterteams')
const b = document.getElementById('submitted')
const c = document.getElementById('notsubmitted')
const d = document.getElementById('shortlisted1')
const e = document.getElementById('notshortlisted1')
const f = document.getElementById('shortlisted2')
const g = document.getElementById('notshortlisted2')
const h = document.getElementById('selected')
const teamnames = JSON.parse(window.localStorage.getItem('teams'))
a.addEventListener('click', function () {
  const optiontext=a.options[a.selectedIndex].text
  const filteredCharacters = teamnames.filter((character) => {
    return (
      character.submission.status==optiontext
    )
  })
  if (filteredCharacters.length === 0 && optiontext!='All') {
    document.getElementsByClassName('cont')[0].innerHTML = 'No Results Found'
  } else if(filteredCharacters.length === 0 && optiontext=='All'){
    display(teamnames)
  } else {
    document.getElementsByClassName('cont')[0].innerHTML = ''
    display(filteredCharacters)
  }
})
