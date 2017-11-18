/** A Kanban Board */
class KanbanBoard {
   /**
    * Create a kanban board
    * @param {string} selector - the selector for the container
    **/
   constructor(selector) {
      this.selector = selector
      this.lanes = []
      this.cards = []
      this.heldCard = undefined
      this.heldCardMoved = false

      this.html = {}
      this.create()
      this.createGhost()
      this.addListeners()
   }

   /**
    * Creates the board, appends to the container
    * @private
    **/
   create() {
      this.html.container = document.querySelector(this.selector)
      this.html.board = document.createElement('kanban')
      this.html.container.appendChild(this.html.board)
      this.html.cards = []
   }

   /**
    * Creates the Ghost element that will follow the cursor
    * @private
    **/
   createGhost() {
      this.ghost = new KanbanGhostCard(this.html.board)
      this.html.board.appendChild(this.ghost.html)
   }

   /**
    * Adds event listeners for global events
    * @private
    **/
   addListeners() {
      window.addEventListener('mouseup', (e) => { this.mouseUp() })
      window.addEventListener('mousemove', (e) => { this.mouseMove(e.clientX, e.clientY) })
      document.body.addEventListener('blur', (e) => { this.cardUp() })
   }

   /**
    * Adds a lane to the board
    * @param {KanbanLane} lane - the kanban lane to add
    **/
   addLane(lane) {
      this.lanes.push(lane)
      lane.onMouseEnterLane = (lane) => { this.mouseEnterLane(lane) }
      this.html.board.appendChild(lane.html.lane)
   }

   /**
    * Adds a card to the board
    * @param {KanbanCard} card - the kanban card to add
    * @param {laneID} laneID - lane to add in
    **/
   addCard(card, laneID) {
      this.cards.push(card)
      card.onMouseEnter = (card) => { this.mouseEnterCard(card) }
      card.onMouseDown = (card, offX, offY) => { this.mouseDownOnCard(card, offX, offY) }
      this.putCardInLane(card.id, laneID)
   }

   /**
    * Finds a lane on the board
    * @param {string} laneID - the lane ID of the lane to find
    **/
   findLane(laneID) {
      return this.lanes.find((e) => { return e.id == laneID })
   }

   /**
    * Finds a card on the board
    * @param {string} cardID - the card ID of the card to find
    **/
   findCard(cardID) {
      return this.cards.find((e) => { return e.id == cardID })
   }

   /**
    * Moves a card to a lane at the end
    * @param {string} cardID - the card ID to move
    * @param {string} laneID - the lane ID to put the card in
    **/
   putCardInLane(cardID, laneID){
      this.ghost.lane = this.findLane(laneID)
      this.findLane(laneID).append(this.findCard(cardID))
   }

   /**
    * Puts a card around a card
    * @param {string} cardID1 - the card ID to move
    * @param {string} cardID2 - the card ID to put around
    **/
   putCardAroundCard(cardID1, cardID2){
      var card1 = this.findCard(cardID1)
      var card2 = this.findCard(cardID2)
      if(card1.id == card2.id) return
      this.findLane(card2.lane).appendCardAroundCard(card1, card2)
   }

   /**
    * Fires when the mouse enters a lane
    * @param {KanbanLane} lane - the lane the mouse entered
    * @private
    **/
   mouseEnterLane(lane) {
      if(this.heldCard) {
         this.putCardInLane(this.heldCard.id, lane.id)
      }
   }

   /**
    * Fires when the mouse enters a card
    * @param {KanbanCard} card - the card the mouse entered
    * @private
    **/
   mouseEnterCard(card) {
      if(this.heldCard) {
         this.putCardAroundCard(this.heldCard.id, card.id)
      }
   }

   /**
    * Fires when the mouse presses down on a card
    * @param {KanbanCard} card - the card the mouse clicked
    * @private
    **/
   mouseDownOnCard(card) {
      this.heldCard = card
      this.heldCard.grab()
      this.ghost.grab(card)
   }

   /**
    * Fires when the mouse comes up
    * @private
    **/
   mouseUp() {
      this.heldCard.drop()
      this.ghost.hide()
      this.heldCard = undefined
   }

   /**
    * Fires when the mouse moves
    * @param {number} x - the mouse x pos
    * @param {number} y - the mouse y pos
    * @private
    **/
   mouseMove(x, y) {
      if(this.heldCard) {
         if(!this.heldCard.moved) {
            this.heldCard.hold()
            this.ghost.show()
         }
         this.ghost.move(x, y)
      }
   }
}
