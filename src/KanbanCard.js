/** A Kanban Card */
class KanbanCard {
   /**
    * Create a new kanban card
    * @param {string} id - the selector for the container
    * @param {any} content - content to be put in the card
    * @param {function} template - the template to use on the card
    **/
   constructor(id, content, template){
      this.id = id
      this.lane = undefined
      this.content = content
      this.template = template
      this.html = {}

      this.create()
      this.listen()
   }

   /**
    * Creates the html element
    * @private
    **/
   create() {
      this.html = document.createElement('card')
      this.html.innerHTML = this.template(this.content)
   }

   /**
    * Listens for card events
    * @private
    **/
   listen() {
      this.html.addEventListener('mouseenter', (e) => { this.mouseenter(e) })
      this.html.addEventListener('mousedown', (e) => { this.mousedown(e) })
   }

   /**
    * what to do when grabbed
    * @private
    **/
   grab() {
      this.moved = false
   }

   /**
    * what to do when held
    * @private
    **/
   hold() {
      this.moved = true
      this.html.classList.add('held')
   }

   /**
    * what to do when dropped
    * @private
    **/
   drop() {
      this.html.classList.remove('held')
   }

   /**
    * called when mouse enters
    * @private
    **/
   mouseenter() {
      this.onMouseEnter(this)
   }

   /**
    * called when mouse pressed
    * @private
    **/
   mousedown(e) {
      var downArea = e.target.getBoundingClientRect()
      var cardArea = this.html.getBoundingClientRect()
      this.grabWidth = cardArea.width
      this.grabHeight = cardArea.height
      this.grabOffsetX = -e.offsetX - (downArea.left - cardArea.left)
      this.grabOffsetY = -e.offsetY - (downArea.top - cardArea.top)
      this.onMouseDown(this)
   }
}
