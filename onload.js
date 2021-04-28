window.onload=function() {
  const jwttoken1 = window.localStorage.getItem('jwttoken')
  window.console.log(jwttoken1)
  load(jwttoken1)
}