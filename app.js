function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      gameResult: null,
      battleLog: []
    };
  },
  computed: {
    monsterHealthBarStyles() {
      if (this.monsterHealth < 0) return { width: "0%" };
      return { width: this.monsterHealth + "%" };
    },
    playerHealthBarStyles() {
      if (this.playerHealth < 0) return { width: "0%" };
      return { width: this.playerHealth + "%" };
    },
    specialAttackAvailable() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.gameResult = "Its a draw";
      } else if (value <= 0) {
        this.gameResult = "Monster wins";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.gameResult = "Its a draw";
      } else if (value <= 0) {
        this.gameResult = "Player wins";
      }
    },
  },
  methods: {
    newGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.gameResult = null;
      this.battleLog = [];
    },
    surrender() {
        this.gameResult = "Monster wins";
    },
    attackMonster() {
      this.currentRound++;
      const attackDamage = getRandomValue(5, 12);
      this.monsterHealth -= attackDamage;
      this.addLogMessage('player', 'attack', attackDamage);
      this.attackPlayer();
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackDamage = getRandomValue(10, 25);
      this.monsterHealth -= attackDamage;
      this.addLogMessage('player', 'attack.special', attackDamage);
      this.attackPlayer();
    },
    attackPlayer() {
    //   const that = this;
    //   setTimeout(function () {
    //     const attackDamage = getRandomValue(8, 15);
    //     that.playerHealth -= attackDamage;
    //   }, 1000);
      const attackDamage = getRandomValue(8, 15);
      this.playerHealth -= attackDamage;
      this.addLogMessage('monster', 'attack', attackDamage);

    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },
    addLogMessage(who, what, value) {
       // unshift adds to the top
        this.battleLog.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value
        });
    }
  },
});

app.mount("#game");
