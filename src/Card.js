class KanbanCard {
   constructor(board, content, htmlFunction){
      this.board = board
      this.content = content
      this.htmlFunction = htmlFunction

      this.create()
      this.listen()
   }

   create() {
      this.html = document.createElement('card')
      this.hmtl.innerHTML = this.htmlFunction(this.content)
   }

   listen() {
      this.html.addEventListener('mouseenter', () => {
         this.mouseenter()
      })

      this.html.addEventListener('mousedown', (e) => {
         var downArea = e.target.getBoundingClientRect()
         var cardArea = this.html.getBoundingClientRect()

         this.board.mouse.offsetX = -e.offsetX - downArea.left - cardArea.left
         this.board.mouse.offsetY = -e.offsetY - downArea.top - cardArea.top

         this.mousedown()
      })
   }

   mouseenter() {
      console.log('mouse enter')
   }

   mousedown() {
      console.log('mousedown')
   }
}
