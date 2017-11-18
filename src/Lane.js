class KanbanLane {
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

   create() {
      this.html.lane = document.createElement('lane')
      this.html.title = document.createElement('lane-title')
      this.html.cards = document.createElement('lane-cards')

      this.html.lane.id = this.id
      this.html.title.innerHTML = this.template(this.content)
      this.html.lane.appendChild(this.html.title)
      this.html.lane.appendChild(this.html.cards)
   }

   listen() {
      this.html.cards.addEventListener('mouseenter', (e) => { this.mouseenter(e) })
      this.html.title.addEventListener('click', (e) => { this.toggle(e) })
   }

   mouseenter(e) {
      this.onMouseEnterLane(this)
   }

   toggle() {
      this.html.lane.classList.toggle('collapse')
   }

   // These are a bit spookey I would just leave them alone for now
   append(card) {
      card.lane = this.id
      if(!card.movedToCardAndLane) this.html.cards.appendChild(card.html)
      card.movedToCardAndLane = false
   }

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
