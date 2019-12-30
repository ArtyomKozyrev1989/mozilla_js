/* This is classical way to create "classes and inherit"  */

/* create person constructor */

function Person(name, surname, weight, height) {
    this.fio = {name, surname};
    this.weight = weight;
    this.height = height;
};

/* add some functionality - methods */

/* some instance methods below */

Person.prototype.greet = function (word) {
    return ` Say ${word} to great ${this.fio.name} ${this.fio.surname}`;
};

Person.prototype.wh = function () {
    return this.height * this.weight;
};


/* some tests here */
let x = new Person("Artyom", "Kozyrev", 100, 100);
console.log(x);
console.log(x.fio.name);
console.log(x.greet("Privet"));
console.log(x.wh())

/* create child "class" */

function Teacher(name, surname, weight, height, subject) {
    Person.call(this, name, surname, weight, height);  // Call constructor of base "class" here
    this.subject = subject;
};

Teacher.prototype = Object.create(Person.prototype);  // The line below in the necessity in JS

/* Change "class" method in the code below: */

Teacher.prototype.wh = function () {
    return this.height * this.height;
};

/* make code more beauty to declare right constructor */

Object.defineProperty(Teacher.prototype, 'constructor', {
    value: Teacher,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });

/* some tests here */
let y = new Teacher("Artur", "Fisher", 10, 15, "Math");
console.log(y);
console.log(y.fio.surname);
console.log(y.greet("Ave"));
console.log(y.wh());


