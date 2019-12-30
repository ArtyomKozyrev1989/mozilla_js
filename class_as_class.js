class Person {

    constructor(name, surname, width, height, salary) {
        this.fio = {name, surname};
        this.width = width;
        this.height = height;
        this.salary = salary;
    };

    greet(word) {
        return `Say ${word} to ${this.fio.name} ${this.fio.surname}`;
    };

    returnDoubleSalary() {
        return 2 * this.salary;
    };
}

let x = new Person("Willi", "Jonson", 100, 100, 200);

console.log(x);
console.log(x.greet("SSS"));
console.log(x.returnDoubleSalary());


class Teacher extends Person {
    constructor(name, surname, width, height, salary,  subjects) {
        super(name, surname, width, height, salary);
        this.subjects = subjects;
    };

    returnDoubleSalary() {
        return 10 * this.salary;
    };

    returnSubjects() {
        return this.subjects.join(", ");
    };

    get _subjects() {
        return this.subjects;
    };

    set _subjects(subjectsArray) {
      this.subjects =  subjectsArray;
    };
};

let y = new Teacher("Sam", "Samson", 10, 10, 2, ["a", "b", "c"]);

console.log(y);
console.log(y.greet("AAA"));
console.log(y.returnDoubleSalary());
console.log(y.returnSubjects());
console.log(y.subjects);
console.log(y.fio.name);
y.subjects =  ["x", "adad", "ASdsad"];
console.log(y.returnSubjects());
