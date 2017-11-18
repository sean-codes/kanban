'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** A Kanban Ghost Card */
var KanbanGhostCard = function () {
   /**
    * Create a new ghost card
    * @param {KanBanBoard} board - the board to add to
    **/
   function KanbanGhostCard(board) {
      _classCallCheck(this, KanbanGhostCard);

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

   /**
   * Create a new ghost card html
   * @private
   **/


   _createClass(KanbanGhostCard, [{
      key: 'create',
      value: function create() {
         this.html = document.createElement('ghost');
      }

      /**
      * Copy the contents of the grabbed card to the ghost
      * @param {KanbanCard} card - the card to copy
      **/

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

      /**
      * Show the ghost card
      **/

   }, {
      key: 'show',
      value: function show() {
         this.display = 'block';
         this.setStyles();
      }

      /**
      * Hide the ghost card
      **/

   }, {
      key: 'hide',
      value: function hide() {
         this.display = 'none';
         this.setStyles();
      }

      /**
      * Move the ghost card
      * @param {number} x - x coordinate
      * @param {number} y - y coordinate
      **/

   }, {
      key: 'move',
      value: function move(x, y) {
         this.x = x;
         this.y = y;
         this.setStyles();
      }

      /**
      * Sets the styles
      * @private
      **/

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

   return KanbanGhostCard;
}();

/** A Kanban Board */


var KanbanBoard = function () {
   /**
    * Create a kanban board
    * @param {string} selector - the selector for the container
    **/
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

   /**
    * Creates the board, appends to the container
    * @private
    **/


   _createClass(KanbanBoard, [{
      key: 'create',
      value: function create() {
         this.html.container = document.querySelector(this.selector);
         this.html.board = document.createElement('kanban');
         this.html.container.appendChild(this.html.board);
         this.html.cards = [];
      }

      /**
       * Creates the Ghost element that will follow the cursor
       * @private
       **/

   }, {
      key: 'createGhost',
      value: function createGhost() {
         this.ghost = new KanbanGhostCard(this.html.board);
         this.html.board.appendChild(this.ghost.html);
      }

      /**
       * Adds event listeners for global events
       * @private
       **/

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

      /**
       * Adds a lane to the board
       * @param {KanbanLane} lane - the kanban lane to add
       **/

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

      /**
       * Adds a card to the board
       * @param {KanbanCard} card - the kanban card to add
       * @param {laneID} laneID - lane to add in
       **/

   }, {
      key: 'addCard',
      value: function addCard(card, laneID) {
         var _this3 = this;

         this.cards.push(card);
         card.onMouseEnter = function (card) {
            _this3.mouseEnterCard(card);
         };
         card.onMouseDown = function (card, offX, offY) {
            _this3.mouseDownOnCard(card, offX, offY);
         };
         this.putCardInLane(card.id, laneID);
      }

      /**
       * Finds a lane on the board
       * @param {string} laneID - the lane ID of the lane to find
       **/

   }, {
      key: 'findLane',
      value: function findLane(laneID) {
         return this.lanes.find(function (e) {
            return e.id == laneID;
         });
      }

      /**
       * Finds a card on the board
       * @param {string} cardID - the card ID of the card to find
       **/

   }, {
      key: 'findCard',
      value: function findCard(cardID) {
         return this.cards.find(function (e) {
            return e.id == cardID;
         });
      }

      /**
       * Moves a card to a lane at the end
       * @param {string} cardID - the card ID to move
       * @param {string} laneID - the lane ID to put the card in
       **/

   }, {
      key: 'putCardInLane',
      value: function putCardInLane(cardID, laneID) {
         this.ghost.lane = this.findLane(laneID);
         this.findLane(laneID).append(this.findCard(cardID));
      }

      /**
       * Puts a card around a card
       * @param {string} cardID1 - the card ID to move
       * @param {string} cardID2 - the card ID to put around
       **/

   }, {
      key: 'putCardAroundCard',
      value: function putCardAroundCard(cardID1, cardID2) {
         var card1 = this.findCard(cardID1);
         var card2 = this.findCard(cardID2);
         if (card1.id == card2.id) return;
         this.findLane(card2.lane).appendCardAroundCard(card1, card2);
      }

      /**
       * Fires when the mouse enters a lane
       * @param {KanbanLane} lane - the lane the mouse entered
       * @private
       **/

   }, {
      key: 'mouseEnterLane',
      value: function mouseEnterLane(lane) {
         if (this.heldCard) {
            this.putCardInLane(this.heldCard.id, lane.id);
         }
      }

      /**
       * Fires when the mouse enters a card
       * @param {KanbanCard} card - the card the mouse entered
       * @private
       **/

   }, {
      key: 'mouseEnterCard',
      value: function mouseEnterCard(card) {
         if (this.heldCard) {
            this.putCardAroundCard(this.heldCard.id, card.id);
         }
      }

      /**
       * Fires when the mouse presses down on a card
       * @param {KanbanCard} card - the card the mouse clicked
       * @private
       **/

   }, {
      key: 'mouseDownOnCard',
      value: function mouseDownOnCard(card) {
         this.heldCard = card;
         this.heldCard.grab();
         this.ghost.grab(card);
      }

      /**
       * Fires when the mouse comes up
       * @private
       **/

   }, {
      key: 'mouseUp',
      value: function mouseUp() {
         this.heldCard.drop();
         this.ghost.hide();
         this.heldCard = undefined;
      }

      /**
       * Fires when the mouse moves
       * @param {number} x - the mouse x pos
       * @param {number} y - the mouse y pos
       * @private
       **/

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

/** A Kanban Card */


var KanbanCard = function () {
   /**
    * Create a new kanban card
    * @param {string} id - the selector for the container
    * @param {any} content - content to be put in the card
    * @param {function} template - the template to use on the card
    **/
   function KanbanCard(id, content, template) {
      _classCallCheck(this, KanbanCard);

      this.id = id;
      this.lane = undefined;
      this.content = content;
      this.template = template;
      this.html = {};

      this.create();
      this.listen();
   }

   /**
    * Creates the html element
    * @private
    **/


   _createClass(KanbanCard, [{
      key: 'create',
      value: function create() {
         this.html = document.createElement('card');
         this.html.innerHTML = this.template(this.content);
      }

      /**
       * Listens for card events
       * @private
       **/

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

      /**
       * what to do when grabbed
       * @private
       **/

   }, {
      key: 'grab',
      value: function grab() {
         this.moved = false;
      }

      /**
       * what to do when held
       * @private
       **/

   }, {
      key: 'hold',
      value: function hold() {
         this.moved = true;
         this.html.classList.add('held');
      }

      /**
       * what to do when dropped
       * @private
       **/

   }, {
      key: 'drop',
      value: function drop() {
         this.html.classList.remove('held');
      }

      /**
       * called when mouse enters
       * @private
       **/

   }, {
      key: 'mouseenter',
      value: function mouseenter() {
         this.onMouseEnter(this);
      }

      /**
       * called when mouse pressed
       * @private
       **/

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

/** A Kanban Lane */


var KanbanLane = function () {
   /**
    * Create a new ghost card
    * @param {string} id - the id of the lane
    * @param {string} content - the content to put in the title
    * @param {function} template - the template function for the title
    **/
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

   /**
    * Creates the lane html
    * @private
    */


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

      /**
       * Listens for events
       * @private
       */

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

      /**
       * What to do when mouse enters
       * @private
       */

   }, {
      key: 'mouseenter',
      value: function mouseenter(e) {
         this.onMouseEnterLane(this);
      }

      /**
       * Toggle the lane open or minimized
       */

   }, {
      key: 'toggle',
      value: function toggle() {
         this.html.lane.classList.toggle('collapse');
      }

      /**
       * Listens for events
       * @private
       * @param {KanbanCard} card - the card to append
       */

   }, {
      key: 'append',
      value: function append(card) {
         card.lane = this.id;
         if (!card.movedToCardAndLane) this.html.cards.appendChild(card.html);
         card.movedToCardAndLane = false;
      }

      /**
       * Listens for events
       * @private
       * @param {KanbanCard} card1 - the card to append
       * @param {KanbanCard} card2 - the card to look for a position around
       */

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