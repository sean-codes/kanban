class KanbanBoard {
   constructor(selector) {
      this.selector = selector
      this.lanes = []
      this.cards = []
      this.heldCard = undefined
      this.heldCardMoved = false

      this.html = {}
      this.create()
      this.createGhost()

      // Initialize
      this.html.container.appendChild(this.html.board)
      this.addListeners()
   }
   create() {
      this.html.container = document.querySelector(this.selector)
      this.html.board = this.createBoard()
      this.html.cards = []
   }

   createGhost() {
      this.ghost = new KanbanGhost()
      this.html.board.appendChild(this.ghost.html)
   }

   addListeners() {
      window.addEventListener('mouseup', (e) => { this.mouseUp() })
      window.addEventListener('mousemove', (e) => { this.mouseMove(e.clientX, e.clientY) })
      document.body.addEventListener('blur', (e) => { this.cardUp() })
   }

   createBoard() {
      return document.createElement('kanban')
   }

   addLane(lane) {
      this.lanes.push(lane)
      lane.onMouseEnterLane = (lane) => { this.mouseEnterLane(lane) }
      this.html.board.appendChild(lane.html.lane)
   }

   addCard(card) {
      this.cards.push(card)
      card.onMouseEnter = (card) => { this.mouseEnterCard(card) }
      card.onMouseDown = (card, offX, offY) => { this.mouseDownOnCard(card, offX, offY) }
      this.putCardInLane(card.id, card.lane)
   }

   findLane(laneID) {
      return this.lanes.find((e) => { return e.id == laneID })
   }

   findCard(cardID) {
      return this.cards.find((e) => { return e.id == cardID })
   }

   putCardInLane(cardID, laneID){
      this.findLane(laneID).append(this.findCard(cardID))
   }

   putCardAroundCard(cardID1, cardID2){
      var card1 = this.findCard(cardID1)
      var card2 = this.findCard(cardID2)
      if(card1.id == card2.id) return
      this.findLane(card2.lane).appendCardAroundCard(card1, card2)
   }

   // All the events
   mouseEnterLane(lane) {
      console.log('board knows: mouse enter lane')
      if(this.heldCard) {
         this.putCardInLane(this.heldCard.id, lane.id)
      }
   }

   mouseEnterCard(card) {
      console.log('board knows: mouse enter card')
      if(this.heldCard) {
         console.log('Put Card above')
         this.putCardAroundCard(this.heldCard.id, card.id)
      }
      // move card to the lane
   }

   mouseDownOnCard(card, offX, offY) {
      console.log('board knows: mouse down card')
      this.heldCard = card
      this.heldCard.grab()
      this.ghost.grab(card)
   }

   mouseUp() {
      console.log('board knows: mouse up')
      this.heldCard.drop()
      this.ghost.hide()
      this.heldCard = undefined
   }

   mouseMove(x, y) {
      //console.log('board knows: mouse move')
      if(this.heldCard) {
         if(!this.heldCard.moved) {
            this.heldCard.hold()
            this.ghost.show()
         }
         this.ghost.move(x, y)
      }
   }

   // This one will get scarey
   scroll() { }
}
