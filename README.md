# kanban
> Pure JavaScript KanBan: 

## Demo
![example](https://github.com/sean-codes/kanban/blob/master/image.gif?raw=true)
Try out the [demo](https://sean-codes.github.io/kanban/example/basic.html)

## Setup
```js
var kanban = new Kanban({
   selector: '#myKanBan',
   lanes: [
      { title: 'Lane 1', name: 'lane1' }
   ],
   title: (title) => { return title },
   content: (content) => { content },
   cards: [ 
       {
           lane: 'lane1',
           content: 'Test Card 1'
       },
       {
           lane: 'lane2',
           content: 'Test Card 2'
       }
   ]
})
```

The options are detailed below.

#### `lanes [array]` 

An array of lanes. A lane has title and id. The title value is passed to the title callback

#### `cards [array]`

An array of cards. A card requires a lane and content. The content value is passed to the content callback

#### `title [function`

Called when creating a lane. return the html to be placed within lane title

#### `content [function]`

Called when creating a card. return the html to be placed within a cards content

