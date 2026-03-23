// module base
const StationClock = {
  _hour: 12,
  _minute: 0,

  tick() {
    this._minute += 1;
    if (this._minute >= 60) {
      this._minute = 0;
      this._hour = (this._hour % 12) + 1;
    }
  },

  time() {
    const h = String(this._hour).padStart(2, "0");
    const m = String(this._minute).padStart(2, "0");
    return `${h}:${m}`;
  },
};

/*
console.log(`SharmaJi Checks: ${StationClock.time()}`);
StationClock.tick();
StationClock.tick();
console.log(`Time after 2 tick: ${StationClock.time()}`);
*/

const platform1 = StationClock;
const platform2 = StationClock;

console.log(`Same Instance?: ${platform1 === platform2}`);

const StationBell = (function () {
  let ringCount = 0;

  const instance = {
    ring() {
      ringCount++;
      return `Sharamaji ring bell ${ringCount}`;
    },
    total() {
      return ringCount;
    },
  };
  return instance;
})();

/*
console.log(StationBell.ring());
console.log(StationBell.ring());
console.log(`Total ring count: ${StationBell.total()}`);
*/

class ClockMechanism {
  constructor() {
    if (ClockMechanism._instance) {
      return ClockMechanism._instance;
    }
    this.gears = 42;
    this.wound = false;
    ClockMechanism._instance = this;
  }
  wind() {
    this.wound = true;
    return `Changed the state to true`;
  }
  status() {
    return `Gears: ${this.gears}, Wound: ${this.wound}`;
  }

  // A static method is a method that belongs to a class itself, not to any specific object (instance) of that class.
  static getInstance() {
    if (!ClockMechanism._instance) {
      new ClockMechanism();
    }
    return ClockMechanism._instance;
  }
}

const mech = ClockMechanism.getInstance();

ClockMechanism._instance = null;
const mech1 = new ClockMechanism();
const mech2 = new ClockMechanism();

console.log(`Same or not: ${mech1 === mech2}`);

function createStaticConfig() {
  const config = {
    platfrom: 0,
    tracks: 12,
    junction: "Bengaluru"

  }
  return Object.freeze(config)
}

const stationConfig = createStaticConfig()


console.log("Platform: ", stationConfig.platfrom);
stationConfig.platfrom = 9999
console.log("Platform 2: ", stationConfig.platfrom);

