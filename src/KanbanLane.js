/** A Kanban Lane */
class KanbanLane {
   /**
    * Create a new ghost card
    * @param {string} id - the id of the lane
    * @param {string} content - the content to put in the title
    * @param {function} template - the template function for the title
    **/
   constructor(id, content, template) {
      this.id = id
      this.content = content
      this.template = template
      this.html = {
         lane: undefined,
         title: undefined,
         cards: undefined
      }

      this.create()
      this.listen()
   }

   /**
    * Creates the lane html
    * @private
    */
   create() {
      this.html.lane = document.createElement('lane')
      this.html.title = document.createElement('lane-title')
      this.html.cards = document.createElement('lane-cards')

      this.html.lane.id = this.id
      this.html.title.innerHTML = this.template(this.content)
      this.html.lane.appendChild(this.html.title)
      this.html.lane.appendChild(this.html.cards)
   }

   /**
    * Listens for events
    * @private
    */
   listen() {
      this.html.cards.addEventListener('mouseenter', (e) => { this.mouseenter(e) })
      this.html.title.addEventListener('click', (e) => { this.toggle(e) })
   }

   /**
    * What to do when mouse enters
    * @private
    */
   mouseenter(e) {
      this.onMouseEnterLane(this)
   }

   /**
    * Toggle the lane open or minimized
    */
   toggle() {
      this.html.lane.classList.toggle('collapse')
   }

   /**
    * Listens for events
    * @private
    * @param {KanbanCard} card - the card to append
    */
   append(card) {
      card.lane = this.id
      if(!card.movedToCardAndLane) this.html.cards.appendChild(card.html)
      card.movedToCardAndLane = false
   }

   /**
    * Listens for events
    * @private
    * @param {KanbanCard} card1 - the card to append
    * @param {KanbanCard} card2 - the card to look for a position around
    */
   appendCardAroundCard(card1, card2) {
      card1.lane = this.id
      card1.movedToCardAndLane = card1.html.parentElement != card2.html.parentElement
      if(!card2.html.nextSibling && !card1.movedToCardAndLane){
         this.append(card1)
         return
      }

      this.html.cards.insertBefore(card1.html, card2.html)
   }
}
