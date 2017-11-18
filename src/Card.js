class KanbanCard {
   constructor(id, lane, content, template){
      this.id = id
      this.lane = lane
      this.content = content
      this.template = template
      this.html = {}

      this.create()
      this.listen()
   }

   create() {
      this.html = document.createElement('card')
      this.html.innerHTML = this.template(this.content)
   }

   listen() {
      this.html.addEventListener('mouseenter', (e) => { this.mouseenter(e) })
      this.html.addEventListener('mousedown', (e) => { this.mousedown(e) })
   }

   grab() {
      this.moved = false
   }

   hold() {
      this.moved = true
      this.html.classList.add('held')
   }

   drop() {
      this.html.classList.remove('held')
   }

   mouseenter() {
      this.onMouseEnter(this)
   }

   mousedown(e) {
      var downArea = e.target.getBoundingClientRect()
      var cardArea = this.html.getBoundingClientRect()
      this.grabWidth = cardArea.width
      this.grabOffsetX = -e.offsetX - (downArea.left - cardArea.left)
      this.grabOffsetY = -e.offsetY - (downArea.top - cardArea.top)
      this.onMouseDown(this)
   }
}
