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
      this.loadLanes();
      this.loadCards();
      this.addListeners();
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
         console.log(lane);
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
      key: 'cardCreate',
      value: function cardCreate(card) {
         var cardEle = document.createElement('card');
         cardEle.innerHTML = this.content(card.content);

         var that = this;

         cardEle.addEventListener('mouseenter', function (e) {
            that.cardDragOver(this);
         });

         cardEle.addEventListener('mousedown', function (e) {
            // Click Offset
            var downBox = e.target.getBoundingClientRect();
            var cardBox = this.getBoundingClientRect();
            that.mouse = {
               offsetX: -e.offsetX - (downBox.left - cardBox.left),
               offsetY: -e.offsetY - (downBox.top - cardBox.top)
            };
            that.cardDown(this);
         });

         return cardEle;
      }
   }, {
      key: 'createLane',
      value: function createLane(lane) {
         var laneEle = document.createElement('lane');
         var titleEle = document.createElement('lane-title');
         var cardsEle = document.createElement('lane-cards');

         laneEle.setAttribute('name', lane.name);
         titleEle.innerHTML = this.title(lane.title);

         var that = this;
         cardsEle.addEventListener('mouseenter', function (e) {
            that.cardDragOver(this);
         });

         titleEle.addEventListener('click', function (e) {
            that.laneHide(this.parentElement);
         });

         laneEle.appendChild(titleEle);
         laneEle.appendChild(cardsEle);
         return laneEle;
      }
   }, {
      key: 'createBoard',
      value: function createBoard() {
         return document.createElement('kanban');
      }
   }, {
      key: 'loadLanes',
      value: function loadLanes() {
         var _iteratorNormalCompletion = true;
         var _didIteratorError = false;
         var _iteratorError = undefined;

         try {
            for (var _iterator = this.lanes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
               var lane = _step.value;

               this.html.board.appendChild(this.createLane(lane));
            }
         } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
         } finally {
            try {
               if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
               }
            } finally {
               if (_didIteratorError) {
                  throw _iteratorError;
               }
            }
         }
      }
   }, {
      key: 'loadCards',
      value: function loadCards() {
         var _iteratorNormalCompletion2 = true;
         var _didIteratorError2 = false;
         var _iteratorError2 = undefined;

         try {
            for (var _iterator2 = this.cards[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
               var card = _step2.value;

               this.loadCard(card);
            }
         } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
         } finally {
            try {
               if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
               }
            } finally {
               if (_didIteratorError2) {
                  throw _iteratorError2;
               }
            }
         }
      }
   }, {
      key: 'loadCard',
      value: function loadCard(card) {
         var newCard = this.cardCreate(card);
         this.html.cards.push(newCard);
         this.getLaneCardHolder(card.lane).appendChild(newCard);
      }
   }, {
      key: 'getLaneCardHolder',
      value: function getLaneCardHolder(name) {
         var selector = 'lane[name=' + name + '] lane-cards';
         return this.html.board.querySelector(selector);
      }
   }]);

   return Kanban;
}();