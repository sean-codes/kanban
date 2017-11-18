## Classes

<dl>
<dt><a href="#KanbanGhostCard">KanbanGhostCard</a></dt>
<dd><p>A Kanban Ghost Card</p>
</dd>
<dt><a href="#KanbanBoard">KanbanBoard</a></dt>
<dd><p>A Kanban Board</p>
</dd>
<dt><a href="#KanbanCard">KanbanCard</a></dt>
<dd><p>A Kanban Card</p>
</dd>
<dt><a href="#KanbanLane">KanbanLane</a></dt>
<dd><p>A Kanban Lane</p>
</dd>
</dl>

<a name="KanbanGhostCard"></a>

## KanbanGhostCard
A Kanban Ghost Card

**Kind**: global class  

* [KanbanGhostCard](#KanbanGhostCard)
    * [new KanbanGhostCard(board)](#new_KanbanGhostCard_new)
    * [.grab(card)](#KanbanGhostCard+grab)
    * [.show()](#KanbanGhostCard+show)
    * [.hide()](#KanbanGhostCard+hide)
    * [.move(x, y)](#KanbanGhostCard+move)

<a name="new_KanbanGhostCard_new"></a>

### new KanbanGhostCard(board)
Create a new ghost card


| Param | Type | Description |
| --- | --- | --- |
| board | <code>KanBanBoard</code> | the board to add to |

<a name="KanbanGhostCard+grab"></a>

### kanbanGhostCard.grab(card)
Copy the contents of the grabbed card to the ghost

**Kind**: instance method of [<code>KanbanGhostCard</code>](#KanbanGhostCard)  

| Param | Type | Description |
| --- | --- | --- |
| card | [<code>KanbanCard</code>](#KanbanCard) | the card to copy |

<a name="KanbanGhostCard+show"></a>

### kanbanGhostCard.show()
Show the ghost card

**Kind**: instance method of [<code>KanbanGhostCard</code>](#KanbanGhostCard)  
<a name="KanbanGhostCard+hide"></a>

### kanbanGhostCard.hide()
Hide the ghost card

**Kind**: instance method of [<code>KanbanGhostCard</code>](#KanbanGhostCard)  
<a name="KanbanGhostCard+move"></a>

### kanbanGhostCard.move(x, y)
Move the ghost card

**Kind**: instance method of [<code>KanbanGhostCard</code>](#KanbanGhostCard)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | x coordinate |
| y | <code>number</code> | y coordinate |

<a name="KanbanBoard"></a>

## KanbanBoard
A Kanban Board

**Kind**: global class  

* [KanbanBoard](#KanbanBoard)
    * [new KanbanBoard(selector)](#new_KanbanBoard_new)
    * [.addLane(lane)](#KanbanBoard+addLane)
    * [.addCard(card, laneID)](#KanbanBoard+addCard)
    * [.findLane(laneID)](#KanbanBoard+findLane)
    * [.findCard(cardID)](#KanbanBoard+findCard)
    * [.putCardInLane(cardID, laneID)](#KanbanBoard+putCardInLane)
    * [.putCardAroundCard(cardID1, cardID2)](#KanbanBoard+putCardAroundCard)

<a name="new_KanbanBoard_new"></a>

### new KanbanBoard(selector)
Create a kanban board


| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | the selector for the container |

<a name="KanbanBoard+addLane"></a>

### kanbanBoard.addLane(lane)
Adds a lane to the board

**Kind**: instance method of [<code>KanbanBoard</code>](#KanbanBoard)  

| Param | Type | Description |
| --- | --- | --- |
| lane | [<code>KanbanLane</code>](#KanbanLane) | the kanban lane to add |

<a name="KanbanBoard+addCard"></a>

### kanbanBoard.addCard(card, laneID)
Adds a card to the board

**Kind**: instance method of [<code>KanbanBoard</code>](#KanbanBoard)  

| Param | Type | Description |
| --- | --- | --- |
| card | [<code>KanbanCard</code>](#KanbanCard) | the kanban card to add |
| laneID | <code>laneID</code> | lane to add in |

<a name="KanbanBoard+findLane"></a>

### kanbanBoard.findLane(laneID)
Finds a lane on the board

**Kind**: instance method of [<code>KanbanBoard</code>](#KanbanBoard)  

| Param | Type | Description |
| --- | --- | --- |
| laneID | <code>string</code> | the lane ID of the lane to find |

<a name="KanbanBoard+findCard"></a>

### kanbanBoard.findCard(cardID)
Finds a card on the board

**Kind**: instance method of [<code>KanbanBoard</code>](#KanbanBoard)  

| Param | Type | Description |
| --- | --- | --- |
| cardID | <code>string</code> | the card ID of the card to find |

<a name="KanbanBoard+putCardInLane"></a>

### kanbanBoard.putCardInLane(cardID, laneID)
Moves a card to a lane at the end

**Kind**: instance method of [<code>KanbanBoard</code>](#KanbanBoard)  

| Param | Type | Description |
| --- | --- | --- |
| cardID | <code>string</code> | the card ID to move |
| laneID | <code>string</code> | the lane ID to put the card in |

<a name="KanbanBoard+putCardAroundCard"></a>

### kanbanBoard.putCardAroundCard(cardID1, cardID2)
Puts a card around a card

**Kind**: instance method of [<code>KanbanBoard</code>](#KanbanBoard)  

| Param | Type | Description |
| --- | --- | --- |
| cardID1 | <code>string</code> | the card ID to move |
| cardID2 | <code>string</code> | the card ID to put around |

<a name="KanbanCard"></a>

## KanbanCard
A Kanban Card

**Kind**: global class  
<a name="new_KanbanCard_new"></a>

### new KanbanCard(id, content, template)
Create a new kanban card


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | the selector for the container |
| content | <code>any</code> | content to be put in the card |
| template | <code>function</code> | the template to use on the card |

<a name="KanbanLane"></a>

## KanbanLane
A Kanban Lane

**Kind**: global class  

* [KanbanLane](#KanbanLane)
    * [new KanbanLane(id, content, template)](#new_KanbanLane_new)
    * [.toggle()](#KanbanLane+toggle)

<a name="new_KanbanLane_new"></a>

### new KanbanLane(id, content, template)
Create a new ghost card


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | the id of the lane |
| content | <code>string</code> | the content to put in the title |
| template | <code>function</code> | the template function for the title |

<a name="KanbanLane+toggle"></a>

### kanbanLane.toggle()
Toggle the lane open or minimized

**Kind**: instance method of [<code>KanbanLane</code>](#KanbanLane)  
