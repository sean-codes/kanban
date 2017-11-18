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
      this.addListeners();
   }

   _createClass(KanbanBoard, [{
      key: 'create',
      value: function create() {
         this.html.container = document.querySelector(this.selector);
         this.html.board = this.createBoard();
         this.html.container.appendChild(this.html.board);
         this.html.cards = [];
      }
   }, {
      key: 'createGhost',
      value: function createGhost() {
         this.ghost = new KanbanGhost(this.html.board);
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
         this.ghost.lane = this.findLane(laneID);
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
         if (this.heldCard) {
            this.putCardAroundCard(this.heldCard.id, card.id);
         }
      }
   }, {
      key: 'mouseDownOnCard',
      value: function mouseDownOnCard(card, offX, offY) {
         this.heldCard = card;
         this.heldCard.grab();
         this.ghost.grab(card);
      }
   }, {
      key: 'mouseUp',
      value: function mouseUp() {
         this.heldCard.drop();
         this.ghost.hide();
         this.heldCard = undefined;
      }
   }, {
      key: 'mouseMove',
      value: function mouseMove(x, y) {
         if (this.heldCard) {
            if (!this.heldCard.moved) {
               this.heldCard.hold();
               this.ghost.show();
            }
            this.ghost.move(x, y);
         }
      }
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
         this.grabHeight = cardArea.height;
         this.grabOffsetX = -e.offsetX - (downArea.left - cardArea.left);
         this.grabOffsetY = -e.offsetY - (downArea.top - cardArea.top);
         this.onMouseDown(this);
      }
   }]);

   return KanbanCard;
}();

var KanbanGhost = function () {
   function KanbanGhost(board) {
      _classCallCheck(this, KanbanGhost);

      this.board = board;
      this.lane = undefined;
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
         this.height = card.grabHeight;
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

         this.html.cards.addEventListener('mouseenter', function (e) {
            _this5.mouseenter(e);
         });
         this.html.title.addEventListener('click', function (e) {
            _this5.toggle(e);
         });
      }
   }, {
      key: 'mouseenter',
      value: function mouseenter(e) {
         this.onMouseEnterLane(this);
      }
   }, {
      key: 'toggle',
      value: function toggle() {
         this.html.lane.classList.toggle('collapse');
      }

      // These are a bit spookey I would just leave them alone for now

   }, {
      key: 'append',
      value: function append(card) {
         card.lane = this.id;
         if (!card.movedToCardAndLane) this.html.cards.appendChild(card.html);
         card.movedToCardAndLane = false;
      }
   }, {
      key: 'appendCardAroundCard',
      value: function appendCardAroundCard(card1, card2) {
         card1.lane = this.id;
         card1.movedToCardAndLane = card1.html.parentElement != card2.html.parentElement;
         if (!card2.html.nextSibling && !card1.movedToCardAndLane) {
            this.append(card1);
            return;
         }

         this.html.cards.insertBefore(card1.html, card2.html);
      }
   }]);

   return KanbanLane;
}();