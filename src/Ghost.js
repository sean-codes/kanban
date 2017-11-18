class KanbanGhost {
   constructor() {
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
      /*
      var ghostLeft = x + this.offsetX
      var ghostRight = x + this.offsetX + this.width
      var ghostTop = y + this.offsetY
      var ghostBottom = y + this.offsetY + this.height

      if(!this.html.style.display == 'none'){
         this.held.classList.add('held')
         this.html.ghost.innerHTML = this.held.innerHTML

         this.html.ghost.style.display = 'block'
      }

      // Auto scrolling lanes
      var lane = this.held.parentElement
      var laneRect = lane.getBoundingClientRect()
      if(ghostY + ghostHeight > laneRect.top + laneRect.height){
         lane.scrollTop += (ghostY + ghostHeight) - (laneRect.top + laneRect.height)
      }

      if(ghostY < laneRect.top){
         lane.scrollTop -= laneRect.top - ghostY
      }

      // Auto scrolling board
      var boardRect = this.html.board.getBoundingClientRect()
      if(ghostX < boardRect.left){
         this.html.board.scrollLeft -= boardRect.left - ghostX
      }

      if(ghostX + ghostWidth > boardRect.left + boardRect.width){
         this.html.board.scrollLeft += (ghostX + ghostWidth) - (boardRect.left + boardRect.width)
      }
      */
   }
   setStyles() {
      this.html.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`
      this.html.style.width = this.width + 'px'
      this.html.style.left = this.offsetX + 'px'
      this.html.style.top = this.offsetY + 'px'
      this.html.style.display = this.display
   }
}
