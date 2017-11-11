function Slide(node, prev, next) {
    this.prev = prev;
    this.next = next;
    this.node = node;

    this.getNode = function () {
        return this.node;
    };

    this.setNode = function (node) {
        this.node = node
    };

    this.getNext = function () {
        return this.next;
    };

    this.setNext = function (node) {
        this.next = node;
    };

    this.getPrev = function () {
        return this.prev;
    };

    this.setPrev = function (node) {
        this.prev = node;
    };
}


function Slider() {
    this.first = this.last = this.current = null;


    this.getCurrent = function () {
        activeSlide = document.querySelector('.active');
        var index = activeSlide.getAttribute("data-id");
        return this.get(index);
    };

    this.add = function (node) {
        var slide = new Slide(node, null, null);
        if (this.first === null) {
            this.first = this.last = slide;
        } else {
            slide.setPrev(this.last);
            this.last = slide;
            slide.getPrev().setNext(this.last);
            this.last.setNext(null);

        }
        return slide;
    };

    this.get = function (index) {
        this.current = this.first;
        var counter = 0, needle = null;
        while (this.current !== null) {
            if (counter === index) {
                needle = this.current;
            }
            this.current = this.current.getNext();
            counter++;
        }
        return needle;
    };

    this.hasNext = function (node) {
        var index = node.getAttribute("data-id");
        this.current = this.get(index);
        return this.current.getNext() !== null;
    };

    this.getSize = function () {
        this.current = this.first;
        var counter = 0;
        while (this.current !== null) {
            this.current = this.current.getNext();
            counter++;
        }
        return counter;
    };

    this.slideLeft = function (node) {
        var index = parseInt(node.getAttribute("data-id"));
        this.current = this.get(index);
        var prevNode;
        if (this.current !== null) {
            if (this.current.getPrev() !== null) {
                this.current = this.current.getPrev();
                prevNode = this.current.getNode();
                node.classList.remove("active");
                prevNode.classList.add("active");
            } else {
                this.current = this.get(parseInt(lenght));
                prevNode = this.current.getPrev().getNode();
                node.classList.remove("active");
                prevNode.classList.add("active");

                console.log("Next slide does not exist");
            }
        } else {
            console.log("Slide does not exist");
        }
    };

    this.slideRight = function (node) {
        var index = parseInt(node.getAttribute("data-id"));
        this.current = this.get(index);
        if (this.current !== null) {
            if (this.current.getNext() !== null) {
                if (typeof this.current.getNext().getNode() === 'number') {
                    this.current = this.get(0);
                } else {
                    this.current = this.current.getNext();
                }
                var nextNode = this.current.getNode();
                node.classList.remove("active");
                nextNode.classList.add("active");
            } else {
                console.log("Next slide does not exist");
            }
        } else {
            console.log("Slide does not exist");
        }
    };

    this.slideRandom = function (node) {
        var index = Math.floor(Math.random() * lenght), nextNode;
        while (index === node.getAttribute("data-id")) {
            index = Math.floor(Math.random() * 3);
            console.log(index + " : " + node.getAttribute("data-id"));
        }
        nextNode = this.get(index).getNode();
        node.classList.remove('active');
        nextNode.classList.add('active');
        console.log(nextNode);
    };
}

var slider = new Slider();
var nodes = document.body.querySelectorAll(".slide");
for (var index in nodes) {
    slider.add(nodes[index]);
}
var lenght = nodes.length;
var random, activeSlide;

var chevrons = {
    left: document.querySelector('#left'),
    right: document.querySelector('#right')
}

random = document.querySelector('#random');

chevrons.left.addEventListener("click", function () {
    activeSlide = document.querySelector('.active');
    slider.slideLeft(activeSlide)
});

chevrons.right.addEventListener("click", function () {
    activeSlide = document.querySelector('.active');
    slider.slideRight(activeSlide);
});

random.addEventListener("click", function () {
    activeSlide = document.querySelector('.active');
    slider.slideRandom(activeSlide);
});
