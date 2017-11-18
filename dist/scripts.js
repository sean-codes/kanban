'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KanbanBoard = function () {
   function KanbanBoard(selector) {
      _classCallCheck(this, KanbanBoard);

      this.selector = selector;
      this.lanes = [];
      this.cards = [];
      this.heldCard = undefined;
      this.heldCardMoved = false;

      this.html = {};
      this.create();
      this.createGhost();

      // Initialize
      this.html.container.appendChild(this.html.board);
      this.addListeners();
   }

   _createClass(KanbanBoard, [{
      key: 'create',
      value: function create() {
         this.html.container = document.querySelector(this.selector);
         this.html.board = this.createBoard();
         this.html.cards = [];
      }
   }, {
      key: 'createGhost',
      value: function createGhost() {
         this.ghost = new KanbanGhost();
         this.html.board.appendChild(this.ghost.html);
      }
   }, {
      key: 'addListeners',
      value: function addListeners() {
         var _this = this;

         window.addEventListener('mouseup', function (e) {
            _this.mouseUp();
         });
         window.addEventListener('mousemove', function (e) {
            _this.mouseMove(e.clientX, e.clientY);
         });
         document.body.addEventListener('blur', function (e) {
            _this.cardUp();
         });
      }
   }, {
      key: 'createBoard',
      value: function createBoard() {
         return document.createElement('kanban');
      }
   }, {
      key: 'addLane',
      value: function addLane(lane) {
         var _this2 = this;

         this.lanes.push(lane);
         lane.onMouseEnterLane = function (lane) {
            _this2.mouseEnterLane(lane);
         };
         this.html.board.appendChild(lane.html.lane);
      }
   }, {
      key: 'addCard',
      value: function addCard(card) {
         var _this3 = this;

         this.cards.push(card);
         card.onMouseEnter = function (card) {
            _this3.mouseEnterCard(card);
         };
         card.onMouseDown = function (card, offX, offY) {
            _this3.mouseDownOnCard(card, offX, offY);
         };
         this.putCardInLane(card.id, card.lane);
      }
   }, {
      key: 'findLane',
      value: function findLane(laneID) {
         return this.lanes.find(function (e) {
            return e.id == laneID;
         });
      }
   }, {
      key: 'findCard',
      value: function findCard(cardID) {
         return this.cards.find(function (e) {
            return e.id == cardID;
         });
      }
   }, {
      key: 'putCardInLane',
      value: function putCardInLane(cardID, laneID) {
         this.findLane(laneID).append(this.findCard(cardID));
      }
   }, {
      key: 'putCardAroundCard',
      value: function putCardAroundCard(cardID1, cardID2) {
         var card1 = this.findCard(cardID1);
         var card2 = this.findCard(cardID2);
         if (card1.id == card2.id) return;
         this.findLane(card2.lane).appendCardAroundCard(card1, card2);
      }

      // All the events

   }, {
      key: 'mouseEnterLane',
      value: function mouseEnterLane(lane) {
         if (this.heldCard) {
            this.putCardInLane(this.heldCard.id, lane.id);
         }
      }
   }, {
      key: 'mouseEnterCard',
      value: function mouseEnterCard(card) {
         console.log('board knows: mouse enter card');
         if (this.heldCard) {
            console.log('Put Card above');
            this.putCardAroundCard(this.heldCard.id, card.id);
         }
         // move card to the lane
      }
   }, {
      key: 'mouseDownOnCard',
      value: function mouseDownOnCard(card, offX, offY) {
         console.log('board knows: mouse down card');
         this.heldCard = card;
         this.heldCard.grab();
         this.ghost.grab(card);
      }
   }, {
      key: 'mouseUp',
      value: function mouseUp() {
         console.log('board knows: mouse up');
         this.heldCard.drop();
         this.ghost.hide();
         this.heldCard = undefined;
      }
   }, {
      key: 'mouseMove',
      value: function mouseMove(x, y) {
         console.log('board knows: mouse move');
         if (this.heldCard) {
            if (!this.heldCard.moved) {
               this.heldCard.hold();
               this.ghost.show();
            }
            this.ghost.move(x, y);
         }
      }
   }, {
      key: 'cardDragOver',
      value: function cardDragOver(ele) {
         // Chrome - Safari: Move to lane hack
         if (!this.held || ele == this.held) return;
         if (ele.tagName.toLowerCase() == 'lane-cards') {
            // Safari calls child first skip this
            if (!this.movedToCardAndLane) ele.appendChild(this.held);
            this.movedToLane = true;
            this.movedToCardAndLane = false;
            return;
         }

         // Chrome calls parent first
         // If that happened OR safari calls child first. Set above
         this.movedToCardAndLane = ele.parentElement != this.held.parentElement;
         ele.nextSibling == this.held || this.movedToLane || this.movedToCardAndLane ? ele.parentElement.insertBefore(this.held, ele) : ele.parentElement.insertBefore(this.held, ele.nextSibling);

         this.movedToLane = false;
      }

      // This one will get scarey

   }, {
      key: 'scroll',
      value: function scroll() {}
   }]);

   return KanbanBoard;
}();

