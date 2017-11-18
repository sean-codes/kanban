/** A Kanban Ghost Card */
class KanbanGhostCard {
   /**
    * Create a new ghost card
    * @param {KanBanBoard} board - the board to add to
    **/
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

   /**
   * Create a new ghost card html
   * @private
   **/
   create() {
      this.html = document.createElement('ghost')
   }

   /**
   * Copy the contents of the grabbed card to the ghost
   * @param {KanbanCard} card - the card to copy
   **/
   grab(card) {
      this.html.innerHTML = card.html.innerHTML
      this.width = card.grabWidth
      this.height = card.grabHeight
      this.offsetX = card.grabOffsetX
      this.offsetY = card.grabOffsetY
      this.setStyles()
   }

   /**
   * Show the ghost card
   **/
   show() {
      this.display = 'block'
      this.setStyles()
   }

   /**
   * Hide the ghost card
   **/
   hide() {
      this.display = 'none'
      this.setStyles()
   }

   /**
   * Move the ghost card
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   **/
   move(x, y) {
      this.x = x
      this.y = y
      this.setStyles()
   }

   /**
   * Sets the styles
   * @private
   **/
   setStyles() {
      this.html.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`
      this.html.style.width = this.width + 'px'
      this.html.style.left = this.offsetX + 'px'
      this.html.style.top = this.offsetY + 'px'
      this.html.style.display = this.display
   }
}
