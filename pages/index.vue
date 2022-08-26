<template>
  <div>
    <div v-if="!showScore" class="container">
      <nuxt-card
        v-for="(card, c) in cards"
        :key="card.id"
        :card="card"
        :select="selectedCards.includes(c)"
        :disable="step === 0 || fixedCards.includes(c)"
        @select="select(c)"
      />
    </div>

    <div v-else class="container">
      <div class="total">
        {{ score }}
      </div>
    </div>

    <div v-if="!showScore" class="foot">
      <button
        v-if="step !== 0"
        :disabled="step !== 3 && !selectedCards.length"
        @click="todraw"
      >
        Draw ({{ step }})
      </button>
      <button v-if="step !== 3" @click="showScore = true">Finalize</button>
    </div>
    <div v-else class="foot">
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import pool from '~/static/pool.json'

@Component
export default class extends Vue {
  /** cartes piochées */
  cards: any[] = []

  /** cartes sélectionnées */
  selectedCards: number[] = []

  /** carte qui ne peuvent plus etre supprimée */
  fixedCards: number[] = []

  step = 3
  showScore = false

  cardde = {
    id: 'EX1_116',
    dbfId: 559,
    name: 'Leeroy Jenkins',
    text: '<b>Charge</b>. <b>Battlecry:</b> Summon two 1/1 Whelps for your opponent.',
    flavor: 'At least he has Angry Chicken.',
    artist: 'Gabe from Penny Arcade',
    attack: 6,
    cardClass: 'NEUTRAL',
    collectible: true,
    cost: 5,
    elite: true,
    faction: 'ALLIANCE',
    health: 2,
    mechanics: ['BATTLECRY', 'CHARGE'],
    rarity: 'LEGENDARY',
    set: 'EXPERT1',
    type: 'MINION',
  }

  get score() {
    let score = 0
    for (const card of this.cards) {
      if (card.attack) score += card.attack
    }

    return score
  }

  /**
   * @param {number} index
   * cette methode selectionne une carte.
   * si la carte est sélectionnée, elle est déselectionnée
   */
  select(index: number) {
    if (this.step === 0) return

    if (this.selectedCards.findIndex((i) => i === index) === -1) {
      this.selectedCards.push(index)
    } else {
      this.selectedCards = this.selectedCards.filter((i) => i !== index)
    }
  }

  todraw() {
    // ne pas exécuter cette fonction
    // si le compteur de tirage atteind 0.
    if (this.step <= 0) return

    // au début
    if (this.step === 3) {
      this.cards = this.draw()
      this.step -= 1
    }
    // vérifier si une carte est sélectionnée
    else if (this.selectedCards.length) {
      // piocher de nouveaux carte
      const cards = this.draw(this.selectedCards.length)

      // remplacer les carte selectionnées par les nouveaux cartes piochées
      for (let i = 0; i < this.selectedCards.length; i++) {
        const index = this.selectedCards[i]
        this.cards[index] = cards[i]
      }

      // désactiver les carte non selectionnées
      for (let i = 0; i < this.cards.length; i++) {
        if (!this.selectedCards.includes(i)) this.fixedCards.push(i)
      }

      this.selectedCards = []
      this.step -= 1
    }
  }

  /**
   * @param {number} length  le nombre de carte à picher
   * cette fonction pioche un ensemble de carte dans la pool.
   */
  draw(length: number = 10) {
    const cards: any[] = []

    // boucler tant que le nombre de carte choisie est
    // différent du nombre de carte demandé
    while (cards.length < length) {
      // piocher l'index d'une carte au hasard
      const i = Math.floor(Math.random() * pool.length)
      const card = pool[i]

      // vérifier si la carte n'est pas déjà choisie ou piochée
      const isIn =
        cards.findIndex((cd) => cd.id === card.id) === -1 &&
        this.cards.findIndex((cd) => cd.id === card.id) === -1

      // sinon l'ajouter dans le tableau
      if (isIn) cards.push(pool[i])
    }

    // retourner les carte choisie
    return cards
  }

  reset() {
    this.cards = []
    this.selectedCards = []
    this.fixedCards = []
    this.step = 3
    this.showScore = false
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles/vars';

.container {
  display: flex;
  flex-wrap: wrap;
  max-width: ($card-width + 40) * 5;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 150px;

  .total {
    font-size: 48px;
    text-align: center;
    margin: auto;
    margin-top: 120px;
  }
}

.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: $card-color;
    color: #fff;
    border: 0;
    border-radius: 0.6em;
    margin: 5px;
    opacity: 0.5;

    &:not(:disabled) {
      cursor: pointer;
      opacity: 1;

      &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }
    }
  }
}
</style>