var KanbanCard = function () {
   function KanbanCard(id, lane, content, template) {
      _classCallCheck(this, KanbanCard);

      this.id = id;
      this.lane = lane;
      this.content = content;
      this.template = template;
      this.html = {};

      this.create();
      this.listen();
   }

   _createClass(KanbanCard, [{
      key: 'create',
      value: function create() {
         this.html = document.createElement('card');
         this.html.innerHTML = this.template(this.content);
      }
   }, {
      key: 'listen',
      value: function listen() {
         var _this4 = this;

         this.html.addEventListener('mouseenter', function (e) {
            _this4.mouseenter(e);
         });
         this.html.addEventListener('mousedown', function (e) {
            _this4.mousedown(e);
         });
      }
   }, {
      key: 'grab',
      value: function grab() {
         this.moved = false;
      }
   }, {
      key: 'hold',
      value: function hold() {
         this.moved = true;
         this.html.classList.add('held');
      }
   }, {
      key: 'drop',
      value: function drop() {
         this.html.classList.remove('held');
      }
   }, {
      key: 'mouseenter',
      value: function mouseenter() {
         this.onMouseEnter(this);
      }
   }, {
      key: 'mousedown',
      value: function mousedown(e) {
         var downArea = e.target.getBoundingClientRect();
         var cardArea = this.html.getBoundingClientRect();
         this.grabWidth = cardArea.width;
         this.grabOffsetX = -e.offsetX - (downArea.left - cardArea.left);
         this.grabOffsetY = -e.offsetY - (downArea.top - cardArea.top);
         this.onMouseDown(this);
      }
   }]);

   return KanbanCard;
}();

var KanbanGhost = function () {
   function KanbanGhost() {
      _classCallCheck(this, KanbanGhost);

      this.x = 0;
      this.y = 0;
      this.width = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.display = 'none';
      this.create();
   }

   _createClass(KanbanGhost, [{
      key: 'create',
      value: function create() {
         this.html = document.createElement('ghost');
      }
   }, {
      key: 'grab',
      value: function grab(card) {
         this.html.innerHTML = card.html.innerHTML;
         this.width = card.grabWidth;
         this.offsetX = card.grabOffsetX;
         this.offsetY = card.grabOffsetY;
         this.setStyles();
      }
   }, {
      key: 'show',
      value: function show() {
         this.display = 'block';
         this.setStyles();
      }
   }, {
      key: 'hide',
      value: function hide() {
         this.display = 'none';
         this.setStyles();
      }
   }, {
      key: 'move',
      value: function move(x, y) {
         this.x = x;
         this.y = y;
         this.setStyles();
         /*
         var ghostLeft = x + this.offsetX
         var ghostRight = x + this.offsetX + this.width
         var ghostTop = y + this.offsetY
         var ghostBottom = y + this.offsetY + this.height
          if(!this.html.style.display == 'none'){
            this.held.classList.add('held')
            this.html.ghost.innerHTML = this.held.innerHTML
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
         */
      }
   }, {
      key: 'setStyles',
      value: function setStyles() {
         this.html.style.transform = 'translateX(' + this.x + 'px) translateY(' + this.y + 'px)';
         this.html.style.width = this.width + 'px';
         this.html.style.left = this.offsetX + 'px';
         this.html.style.top = this.offsetY + 'px';
         this.html.style.display = this.display;
      }
   }]);

   return KanbanGhost;
}();

var KanbanLane = function () {
   function KanbanLane(id, content, template) {
      _classCallCheck(this, KanbanLane);

      this.id = id;
      this.content = content;
      this.template = template;
      this.html = {
         lane: undefined,
         title: undefined,
         cards: undefined
      };

      this.create();
      this.listen();
   }

   _createClass(KanbanLane, [{
      key: 'create',
      value: function create() {
         this.html.lane = document.createElement('lane');
         this.html.title = document.createElement('lane-title');
         this.html.cards = document.createElement('lane-cards');

         this.html.lane.id = this.id;
         this.html.title.innerHTML = this.template(this.content);
         this.html.lane.appendChild(this.html.title);
         this.html.lane.appendChild(this.html.cards);
      }
   }, {
      key: 'listen',
      value: function listen() {
         var _this5 = this;

         this.html.cards.addEventListener('mouseenter', function () {
            _this5.mouseenter();
         });
         this.html.title.addEventListener('click', function () {
            _this5.toggle();
         });
      }
   }, {
      key: 'mouseenter',
      value: function mouseenter() {
         this.onMouseEnterLane(this);
      }
   }, {
      key: 'toggle',
      value: function toggle() {
         this.html.lane.classList.toggle('collapse');
      }
   }, {
      key: 'append',
      value: function append(card) {
         this.html.cards.appendChild(card.html);
         card.lane = this.id;
      }
   }, {
      key: 'appendCardAroundCard',
      value: function appendCardAroundCard(card1, card2) {
         !card2.html.nextSibling ? this.append(card1) : this.html.cards.insertBefore(card1.html, card2.html);
         card1.lane = this.id;
      }
   }]);

   return KanbanLane;
}();