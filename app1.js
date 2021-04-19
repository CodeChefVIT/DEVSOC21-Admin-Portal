//login
let main
window.localStorage.clear()
document.getElementById('auth').addEventListener('click', function auth () {
    const data = JSON.stringify({
      email: document.getElementById('uid').value,
      password: document.getElementById('pass').value
    })
  
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = false
    xhr.responseType = 'json'
  
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        if (xhr.status == 200) {
          console.log(this.response.success)
          window.localStorage.setItem('jwttoken', this.response.token)
          main = window.open('index.html')
          main.onload=function() {
            const jwttoken1 = window.localStorage.getItem('jwttoken')
            main.console.log(jwttoken1)
            load(jwttoken1)
          }
          
        } else {
          alert('retry')
        }
      }
    })
  
    xhr.open('POST', base + '/admin/login')
    xhr.setRequestHeader('Content-Type', 'application/json')
  
    xhr.send(data)
  })