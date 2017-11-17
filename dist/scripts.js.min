class Kanban {
   constructor(options) {
      this.selector = options.selector
      this.lanes = options.lanes
      this.cards = options.cards
      this.title = options.title
      this.content = options.content
      this.held = undefined
      this.mouse = { offsetX: 0, offsetY: 0 }
      this.pos = undefined
      this.posLane = undefined

      this.html = {}
      this.html.container = document.querySelector(this.selector)
      this.html.board = this.createBoard()
      this.html.cards = []
      this.html.ghost = document.createElement('ghost')
      this.html.board.appendChild(this.html.ghost)

      // Initialize
      this.html.container.appendChild(this.html.board)
      this.loadLanes()
      this.loadCards()
      this.addListeners()
   }

   addListeners() {
      window.addEventListener('mouseup', (e) => {
         this.cardUp()
      })

      window.addEventListener('mousemove', (e) => {
         this.cardMove(e.clientX, e.clientY)
      })

      document.body.addEventListener('blur', (e) => {
         this.cardUp()
      })
   }

   cardDown(card) {
      this.held = card
   }

   cardUp() {
      if(this.held){
         this.html.ghost.style.display = 'none'
         this.held.classList.remove('held')
         this.held = undefined
      }
   }

   cardMove(x, y) {
      this.html.ghost.style.transform = `translateX(${x}px) translateY(${y}px)`

      var ghostX = x + this.mouse.offsetX
      var ghostY = y + this.mouse.offsetY
      var ghostWidth = this.html.ghost.offsetWidth
      var ghostHeight = this.html.ghost.offsetHeight
      if(this.held){
         if(!this.heldmoved){
            this.held.classList.add('held')
            this.html.ghost.innerHTML = this.held.innerHTML
            this.html.ghost.style.width = this.held.offsetWidth + 'px'
            this.html.ghost.style.left = this.mouse.offsetX  + 'px'
            this.html.ghost.style.top = this.mouse.offsetY + 'px'
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
      }
   }

   laneHide(lane) {
      console.log(lane)
      lane.classList.toggle('collapse')
   }

   cardDragOver(ele){
      // Chrome - Safari: Move to lane hack
      if(!this.held || ele == this.held) return
      if(ele.tagName.toLowerCase() == 'lane-cards'){
         // Safari calls child first skip this
         if(!this.movedToCardAndLane)
            ele.appendChild(this.held)
         this.movedToLane = true
         this.movedToCardAndLane = false
         return
      }

      // Chrome calls parent first
      // If that happened OR safari calls child first. Set above
      this.movedToCardAndLane = ele.parentElement != this.held.parentElement
      ele.nextSibling == this.held || this.movedToLane || this.movedToCardAndLane
         ? ele.parentElement.insertBefore(this.held,  ele)
         : ele.parentElement.insertBefore(this.held,  ele.nextSibling)

      this.movedToLane = false
   }

   cardCreate(card) {
      var cardEle = document.createElement('card')
      cardEle.innerHTML = this.content(card.content)

      var that = this

      cardEle.addEventListener('mouseenter', function(e){
         that.cardDragOver(this)
      })

      cardEle.addEventListener('mousedown', function(e){
         // Click Offset
         var downBox = e.target.getBoundingClientRect()
         var cardBox = this.getBoundingClientRect()
         that.mouse = {
            offsetX: -e.offsetX - (downBox.left - cardBox.left),
            offsetY: -e.offsetY - (downBox.top - cardBox.top)
         }
         that.cardDown(this)
      })

      return cardEle
   }

   createLane(lane) {
      var laneEle = document.createElement('lane')
      var titleEle = document.createElement('lane-title')
      var cardsEle = document.createElement('lane-cards')

      laneEle.setAttribute('name', lane.name)
      titleEle.innerHTML = this.title(lane.title)

      var that = this
      cardsEle.addEventListener('mouseenter', function(e){
         that.cardDragOver(this)
      })

      titleEle.addEventListener('click', function(e){
         that.laneHide(this.parentElement)
      })

      laneEle.appendChild(titleEle)
      laneEle.appendChild(cardsEle)
      return laneEle
   }

   createBoard() {
      return document.createElement('kanban')
   }

   loadLanes() {
      for(var lane of this.lanes) {
         this.html.board.appendChild(this.createLane(lane))
      }
   }

   loadCards() {
      for(var card of this.cards) {
         this.loadCard(card)
      }
   }

   loadCard(card) {
      var newCard = this.cardCreate(card)
      this.html.cards.push(newCard)
      this.getLaneCardHolder(card.lane).appendChild(newCard)
   }

   getLaneCardHolder(name){
      var selector = `lane[name=${name}] lane-cards`
      return this.html.board.querySelector(selector)
   }
}
