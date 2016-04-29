// Syntactical sugar over prototype-based inheritance.
class Person {
  constructor(name) {
    this.name = name;
    this.movement = "walks";
  }

  move(meters) {
    console.log(`${this.name} ${this.movement} ${meters}m.`);
  }
}

class Hero extends Person {
  constructor(name, movement) {
    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    super();
    this.name = name;
    this.movement = movement;
  }

  move() {
    super.move(500);
  }
}

let clark = new Person("Clark Kent");

let superman = new Hero("Superman", "flies");

clark.move(100);
// -> Clark Kent walks 100m.

superman.move();
// -> Superman flies 500m.
