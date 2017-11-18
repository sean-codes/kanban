'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kanban = function () {
   function Kanban(options) {
      _classCallCheck(this, Kanban);

      this.selector = options.selector;
      this.lanes = options.lanes;
      this.cards = options.cards;
      this.title = options.title;
      this.content = options.content;
      this.held = undefined;
      this.mouse = { offsetX: 0, offsetY: 0 };
      this.pos = undefined;
      this.posLane = undefined;

      this.html = {};
      this.html.container = document.querySelector(this.selector);
      this.html.board = this.createBoard();
      this.html.cards = [];
      this.html.ghost = document.createElement('ghost');
      this.html.board.appendChild(this.html.ghost);

      // Initialize
      this.html.container.appendChild(this.html.board);
      this.createLanes();
      // this.loadCards()
      // this.addListeners()
   }

   _createClass(Kanban, [{
      key: 'addListeners',
      value: function addListeners() {
         var _this = this;

         window.addEventListener('mouseup', function (e) {
            _this.cardUp();
         });

         window.addEventListener('mousemove', function (e) {
            _this.cardMove(e.clientX, e.clientY);
         });

         document.body.addEventListener('blur', function (e) {
            _this.cardUp();
         });
      }
   }, {
      key: 'cardDown',
      value: function cardDown(card) {
         this.held = card;
      }
   }, {
      key: 'cardUp',
      value: function cardUp() {
         if (this.held) {
            this.html.ghost.style.display = 'none';
            this.held.classList.remove('held');
            this.held = undefined;
         }
      }
   }, {
      key: 'cardMove',
      value: function cardMove(x, y) {
         this.html.ghost.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)';

         var ghostX = x + this.mouse.offsetX;
         var ghostY = y + this.mouse.offsetY;
         var ghostWidth = this.html.ghost.offsetWidth;
         var ghostHeight = this.html.ghost.offsetHeight;
         if (this.held) {
            if (!this.heldmoved) {
               this.held.classList.add('held');
               this.html.ghost.innerHTML = this.held.innerHTML;
               this.html.ghost.style.width = this.held.offsetWidth + 'px';
               this.html.ghost.style.left = this.mouse.offsetX + 'px';
               this.html.ghost.style.top = this.mouse.offsetY + 'px';
               this.html.ghost.style.display = 'block';
            }

            // Auto scrolling lanes
            var lane = this.held.parentElement;
            var laneRect = lane.getBoundingClientRect();
            if (ghostY + ghostHeight > laneRect.top + laneRect.height) {
               lane.scrollTop += ghostY + ghostHeight - (laneRect.top + laneRect.height);
            }

            if (ghostY < laneRect.top) {
               lane.scrollTop -= laneRect.top - ghostY;
            }

            // Auto scrolling board
            var boardRect = this.html.board.getBoundingClientRect();
            if (ghostX < boardRect.left) {
               this.html.board.scrollLeft -= boardRect.left - ghostX;
            }

            if (ghostX + ghostWidth > boardRect.left + boardRect.width) {
               this.html.board.scrollLeft += ghostX + ghostWidth - (boardRect.left + boardRect.width);
            }
         }
      }
   }, {
      key: 'laneHide',
      value: function laneHide(lane) {
         lane.classList.toggle('collapse');
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
   }, {
      key: 'createBoard',
      value: function createBoard() {
         return document.createElement('kanban');
      }
   }, {
      key: 'createLanes',
      value: function createLanes() {
         var _this2 = this;

         this.lanes.forEach(function (lane) {
            return _this2.createLane(lane);
         });
      }
   }, {
      key: 'createLane',
      value: function createLane(lane) {
         var kabbanLane = new KanbanLane(this, lane, this.title);
         kabbanLane.mouseEnterLane = this.dragCardToLane;
         this.html.board.appendChild(kabbanLane.html.lane);
      }
   }, {
      key: 'createCards',
      value: function createCards() {
         var _this3 = this;

         this.cards.forEach(function (card) {
            return _this3.createCard(card);
         });
      }
   }, {
      key: 'createCard',
      value: function createCard(card) {
         // var newCard = this.cardCreate(card)
         // this.html.cards.push(newCard)
         // this.getLaneCardHolder(card.lane).appendChild(newCard)
      }
   }, {
      key: 'getLaneCardHolder',
      value: function getLaneCardHolder(name) {
         var selector = 'lane[name=' + name + '] lane-cards';
         return this.html.board.querySelector(selector);
      }
   }, {
      key: 'moveCardToLane',
      value: function moveCardToLane() {
         console.log('test');
      }
   }]);

   return Kanban;
}();

var KanbanCard = function () {
   function KanbanCard(board, content, htmlFunction) {
      _classCallCheck(this, KanbanCard);

      this.board = board;
      this.content = content;
      this.htmlFunction = htmlFunction;

      this.create();
      this.listen();
   }

   _createClass(KanbanCard, [{
      key: 'create',
      value: function create() {
         this.html = document.createElement('card');
         this.hmtl.innerHTML = this.htmlFunction(this.content);
      }
   }, {
      key: 'listen',
      value: function listen() {
         var _this4 = this;

         this.html.addEventListener('mouseenter', function () {
            _this4.mouseenter();
         });

         this.html.addEventListener('mousedown', function (e) {
            var downArea = e.target.getBoundingClientRect();
            var cardArea = _this4.html.getBoundingClientRect();

            _this4.board.mouse.offsetX = -e.offsetX - downArea.left - cardArea.left;
            _this4.board.mouse.offsetY = -e.offsetY - downArea.top - cardArea.top;

            _this4.mousedown();
         });
      }
   }, {
      key: 'mouseenter',
      value: function mouseenter() {
         console.log('mouse enter');
      }
   }, {
      key: 'mousedown',
      value: function mousedown() {
         console.log('mousedown');
      }
   }]);

   return KanbanCard;
}();

var KanbanLane = function () {
   function KanbanLane(board, lane, titleHTML) {
      _classCallCheck(this, KanbanLane);

      this.board = board;
      this.id = lane.id;
      this.content = lane.content;
      this.titleHTML = titleHTML;
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
         this.html.title.innerHTML = this.titleHTML(this.content);
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
         this.board.moveCardToLane(this);
      }
   }, {
      key: 'toggle',
      value: function toggle() {
         this.html.lane.classList.toggle('collapse');
      }
   }]);

   return KanbanLane;
}();