# kanban
> Pure JavaScript KanBan:

## Demo
![example](https://github.com/sean-codes/kanban/blob/master/image.gif?raw=true)
Try out the [demo](https://sean-codes.github.io/kanban/example/demo.html)

## Setup
```js

   // Create board
   var myKanban = new KanbanBoard('#kanBanContainer')

   // Add Lanes
   myKanban.addLane(new KanbanLane('lane1ID', 'Lane 1 Title'))
   myKanban.addLane(new KanbanLane('lane2ID', 'Lane 2 Title'))

   // Add Cards
   myKanBan.addCard(new KanbanCard('cardID', 'lane1ID', content))
```

The options are detailed below.

#### Class KanbanBoard(selector)
Creates and appends a board

#### Class `KanbanLane(laneID, laneContent, [laneTemplate])`
A lane

#### Class `KanbanCard(cardID, laneID, content, [cardTemplate])`
A card

### Templates
A lane and card can both use templates for their content. A template is a callback function that returns the html for a title/template. This is for adding buttons/designs.
