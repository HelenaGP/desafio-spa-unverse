export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })
    .then(this.bgToogle(pathname))
    .then(this.selectedPage(pathname))
  }

  bgToogle(pathname) {
    let className = pathname.slice(1)
    if(className === "") {
      className = "home"
    }
    let bgBody = document.getElementById('body')
    bgBody.classList = []
    bgBody.classList.add(className)
    
  }

  selectedPage(pathname) {
    let IDname = pathname.slice(1)
    if(IDname === "") {
      IDname = "home"
    }
    let selected = document.getElementsByClassName('selected')
    selected[0].classList.remove('selected')
    const newSelected = document.getElementById(IDname)
    newSelected.classList.add('selected')
  }
}