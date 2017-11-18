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
      this.html.cards.addEventListener('mouseenter', () => { this.mouseenter() })
      this.html.title.addEventListener('click', () => { this.toggle() })
   }

   mouseenter() {
      this.onMouseEnterLane(this)
   }

   toggle() {
      this.html.lane.classList.toggle('collapse')
   }

   append(card) {
      this.html.cards.appendChild(card.html)
   }
}
