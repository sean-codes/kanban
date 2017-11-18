# kanban
> Pure JavaScript KanBan:

## Demo
![example](https://sean-codes.github.io/kanban/image.gif)

Live Demo: [open](https://sean-codes.github.io/kanban/example/demo.html)

## Quick Start
```js

   // Create board
   var myKanban = new KanbanBoard('#kanBanContainer')

   // Add Lanes
   myKanban.addLane(new KanbanLane('lane1ID', 'Lane 1 Title'))
   myKanban.addLane(new KanbanLane('lane2ID', 'Lane 2 Title'))

   // Add Cards
   myKanBan.addCard(new KanbanCard('cardID', content), laneID)
```

## Documentation

Detailed Docs: [docs](https://sean-codes.github.io/kanban/docs/gen)

#### Class [`KanbanBoard`](https://sean-codes.github.io/kanban/docs/gen/KanbanBoard.html)

Arguments: (selector)
Creates and appends a board

#### Class [`KanbanLane`](https://sean-codes.github.io/kanban/docs/gen/KanbanLane.html)
Arguments: (laneID, laneContent, [laneTemplate])
Creates a lane. Add to board using `KanbanBoard.addLane()``

#### Class [`KanbanCard`](https://sean-codes.github.io/kanban/docs/gen/KanbanCard.html)
Arguments: (cardID, content, [cardTemplate])
Creates a card. Add to board using KanbanBoard.addCard(KanbanCard, laneID)

### Templates
A lane and card can both use templates for their content. A template is a callback function that returns the html for a title/template. This is for adding buttons/designs.

```js
   // Default Template: Only returns the content
   var laneTemplate = (content) => { return content }

   // Example Card template with a title/container!
   var cardTemplate = (content) => { return `
      <mycard-container>
         <mycard-content>
            <mycard-title>${content.title}</mycard-title>
            <mycard-text class="bg-${content.status}">
               ${content.text}
            </mycard-text>
         <mycard-content>
      </mycard-container>
   `}
```
