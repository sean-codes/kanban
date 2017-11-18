class KanbanGhost {
   constructor(board) {
      this.board = board
      this.lane = undefined
      this.x = 0
      this.y = 0
      this.width = 0
      this.offsetX = 0
      this.offsetY = 0
      this.display = 'none'
      this.create()
   }

   create() {
      this.html = document.createElement('ghost')
   }

   grab(card) {
      this.html.innerHTML = card.html.innerHTML
      this.width = card.grabWidth
      this.height = card.grabHeight
      this.offsetX = card.grabOffsetX
      this.offsetY = card.grabOffsetY
      this.setStyles()
   }

   show() {
      this.display = 'block'
      this.setStyles()
   }

   hide() {
      this.display = 'none'
      this.setStyles()
   }


   move(x, y) {
      this.x = x
      this.y = y
      this.setStyles()
   }

   setStyles() {
      this.html.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`
      this.html.style.width = this.width + 'px'
      this.html.style.left = this.offsetX + 'px'
      this.html.style.top = this.offsetY + 'px'
      this.html.style.display = this.display
   }
}
