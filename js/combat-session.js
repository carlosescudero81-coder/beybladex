// COMBAT SESSION ENGINE (Mathematics Battle)
// ----------------------------------------------------
class CombatSession {
  constructor(weekNum, isBoss, playerState, appController) {
    this.weekNum = weekNum; // 'reinforce' or integer
    this.isBoss = isBoss;
    this.state = playerState;
    this.app = appController;
    this.towerFloor = appController?.currentTowerFloor || getCurrentTowerFloor(playerState);
    this.floorData = getTowerFloorData(this.towerFloor);
    this.difficulty = this.floorData?.difficulty || Math.ceil((this.towerFloor || 1) / 6);
    this.difficultyTier = this.floorData?.difficultyTier || this.getDifficultyTierName(this.difficulty);
    this.questionCount = this.floorData?.questionCount || this.getTowerQuestionCount(this.towerFloor, this.difficulty);
    this.currentQuestionIdx = 0;
    
    this.playerHP = 100;
    this.rivalHP = 100;
    this.playerMaxHP = 100;
    this.rivalMaxHP = 100;
    
    this.correctStreak = 0;
    this.sessionCorrect = 0;
    this.sessionIncorrect = 0;
    this.curriculumAnswerLog = [];
    this.questionsList = [];
    this.currentQuestion = null;
    this.curriculumMission = appController && typeof appController.getCurriculumMissionForCombat === 'function'
      ? appController.getCurriculumMissionForCombat(weekNum, isBoss)
      : null;
    this.isTowerBattle = appController?.activeTowerBattle === true;
    
    // Physics positions & motion state
    this.playerX = 30;
    this.playerY = 50;
    this.rivalX = 70;
    this.rivalY = 50;
    this.physTimer = null;
    this.lastPhysicsTs = 0;
    this.lastCollisionTs = 0;
    this.trailAccumulator = 0;
    this.gaugeInterval = null;
    this.playerBey = null;
    this.rivalBey = null;
    this.playerCharacter = null;
    this.companionCharacter = null;
    this.companionPassive = null;
    this.companionStartMessage = '';
    this.companionPassiveUsed = {};
    this.rivalCharacter = null;
    this.playerCharacterStats = null;
    this.rivalCharacterStats = null;
    this.playerCombatant = null;
    this.rivalCombatant = null;
    this.selectedAction = 'attack';
    this.rivalIntent = null;
    this.rivalPattern = null;
    this.actionLocked = false;
    this.specialArmed = false;
    this.xtremeDashArmed = false;
    this.lastSpinUsed = false;
    this.fastAnswerStreak = 0;
    this.questionStartedAt = 0;
    this.battleIntroTimer = null;
    this.battleIntroExitTimer = null;
    this.battleIntroFinish = null;
    this.rounds = [];
    this.currentRoundIndex = 0;
    this.roundAttempts = {};
    this.usedTowerQuestionIds = new Set();
    this.usedTowerQuestionSignatures = new Set();
    this.bestCombo = 0;
    this.fastCorrect = 0;
    this.assistedCorrect = 0;
    this.roundsWonFirstTry = 0;
    this.roundsRepeated = 0;
    this.lightningDamageBonus = 0;
    this.resumedTowerBattle = false;
    this.playerDeck = [];
    this.activeDeckIndex = 0;
    this.deckSwitches = 0;
    this.finishPoints = 0;
    this.finishStats = { spin: 0, over: 0, burst: 0, xtreme: 0 };
    this.xtremeDashUses = 0;
    this.xtremeDashRisks = 0;
  }

  start() {
    // Generate questions
    this.generateQuestionsList();
    this.buildTournamentRounds();
    const savedBattle = this.getSavedTowerBattle();
    this.currentQuestionIdx = 0;
    this.playerHP = 100;
    this.correctStreak = 0;
    this.sessionCorrect = 0;
    this.sessionIncorrect = 0;
    this.curriculumAnswerLog = [];
    this.selectedAction = 'attack';
    this.specialArmed = false;
    this.xtremeDashArmed = false;
    this.lastSpinUsed = false;
    this.fastAnswerStreak = 0;
    this.bestCombo = 0;
    this.fastCorrect = 0;
    this.assistedCorrect = 0;
    this.roundsWonFirstTry = 0;
    this.roundsRepeated = 0;
    this.lightningDamageBonus = 0;
    this.companionPassiveUsed = {};
    this.companionStartMessage = '';

    // Reset HUD
    const weekData = WEEKS.find(w => w.week === this.weekNum) || WEEKS[0];
    const towerFloor = this.towerFloor;
    const floorData = this.floorData || getTowerFloorData(towerFloor);
    const playerCharacter = BEYBLADE_X_CHARACTERS.find(character => character.id === this.state.player.characterAvatarId) || BEYBLADE_X_CHARACTERS[0];
    const companionCharacter = BEYBLADE_X_CHARACTERS.find(character => character.id === (this.state.player.companionCharacterId || this.state.player.characterAvatarId)) || playerCharacter;
    const playerBey = getEquippedBey(this.state);
    const stadium = getFloorStadium(towerFloor);
    this.playerBey = playerBey;
    this.playerDeck = this.buildPlayerDeck(playerBey);
    this.playerCharacter = playerCharacter;
    this.companionCharacter = companionCharacter;
    this.companionPassive = typeof getCompanionPassive === 'function'
      ? getCompanionPassive(companionCharacter, this.state)
      : null;
    this.playerCharacterStats = typeof getEffectiveCharacterStats === 'function'
      ? getEffectiveCharacterStats(playerCharacter, this.state, true)
      : { attack: 55, defense: 55, stamina: 55, speed: 55, focus: 55, level: 1 };
    this.playerMaxHP = this.getPlayerMaxHP();
    this.applySavedTowerBattle(savedBattle);
    this.configureActiveRoundOpponent(savedBattle);
    document.getElementById('hud-player').querySelector('.avatar-mini').innerHTML = renderAssetImage(playerCharacter.image, playerCharacter.nombre, 'asset-image header-character-avatar');
    document.getElementById('combat-player-name').innerText = this.state.player.name;
    const floorLabel = document.getElementById('combat-floor-label');
    const stadiumName = document.getElementById('combat-stadium-name');
    const playerBeyName = document.getElementById('combat-player-bey-name');
    const rivalBeyName = document.getElementById('combat-rival-bey-name');
    if (floorLabel) floorLabel.innerText = this.getRoundLabelText();
    if (stadiumName) stadiumName.innerText = stadium.nombre;
    if (playerBeyName) playerBeyName.innerText = `Tu Bey: ${this.playerBey.nombre}`;
    if (rivalBeyName) rivalBeyName.innerText = `Rival: ${this.rivalBey.nombre}`;
    const playerTopLabel = document.querySelector('.top-label-player');
    const rivalTopLabel = document.querySelector('.top-label-rival');
    if (playerTopLabel) playerTopLabel.innerText = this.playerBey.nombre;
    if (rivalTopLabel) rivalTopLabel.innerText = this.rivalBey.nombre;
    const stadiumImg = document.querySelector('.battle-stadium-img');
    if (stadiumImg) {
      stadiumImg.src = stadium.image;
      stadiumImg.alt = stadium.nombre;
    }
    this.decorateStadiumVisual(stadium);

    this.updateHpBars();
    this.initCombatants();
    this.applyCompanionStartPassive();
    this.initCombatControls();
    this.setRivalIntent(this.chooseRivalIntent());

    // Render Custom Tops in Combat
    document.getElementById('player-top').innerHTML = this.playerBey?.isCustom && this.playerBey.combo
      ? generateTopSVG(this.playerBey.combo.core, this.playerBey.combo.ring, this.playerBey.combo.driver, this.playerBey.combo.color)
      : renderAssetImage(this.playerBey.image, this.playerBey.nombre, 'asset-image battle-bey player');
    
    document.getElementById('rival-top').innerHTML = renderAssetImage(this.rivalBey.image, this.rivalBey.nombre, 'asset-image battle-bey rival');
    this.decorateTopSprites();
    this.renderCombatants();
    this.updateXGauge();

    if (this.resumedTowerBattle) {
      this.startPhysicsSimulation();
      this.nextQuestion();
      return;
    }

    this.playBattleIntro({
      playerCharacter,
      rivalCharacter: this.rivalCharacter,
      playerBey: this.playerBey,
      rivalBey: this.rivalBey,
      stadium,
      floorData,
      towerFloor
    }, () => this.startLaunchPhase());
  }

  getTowerBattleKey() {
    return `tower-floor-${this.towerFloor}`;
  }

  getSavedTowerBattle() {
    const saved = this.state?.progress?.activeTowerBattle;
    if (!this.isTowerBattle || !saved || saved.floor !== this.towerFloor || saved.key !== this.getTowerBattleKey()) return null;
    return saved;
  }

  buildTournamentRounds() {
    this.rounds = [];
    if (!this.isTowerBattle || this.questionsList.length === 0) {
      this.rounds = [{
        index: 0,
        start: 0,
        end: this.questionsList.length,
        isFinal: true,
        rivalId: this.floorData?.rivalId,
        beyId: this.floorData?.rivalBeyId,
        hpScale: 1
      }];
      return;
    }

    const total = this.questionsList.length;
    const roundCount = Math.max(2, Math.min(4, Math.ceil(total / 10)));
    const passRivals = this.selectPassRivals(roundCount - 1);
    const roundSize = Math.ceil(total / roundCount);
    for (let index = 0; index < roundCount; index += 1) {
      const isFinal = index === roundCount - 1;
      const start = index * roundSize;
      const end = Math.min(total, start + roundSize);
      const rival = isFinal ? null : passRivals[index];
      const bey = isFinal
        ? getBeyById(this.floorData?.rivalBeyId)
        : this.pickRoundBey(index, rival);
      const lightningIndex = !isFinal && end > start
        ? start + Math.min(end - start - 1, Math.max(0, Math.floor((end - start) / 2)))
        : null;
      if (lightningIndex !== null && this.questionsList[lightningIndex]) {
        this.questionsList[lightningIndex].isLightning = true;
        this.questionsList[lightningIndex].lightningWindowMs = Math.max(2600, 4800 - (this.difficulty * 260));
      }
      this.rounds.push({
        index,
        start,
        end,
        isFinal,
        stage: isFinal ? 'topCut' : 'swiss',
        rivalId: isFinal ? this.floorData?.rivalId : rival?.id,
        rivalName: isFinal ? this.floorData?.rivalName : rival?.nombre,
        beyId: bey?.id || this.floorData?.rivalBeyId,
        hpScale: isFinal ? 1 : Math.min(0.6, 0.42 + (index * 0.08)),
        lightningIndex
      });
    }
  }

  selectPassRivals(count) {
    const finalRivalId = this.floorData?.rivalId;
    return BEYBLADE_X_CHARACTERS
      .filter(character => character.id !== finalRivalId && character.id !== this.state.player.characterAvatarId)
      .sort((a, b) => (typeof getCharacterPowerScore === 'function' ? getCharacterPowerScore(a) : 50) - (typeof getCharacterPowerScore === 'function' ? getCharacterPowerScore(b) : 50))
      .slice(0, Math.max(0, count));
  }

  pickRoundBey(index, rival) {
    const associated = rival?.beyAsociado ? BEYBLADE_X_BEYS.find(bey => bey.nombre === rival.beyAsociado) : null;
    if (associated) return associated;
    const available = BEYBLADE_X_BEYS.filter(bey => bey.id !== this.floorData?.rivalBeyId && bey.id !== this.playerBey?.id);
    return available[index % Math.max(1, available.length)] || getBeyById(this.floorData?.rivalBeyId);
  }

  buildPlayerDeck(equippedBey) {
    const ownedIds = Array.isArray(this.state?.inventory?.beys) ? this.state.inventory.beys : [];
    const ownedBeys = ownedIds.map(id => getBeyById(id)).filter(Boolean);
    const deck = [];
    const add = bey => {
      if (bey && !deck.some(item => item.id === bey.id)) deck.push(bey);
    };
    add(equippedBey);
    ['ataque', 'defensa', 'estamina', 'balance'].forEach(type => {
      add(ownedBeys.find(bey => bey.tipo === type));
    });
    ownedBeys.forEach(add);
    while (deck.length < 3 && BEYBLADE_X_BEYS[deck.length]) add(BEYBLADE_X_BEYS[deck.length]);
    return deck.slice(0, 3);
  }

  getBeyType(bey) {
    const type = (bey?.tipo || 'balance').toLowerCase();
    if (type === 'ataque' || type === 'attack') return 'ataque';
    if (type === 'defensa' || type === 'defense') return 'defensa';
    if (type === 'estamina' || type === 'stamina') return 'estamina';
    return 'balance';
  }

  calculateTypeMatchupModifier(attackerBey, defenderBey) {
    const attacker = this.getBeyType(attackerBey);
    const defender = this.getBeyType(defenderBey);
    if (attacker === 'balance' || defender === 'balance' || attacker === defender) return 0;
    const wins = {
      ataque: 'estamina',
      estamina: 'defensa',
      defensa: 'ataque'
    };
    return wins[attacker] === defender ? 4 : -3;
  }

  getSkillTypeAffinity(question = this.currentQuestion) {
    const skillText = `${question?.skill || ''} ${question?.subject || ''}`.toLowerCase();
    if (skillText.includes('multiply') || skillText.includes('tables') || skillText.includes('calculo') || skillText.includes('math_multiply')) return 'ataque';
    if (skillText.includes('read') || skillText.includes('literal') || skillText.includes('inference') || skillText.includes('vocabulary') || skillText.includes('english')) return 'estamina';
    if (skillText.includes('review') || skillText.includes('add_sub') || skillText.includes('number') || skillText.includes('science')) return 'defensa';
    return 'balance';
  }

  getSkillAffinityBonus(attackerBey, question = this.currentQuestion) {
    const type = this.getBeyType(attackerBey);
    const affinity = this.getSkillTypeAffinity(question);
    if (type === 'balance') return 1;
    return type === affinity ? 3 : 0;
  }

  applyCompanionStartPassive() {
    if (!this.companionPassive || this.companionPassive.type !== 'charge' || this.companionPassiveUsed.charge || !this.playerCombatant) return null;
    this.playerCombatant.charge = Math.min(3, (this.playerCombatant.charge || 0) + 1);
    this.companionPassiveUsed.charge = true;
    this.companionStartMessage = `${this.companionPassive.characterName}: ${this.companionPassive.label}`;
    return `${this.companionPassive.characterName}: ${this.companionPassive.label}`;
  }

  applyCompanionPlayerDamageBonus(damage, isCorrect, isFastAnswer) {
    if (!this.companionPassive || !isCorrect || damage <= 0) return { damage, message: '' };
    const passive = this.companionPassive;
    if (passive.type === 'strike' && !this.companionPassiveUsed.strike) {
      this.companionPassiveUsed.strike = true;
      return {
        damage: damage + Math.round(passive.value || 7),
        message: `${passive.characterName}: ${passive.label}`
      };
    }
    if (passive.type === 'dash' && isFastAnswer && !this.companionPassiveUsed.dash) {
      this.companionPassiveUsed.dash = true;
      if (this.playerCombatant) this.playerCombatant.charge = Math.min(3, (this.playerCombatant.charge || 0) + 1);
      return {
        damage: damage + Math.round(passive.value || 5),
        message: `${passive.characterName}: ${passive.label}`
      };
    }
    return { damage, message: '' };
  }

  applyCompanionRivalDamageReduction(damage, context = 'hit') {
    if (!this.companionPassive || damage <= 0) return { damage, message: '' };
    const passive = this.companionPassive;
    if (passive.type === 'guard' && !this.companionPassiveUsed.guard) {
      this.companionPassiveUsed.guard = true;
      const reduction = Math.max(0.2, Math.min(0.48, passive.value || 0.34));
      return {
        damage: Math.max(1, Math.round(damage * (1 - reduction))),
        message: `${passive.characterName}: ${passive.label}`
      };
    }
    if (passive.type === 'focus' && context === 'mistake' && !this.companionPassiveUsed.focus) {
      this.companionPassiveUsed.focus = true;
      const reduction = Math.max(0.18, Math.min(0.44, passive.value || 0.28));
      return {
        damage: Math.max(1, Math.round(damage * (1 - reduction))),
        message: `${passive.characterName}: ${passive.label}`
      };
    }
    return { damage, message: '' };
  }

  selectDeckBeyForRound(round, preferCounter = false) {
    if (!this.playerDeck || this.playerDeck.length === 0) this.playerDeck = this.buildPlayerDeck(getEquippedBey(this.state));
    if (!preferCounter) {
      const index = Math.max(0, Math.min(this.playerDeck.length - 1, this.activeDeckIndex % this.playerDeck.length));
      return this.playerDeck[index];
    }
    const rivalBey = getBeyById(round?.beyId || this.floorData?.rivalBeyId);
    let bestIndex = 0;
    let bestScore = -Infinity;
    this.playerDeck.forEach((bey, index) => {
      const score = this.calculateTypeMatchupModifier(bey, rivalBey) + this.getSkillAffinityBonus(bey);
      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    });
    this.activeDeckIndex = bestIndex;
    this.deckSwitches += 1;
    return this.playerDeck[bestIndex];
  }

  getCurrentRound() {
    return this.rounds[Math.max(0, Math.min(this.rounds.length - 1, this.currentRoundIndex))] || this.rounds[0];
  }

  configureActiveRoundOpponent(savedBattle = null) {
    const round = this.getCurrentRound();
    const rival = BEYBLADE_X_CHARACTERS.find(character => character.id === round?.rivalId)
      || BEYBLADE_X_CHARACTERS.find(character => character.id === this.floorData?.rivalId)
      || getFloorRival(this.towerFloor);
    const rivalBey = getBeyById(round?.beyId || this.floorData?.rivalBeyId);
    if (this.isTowerBattle) {
      this.playerBey = this.selectDeckBeyForRound(round, false);
    }
    this.rivalCharacter = rival;
    this.rivalBey = rivalBey;
    this.rivalCharacterStats = typeof getEffectiveCharacterStats === 'function'
      ? getEffectiveCharacterStats(rival, this.state, false)
      : { attack: 55, defense: 55, stamina: 55, speed: 55, focus: 55, level: 1 };
    this.rivalPattern = this.getRivalBattlePattern(rival, rivalBey, this.rivalCharacterStats);
    const baseHp = this.getRivalMaxHP();
    this.playerMaxHP = this.getPlayerMaxHP();
    this.rivalMaxHP = Math.max(38, Math.round(baseHp * (round?.hpScale || 1)));
    this.rivalHP = savedBattle ? Math.min(this.rivalMaxHP, Math.max(1, Number(savedBattle.rivalHP) || this.rivalMaxHP)) : this.rivalMaxHP;
    this.playerHP = savedBattle ? Math.min(this.playerMaxHP, Math.max(1, Number(savedBattle.playerHP) || this.playerMaxHP)) : this.playerMaxHP;

    const rivalImg = document.getElementById('combat-rival-img');
    const rivalName = document.getElementById('combat-rival-name');
    const rivalBeyName = document.getElementById('combat-rival-bey-name');
    const playerBeyName = document.getElementById('combat-player-bey-name');
    const playerTopLabel = document.querySelector('.top-label-player');
    const rivalTopLabel = document.querySelector('.top-label-rival');
    if (rivalImg) rivalImg.src = rival.image;
    if (rivalName) rivalName.innerText = this.isBoss || round?.isFinal ? (round?.rivalName || rival.nombre) : `Rival ${round.index + 1}: ${round?.rivalName || rival.nombre}`;
    if (playerBeyName) playerBeyName.innerText = `Tu Bey: ${this.playerBey.nombre}`;
    if (playerTopLabel) playerTopLabel.innerText = this.playerBey.nombre;
    if (rivalBeyName) rivalBeyName.innerText = `Rival: ${rivalBey.nombre}`;
    if (rivalTopLabel) rivalTopLabel.innerText = rivalBey.nombre;
    const floorLabel = document.getElementById('combat-floor-label');
    if (floorLabel) floorLabel.innerText = this.getRoundLabelText();
  }

  getRivalBattlePattern(rival, bey, stats = {}) {
    const type = this.getBeyType(bey);
    const attack = Number(stats.attack) || 55;
    const defense = Number(stats.defense) || 55;
    const stamina = Number(stats.stamina) || 55;
    const speed = Number(stats.speed) || 55;
    const focus = Number(stats.focus) || 55;
    const name = rival?.nombre || 'Rival';
    if (attack >= defense + 8 || type === 'ataque') {
      return { id: 'pressure', name: `${name} presiona`, preferredIntent: 'attack', damageBonus: 4, blockSpeedBonus: 180, hint: 'Ataca fuerte: defiende o bloquea fino.' };
    }
    if (defense >= attack + 8 || type === 'defensa') {
      return { id: 'wall', name: `${name} se cierra`, preferredIntent: 'defense', damageBonus: 1, blockSpeedBonus: -80, hint: 'Se cubre: carga energia y no te precipites.' };
    }
    if (stamina >= attack + 7 || type === 'estamina') {
      return { id: 'stamina', name: `${name} alarga el giro`, preferredIntent: 'charge', damageBonus: 2, blockSpeedBonus: 80, hint: 'Carga giro: cortalo con ataque.' };
    }
    if (speed >= 64) {
      return { id: 'sprinter', name: `${name} cambia de carril`, preferredIntent: 'attack', damageBonus: 3, blockSpeedBonus: 260, hint: 'Muy rapido: mira el bloqueo.' };
    }
    if (focus >= 64) {
      return { id: 'tactician', name: `${name} lee tus rachas`, preferredIntent: 'defense', damageBonus: 2, blockSpeedBonus: 120, hint: 'Si haces combo, se defendera.' };
    }
    return { id: 'balanced', name: `${name} adapta su plan`, preferredIntent: 'charge', damageBonus: 2, blockSpeedBonus: 0, hint: 'Balanceado: observa su intencion.' };
  }

  applySavedTowerBattle(savedBattle) {
    if (!savedBattle) return;
    this.resumedTowerBattle = true;
    this.currentRoundIndex = Math.max(0, Math.min(this.rounds.length - 1, parseInt(savedBattle.roundIndex, 10) || 0));
    this.currentQuestionIdx = Math.max(this.getCurrentRound()?.start || 0, Math.min(this.getCurrentRound()?.end || this.questionCount, parseInt(savedBattle.questionIndex, 10) || 0));
    this.correctStreak = Math.max(0, parseInt(savedBattle.correctStreak, 10) || 0);
    this.sessionCorrect = Math.max(0, parseInt(savedBattle.sessionCorrect, 10) || 0);
    this.sessionIncorrect = Math.max(0, parseInt(savedBattle.sessionIncorrect, 10) || 0);
    this.bestCombo = Math.max(0, parseInt(savedBattle.bestCombo, 10) || 0);
    this.fastCorrect = Math.max(0, parseInt(savedBattle.fastCorrect, 10) || 0);
    this.assistedCorrect = Math.max(0, parseInt(savedBattle.assistedCorrect, 10) || 0);
    this.roundsWonFirstTry = Math.max(0, parseInt(savedBattle.roundsWonFirstTry, 10) || 0);
    this.roundsRepeated = Math.max(0, parseInt(savedBattle.roundsRepeated, 10) || 0);
    this.roundAttempts = savedBattle.roundAttempts || {};
    this.companionPassiveUsed = savedBattle.companionPassiveUsed && typeof savedBattle.companionPassiveUsed === 'object'
      ? { ...savedBattle.companionPassiveUsed }
      : {};
    this.playerDeck = Array.isArray(savedBattle.playerDeck) && savedBattle.playerDeck.length > 0
      ? savedBattle.playerDeck.map(id => id === 'custom_x_bey' ? buildCustomBeyFromCombo(this.state) : getBeyById(id)).filter(Boolean)
      : this.playerDeck;
    this.activeDeckIndex = Math.max(0, parseInt(savedBattle.activeDeckIndex, 10) || 0);
    this.deckSwitches = Math.max(0, parseInt(savedBattle.deckSwitches, 10) || 0);
    this.finishPoints = Math.max(0, parseInt(savedBattle.finishPoints, 10) || 0);
    this.finishStats = {
      spin: Math.max(0, parseInt(savedBattle.finishStats?.spin, 10) || 0),
      over: Math.max(0, parseInt(savedBattle.finishStats?.over, 10) || 0),
      burst: Math.max(0, parseInt(savedBattle.finishStats?.burst, 10) || 0),
      xtreme: Math.max(0, parseInt(savedBattle.finishStats?.xtreme, 10) || 0)
    };
    this.xtremeDashUses = Math.max(0, parseInt(savedBattle.xtremeDashUses, 10) || 0);
    this.xtremeDashRisks = Math.max(0, parseInt(savedBattle.xtremeDashRisks, 10) || 0);
    this.usedTowerQuestionIds = new Set(savedBattle.usedQuestionIds || []);
    this.usedTowerQuestionSignatures = new Set(savedBattle.usedQuestionSignatures || []);
    if (Array.isArray(savedBattle.questionBank) && savedBattle.questionBank.length > 0) {
      const restoredQuestions = savedBattle.questionBank
        .filter(question => !LearningEngine.isQuestionAllowed || LearningEngine.isQuestionAllowed(question))
        .map(question => {
          const restored = { ...question, options: Array.isArray(question.options) ? [...question.options] : [] };
          restored.text = this.getChildFriendlyQuestionText({ ...restored, prompt: restored.text });
          return restored;
        });
      if (restoredQuestions.length > 0) {
        this.questionsList = restoredQuestions;
        this.questionCount = this.questionsList.length;
        if (restoredQuestions.length === savedBattle.questionBank.length && Array.isArray(savedBattle.rounds) && savedBattle.rounds.length > 0) {
          this.rounds = savedBattle.rounds;
        } else {
          this.buildTournamentRounds();
          this.currentRoundIndex = Math.max(0, Math.min(this.rounds.length - 1, this.currentRoundIndex));
          this.currentQuestionIdx = Math.max(this.getCurrentRound()?.start || 0, Math.min(this.getCurrentRound()?.end || this.questionCount, this.currentQuestionIdx));
        }
      }
    }
  }

  getRoundLabelText() {
    const round = this.getCurrentRound();
    const stage = round?.stage === 'topCut' ? 'Top Cut' : 'Swiss';
    const roundText = this.rounds.length > 1 ? `${stage} ${this.currentRoundIndex + 1}/${this.rounds.length}` : 'Duelo';
    return `X Tower Planta ${this.towerFloor} · ${roundText} · ${this.floorData?.secondaryObjective || 'Gana el duelo'}`;
  }

  questionSignature(question) {
    if (!question) return '';
    return `${question.skill || question.type || 'q'}:${String(question.text || question.curriculumId || question.id || '').toLowerCase().replace(/\d+/g, '#')}`;
  }

  persistTowerBattleState() {
    if (!this.isTowerBattle || !this.state?.progress) return;
    this.state.progress.activeTowerBattle = {
      key: this.getTowerBattleKey(),
      floor: this.towerFloor,
      roundIndex: this.currentRoundIndex,
      questionIndex: this.currentQuestionIdx,
      usedQuestionIds: [...this.usedTowerQuestionIds],
      usedQuestionSignatures: [...this.usedTowerQuestionSignatures],
      playerHP: Math.round(this.playerHP),
      rivalHP: Math.round(this.rivalHP),
      correctStreak: this.correctStreak,
      sessionCorrect: this.sessionCorrect,
      sessionIncorrect: this.sessionIncorrect,
      bestCombo: this.bestCombo,
      fastCorrect: this.fastCorrect,
      assistedCorrect: this.assistedCorrect,
      roundsWonFirstTry: this.roundsWonFirstTry,
      roundsRepeated: this.roundsRepeated,
      roundAttempts: this.roundAttempts,
      companionPassiveUsed: this.companionPassiveUsed,
      playerDeck: this.playerDeck.map(bey => bey.id),
      activeDeckIndex: this.activeDeckIndex,
      deckSwitches: this.deckSwitches,
      finishPoints: this.finishPoints,
      finishStats: this.finishStats,
      xtremeDashUses: this.xtremeDashUses,
      xtremeDashRisks: this.xtremeDashRisks,
      questionBank: this.questionsList.map(question => ({ ...question, options: Array.isArray(question.options) ? [...question.options] : [] })),
      rounds: this.rounds,
      savedAt: StorageService.todayKey()
    };
  }

  clearTowerBattleState() {
    if (this.state?.progress?.activeTowerBattle?.key === this.getTowerBattleKey()) {
      this.state.progress.activeTowerBattle = null;
    }
  }

  playBattleIntro(details, onComplete) {
    const overlay = document.getElementById('battle-intro');
    if (!overlay) {
      onComplete();
      return;
    }

    if (this.battleIntroTimer) clearTimeout(this.battleIntroTimer);
    if (this.battleIntroExitTimer) clearTimeout(this.battleIntroExitTimer);

    const setText = (id, text) => {
      const element = document.getElementById(id);
      if (element) element.innerText = text || '';
    };
    const setImage = (id, src, alt) => {
      const image = document.getElementById(id);
      if (!image) return;
      image.src = src || '';
      image.alt = alt || '';
    };

    const playerDisplayName = this.state?.player?.name || details.playerCharacter?.nombre || 'Blader';
    const rivalDisplayName = details.floorData?.rivalName || details.rivalCharacter?.nombre || 'Rival';
    setImage('battle-intro-player-character', details.playerCharacter?.image, playerDisplayName);
    setImage('battle-intro-rival-character', details.rivalCharacter?.image, rivalDisplayName);
    setImage('battle-intro-player-bey', details.playerBey?.image, details.playerBey?.nombre);
    setImage('battle-intro-rival-bey', details.rivalBey?.image, details.rivalBey?.nombre);
    setText('battle-intro-player-name', playerDisplayName);
    setText('battle-intro-rival-name', rivalDisplayName);
    setText('battle-intro-player-bey-name', details.playerBey?.nombre || 'Bey equipado');
    setText('battle-intro-rival-bey-name', details.rivalBey?.nombre || 'Bey rival');
    setText('battle-intro-floor', `Planta ${details.towerFloor || 1}`);
    setText('battle-intro-stadium', details.stadium?.nombre || 'Estadio X');
    this.renderBattleIntroStats('battle-intro-player-stats', this.getBattleIntroStats(details.playerBey, this.playerCharacterStats));
    this.renderBattleIntroStats('battle-intro-rival-stats', this.getBattleIntroStats(details.rivalBey, this.rivalCharacterStats));

    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    overlay.style.display = 'grid';
    overlay.classList.remove('is-exiting');
    overlay.classList.add('is-active');

    const finish = () => {
      if (this.battleIntroFinish !== finish) return;
      this.battleIntroFinish = null;
      if (this.battleIntroTimer) clearTimeout(this.battleIntroTimer);
      overlay.classList.remove('is-active');
      overlay.classList.add('is-exiting');
      this.battleIntroExitTimer = setTimeout(() => {
        overlay.classList.remove('is-exiting');
        overlay.style.display = 'none';
        overlay.hidden = true;
        overlay.setAttribute('aria-hidden', 'true');
        this.battleIntroExitTimer = null;
        onComplete();
      }, 360);
    };

    this.battleIntroFinish = finish;
    const skipButton = document.getElementById('battle-intro-skip');
    if (skipButton) skipButton.onclick = finish;
    overlay.onclick = event => {
      if (event.target === overlay) finish();
    };
    this.battleIntroTimer = setTimeout(finish, 2850);
  }

  getBattleIntroStats(bey, characterStats) {
    return [
      { label: 'Ataque', value: Math.round(((bey?.ataque || 60) * 0.68) + ((characterStats?.attack || 55) * 0.32)) },
      { label: 'Defensa', value: Math.round(((bey?.defensa || 60) * 0.68) + ((characterStats?.defense || 55) * 0.32)) },
      { label: 'Giro', value: Math.round(((bey?.estamina || 60) * 0.45) + ((bey?.velocidad || 60) * 0.35) + ((characterStats?.focus || 55) * 0.2)) }
    ].map(stat => ({ ...stat, value: Math.max(1, Math.min(100, stat.value)) }));
  }

  renderBattleIntroStats(containerId, stats) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = stats.map(stat => `
      <span class="battle-intro__stat">
        <b>${stat.label}</b>
        <i>${stat.value}</i>
      </span>
    `).join('');
  }

  initCombatants() {
    this.playerCombatant = this.createCombatant('player', this.playerBey, 28, 54, 24, -9);
    this.rivalCombatant = this.createCombatant('rival', this.rivalBey, 72, 42, -22, 10);
    this.playerX = this.playerCombatant.x;
    this.playerY = this.playerCombatant.y;
    this.rivalX = this.rivalCombatant.x;
    this.rivalY = this.rivalCombatant.y;
  }

  createCombatant(id, bey, x, y, vx, vy) {
    const safeBey = bey || {};
    const characterStats = id === 'player' ? this.playerCharacterStats : this.rivalCharacterStats;
    const difficultyBoost = id === 'rival' ? Math.max(0, this.difficulty - 1) * 0.55 : 0;
    return {
      id,
      bey: safeBey,
      x,
      y,
      vx: vx + ((safeBey.velocidad || 70) - 70) * 0.08 + ((characterStats?.speed || 55) - 55) * 0.04 + (id === 'rival' ? -difficultyBoost : 0),
      vy: vy + ((characterStats?.focus || 55) - 55) * 0.015,
      radius: 8.2,
      stamina: safeBey.estamina || 70,
      charge: 0,
      status: 'orbiting',
      color: safeBey.colorPrincipal || (id === 'player' ? '#00f0ff' : '#ff0055'),
      secondaryColor: safeBey.colorSecundario || '#ffffff',
      lastTrailX: x,
      lastTrailY: y
    };
  }

  getRivalMaxHP() {
    const base = 88 + (this.difficulty * 5);
    const bossBonus = this.floorData?.type === 'final' ? 32 : this.floorData?.type === 'tower-rival' ? 18 : this.floorData?.type === 'ascension' ? 10 : 0;
    const characterBonus = Math.round(((this.rivalCharacterStats?.defense || 55) + (this.rivalCharacterStats?.stamina || 55) - 110) / 5);
    return Math.min(170, base + bossBonus + characterBonus);
  }

  getPlayerMaxHP() {
    const characterBonus = Math.round(((this.playerCharacterStats?.defense || 55) + (this.playerCharacterStats?.stamina || 55) - 110) / 5);
    const beyBonus = Math.round(((this.playerBey?.defensa || 65) + (this.playerBey?.estamina || 65) - 130) / 12);
    return Math.max(82, Math.min(145, 100 + characterBonus + beyBonus));
  }

  getDifficultyDamageBonus() {
    return Math.max(0, Math.ceil(this.difficulty / 2) - 1);
  }

  getDifficultyTierName(difficulty) {
    if (difficulty >= 9) return 'legendaria';
    if (difficulty >= 7) return 'experta';
    if (difficulty >= 5) return 'alta';
    if (difficulty >= 3) return 'media';
    return 'baja';
  }

  getTowerQuestionCount(floorNumber, difficulty) {
    const floor = Math.max(1, Math.min(50, parseInt(floorNumber, 10) || 1));
    const milestoneBonus = floor % 10 === 0 ? 4 : floor % 5 === 0 ? 2 : 0;
    return Math.max(30, Math.min(44, 30 + Math.ceil(floor / 5) + Math.ceil((difficulty || 1) / 2) + milestoneBonus));
  }

  decorateTopSprites() {
    const playerTop = document.getElementById('player-top');
    const rivalTop = document.getElementById('rival-top');
    if (playerTop && this.playerCombatant) {
      playerTop.classList.add('combatant-player');
      playerTop.dataset.beyType = this.playerBey?.tipo || 'balance';
      this.setCssVar(playerTop, '--top-color', this.playerCombatant.color);
      this.setCssVar(playerTop, '--top-color-2', this.playerCombatant.secondaryColor);
    }
    if (rivalTop && this.rivalCombatant) {
      rivalTop.classList.add('combatant-rival');
      rivalTop.dataset.beyType = this.rivalBey?.tipo || 'balance';
      this.setCssVar(rivalTop, '--top-color', this.rivalCombatant.color);
      this.setCssVar(rivalTop, '--top-color-2', this.rivalCombatant.secondaryColor);
    }
  }

  decorateStadiumVisual(stadium = getFloorStadium(this.towerFloor)) {
    const arena = document.getElementById('battle-field');
    if (!arena) return;
    const tier = this.towerFloor >= 21 ? 'xtreme' : this.towerFloor >= 11 ? 'advanced' : 'beginner';
    arena.classList.remove('stadium-beginner', 'stadium-advanced', 'stadium-xtreme', 'xtreme-ready', 'xtreme-armed', 'xtreme-dash-active', 'finish-over', 'finish-burst', 'finish-xtreme');
    arena.classList.add(`stadium-${tier}`);
    if (stadium?.colorPrincipal) this.setCssVar(arena, '--stadium-accent', stadium.colorPrincipal);
    if (stadium?.colorSecundario) this.setCssVar(arena, '--stadium-accent-2', stadium.colorSecundario);
  }

  setXtremeStadiumState({ ready = false, armed = false } = {}) {
    const arena = document.getElementById('battle-field');
    if (!arena) return;
    arena.classList.toggle('xtreme-ready', Boolean(ready) && !armed);
    arena.classList.toggle('xtreme-armed', Boolean(armed));
  }

  pulseXtremeRail() {
    const arena = document.getElementById('battle-field');
    if (!arena) return;
    arena.classList.remove('xtreme-dash-active');
    void arena.offsetWidth;
    arena.classList.add('xtreme-dash-active');
    setTimeout(() => arena.classList.remove('xtreme-dash-active'), 920);
  }

  pulseFinishPocket(type) {
    const arena = document.getElementById('battle-field');
    if (!arena || !type || type === 'spin') return;
    const className = `finish-${type}`;
    arena.classList.remove('finish-over', 'finish-burst', 'finish-xtreme');
    void arena.offsetWidth;
    arena.classList.add(className);
    setTimeout(() => arena.classList.remove(className), 920);
  }

  setCssVar(element, name, value) {
    if (!element || !element.style) return;
    if (typeof element.style.setProperty === 'function') {
      element.style.setProperty(name, value);
    } else {
      element.style[name] = value;
    }
  }

  initCombatControls() {
    document.querySelectorAll('[data-combat-action]').forEach(button => {
      button.onclick = () => this.selectCombatAction(button.dataset.combatAction || 'attack');
    });
    const specialBtn = document.getElementById('btn-special-attack');
    if (specialBtn) specialBtn.onclick = () => this.armSpecialAttack();
    const xtremeBtn = document.getElementById('btn-xtreme-dash');
    if (xtremeBtn) xtremeBtn.onclick = () => this.armXtremeDash();
    this.selectCombatAction(this.selectedAction || 'attack', false);
  }

  canUseSpecialAttack() {
    return (this.playerCombatant?.charge || 0) >= 3 || this.correctStreak >= 2;
  }

  canUseXtremeDash() {
    const charge = this.playerCombatant?.charge || 0;
    const speed = this.playerBey?.velocidad || 70;
    const difficulty = parseInt(this.currentQuestion?.difficulty, 10) || 1;
    return charge >= 2 || speed >= 82 || this.currentQuestion?.isLightning === true || difficulty >= 4;
  }

  armSpecialAttack() {
    if (this.actionLocked || !this.canUseSpecialAttack()) return;
    sounds.playSpecial();
    this.specialArmed = !this.specialArmed;
    if (this.specialArmed) this.xtremeDashArmed = false;
    this.showAttackBanner(
      this.specialArmed ? 'Especial preparado' : 'Especial reservado',
      this.specialArmed ? 'Acierta para lanzarlo ahora' : 'No se gastara en esta pregunta',
      'player',
      this.specialArmed ? 'finish-burst' : ''
    );
    this.updateXGauge();
  }

  armXtremeDash() {
    if (this.actionLocked || !this.canUseXtremeDash()) return;
    sounds.playClick();
    this.xtremeDashArmed = !this.xtremeDashArmed;
    if (this.xtremeDashArmed) {
      this.specialArmed = false;
      this.selectCombatAction('attack', false);
    }
    this.showAttackBanner(
      this.xtremeDashArmed ? 'Xtreme Dash preparado' : 'Dash reservado',
      this.xtremeDashArmed ? 'Acierta rapido para enganchar el rail' : 'No entraras al carril X',
      'player',
      this.xtremeDashArmed ? 'xtreme-dash' : ''
    );
    this.updateXGauge();
  }

  selectCombatAction(action, playSound = true) {
    if (this.actionLocked) return;
    const validAction = ['attack', 'defense', 'charge'].includes(action) ? action : 'attack';
    this.selectedAction = validAction;
    if (playSound) sounds.playClick();
    document.querySelectorAll('[data-combat-action]').forEach(button => {
      const isActive = button.dataset.combatAction === validAction;
      button.classList.toggle('active', isActive);
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', button.dataset.combatAction === validAction ? 'true' : 'false');
    });
    const label = document.getElementById('combat-action-readout');
    if (label) {
      const recommended = this.getRecommendedAction();
      const isMatch = validAction === recommended;
      const labels = { attack: 'Ataque', defense: 'Defensa', charge: 'Carga' };
      // Textos base por accion seleccionada
      const text = {
        attack: 'Ataque: si aciertas, embistes fuerte.',
        defense: 'Defensa: si fallas, aguantas el golpe.',
        charge: 'Carga: si aciertas, sube tu especial.'
      };
      // Consejo contextual con nombre de la accion recomendada
      let advice = '';
      if (this.rivalIntent) {
        advice = isMatch
          ? `\u2605 Buena eleccion contra "${this.rivalIntent.label}".`
          : `Consejo: prueba ${labels[recommended]}.`;
      } else {
        advice = `Consejo: ${labels[recommended]}.`;
      }
      label.innerText = `${text[validAction]} ${advice}`;
      // Clases visuales: amarillo si coincide con recomendada, rojo suave si es la opuesta
      const oppositeAction = recommended === 'attack' ? 'charge' : recommended === 'defense' ? 'attack' : 'defense';
      label.classList.toggle('readout-match', isMatch);
      label.classList.toggle('readout-risk', !isMatch && validAction === oppositeAction);
    }
    this.updateXGauge();
  }

  setRivalIntent(intent) {
    this.rivalIntent = intent || { type: 'attack', label: 'Rival prepara ataque', hint: 'Defiende o responde rapido.' };
    const badge = document.getElementById('rival-intent-badge');
    if (badge) {
      badge.dataset.intent = this.rivalIntent.type;
      badge.innerHTML = `<span>${this.rivalIntent.label}</span><small>${this.rivalIntent.hint}</small>`;
    }
    this.markRecommendedAction();
  }

  getActionAdvice() {
    const recommended = this.getRecommendedAction();
    const labels = { attack: 'Ataque', defense: 'Defensa', charge: 'Carga' };
    return `Consejo: ${labels[recommended]}.`;
  }

  getRecommendedAction() {
    if (this.rivalIntent?.type === 'attack') return 'defense';
    if (this.rivalIntent?.type === 'defense') return 'charge';
    if (this.rivalIntent?.type === 'charge') return 'attack';
    return 'attack';
  }

  markRecommendedAction() {
    const recommended = this.getRecommendedAction();
    document.querySelectorAll('[data-combat-action]').forEach(button => {
      button.classList.toggle('recommended', button.dataset.combatAction === recommended);
    });
  }

  chooseRivalIntent() {
    const type = this.rivalBey?.tipo || 'balance';
    const pattern = this.rivalPattern || this.getRivalBattlePattern(this.rivalCharacter, this.rivalBey, this.rivalCharacterStats);
    if (this.difficulty >= 7 && this.playerHP <= 45 && Math.random() < 0.45) {
      return { type: 'attack', label: 'El rival huele la victoria', hint: 'Defiende y acierta.' };
    }
    if (pattern?.id === 'tactician' && this.correctStreak >= 2) {
      return { type: 'defense', label: pattern.name, hint: 'Ha leido tu combo: carga o responde con precision.' };
    }
    if (pattern?.id === 'sprinter' && Math.random() < 0.45) {
      return { type: 'attack', label: pattern.name, hint: 'Golpe rapido: prepara Defensa.' };
    }
    if (pattern?.id === 'wall' && Math.random() < 0.5) {
      return { type: 'defense', label: pattern.name, hint: pattern.hint };
    }
    if (pattern?.id === 'stamina' && Math.random() < 0.5) {
      return { type: 'charge', label: pattern.name, hint: pattern.hint };
    }
    if (pattern?.id === 'pressure' && Math.random() < 0.55) {
      return { type: 'attack', label: pattern.name, hint: pattern.hint };
    }
    if (this.difficulty >= 5 && this.correctStreak === 0 && Math.random() < 0.35) {
      return { type: 'charge', label: 'El rival carga giro', hint: 'Ataca antes de que suba.' };
    }
    if (this.correctStreak >= 2) {
      return { type: 'defense', label: 'El rival se cubre', hint: 'Carga o ataca con precision.' };
    }
    if (type === 'ataque') {
      return { type: 'attack', label: 'El rival prepara embestida', hint: 'Defiende si dudas.' };
    }
    if (type === 'defensa') {
      return { type: 'defense', label: 'El rival levanta guardia', hint: 'Carga energia especial.' };
    }
    if (type === 'estamina') {
      return { type: 'charge', label: 'El rival carga giro', hint: 'Ataca antes de que aguante mas.' };
    }
    return Math.random() < 0.5
      ? { type: 'attack', label: 'El rival busca choque', hint: 'Acierta para ganarle el centro.' }
      : { type: 'charge', label: 'El rival carga energia', hint: 'Presiona con ataque.' };
  }

  // physics loop simulator for spinning tops with real collision checks
  startPhysicsSimulation() {
    this.stopPhysicsSimulation();
    if (!this.playerCombatant || !this.rivalCombatant) this.initCombatants();
    this.lastPhysicsTs = performance.now();
    const scheduleFrame = typeof requestAnimationFrame === 'function'
      ? requestAnimationFrame
      : callback => setTimeout(() => callback(performance.now()), 16);
    const tick = timestamp => {
      const dt = Math.min(0.04, Math.max(0.001, (timestamp - this.lastPhysicsTs) / 1000));
      this.lastPhysicsTs = timestamp;
      this.updateMotion(dt, timestamp);
      this.renderCombatants();
      this.physTimer = scheduleFrame(tick);
    };
    this.physTimer = scheduleFrame(tick);
  }

  stopPhysicsSimulation() {
    if (this.physTimer) {
      if (typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(this.physTimer);
      } else {
        clearTimeout(this.physTimer);
      }
    }
    this.physTimer = null;
  }

  updateMotion(dt, timestamp) {
    const combatants = [this.playerCombatant, this.rivalCombatant].filter(Boolean);
    combatants.forEach(combatant => {
      const centerPull = combatant.status === 'attacking' ? 0.8 : 0.18;
      combatant.vx += (50 - combatant.x) * centerPull * dt;
      combatant.vy += (50 - combatant.y) * centerPull * dt;

      const railSpin = (combatant.id === 'player' ? 1 : -1) * (0.8 + (combatant.bey.velocidad || 70) / 160);
      combatant.vx += Math.cos(timestamp / 520 + (combatant.id === 'player' ? 0 : Math.PI)) * railSpin * dt * 12;
      combatant.vy += Math.sin(timestamp / 470 + (combatant.id === 'player' ? 0.8 : 3.4)) * railSpin * dt * 9;

      const maxSpeed = 22 + (combatant.bey.velocidad || 70) * 0.22;
      const speed = Math.hypot(combatant.vx, combatant.vy) || 1;
      if (speed > maxSpeed) {
        combatant.vx = (combatant.vx / speed) * maxSpeed;
        combatant.vy = (combatant.vy / speed) * maxSpeed;
      }

      combatant.x += combatant.vx * dt;
      combatant.y += combatant.vy * dt;
      combatant.vx *= 0.992;
      combatant.vy *= 0.992;
      this.resolveArenaBounds(combatant, timestamp);
    });

    this.resolveTopCollision(this.playerCombatant, this.rivalCombatant, timestamp);
    this.trailAccumulator += dt;
    if (this.trailAccumulator > 0.045) {
      this.trailAccumulator = 0;
      combatants.forEach(combatant => this.spawnTrail(combatant));
    }
  }

  resolveArenaBounds(combatant, timestamp) {
    const minX = 12;
    const maxX = 88;
    const minY = 14;
    const maxY = 86;
    let bounced = false;
    if (combatant.x < minX || combatant.x > maxX) {
      combatant.x = Math.max(minX, Math.min(maxX, combatant.x));
      combatant.vx *= -0.85;
      bounced = true;
    }
    if (combatant.y < minY || combatant.y > maxY) {
      combatant.y = Math.max(minY, Math.min(maxY, combatant.y));
      combatant.vy *= -0.85;
      bounced = true;
    }
    if (bounced && timestamp - this.lastCollisionTs > 180) {
      this.spawnParticles(combatant.x, combatant.y, combatant.color, 6);
    }
  }

  resolveTopCollision(a, b, timestamp) {
    if (!a || !b) return;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy) || 0.001;
    const minDist = a.radius + b.radius;
    if (dist > minDist) return;

    const nx = dx / dist;
    const ny = dy / dist;
    const overlap = minDist - dist;
    a.x -= nx * overlap * 0.5;
    a.y -= ny * overlap * 0.5;
    b.x += nx * overlap * 0.5;
    b.y += ny * overlap * 0.5;

    const relVel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
    if (relVel < 0) {
      const impulse = -(1.45 * relVel);
      a.vx -= impulse * nx;
      a.vy -= impulse * ny;
      b.vx += impulse * nx;
      b.vy += impulse * ny;
    }

    if (timestamp - this.lastCollisionTs > 320) {
      this.lastCollisionTs = timestamp;
      const impactX = (a.x + b.x) / 2;
      const impactY = (a.y + b.y) / 2;
      this.triggerClashVisual(impactX, impactY, a.status === 'special' || b.status === 'special');
    }
  }

  renderCombatants() {
    const pairs = [
      [this.playerCombatant, document.getElementById('player-top')],
      [this.rivalCombatant, document.getElementById('rival-top')]
    ];
    pairs.forEach(([combatant, el]) => {
      if (!combatant || !el) return;
      const depthScale = 0.9 + (combatant.y / 100) * 0.25;
      el.style.left = `${combatant.x}%`;
      el.style.top = `${combatant.y}%`;
      this.setCssVar(el, '--top-scale', depthScale.toFixed(2));
      el.classList.toggle('boosting', combatant.status === 'attacking');
      el.classList.toggle('special-ready', combatant.charge >= 3 || combatant.status === 'special');
    });
    this.updateTopLabels();
    this.playerX = this.playerCombatant?.x || this.playerX;
    this.playerY = this.playerCombatant?.y || this.playerY;
    this.rivalX = this.rivalCombatant?.x || this.rivalX;
    this.rivalY = this.rivalCombatant?.y || this.rivalY;
  }

  updateTopLabels() {
    const labels = [
      [this.playerCombatant, document.querySelector('.top-label-player')],
      [this.rivalCombatant, document.querySelector('.top-label-rival')]
    ];
    labels.forEach(([combatant, label]) => {
      if (!combatant || !label) return;
      label.style.left = `${combatant.x}%`;
      label.style.top = `${Math.max(5, combatant.y - 12)}%`;
      label.classList.toggle('boosting', combatant.status === 'attacking' || combatant.status === 'special');
    });
  }

  dispose() {
    this.stopPhysicsSimulation();
    this.clearTowerBattleState();
    if (this.gaugeInterval) clearInterval(this.gaugeInterval);
    this.gaugeInterval = null;
    if (this.battleIntroTimer) clearTimeout(this.battleIntroTimer);
    if (this.battleIntroExitTimer) clearTimeout(this.battleIntroExitTimer);
    this.battleIntroTimer = null;
    this.battleIntroExitTimer = null;
    this.battleIntroFinish = null;
    const battleIntro = document.getElementById('battle-intro');
    if (battleIntro) {
      battleIntro.classList.remove('is-active');
      battleIntro.classList.remove('is-exiting');
      battleIntro.style.display = 'none';
      battleIntro.hidden = true;
      battleIntro.setAttribute('aria-hidden', 'true');
    }
    const launchOverlay = document.getElementById('launch-overlay');
    if (launchOverlay) launchOverlay.style.display = 'none';
    const feedbackOverlay = document.getElementById('combat-feedback');
    if (feedbackOverlay) feedbackOverlay.style.display = 'none';
  }

  // 1. LAUNCH GAUGE PHASE
  startLaunchPhase() {
    sounds.playLaunch();
    const overlay = document.getElementById('launch-overlay');
    overlay.style.display = 'flex';

    // Bar animation
    const bar = document.getElementById('launch-gauge-bar');
    let width = 0;
    let direction = 1;
    
    this.gaugeInterval = setInterval(() => {
      width += 3 * direction;
      if (width >= 100) direction = -1;
      if (width <= 0) direction = 1;
      bar.style.width = `${width}%`;
    }, 20);

    // Launch question
    const table = typeof this.weekNum === 'number' ? Math.max(2, this.weekNum) : 2;
    const launchQ = this.createMultiplicationQuestion(table);
    
    document.getElementById('launch-question-text').innerText = launchQ.text;
    
    const ansContainer = document.getElementById('launch-answers');
    ansContainer.innerHTML = '';
    
    launchQ.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn-action';
      btn.style.flex = '1';
      btn.style.fontSize = '1.4rem';
      btn.innerText = opt;
      
      btn.onclick = () => {
        clearInterval(this.gaugeInterval);
        this.gaugeInterval = null;
        const finalWidth = parseFloat(bar.style.width);
        const isSweetSpot = finalWidth >= 70 && finalWidth <= 92;

        if (parseInt(opt) === launchQ.answer) {
          sounds.playCorrect();
          overlay.style.display = 'none';
          
          if (isSweetSpot) {
            // Perfect launch bonus!
            sounds.playSpecial();
            this.rivalHP = Math.max(0, this.rivalHP - 15);
            if (this.playerCombatant) this.playerCombatant.charge = 1;
            this.updateHpBars();
            this.updateXGauge();
            this.performAttackSequence('player', 'special');
            this.app.showNotice("¡Lanzamiento perfecto! Tu Bey gana velocidad.", "Lanzamiento");
          } else {
            this.performAttackSequence('player', 'dash');
            this.app.showNotice("¡Xtreme Dash cargado!", "Lanzamiento");
          }
          if (this.companionStartMessage) {
            this.showAttackBanner('Apoyo inicial', this.companionStartMessage, 'player', 'round-cleared');
            this.companionStartMessage = '';
          }
          this.startPhysicsSimulation();
          this.nextQuestion();
        } else {
          sounds.playIncorrect();
          overlay.style.display = 'none';
          this.playerHP -= 10;
          this.updateHpBars();
          this.app.showNotice("Tu Bey se tambalea, pero puedes remontar.", "Lanzamiento");
          if (this.companionStartMessage) {
            this.showAttackBanner('Apoyo inicial', this.companionStartMessage, 'player', 'round-cleared');
            this.companionStartMessage = '';
          }
          this.startPhysicsSimulation();
          this.nextQuestion();
        }
      };
      ansContainer.appendChild(btn);
    });
  }

  // Generate the 10 questions for this battle
  generateQuestionsList() {
    this.questionsList = [];

    if (this.isBoss && typeof this.weekNum === 'number') {
      const bossQuestions = LearningEngine.selectQuestionsForWeeklyBoss(this.state, this.weekNum, this.questionCount);
      if (bossQuestions.length > 0) {
        bossQuestions.slice(0, this.questionCount).forEach(question => {
          this.questionsList.push(this.adaptCurriculumQuestion(question, 'curriculum-boss'));
        });
        this.questionCount = this.questionsList.length;
        return;
      }
    }

    if (this.weekNum === 'post-boss-review') {
      const reviewQuestions = LearningEngine.selectQuestionsForPostBossReview(this.state, null, this.questionCount);
      if (reviewQuestions.length > 0) {
        reviewQuestions.slice(0, this.questionCount).forEach(question => {
          this.questionsList.push(this.adaptCurriculumQuestion(question, 'curriculum-review'));
        });
        this.questionCount = this.questionsList.length;
        return;
      }
    }

    if (this.floorData && typeof LearningEngine.selectQuestionsForTowerFloor === 'function') {
      const towerQuestions = LearningEngine.selectQuestionsForTowerFloor(this.state, this.floorData, this.questionCount);
      if (towerQuestions.length > 0) {
        towerQuestions.slice(0, this.questionCount).forEach(question => {
          this.questionsList.push(this.adaptCurriculumQuestion(question, 'curriculum-tower'));
        });
        this.questionCount = this.questionsList.length;
        return;
      }
    }

    if (this.curriculumMission && this.curriculumMission.subject.id === 'math') {
      const curriculumQuestions = LearningEngine.selectQuestionsForMission(this.state, this.curriculumMission, this.questionCount);
      if (curriculumQuestions.length > 0) {
        curriculumQuestions.slice(0, this.questionCount).forEach(question => {
          this.questionsList.push(this.adaptCurriculumQuestion(question, 'curriculum-math'));
        });
        this.questionCount = this.questionsList.length;
        return;
      }
    }
    
    // If reinforcement session, load from parent error log
    if (this.weekNum === 'reinforce') {
      const troubles = this.state.pedagogy.math.troublesomeOperations;
      for (let i = 0; i < 10; i++) {
        const rawOp = troubles[i % troubles.length];
        const parts = rawOp.split('x');
        const a = parseInt(parts[0]);
        const b = parseInt(parts[1]);
        this.questionsList.push({
          type: 'mult',
          a, b,
          text: `${a} x ${b}`,
          answer: a * b,
          options: this.generateOptions(a * b),
          hint: `${a} x ${b} es sumar ${a} ocho veces o viceversa.`
        });
      }
      return;
    }

    // Default table corresponding to current week (Week 1 = intro/sumas, Week 2 = table 2, etc.)
    const table = this.weekNum;

    for (let i = 0; i < this.questionCount; i++) {
      let q = null;
      if (table === 1) {
        // Week 1: Sums & concept
        const a = Math.floor(Math.random() * 8) + 2;
        q = {
          type: 'sum',
          text: `Cuanto es ${a} + ${a}?`,
          answer: a + a,
          options: this.generateOptions(a + a),
          hint: `Suma el número ${a} dos veces.`
        };
      } else if (table >= 2 && table <= 9) {
        // Standard table weeks: Mix of products, blank slots, and logic series
        const r = Math.random();
        if (r < 0.6) {
          // Regular product
          const factor = Math.floor(Math.random() * 9) + 2; // 2 to 10
          q = {
            type: 'mult',
            text: `${table} x ${factor}`,
            answer: table * factor,
            options: this.generateOptions(table * factor),
            hint: `Suma ${table} unas ${factor} veces consecutivas.`
          };
        } else if (r < 0.8) {
          // Fill in the blank
          const factor = Math.floor(Math.random() * 9) + 2;
          q = {
            type: 'blank',
            text: `${table} x ? = ${table * factor}`,
            answer: factor,
            options: this.generateOptions(factor),
            hint: `Que numero multiplicado por ${table} da ${table * factor}?`
          };
        } else {
          // Logical logic series
          const startVal = table * (Math.floor(Math.random() * 4) + 1);
          q = {
            type: 'series',
            text: `${startVal}, ${startVal + table}, ?, ${startVal + table * 3}`,
            answer: startVal + table * 2,
            options: this.generateOptions(startVal + table * 2),
            hint: `La serie avanza de ${table} en ${table}.`
          };
        }
      } else if (table === 10) {
        // Mixed tables
        const factorA = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const factorB = Math.floor(Math.random() * 8) + 2;
        q = {
          type: 'mult',
          text: `${factorA} x ${factorB}`,
          answer: factorA * factorB,
          options: this.generateOptions(factorA * factorB),
          hint: `Repasa la tabla del ${factorA}.`
        };
      } else if (table === 11) {
        // Problems
        const factorA = Math.floor(Math.random() * 7) + 3; // 3 to 9
        const factorB = Math.floor(Math.random() * 4) + 2; // 2 to 5
        const stories = [
          `Carlitos tiene ${factorB} peonzas. Cada una cuesta ${factorA} monedas. Cuantas monedas valen todas?`,
          `En el torneo hay ${factorB} equipos de ${factorA} entrenadores cada uno. Cuantos juegan en total?`,
          `Un taller hace ${factorA} puntas al dia. En ${factorB} dias, cuantas puntas fabrica?`
        ];
        q = {
          type: 'problem',
          text: stories[Math.floor(Math.random() * stories.length)],
          answer: factorA * factorB,
          options: this.generateOptions(factorA * factorB),
          hint: `Debes multiplicar ${factorA} por ${factorB}.`
        };
      } else {
        // Grand finale
        const factorA = Math.floor(Math.random() * 8) + 2;
        const factorB = Math.floor(Math.random() * 8) + 2;
        q = {
          type: 'mult',
          text: `${factorA} x ${factorB}`,
          answer: factorA * factorB,
          options: this.generateOptions(factorA * factorB),
          hint: `Cálculo final del campeonato.`
        };
      }
      this.questionsList.push(q);
    }
  }

  adaptCurriculumQuestion(question, type = 'curriculum') {
    return {
      type,
      curriculumId: question.id,
      skill: question.skill,
      subject: question.subject,
      text: this.getChildFriendlyQuestionText(question),
      answer: question.answer,
      options: question.options,
      hint: question.explanation || 'Piensa en los datos importantes y elige el procedimiento antes de responder.',
      explanation: question.explanation || '',
      difficulty: question.difficulty || 1,
      isGuidedIntro: question.isGuidedIntro === true,
      guidedIntro: question.guidedIntro || null
    };
  }

  getChildFriendlyQuestionText(question) {
    const rawPrompt = String(question?.prompt || question?.text || '').trim();
    if (!rawPrompt) return rawPrompt;
    const cleanedPrompt = this.cleanGeneratedQuestionPrefix(rawPrompt);
    if (question?.subject === 'english' || this.looksLikeEnglishPrompt(rawPrompt)) {
      return this.rewriteEnglishPromptForChild(cleanedPrompt);
    }
    return this.rewriteGeneralPromptForChild(cleanedPrompt, question);
  }

  cleanGeneratedQuestionPrefix(prompt) {
    return String(prompt || '')
      .replace(/^(?:Situacion|Situación)(?:\s+[^:]{3,70})?\s+\d+\s*:\s*/i, '')
      .replace(/^(?:Reto de entrenamiento|Modo Torre X|Repaso rapido|Para ganar energia|Nueva variante|Duelo de precision)\s*:\s*/i, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  looksLikeEnglishPrompt(prompt) {
    return /^(best answer:|choose the best answer:|choose the |how do you say |which word means |what color is |what is "|complete:|a:\s*)/i.test(prompt);
  }

  rewriteEnglishPromptForChild(prompt) {
    const text = String(prompt || '').trim();
    const bestAnswer = text.match(/^(?:choose the best answer:|best answer:)\s*["“]?(.+?)["”]?$/i);
    if (bestAnswer) {
      const phrase = bestAnswer[1].trim().replace(/\s+/g, ' ');
      const normalizedPhrase = phrase.replace(/[.!?]+$/, '');
      const isQuestion = /^(what|how|do|does|can|where|when|who|which|is|are)\b/i.test(normalizedPhrase);
      return isQuestion
        ? `En ingles, si alguien pregunta "${normalizedPhrase}?", que respondes?`
        : `En ingles, si alguien dice "${normalizedPhrase}", que respondes?`;
    }

    const dialogue = text.match(/^A:\s*(.+?)\s+B:\s*___\.?$/i);
    if (dialogue) {
      return `Completa el dialogo en ingles:\nA: ${dialogue[1].trim()}\nB: ___`;
    }

    const howSay = text.match(/^How do you say\s+"(.+?)"\??$/i);
    if (howSay) return `Como se dice "${howSay[1]}" en ingles?`;

    const wordMeans = text.match(/^Which word means\s+"(.+?)"\??$/i);
    if (wordMeans) return `Que palabra significa "${wordMeans[1]}"?`;

    const colorMeans = text.match(/^What color is\s+"(.+?)"\??$/i);
    if (colorMeans) return `Que color significa "${colorMeans[1]}"?`;

    const whatIs = text.match(/^What is\s+"(.+?)"\??$/i);
    if (whatIs) return `Que significa "${whatIs[1]}"?`;

    const complete = text.match(/^Complete:\s*(.+)$/i);
    if (complete) return `Completa la frase en ingles: ${complete[1].trim()}`;

    const chooseText = text.replace(/\s+/g, ' ').toLowerCase();
    const choosePrompts = {
      'choose a greeting.': 'Elige un saludo en ingles.',
      'choose the greeting.': 'Elige un saludo en ingles.',
      'choose the polite word.': 'Elige la palabra educada en ingles.',
      'choose the question for a name.': 'Elige la pregunta que sirve para saber el nombre.',
      'choose the animal.': 'Elige el animal en ingles.',
      'choose the routine.': 'Elige la rutina diaria en ingles.',
      'choose a routine.': 'Elige una rutina diaria en ingles.',
      'choose a daily routine.': 'Elige una rutina diaria en ingles.',
      'choose the school object.': 'Elige el objeto escolar en ingles.',
      'choose the food.': 'Elige la comida o fruta en ingles.',
      'choose the correct sentence.': 'Elige la frase correcta en ingles.',
      'choose the negative.': 'Elige la frase negativa correcta en ingles.',
      'best sentence for a hobby.': 'Elige la mejor frase en ingles para hablar de una aficion.'
    };
    if (choosePrompts[chooseText]) return choosePrompts[chooseText];

    const chooseAnimal = text.match(/^Choose the animal:\s*(.+)$/i);
    if (chooseAnimal) return `Que animal es "${chooseAnimal[1].trim()}" en ingles?`;

    return text;
  }

  rewriteGeneralPromptForChild(prompt, question = {}) {
    const text = String(prompt || '').trim();
    const compact = text.replace(/\s+/g, ' ');
    const lower = compact.toLowerCase();

    if (question?.type === 'truefalse') {
      return `Lee la frase y decide si es verdadera o falsa:\n${compact}`;
    }

    if (question?.type === 'vocabulary') {
      return compact.startsWith('En el texto,')
        ? `Vocabulario del texto:\n${compact}`
        : `Elige el significado correcto:\n${compact}`;
    }

    // Separa los mini textos de lengua para que no parezcan una frase mezclada.
    const miniText = compact.match(/^Texto:\s*(.+?)\s+¿?(Que|Qué|Cual|Cuál|Como|Cómo|Donde|Dónde|Por que|Por qué|De que|De qué|Cuando|Cuándo|Cuanto|Cuánto|Cuanta|Cuánta|Cuantos|Cuántos|Cuantas|Cuántas)\b(.+)$/i);
    if (miniText) {
      return `Lee este mini texto:\n${miniText[1].trim()}\n\n${miniText[2]}${miniText[3]}`.trim();
    }

    if (/^\d+\s*(?:\+|-|x|×)\s*\d+\s*=\s*\?$/i.test(compact)) {
      return `Calcula esta operacion:\n${compact}`;
    }

    if (/^\d+\s+grupos?\s+de\s+\d+\s+son/i.test(compact)) {
      return `Piensa en grupos iguales y calcula:\n${compact}`;
    }

    if (/^completa la tabla:/i.test(compact)) {
      return compact.replace(/^Completa la tabla:/i, 'Completa la multiplicacion:');
    }

    if (/^que numero tiene/i.test(lower)) {
      return `Construye el numero con las pistas:\n${compact}`;
    }

    if (/^cual es el numero mayor\??$/i.test(compact)) {
      return 'Mira las opciones y elige el numero mayor.';
    }

    const placeValue = compact.match(/^En\s+(\d+),\s*(que cifra .+)$/i);
    if (placeValue) {
      return `Mira el numero ${placeValue[1]}.\n${placeValue[2]}`;
    }

    if (/^redondea\b/i.test(compact)) {
      return `Redondea como te piden:\n${compact}`;
    }

    if (/^ordena\b/i.test(compact)) {
      return `Pon las ideas en orden:\n${compact}`;
    }

    if (/^elige la palabra (?:bien escrita|correcta)\.?$/i.test(compact)) {
      return 'Fijate bien en la escritura y elige la palabra correcta.';
    }

    if (/^elige la frase correcta\.?$/i.test(compact)) {
      return 'Fijate en mayusculas, punto y sentido. Elige la frase correcta.';
    }

    if (/^el ritmo en musica es\.\.\.$/i.test(compact)) {
      return 'Completa la idea: el ritmo en musica es...';
    }

    if (/^un color primario es\.\.\.$/i.test(compact)) {
      return 'Elige cual de las opciones es un color primario.';
    }

    if (/^una textura puede ser\.\.\.$/i.test(compact)) {
      return 'Elige cual de las opciones puede ser una textura.';
    }

    if (/^un storyboard sirve para\.\.\.$/i.test(compact)) {
      return 'Elige para que sirve un storyboard.';
    }

    if (/^antes de comer conviene\.\.\.$/i.test(compact)) {
      return 'Elige que conviene hacer antes de comer.';
    }

    if (/\.\.\.$/.test(compact)) {
      return `Completa la idea:\n${compact}`;
    }

    return text;
  }

  createMultiplicationQuestion(table) {
    const factor = Math.floor(Math.random() * 5) + 2; // keep launch easy
    return {
      text: `${table} x ${factor}`,
      answer: table * factor,
      options: this.generateOptions(table * factor)
    };
  }

  generateOptions(correct) {
    const opts = new Set();
    opts.add(correct);
    while (opts.size < 3) {
      // Generate close distractors
      const offset = (Math.floor(Math.random() * 3) + 1) * (Math.random() < 0.5 ? -1 : 1);
      const val = correct + offset;
      if (val > 0) opts.add(val);
    }
    return [...opts].sort((a, b) => a - b);
  }

  nextQuestion() {
    const round = this.getCurrentRound();
    if (this.currentQuestionIdx >= (round?.end || this.questionCount)) {
      if (this.rivalHP <= 0) this.completeRound();
      else this.repeatCurrentRound('Sin energia suficiente para tumbar al rival');
      return;
    }

    this.currentQuestion = this.questionsList[this.currentQuestionIdx];
    this.actionLocked = false;
    this.setRivalIntent(this.chooseRivalIntent());
    this.selectCombatAction(this.selectedAction || 'attack', false);
    
    // Update combat text indicators
    const roundQuestionNumber = Math.max(1, this.currentQuestionIdx - (round?.start || 0) + 1);
    const roundQuestionTotal = Math.max(1, (round?.end || this.questionCount) - (round?.start || 0));
    document.getElementById('question-index-label').innerText = this.currentQuestion.isLightning
      ? `Reto relampago ${roundQuestionNumber}/${roundQuestionTotal}`
      : `Ronda ${this.currentRoundIndex + 1}/${this.rounds.length} · Reto ${roundQuestionNumber}/${roundQuestionTotal}`;
    
    // Decrease question text size slightly for long word problems
    const questionTextEl = document.getElementById('combat-question-text');
    if (questionTextEl) {
      const length = String(this.currentQuestion.text || '').length;
      questionTextEl.classList.toggle('is-long', length > 58);
      questionTextEl.classList.toggle('is-very-long', length > 120);
      questionTextEl.style.fontSize = '';
      if (length > 120) {
        questionTextEl.style.fontSize = 'clamp(1.02rem, 2.2vw, 1.28rem)';
      } else if (length > 58) {
        questionTextEl.style.fontSize = 'clamp(1.18rem, 2.8vw, 1.55rem)';
      } else if (length > 25) {
        questionTextEl.style.fontSize = 'clamp(1.45rem, 3.8vw, 2.1rem)';
      } else {
        questionTextEl.style.fontSize = 'clamp(2.3rem, 5vw, 3.5rem)';
      }
      questionTextEl.innerText = this.currentQuestion.text;
    }
    if (this.currentQuestion.isLightning) {
      this.showAttackBanner('Reto relampago', 'Acierta rapido para cargar energia', 'player');
    }

    // Render Answer buttons
    const answersDiv = document.getElementById('combat-answers');
    answersDiv.innerHTML = '';
    
    this.currentQuestion.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn-answer';
      btn.innerText = opt;
      btn.onclick = () => this.handleAnswer(opt);
      answersDiv.appendChild(btn);
    });

    // Update combo lights UI
    this.updateComboDots();
    this.questionStartedAt = Date.now();
    this.persistTowerBattleState();
  }

  handleAnswer(selectedAnswer) {
    if (this.actionLocked) return;
    this.actionLocked = true;
    const action = this.selectedAction || 'attack';
    const answerMs = Date.now() - (this.questionStartedAt || Date.now());
    const fastWindow = this.currentQuestion?.isLightning
      ? (this.currentQuestion.lightningWindowMs || 3200)
      : Math.max(4500, 8500 - (this.difficulty * 420));
    const isFastAnswer = answerMs <= fastWindow;
    const isCorrect = selectedAnswer === this.currentQuestion.answer;
    const outcome = this.resolveTurnOutcome(action, isCorrect, isFastAnswer);

    if (isCorrect) {
      sounds.playCorrect();
      this.correctStreak++;
      this.bestCombo = Math.max(this.bestCombo, this.correctStreak);
      if (isFastAnswer) this.fastAnswerStreak += 1;
      if (isFastAnswer) this.fastCorrect += 1;
      else this.assistedCorrect += 1;
      this.sessionCorrect += 1;
      this.state.pedagogy.math.correctAnswers += 1;
      if (this.currentQuestion?.isLightning && isFastAnswer && this.playerCombatant) {
        this.playerCombatant.charge = Math.min(3, this.playerCombatant.charge + 1);
        this.lightningDamageBonus = 5;
        this.showAttackBanner('Relampago X', '+1 Energia X y golpe reforzado');
      }
      ProgressService.recordAnswer(this.state, this.currentQuestion, true);
      this.recordCurriculumAnswer(true);
      const todayStats = this.app.getTodayStats();
      todayStats.answers += 1;
      todayStats.correct += 1;
    } else {
      sounds.playIncorrect();
      this.correctStreak = 0;
      if (this.currentQuestion.type === 'mult') {
        const errorKey = `${this.currentQuestion.a}x${this.currentQuestion.b}`;
        this.state.pedagogy.math.troublesomeOperations.push(errorKey);
      }
      this.sessionIncorrect += 1;
      this.state.pedagogy.math.incorrectAnswers += 1;
      this.state.pedagogy.math.dailyStreak = 0; // reset streak
      ProgressService.recordAnswer(this.state, this.currentQuestion, false);
      this.recordCurriculumAnswer(false);
      const todayStats = this.app.getTodayStats();
      todayStats.answers += 1;
      todayStats.incorrect += 1;
    }

    if (this.currentQuestion) {
      if (this.currentQuestion.curriculumId) this.usedTowerQuestionIds.add(this.currentQuestion.curriculumId);
      this.usedTowerQuestionSignatures.add(this.questionSignature(this.currentQuestion));
    }
    this.specialArmed = false;
    this.xtremeDashArmed = false;
    this.applyTurnOutcome(outcome, isCorrect);
    this.persistTowerBattleState();
    this.app.saveState();
  }

  calculatePlayerDamage(action) {
    const attack = this.playerBey?.ataque || 70;
    const defenderDefense = this.rivalBey?.defensa || 65;
    const characterAttack = this.playerCharacterStats?.attack || 55;
    const characterFocus = this.playerCharacterStats?.focus || 55;
    const rivalCharacterDefense = this.rivalCharacterStats?.defense || 55;
    const statBonus = Math.round((attack - defenderDefense) / 14) + Math.round((characterAttack + characterFocus - rivalCharacterDefense - 55) / 18);
    // Contraste ampliado: attack +12 (antes +7), charge -4 (antes -2), defense 0
    // Diferencia visible entre accion correcta e incorrecta: ~16 pts brutos antes de multiplicadores
    const actionBonus = action === 'attack' ? 12 : action === 'charge' ? -4 : 0;
    const rivalGuard = this.rivalIntent?.type === 'defense' ? -4 : 0;
    const fastBonus = this.fastAnswerStreak > 0 && this.fastAnswerStreak % 2 === 0 ? 2 : 0;
    const typeBonus = this.calculateTypeMatchupModifier(this.playerBey, this.rivalBey);
    const skillBonus = this.getSkillAffinityBonus(this.playerBey);
    return Math.max(7, 12 + statBonus + actionBonus + rivalGuard + fastBonus + typeBonus + skillBonus);
  }

  calculateSpecialDamage(action) {
    const attack = this.playerBey?.ataque || 70;
    const speed = this.playerBey?.velocidad || 70;
    const characterPower = ((this.playerCharacterStats?.attack || 55) + (this.playerCharacterStats?.speed || 55) + (this.playerCharacterStats?.focus || 55)) / 3;
    const actionBonus = action === 'attack' ? 7 : action === 'charge' ? 3 : 0;
    return Math.max(22, Math.round(24 + (attack + speed - 140) / 10 + (characterPower - 55) / 8 + actionBonus));
  }

  calculateRivalDamage(playerAction) {
    const attack = this.rivalBey?.ataque || 70;
    const defense = this.playerBey?.defensa || 65;
    const rivalPower = ((this.rivalCharacterStats?.attack || 55) + (this.rivalCharacterStats?.focus || 55)) / 2;
    const playerGuardStat = this.playerCharacterStats?.defense || 55;
    const intentBonus = this.rivalIntent?.type === 'attack' ? 6 : this.rivalIntent?.type === 'charge' ? 3 : 0;
    const playerGuard = playerAction === 'defense' ? -8 : playerAction === 'attack' ? 3 : 0;
    const typeBonus = this.calculateTypeMatchupModifier(this.rivalBey, this.playerBey);
    return Math.max(6, Math.round(14 + (attack - defense) / 14 + (rivalPower - playerGuardStat) / 18 + intentBonus + playerGuard + this.getDifficultyDamageBonus() + typeBonus));
  }

  classifyFinish(isCorrect, isFastAnswer, specialTriggered, action) {
    if (!isCorrect) return null;
    const difficulty = parseInt(this.currentQuestion?.difficulty, 10) || 1;
    if (isFastAnswer && (this.currentQuestion?.isLightning || difficulty >= 4) && (action === 'attack' || action === 'charge')) {
      return { type: 'xtreme', label: 'Xtreme Finish', points: 3, damageMultiplier: 1.35 };
    }
    if (specialTriggered || this.correctStreak + 1 >= 3) {
      return { type: 'burst', label: 'Burst Finish', points: 2, damageMultiplier: 1.22 };
    }
    if (isFastAnswer && (this.correctStreak + 1 >= 2 || difficulty >= 3)) {
      return { type: 'over', label: 'Over Finish', points: 2, damageMultiplier: 1.15 };
    }
    return { type: 'spin', label: 'Spin Finish', points: 1, damageMultiplier: 1 };
  }

  getStadiumXtremeModifier() {
    const stadiumId = `${this.floorData?.stadiumId || ''}`.toLowerCase();
    const stadiumName = `${this.floorData?.stadiumName || ''}`.toLowerCase();
    if (stadiumId.includes('advanced') || stadiumName.includes('xtreme') || this.towerFloor >= 21) return 1.18;
    if (stadiumId.includes('final') || this.towerFloor >= 41) return 1.25;
    return 1;
  }

  shouldTriggerXtremeDash(action, isCorrect, isFastAnswer) {
    if (this.xtremeDashArmed) return action === 'attack' && isCorrect && isFastAnswer;
    if (action !== 'attack' || !isCorrect || !isFastAnswer) return false;
    const speed = this.playerBey?.velocidad || 70;
    const difficulty = parseInt(this.currentQuestion?.difficulty, 10) || 1;
    return speed >= 78 || this.currentQuestion?.isLightning || difficulty >= 4;
  }

  shouldApplyXtremeRisk(action, isCorrect) {
    if (this.xtremeDashArmed && !isCorrect) return true;
    if (action !== 'attack' || isCorrect) return false;
    const difficulty = parseInt(this.currentQuestion?.difficulty, 10) || 1;
    return this.currentQuestion?.isLightning || difficulty >= 3 || (this.playerBey?.velocidad || 70) >= 86;
  }

  resolveTurnOutcome(action, isCorrect, isFastAnswer) {
    const normalizedAction = ['attack', 'defense', 'charge'].includes(action) ? action : 'attack';
    const rivalIntent = this.rivalIntent?.type || 'attack';
    const gaugeReady = (this.playerCombatant?.charge || 0) >= 3;
    const specialTriggered = isCorrect && this.specialArmed && (gaugeReady || this.correctStreak >= 2);

    // Determina si la accion elegida es la recomendada (contrarrestar: defense>attack, charge>defense, attack>charge)
    const recommended = this.getRecommendedAction();
    const isRecommended = normalizedAction === recommended;
    const oppositeAction = recommended === 'attack' ? 'charge' : recommended === 'defense' ? 'attack' : 'defense';

    let playerDamage = specialTriggered
      ? this.calculateSpecialDamage(normalizedAction)
      : isCorrect
        ? this.calculatePlayerDamage(normalizedAction)
        : 0;

    // Bonus tactico visible: la accion recomendada debe notarse tambien en HP, no solo en texto.
    // Rango moderado: +14 si contrarresta al rival, -10 si se elige la accion opuesta.
    if (isCorrect && !specialTriggered && playerDamage > 0) {
      if (isRecommended) {
        playerDamage += 14;
      } else if (normalizedAction === oppositeAction) {
        playerDamage = Math.max(7, playerDamage - 10);
      }
    }

    let rivalDamage = 0;
    let chargeDelta = 0;
    let bannerTitle = '';
    let bannerSubtitle = '';
    let playerAttackAction = specialTriggered ? 'special' : normalizedAction;
    let rivalAttackAction = rivalIntent === 'charge' ? 'special' : 'counter';
    let showExplanation = !isCorrect;
    const xtremeDash = this.shouldTriggerXtremeDash(normalizedAction, isCorrect, isFastAnswer);
    if (xtremeDash && playerDamage > 0) {
      const multiplier = (this.xtremeDashArmed ? 1.32 : 1.2) * this.getStadiumXtremeModifier();
      playerDamage = Math.round(playerDamage * multiplier) + 4;
      chargeDelta = this.xtremeDashArmed ? Math.min(chargeDelta, -2) : Math.max(chargeDelta, 1);
      bannerTitle = 'Xtreme Dash';
      bannerSubtitle = this.xtremeDashArmed ? 'Enganchas el rail y sales disparado' : 'Carril X activado';
      playerAttackAction = 'special';
    }
    if (playerDamage > 0 && this.lightningDamageBonus > 0) {
      playerDamage += this.lightningDamageBonus;
      this.lightningDamageBonus = 0;
    }
    let finish = this.classifyFinish(isCorrect, isFastAnswer, specialTriggered, normalizedAction);
    if (finish?.type === 'spin' && isRecommended && isCorrect && !specialTriggered) {
      finish = { type: 'over', label: 'Tactical Over Finish', points: 2, damageMultiplier: 1.12 };
    }
    if (finish && playerDamage > 0) {
      playerDamage = Math.round(playerDamage * finish.damageMultiplier);
      bannerTitle = bannerTitle || finish.label;
      bannerSubtitle = bannerSubtitle || `${finish.points} punto${finish.points === 1 ? '' : 's'} de finish`;
    }
    const companionAttack = this.applyCompanionPlayerDamageBonus(playerDamage, isCorrect, isFastAnswer);
    playerDamage = companionAttack.damage;
    if (companionAttack.message) {
      bannerTitle = bannerTitle || 'Apoyo de compañero';
      bannerSubtitle = bannerSubtitle ? `${bannerSubtitle} · ${companionAttack.message}` : companionAttack.message;
    }

    if (isCorrect) {
      if (specialTriggered) {
        bannerTitle = this.playerBey?.habilidad || ATTACK_NAMES[Math.floor(Math.random() * ATTACK_NAMES.length)];
        bannerSubtitle = 'Ataque especial elegido';
        chargeDelta = -(this.playerCombatant?.charge || 0);
      } else if (normalizedAction === 'charge') {
        chargeDelta = 1;
        bannerTitle = 'Carga +1';
        bannerSubtitle = 'Energia X';
      } else if (normalizedAction === 'defense' && rivalIntent === 'attack') {
        // Banner explicito: la Defensa fue la accion recomendada y bloqueó el ataque
        bannerTitle = '¡Defensa perfecta!';
        bannerSubtitle = 'Tu eleccion bloqueo el ataque rival';
      } else if (normalizedAction === 'attack' && rivalIntent === 'charge') {
        // Banner explicito: Ataque interrumpio la carga rival
        bannerTitle = '¡Interrupcion X!';
        bannerSubtitle = 'Elegiste bien: cortas la carga rival';
      } else if (normalizedAction === 'charge' && rivalIntent === 'defense') {
        bannerTitle = 'Carga lista';
        bannerSubtitle = 'Buena eleccion: rival en guardia';
      }

      if (!specialTriggered) {
        if (rivalIntent === 'attack' && normalizedAction === 'attack') {
          // Peor eleccion contra ataque: choque sin ventaja tactica, mas daño recibido
          rivalDamage = Math.max(2, Math.round(this.calculateRivalDamage('defense') * 0.45));
          bannerTitle = bannerTitle || 'Choque directo';
          bannerSubtitle = 'Pegas fuerte, pero recibes impacto';
        } else if (rivalIntent === 'attack' && normalizedAction === 'charge') {
          // Accion opuesta a la recomendada: daño recibido mayor
          rivalDamage = Math.max(5, Math.round(this.calculateRivalDamage('charge') * 0.65));
          chargeDelta = Math.max(chargeDelta, 1);
          bannerTitle = bannerTitle || 'Carga arriesgada';
          bannerSubtitle = 'Ganas energia, pero el rival te golpea fuerte';
        } else if (rivalIntent === 'defense' && normalizedAction === 'attack') {
          rivalDamage = Math.max(1, Math.round(this.getDifficultyDamageBonus() + 2));
          bannerTitle = bannerTitle || 'Rebote de guardia';
          bannerSubtitle = 'El rival estaba cubierto, poco daño';
        }
      }

      if (isFastAnswer && normalizedAction === 'attack' && !specialTriggered) {
        bannerTitle = bannerTitle || 'Dash rapido';
        bannerSubtitle = 'Respuesta veloz';
      }

      // Si la accion fue recomendada y no hay banner tactico mas especifico, confirmar la buena eleccion al jugador
      if (isRecommended && !bannerTitle && !specialTriggered) {
        bannerTitle = '¡Tactica correcta!';
        bannerSubtitle = 'Tu eleccion marco la diferencia';
      }
    } else {
      chargeDelta = normalizedAction === 'charge' ? -2 : -1;
      rivalDamage = this.calculateRivalDamage(normalizedAction);
      if (normalizedAction === 'defense') {
        rivalDamage = Math.max(3, Math.round(rivalDamage * 0.55));
        bannerTitle = 'Defensa aguanta';
        bannerSubtitle = isRecommended
          ? 'Fallaste, pero la Defensa redujo el golpe'
          : 'Fallaste y la accion no ayudo tanto';
      } else if (normalizedAction === 'attack') {
        rivalDamage = Math.round(rivalDamage * 1.15);
        bannerTitle = 'Contraataque rival';
        bannerSubtitle = isRecommended
          ? 'Fallaste el ataque: el rival responde fuerte'
          : 'Mala eleccion y fallo: golpe doble rival';
      } else {
        bannerTitle = 'Carga rota';
        bannerSubtitle = 'Pierdes energia X';
      }
      if (this.shouldApplyXtremeRisk(normalizedAction, isCorrect)) {
        rivalDamage = Math.round(rivalDamage * (this.xtremeDashArmed ? 1.38 : 1.25)) + 3;
        bannerTitle = 'Salida del carril X';
        bannerSubtitle = this.xtremeDashArmed ? 'Fallaste el Dash: el rival te castiga' : 'Riesgo de ataque fallido';
      }
      const companionDefense = this.applyCompanionRivalDamageReduction(rivalDamage, 'mistake');
      rivalDamage = companionDefense.damage;
      if (companionDefense.message) {
        bannerSubtitle = bannerSubtitle ? `${bannerSubtitle} · ${companionDefense.message}` : companionDefense.message;
      }
    }

    return {
      action: normalizedAction,
      isCorrect,
      specialTriggered,
      playerDamage: Math.max(0, Math.round(playerDamage)),
      rivalDamage: Math.max(0, Math.round(rivalDamage)),
      chargeDelta,
      bannerTitle,
      bannerSubtitle,
      playerAttackAction,
      rivalAttackAction,
      showExplanation,
      finish,
      xtremeDash,
      xtremeRisk: this.shouldApplyXtremeRisk(normalizedAction, isCorrect),
      // Resultado tactico para colorear el readout tras el turno
      tacticResult: isCorrect ? (isRecommended ? 'match' : 'neutral') : (normalizedAction === 'defense' ? 'saved' : 'risk')
    };
  }

  getRivalTurnDamage() {
    const base = this.calculateRivalDamage('attack');
    const intentBoost = this.rivalIntent?.type === 'attack' ? 3 : this.rivalIntent?.type === 'charge' ? 2 : 0;
    const patternBoost = this.rivalPattern?.damageBonus || 0;
    // Turno activo del rival: amenaza clara pero contenida para no romper el balance de planta.
    return Math.max(6, Math.min(28, Math.round((base * 0.62) + intentBoost + patternBoost)));
  }

  getBlockTimingResult(startedAt, durationMs) {
    const elapsed = Math.max(0, Date.now() - startedAt);
    const cycle = (elapsed % (durationMs * 2)) / durationMs;
    const progress = cycle <= 1 ? cycle : 2 - cycle;
    const center = 0.5;
    const tolerance = Math.max(0.1, 0.19 - (this.difficulty * 0.009));
    const distance = Math.abs(progress - center);
    if (distance <= tolerance) return { quality: 'perfect', reduction: 0.72, progress };
    if (distance <= tolerance * 1.75) return { quality: 'partial', reduction: 0.42, progress };
    return { quality: 'miss', reduction: 0, progress };
  }

  startRivalBlockPhase(outcome = {}) {
    if (this.rivalHP <= 0 || this.playerHP <= 0) return Promise.resolve({ skipped: true, damage: 0 });
    const overlay = document.getElementById('rival-block-overlay');
    const button = document.getElementById('rival-block-btn');
    const title = document.getElementById('rival-block-title');
    const hint = document.getElementById('rival-block-hint');
    if (!overlay || !button) return Promise.resolve({ skipped: true, damage: 0 });

    const durationMs = Math.max(1250, 2600 - (this.difficulty * 110) - (this.rivalPattern?.blockSpeedBonus || 0));
    const fullDamage = this.getRivalTurnDamage();
    const startedAt = Date.now();
    this.setCssVar(overlay, '--block-duration', `${durationMs}ms`);
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    if (title) title.innerText = this.rivalIntent?.type === 'charge' ? 'Frena el golpe cargado' : 'Bloquea el golpe';
    if (hint) hint.innerText = this.rivalPattern?.hint || 'Pulsa cuando la luz pase por la zona amarilla';

    return new Promise(resolve => {
      let settled = false;
      let timeoutId = null;
      const finish = (timedOut = false) => {
        if (settled) return;
        settled = true;
        const timing = timedOut ? { quality: 'miss', reduction: 0 } : this.getBlockTimingResult(startedAt, durationMs);
        let damage = Math.max(0, Math.round(fullDamage * (1 - timing.reduction)));
        const companionBlock = this.applyCompanionRivalDamageReduction(damage, 'block');
        damage = companionBlock.damage;
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        button.onclick = null;
        if (timeoutId) clearTimeout(timeoutId);

        if (damage > 0) {
          this.playerHP = Math.max(0, this.playerHP - damage);
          this.applyLastSpinIfNeeded();
          this.updateHpBars();
          this.showAttackBanner(
            timing.quality === 'perfect' ? '¡Bloqueo perfecto!' : timing.quality === 'partial' ? 'Bloqueo parcial' : 'Golpe rival',
            companionBlock.message
              ? `${timing.quality === 'miss' ? `-${damage} HP` : `Reducido a -${damage} HP`} · ${companionBlock.message}`
              : timing.quality === 'miss' ? `-${damage} HP` : `Reducido a -${damage} HP`,
            timing.quality === 'miss' ? 'rival' : 'player',
            timing.quality === 'miss' ? 'xtreme-risk' : 'round-cleared'
          );
          this.performAttackSequence('rival', timing.quality === 'miss' ? 'special' : 'counter', damage);
        } else {
          this.showAttackBanner('¡Bloqueo perfecto!', 'Sin daño', 'player', 'round-cleared');
        }

        this.persistTowerBattleState();
        this.app.saveState();
        setTimeout(() => resolve({ ...timing, damage, fullDamage }), damage > 0 ? 620 : 420);
      };

      button.onclick = () => finish(false);
      timeoutId = setTimeout(() => finish(true), durationMs + 180);
    });
  }

  applyTurnOutcome(outcome, isCorrect) {
    if (!outcome) return;

    if (outcome.chargeDelta && this.playerCombatant) {
      this.playerCombatant.charge = Math.max(0, Math.min(3, this.playerCombatant.charge + outcome.chargeDelta));
    }
    if (outcome.specialTriggered && this.playerCombatant) {
      sounds.playSpecial();
      this.playerCombatant.charge = 0;
      this.correctStreak = 0;
      this.app.showNotice(`¡Combo de conocimiento!\nAtaque critico: "${outcome.bannerTitle}".`, "Ataque especial");
    }
    if (outcome.finish) {
      this.finishPoints += outcome.finish.points;
      this.finishStats[outcome.finish.type] = (this.finishStats[outcome.finish.type] || 0) + 1;
      this.playFinishFeedback(outcome.finish);
      this.triggerFinishVisual(outcome.finish, 'player');
    }
    if (outcome.xtremeDash) this.xtremeDashUses += 1;
    if (outcome.xtremeRisk) this.xtremeDashRisks += 1;
    if (outcome.xtremeDash || outcome.xtremeRisk) this.pulseXtremeRail();

    this.rivalHP = Math.max(0, this.rivalHP - outcome.playerDamage);
    this.playerHP = Math.max(0, this.playerHP - outcome.rivalDamage);
    this.applyLastSpinIfNeeded();
    this.updateHpBars();
    this.updateXGauge();

    if (outcome.xtremeDash && this.playerCombatant) this.playerCombatant.xtremeTrailUntil = Date.now() + 820;
    if (outcome.bannerTitle) {
      const bannerVariant = outcome.xtremeDash ? 'xtreme-dash' : outcome.xtremeRisk ? 'xtreme-risk' : outcome.finish ? `finish-${outcome.finish.type}` : '';
      this.showAttackBanner(outcome.bannerTitle, outcome.bannerSubtitle, outcome.rivalDamage > 0 && !outcome.playerDamage ? 'rival' : 'player', bannerVariant);
    }
    if (outcome.playerDamage > 0) {
      this.performAttackSequence('player', outcome.playerAttackAction, outcome.playerDamage);
    }
    if (outcome.rivalDamage > 0) {
      setTimeout(() => this.performAttackSequence('rival', outcome.rivalAttackAction, outcome.rivalDamage), outcome.playerDamage > 0 ? 260 : 80);
    }

    const delay = outcome.specialTriggered || outcome.rivalDamage > 0 ? 980 : 720;
    setTimeout(async () => {
      if (this.rivalHP <= 0) {
        this.completeRound();
      } else if (this.playerHP <= 0) {
        this.repeatCurrentRound('El rival gana esta ronda');
      } else {
        await this.startRivalBlockPhase(outcome);
        if (this.playerHP <= 0) {
          this.repeatCurrentRound('El rival gana esta ronda');
          return;
        }
        if (outcome.showExplanation) {
        this.showPedagogicalExplanation();
      } else {
        this.currentQuestionIdx++;
        this.persistTowerBattleState();
        this.app.saveState();
        this.nextQuestion();
      }
      }
    }, delay);
  }

  completeRound() {
    const round = this.getCurrentRound();
    const attempt = this.roundAttempts[this.currentRoundIndex] || 1;
    if (attempt === 1) this.roundsWonFirstTry += 1;
    else this.roundsRepeated += 1;

    if (!round || round.isFinal || this.currentRoundIndex >= this.rounds.length - 1) {
      this.clearTowerBattleState();
      this.endCombat(true);
      return;
    }

    // ANIMACION 1: rival derrotado
    this.playRoundWinAnimation().then(() => {
      this.state.player.coins += 3;
      this.state.player.xp += 6;
      if (this.playerDeck.length > 1) {
        const playerTop = document.getElementById('player-top');
        if (playerTop) {
          playerTop.classList.remove('deck-entering');
          playerTop.classList.add('deck-switching');
        }
        this.activeDeckIndex = (this.activeDeckIndex + 1) % this.playerDeck.length;
        this.deckSwitches += 1;
      }
      this.currentRoundIndex += 1;
      this.roundAttempts[this.currentRoundIndex] = this.roundAttempts[this.currentRoundIndex] || 1;
      const nextRound = this.getCurrentRound();
      this.currentQuestionIdx = nextRound.start;
      this.lastSpinUsed = false;
      this.rivalHP = 0;
      this.configureActiveRoundOpponent();
      this.initCombatants();
      document.getElementById('rival-top').innerHTML = renderAssetImage(this.rivalBey.image, this.rivalBey.nombre, 'asset-image battle-bey rival');
      this.decorateTopSprites();
      const playerTop2 = document.getElementById('player-top');
      if (playerTop2) {
        playerTop2.classList.remove('deck-switching');
        playerTop2.classList.add('deck-entering');
        setTimeout(() => playerTop2.classList.remove('deck-entering'), 720);
      }
      this.updateHpBars();
      this.showAttackBanner('Ronda superada', `+3 monedas · +6 XP · siguiente rival`, 'player', 'round-cleared');
      this.persistTowerBattleState();
      this.app.saveState();

      // ANIMACION 2: inicio del siguiente reto
      this.playRoundStartAnimation(this.rivalCharacter?.nombre || 'Nuevo rival').then(() => {
        this.nextQuestion();
      });
    });
  }

  // Animacion 1: peonza rival sale disparada + texto RIVAL DERROTADO
  playRoundWinAnimation() {
    return new Promise(resolve => {
      if (typeof sounds !== 'undefined' && sounds.playClash) sounds.playClash();

      const rivalTop = document.getElementById('rival-top');
      if (rivalTop) {
        rivalTop.style.transition = 'transform 0.7s cubic-bezier(0.4,0,1,1), opacity 0.7s ease';
        rivalTop.style.transform = 'translate(120px, -140px) rotate(720deg) scale(0.1)';
        rivalTop.style.opacity = '0';
      }

      if (!document.getElementById('rw-keyframes')) {
        const style = document.createElement('style');
        style.id = 'rw-keyframes';
        style.textContent = `
          @keyframes rwFadeIn  { from{opacity:0} to{opacity:1} }
          @keyframes rwFadeOut { from{opacity:1} to{opacity:0} }
          @keyframes rwPulse   { 0%{transform:scale(0.6);opacity:0} 60%{opacity:1} 100%{transform:scale(2.2);opacity:0} }
          @keyframes rwBounce  { from{transform:scale(0.3);opacity:0} to{transform:scale(1);opacity:1} }
          @keyframes rsNum     { 0%{transform:scale(0.4);opacity:0} 20%{transform:scale(1.25);opacity:1} 70%{transform:scale(1);opacity:1} 100%{transform:scale(1.6);opacity:0} }
          @keyframes rsGo      { 0%{transform:scale(0.5);opacity:0} 30%{transform:scale(1.15);opacity:1} 80%{transform:scale(1);opacity:1} 100%{transform:scale(0.9);opacity:0} }
          @keyframes rsBeyIn   { from{transform:translateX(-60px) scale(0.7);opacity:0} to{transform:translateX(0) scale(1);opacity:1} }
          @keyframes rsBeyInR  { from{transform:translateX(60px) scale(0.7);opacity:0} to{transform:translateX(0) scale(1);opacity:1} }
        `;
        document.head.appendChild(style);
      }

      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,0.72);animation:rwFadeIn 0.18s ease forwards;pointer-events:none;gap:0.5rem;';

      const burst = document.createElement('div');
      burst.style.cssText = 'position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(255,234,0,0.2) 0%,transparent 70%);animation:rwPulse 0.7s ease-out forwards;';

      const emoji = document.createElement('div');
      emoji.style.cssText = 'font-size:clamp(3rem,10vw,5.5rem);animation:rwBounce 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both;';
      emoji.textContent = '\u26A1';

      const title = document.createElement('div');
      title.style.cssText = 'font-size:clamp(1.8rem,6vw,3.2rem);font-weight:900;letter-spacing:0.06em;color:#ffea00;text-shadow:0 0 24px #ffea00,0 2px 0 #000;animation:rwBounce 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;text-align:center;padding:0 1rem;';
      title.textContent = '\u00a1RIVAL DERROTADO!';

      const sub = document.createElement('div');
      sub.style.cssText = 'font-size:clamp(0.9rem,3vw,1.2rem);color:#fff;margin-top:0.4rem;opacity:0.85;animation:rwBounce 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.32s both;text-align:center;';
      sub.textContent = '+3 monedas  \u00b7  +6 XP  \u00b7  siguiente rival';

      overlay.appendChild(burst);
      overlay.appendChild(emoji);
      overlay.appendChild(title);
      overlay.appendChild(sub);
      document.body.appendChild(overlay);

      setTimeout(() => {
        overlay.style.animation = 'rwFadeOut 0.3s ease forwards';
        setTimeout(() => {
          overlay.remove();
          if (rivalTop) {
            rivalTop.style.transition = '';
            rivalTop.style.transform = '';
            rivalTop.style.opacity = '';
          }
          resolve();
        }, 320);
      }, 1600);
    });
  }

  // Animacion 2: cuenta atras 3-2-1-YA con rival entrante
  playRoundStartAnimation(rivalName) {
    return new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:9998;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,5,18,0.85);pointer-events:none;gap:0.8rem;';

      const rivalLabel = document.createElement('div');
      rivalLabel.style.cssText = 'font-size:clamp(0.85rem,2.5vw,1.1rem);color:#ff0055;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;opacity:0;animation:rwFadeIn 0.3s 0.1s ease forwards;text-align:center;';
      rivalLabel.textContent = 'Entra ' + rivalName;

      const beysRow = document.createElement('div');
      beysRow.style.cssText = 'display:flex;align-items:center;gap:2rem;opacity:0;animation:rwFadeIn 0.3s 0.15s ease forwards;';
      const pLeft = document.createElement('div');
      pLeft.style.cssText = 'font-size:clamp(2rem,7vw,3.5rem);animation:rsBeyIn 0.4s 0.15s cubic-bezier(0.34,1.3,0.64,1) both;filter:drop-shadow(0 0 12px #00f0ff);';
      pLeft.textContent = '\uD83C\uDF00';
      const vsLabel = document.createElement('div');
      vsLabel.style.cssText = 'font-size:clamp(1.1rem,3.5vw,1.8rem);font-weight:900;color:#fff;opacity:0.6;';
      vsLabel.textContent = 'VS';
      const pRight = document.createElement('div');
      pRight.style.cssText = 'font-size:clamp(2rem,7vw,3.5rem);animation:rsBeyInR 0.4s 0.2s cubic-bezier(0.34,1.3,0.64,1) both;filter:drop-shadow(0 0 12px #ff0055);';
      pRight.textContent = '\uD83C\uDF00';
      beysRow.appendChild(pLeft);
      beysRow.appendChild(vsLabel);
      beysRow.appendChild(pRight);

      const counter = document.createElement('div');
      counter.style.cssText = 'font-size:clamp(4rem,18vw,9rem);font-weight:900;line-height:1;color:#00f0ff;text-shadow:0 0 32px #00f0ff,0 0 8px #fff;min-height:1.1em;text-align:center;';

      overlay.appendChild(rivalLabel);
      overlay.appendChild(beysRow);
      overlay.appendChild(counter);
      document.body.appendChild(overlay);

      const steps = [
        { text: '3', color: '#00f0ff', shadow: '#00f0ff', delay: 370 },
        { text: '2', color: '#ff9900', shadow: '#ff9900', delay: 370 },
        { text: '1', color: '#ff0055', shadow: '#ff0055', delay: 370 },
        { text: '\u00a1YA!', color: '#ffea00', shadow: '#ffea00', delay: 540 }
      ];

      let i = 0;
      const showStep = () => {
        if (i >= steps.length) {
          overlay.style.animation = 'rwFadeOut 0.25s ease forwards';
          setTimeout(() => { overlay.remove(); resolve(); }, 270);
          return;
        }
        const step = steps[i++];
        counter.style.color = step.color;
        counter.style.textShadow = '0 0 32px ' + step.shadow + ',0 0 8px #fff';
        counter.style.animation = 'none';
        void counter.offsetWidth;
        counter.textContent = step.text;
        counter.style.animation = step.text.includes('YA') ? 'rsGo 0.5s ease both' : 'rsNum 0.38s ease both';
        setTimeout(showStep, step.delay);
      };
      setTimeout(showStep, 300);
    });
  }

  repeatCurrentRound(reason = 'Ronda perdida') {
    const round = this.getCurrentRound();
    this.roundAttempts[this.currentRoundIndex] = (this.roundAttempts[this.currentRoundIndex] || 1) + 1;
    if (this.roundAttempts[this.currentRoundIndex] > this.getMaxRoundAttempts()) {
      this.showAttackBanner('Eliminado de la ronda', 'El rival gana la planta', 'rival', 'round-retry');
      this.endCombat(false);
      return;
    }
    this.roundsRepeated += 1;
    this.selectDeckBeyForRound(round, true);
    this.playerHP = this.playerMaxHP;
    this.correctStreak = 0;
    this.fastAnswerStreak = 0;
    this.lastSpinUsed = false;
    this.replaceRoundQuestions(round);
    this.currentQuestionIdx = round.start;
    this.configureActiveRoundOpponent();
    this.initCombatants();
    document.getElementById('rival-top').innerHTML = renderAssetImage(this.rivalBey.image, this.rivalBey.nombre, 'asset-image battle-bey rival');
    this.decorateTopSprites();
    this.updateHpBars();
    this.showAttackBanner('Reintento de ronda', reason, 'rival', 'round-retry');
    this.persistTowerBattleState();
    this.app.saveState();
    setTimeout(() => this.nextQuestion(), 700);
  }

  getMaxRoundAttempts() {
    if (!this.isTowerBattle) return 4;
    if (this.difficulty >= 7) return 2;
    if (this.difficulty >= 4) return 3;
    return 4;
  }

  replaceRoundQuestions(round) {
    if (!round || !this.floorData || typeof LearningEngine.selectQuestionsForTowerFloor !== 'function') return;
    const needed = Math.max(1, round.end - round.start);
    const candidates = LearningEngine.selectQuestionsForTowerFloor(this.state, this.floorData, this.questionCount + 24)
      .map(question => this.adaptCurriculumQuestion(question, 'curriculum-tower'))
      .filter(question => {
        const id = question.curriculumId || question.id;
        const signature = this.questionSignature(question);
        return !this.usedTowerQuestionIds.has(id) && !this.usedTowerQuestionSignatures.has(signature);
      });
    const replacement = candidates.slice(0, needed);
    if (replacement.length < needed) return;
    replacement.forEach((question, index) => {
      question.isLightning = false;
      question.lightningWindowMs = null;
      this.questionsList[round.start + index] = question;
    });
    if (!round.isFinal && needed > 0) {
      const lightningIndex = round.start + Math.min(needed - 1, Math.max(0, Math.floor(needed / 2)));
      this.questionsList[lightningIndex].isLightning = true;
      this.questionsList[lightningIndex].lightningWindowMs = Math.max(2600, 4800 - (this.difficulty * 260));
      round.lightningIndex = lightningIndex;
    }
  }

  applyLastSpinIfNeeded() {
    if (this.lastSpinUsed || this.playerHP <= 0 || this.playerHP > this.playerMaxHP * 0.28) return;
    this.lastSpinUsed = true;
    this.playerHP = Math.min(this.playerMaxHP, this.playerHP + 14);
    if (this.playerCombatant) this.playerCombatant.charge = Math.min(3, this.playerCombatant.charge + 1);
    this.showAttackBanner('Ultimo Giro', 'Remonta con calma');
    this.spawnShockwave(this.playerCombatant?.x || 35, this.playerCombatant?.y || 55, '#00ff66', true);
  }

  getImpactForceMultiplier(attackerId, action = 'dash') {
    const bey = attackerId === 'player' ? this.playerBey : this.rivalBey;
    const type = this.getBeyType(bey);
    let multiplier = 1;
    if (action === 'special') multiplier += 0.28;
    if (action === 'attack' || action === 'counter') multiplier += 0.08;
    if (type === 'ataque') multiplier += 0.14;
    if (type === 'defensa') multiplier += 0.06;
    if (type === 'estamina') multiplier -= 0.04;
    if (type === 'balance') multiplier += 0.03;
    return Math.max(0.75, multiplier);
  }

  // Cada Finish cae en una zona distinta del estadio para reforzar la lectura de Beyblade X.
  triggerFinishVisual(finish, attackerId = 'player') {
    if (!finish) return;
    const zones = {
      spin: { x: 50, y: 50, color: '#33f5ff', special: false },
      over: { x: attackerId === 'player' ? 82 : 18, y: 46, color: '#ffb000', special: true },
      burst: { x: attackerId === 'player' ? 76 : 24, y: 62, color: '#ff4fd8', special: true },
      xtreme: { x: attackerId === 'player' ? 90 : 10, y: 38, color: '#fff35a', special: true }
    };
    const zone = zones[finish.type] || zones.spin;
    this.pulseFinishPocket(finish.type);
    if (finish.type !== 'spin') this.spawnShockwave(zone.x, zone.y, zone.color, zone.special, `finish-${finish.type}`);
    this.spawnParticles(zone.x, zone.y, zone.color, finish.type === 'xtreme' ? 22 : 14);
    if (finish.type === 'xtreme') this.triggerScreenFlash('xtreme');
  }

  playFinishFeedback(finish) {
    if (!finish || typeof sounds === 'undefined') return;
    if (finish.type === 'xtreme' || finish.type === 'burst') {
      sounds.playSpecial();
    } else {
      sounds.playCorrect();
    }
  }

  triggerScreenFlash(variant = 'xtreme') {
    const flash = document.getElementById('screen-flash-layer');
    if (!flash) return;
    flash.className = `screen-flash-layer ${variant}`;
    void flash.offsetWidth;
    flash.classList.add('active');
    setTimeout(() => flash.classList.remove('active'), 620);
  }

  performAttackSequence(attackerId, action = 'dash', damage = 0) {
    const attacker = attackerId === 'player' ? this.playerCombatant : this.rivalCombatant;
    const defender = attackerId === 'player' ? this.rivalCombatant : this.playerCombatant;
    if (!attacker || !defender) return;

    const isSpecial = action === 'special';
    const forceBase = isSpecial ? 42 : action === 'attack' || action === 'counter' ? 32 : action === 'charge' ? 18 : 24;
    const force = forceBase * this.getImpactForceMultiplier(attackerId, action);
    const dx = defender.x - attacker.x;
    const dy = defender.y - attacker.y;
    const dist = Math.hypot(dx, dy) || 1;
    attacker.status = isSpecial ? 'special' : 'attacking';
    attacker.vx += (dx / dist) * force;
    attacker.vy += (dy / dist) * force;
    defender.vx += (dx / dist) * (isSpecial ? 18 : 10);
    defender.vy += (dy / dist) * (isSpecial ? 18 : 10);

    const impactX = (attacker.x * 0.35) + (defender.x * 0.65);
    const impactY = (attacker.y * 0.35) + (defender.y * 0.65);
    setTimeout(() => {
      this.triggerClashVisual(impactX, impactY, isSpecial);
      if (damage > 0) this.spawnDamagePop(impactX, impactY, damage, attackerId);
    }, 110);

    const topEl = document.getElementById(`${attackerId}-top`);
    if (topEl) {
      topEl.classList.add(isSpecial ? 'is-special-strike' : 'is-dashing');
      setTimeout(() => topEl.classList.remove('is-special-strike', 'is-dashing'), isSpecial ? 850 : 520);
    }
    setTimeout(() => {
      attacker.status = 'orbiting';
    }, isSpecial ? 850 : 520);
  }

  showAttackBanner(title, subtitle = '', side = 'player', variant = '') {
    const banner = document.getElementById('attack-banner-layer');
    if (!banner) return;
    const variantClass = variant ? ` ${variant}` : '';
    banner.innerHTML = `<div class="attack-banner ${side === 'rival' ? 'rival' : 'player'}${variantClass}"><strong>${title}</strong>${subtitle ? `<span>${subtitle}</span>` : ''}</div>`;
    banner.classList.remove('active');
    void banner.offsetWidth;
    banner.classList.add('active');
    setTimeout(() => banner.classList.remove('active'), 1200);
  }

  spawnTrail(combatant) {
    const layer = document.getElementById('trail-layer');
    if (!layer || !combatant) return;
    const moved = Math.hypot(combatant.x - combatant.lastTrailX, combatant.y - combatant.lastTrailY);
    if (moved < 1.5) return;
    combatant.lastTrailX = combatant.x;
    combatant.lastTrailY = combatant.y;

    const trail = document.createElement('span');
    const isXtreme = combatant.xtremeTrailUntil && Date.now() < combatant.xtremeTrailUntil;
    trail.className = `motion-trail ${combatant.id}${isXtreme ? ' xtreme-trail' : ''}`;
    trail.style.left = `${combatant.x}%`;
    trail.style.top = `${combatant.y}%`;
    this.setCssVar(trail, '--trail-color', combatant.color);
    layer.appendChild(trail);
    setTimeout(() => trail.remove(), 520);
  }

  spawnParticles(x, y, color = '#ffffff', count = 12) {
    const layer = document.getElementById('particle-layer');
    if (!layer) return;
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement('span');
      particle.className = 'impact-particle';
      const angle = Math.random() * Math.PI * 2;
      const distance = 18 + Math.random() * 34;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      this.setCssVar(particle, '--particle-color', color);
      this.setCssVar(particle, '--particle-x', `${Math.cos(angle) * distance}px`);
      this.setCssVar(particle, '--particle-y', `${Math.sin(angle) * distance}px`);
      layer.appendChild(particle);
      setTimeout(() => particle.remove(), 620);
    }
  }

  spawnShockwave(x, y, color = '#ffffff', isSpecial = false, extraClass = '') {
    const layer = document.getElementById('particle-layer') || document.getElementById('battle-field');
    if (!layer) return;
    const wave = document.createElement('span');
    wave.className = `shockwave ${isSpecial ? 'special' : ''} ${extraClass}`.trim();
    wave.style.left = `${x}%`;
    wave.style.top = `${y}%`;
    this.setCssVar(wave, '--shock-color', color);
    layer.appendChild(wave);
    setTimeout(() => wave.remove(), isSpecial ? 900 : 620);
  }

  spawnDamagePop(x, y, amount, attackerId) {
    const layer = document.getElementById('damage-layer');
    if (!layer) return;
    const pop = document.createElement('span');
    const powerClass = amount >= 38 ? ' super' : amount >= 26 ? ' critical' : '';
    pop.className = `damage-pop ${attackerId}${powerClass}`;
    pop.style.left = `${x}%`;
    pop.style.top = `${Math.max(8, y - 6)}%`;
    pop.innerText = `-${amount}`;
    layer.appendChild(pop);
    setTimeout(() => pop.remove(), 900);
  }

  recordCurriculumAnswer(isCorrect) {
    if (!this.currentQuestion || !this.currentQuestion.curriculumId) return;
    LearningEngine.recordAnswer(this.state, {
      id: this.currentQuestion.curriculumId,
      subject: this.currentQuestion.subject,
      skill: this.currentQuestion.skill,
      isGuidedIntro: this.currentQuestion.isGuidedIntro === true
    }, isCorrect);
    this.curriculumAnswerLog.push({
      id: this.currentQuestion.curriculumId,
      subject: this.currentQuestion.subject,
      skill: this.currentQuestion.skill,
      correct: isCorrect === true
    });
  }

  resumeCombatAfterError() {
    this.startPhysicsSimulation();
    if (this.playerHP <= 0) {
      this.repeatCurrentRound('Repite solo esta ronda');
    } else {
      this.currentQuestionIdx++;
      this.persistTowerBattleState();
      this.app.saveState();
      this.nextQuestion();
    }
  }

  showPedagogicalExplanation() {
    this.stopPhysicsSimulation();
    
    // Format visual aid message
    let expl = "";
    let aid = "";
    
    if (this.currentQuestion.type === 'mult') {
      const a = this.currentQuestion.a;
      const b = this.currentQuestion.b;
      expl = `Casi lo tienes. <strong>${a} x ${b}</strong> significa sumar el número <strong>${b}</strong> unas <strong>${a}</strong> veces (o al revés).`;
      
      // Build a graphical sum chain
      const sumTerms = Array(a).fill(b);
      aid = `${sumTerms.join(' + ')} = ${a * b}`;
    } else if (this.currentQuestion.type === 'blank') {
      expl = `Piensalo de este modo: cuantas veces tienes que sumar el primer numero para llegar al resultado?`;
      aid = `El factor que falta es ${this.currentQuestion.answer}`;
    } else if (this.currentQuestion.type === 'sum') {
      expl = `Sumar dobles es como multiplicar por 2.`;
      aid = `${this.currentQuestion.answer / 2} + ${this.currentQuestion.answer / 2} = ${this.currentQuestion.answer}`;
    } else if (this.currentQuestion.type === 'curriculum-math' || this.currentQuestion.type === 'curriculum-boss' || this.currentQuestion.type === 'curriculum-review' || this.currentQuestion.type === 'curriculum-tower' || this.currentQuestion.type === 'curriculum') {
      expl = this.currentQuestion.explanation || 'Repasa el enunciado: busca los datos y decide que operacion necesitas.';
      aid = `Respuesta correcta: ${this.currentQuestion.answer}`;
    } else {
      expl = `Vuelve a intentarlo con calma. Fíjate en el patrón y la serie numérica.`;
      aid = `La respuesta correcta era ${this.currentQuestion.answer}`;
    }

    document.getElementById('feedback-coach-img').src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="70" x="15" font-size="65">👩‍🏫</text></svg>`;
    document.getElementById('feedback-coach-title').innerText = "Recalibra y vuelve a intentarlo";
    document.getElementById('feedback-coach-text').innerHTML = expl;
    document.getElementById('feedback-coach-visual').innerHTML = aid;

    document.getElementById('combat-feedback').style.display = 'flex';
  }

  showHint() {
    sounds.playClick();
    this.app.showNotice(`PISTA DEL ENTRENADOR:\n\n${this.currentQuestion.hint}`, "Pista");
  }

  updateHpBars() {
    document.getElementById('combat-player-hp').style.width = `${Math.max(0, Math.min(100, (this.playerHP / this.playerMaxHP) * 100))}%`;
    document.getElementById('combat-rival-hp').style.width = `${Math.max(0, Math.min(100, (this.rivalHP / this.rivalMaxHP) * 100))}%`;
    const playerTop = document.getElementById('player-top');
    const rivalTop = document.getElementById('rival-top');
    if (playerTop) playerTop.classList.toggle('damaged', this.playerHP <= this.playerMaxHP * 0.35);
    if (rivalTop) rivalTop.classList.toggle('damaged', this.rivalHP <= this.rivalMaxHP * 0.35);
  }

  updateComboDots() {
    document.getElementById('dot-1').className = `combo-dot ${this.correctStreak >= 1 ? 'active' : ''}`;
    document.getElementById('dot-2').className = `combo-dot ${this.correctStreak >= 2 ? 'active' : ''}`;
    document.getElementById('dot-3').className = `combo-dot ${this.correctStreak >= 3 ? 'active' : ''}`;
    this.updateXGauge();
  }

  updateXGauge() {
    const charge = Math.max(0, Math.min(3, this.playerCombatant?.charge || 0));
    const fill = document.getElementById('x-gauge-fill');
    const label = document.getElementById('x-gauge-label');
    const specialCard = document.getElementById('special-attack-card');
    const specialName = document.getElementById('special-attack-name');
    const specialHelp = document.getElementById('special-attack-help');
    const specialBtn = document.getElementById('btn-special-attack');
    const xtremeBtn = document.getElementById('btn-xtreme-dash');
    if (fill) {
      fill.style.width = `${(charge / 3) * 100}%`;
      fill.classList.toggle('ready', charge >= 3);
    }
    const dashReady = this.selectedAction === 'attack'
      && ((this.currentQuestion?.isLightning === true)
        || (parseInt(this.currentQuestion?.difficulty, 10) || 1) >= 4
        || (this.playerBey?.velocidad || 70) >= 78);
    document.querySelectorAll('.x-gauge-panel').forEach(panel => panel.classList.toggle('dash-ready', dashReady));
    this.setXtremeStadiumState({ ready: this.canUseXtremeDash(), armed: this.xtremeDashArmed });
    if (label) {
      label.innerText = charge >= 3 ? 'Especial listo' : `${charge}/3 para especial`;
    }
    if (specialCard) {
      const ready = this.canUseSpecialAttack();
      const xtremeReady = this.canUseXtremeDash();
      const attackName = this.playerBey?.habilidad || 'Ataque X';
      specialCard.classList.toggle('ready', ready);
      specialCard.classList.toggle('charging', charge > 0 && !ready);
      specialCard.classList.toggle('special-armed', this.specialArmed);
      specialCard.classList.toggle('xtreme-armed', this.xtremeDashArmed);
      if (specialName) specialName.innerText = ready ? `${attackName} listo` : attackName;
      if (specialHelp) {
        if (this.specialArmed) {
          specialHelp.innerText = 'Especial armado: acierta para gastarlo ahora.';
        } else if (this.xtremeDashArmed) {
          specialHelp.innerText = 'Dash armado: acierta rapido para entrar al rail.';
        } else if (ready) {
          specialHelp.innerText = 'Pulsa Usar especial cuando quieras gastarlo.';
        } else if (xtremeReady) {
          specialHelp.innerText = 'Puedes preparar Xtreme Dash para un ataque de riesgo.';
        } else {
          specialHelp.innerText = `Carga: ${charge}/3 · Combo: ${Math.min(3, this.correctStreak)}/3 aciertos.`;
        }
      }
    }
    if (specialBtn) {
      const ready = this.canUseSpecialAttack();
      specialBtn.disabled = this.actionLocked || !ready;
      specialBtn.classList.toggle('armed', this.specialArmed);
      specialBtn.innerText = this.specialArmed ? 'Especial armado' : ready ? 'Usar especial' : 'Especial no listo';
    }
    if (xtremeBtn) {
      const ready = this.canUseXtremeDash();
      xtremeBtn.disabled = this.actionLocked || !ready;
      xtremeBtn.classList.toggle('armed', this.xtremeDashArmed);
      xtremeBtn.innerText = this.xtremeDashArmed ? 'Dash armado' : ready ? 'Xtreme Dash' : 'Dash no listo';
    }
    document.querySelectorAll('[data-combat-action="charge"]').forEach(button => {
      button.classList.toggle('special-ready', charge >= 3);
    });
    document.querySelectorAll('[data-combat-action="attack"]').forEach(button => {
      button.classList.toggle('dash-ready', dashReady);
    });
  }

  triggerClashVisual(x, y, isSpecial) {
    sounds.playClash();
    const spark = document.getElementById('clash-spark');
    
    // Position at clash center
    spark.style.left = `${x}%`;
    spark.style.top = `${y}%`;
    
    spark.classList.remove('active');
    // Force DOM reflow
    void spark.offsetWidth;
    spark.classList.add('active');
    this.spawnShockwave(x, y, isSpecial ? '#facc15' : '#00f0ff', isSpecial);
    this.spawnParticles(x, y, isSpecial ? '#facc15' : '#ffffff', isSpecial ? 28 : 14);

    // Screen Shake effect
    const battlefield = document.getElementById('battle-field');
    battlefield.style.animation = isSpecial ? 'shake 0.6s linear' : 'shake 0.3s linear';
    setTimeout(() => {
      battlefield.style.animation = '';
    }, 600);
  }

  endCombat(playerWon) {
    this.stopPhysicsSimulation();
    
    if (playerWon) {
      this.clearTowerBattleState();
      // Record game history session
      const ped = this.state.pedagogy.math;
      const totalSessionAnswers = this.sessionCorrect + this.sessionIncorrect;
      const sessionAccuracy = totalSessionAnswers > 0 ? Math.round((this.sessionCorrect / totalSessionAnswers) * 100) : 100;
      const completion = this.isTowerBattle
        ? ProgressService.recordTowerFloorCompletion(this.state, this.towerFloor, { accuracy: sessionAccuracy, week: this.weekNum })
        : ProgressService.recordCompletion(this.state, this.weekNum, this.isBoss, { accuracy: sessionAccuracy });
      const towerReward = this.getTowerBattleReward(sessionAccuracy);
      const characterStatsBefore = typeof getEffectiveCharacterStats === 'function'
        ? getEffectiveCharacterStats(this.playerCharacter, this.state, true)
        : null;
      const characterProgress = typeof recordCharacterBattleResult === 'function'
        ? recordCharacterBattleResult(this.state, this.state.player.characterAvatarId, true, towerReward.xp)
        : null;
      const companionBond = typeof recordCompanionBattleResult === 'function'
        ? recordCompanionBattleResult(this.state, this.state.player.companionCharacterId || this.state.player.characterAvatarId, true)
        : null;
      const characterStatsAfter = typeof getEffectiveCharacterStats === 'function'
        ? getEffectiveCharacterStats(this.playerCharacter, this.state, true)
        : null;
      let learningCompletion = null;
      let bossSummary = null;
      if (this.curriculumMission && this.curriculumMission.subject.id === 'math') {
        const currentLearningMission = LearningEngine.getCurrentMission(this.state);
        learningCompletion = currentLearningMission && currentLearningMission.key === this.curriculumMission.key
          ? LearningEngine.recordMissionCompletion(this.state, this.curriculumMission, {
              accuracy: sessionAccuracy,
              answers: totalSessionAnswers
            })
          : LearningEngine.recordPracticeSession(this.state, this.curriculumMission, {
              accuracy: sessionAccuracy,
              answers: totalSessionAnswers
            });
      }
      if (this.isBoss && typeof this.weekNum === 'number') {
        bossSummary = LearningEngine.recordWeeklyBossSummary(this.state, this.weekNum, {
          accuracy: sessionAccuracy,
          answers: totalSessionAnswers,
          correct: this.sessionCorrect,
          incorrect: this.sessionIncorrect,
          answerLog: this.curriculumAnswerLog
        });
      }
      if (this.weekNum === 'post-boss-review') {
        learningCompletion = LearningEngine.recordPostBossReviewCompletion(this.state, null, {
          accuracy: sessionAccuracy,
          answers: totalSessionAnswers
        });
      }
      this.state.progress.pendingReward = {
        key: completion.key,
        week: this.weekNum,
        isBoss: this.isBoss,
        towerFloor: this.towerFloor
      };
      if (!this.isTowerBattle && typeof this.weekNum === 'number') {
        this.state.player.currentWeek = Math.max(this.state.player.currentWeek || 1, Math.min(12, this.weekNum + (this.towerFloor % 6 === 0 ? 1 : 0)));
      }
      ped.history.push({
        date: StorageService.todayKey(),
        sessionMinutes: 1, // simulated duration
        accuracy: sessionAccuracy,
        week: this.weekNum,
        type: this.isBoss ? 'boss' : 'training',
        curriculumMission: this.curriculumMission ? this.curriculumMission.key : null,
        curriculumSkill: this.curriculumMission ? this.curriculumMission.skill.id : null,
        learningCompletion: learningCompletion ? learningCompletion.key : null,
        towerFloor: this.towerFloor,
        rival: this.floorData?.rivalName || null,
        correct: this.sessionCorrect,
        incorrect: this.sessionIncorrect
      });
      this.state.pedagogy.math.dailyStreak += 1;
      this.app.saveState();

      // Show rewards chest overlay
      this.app.showRewardModal(this.weekNum, this.isBoss, {
        xp: towerReward.xp,
        coins: towerReward.coins,
        sessionKey: completion.key,
        rewardAlreadyClaimed: !!completion.session.rewardClaimedAt,
        bossSummary,
        towerFloor: this.towerFloor,
        matchSummary: this.buildMatchSummary(),
        characterGrowth: this.buildCharacterGrowthSummary(characterStatsBefore, characterStatsAfter, characterProgress),
        companionBond
      });
      if (characterProgress) {
        this.showCharacterGrowthAnimation(characterStatsBefore, characterStatsAfter, characterProgress);
      }
    } else {
      this.clearTowerBattleState();
      if (typeof recordCharacterBattleResult === 'function') {
        recordCharacterBattleResult(this.state, this.state.player.characterAvatarId, false, 10);
        if (typeof recordCompanionBattleResult === 'function') {
          recordCompanionBattleResult(this.state, this.state.player.companionCharacterId || this.state.player.characterAvatarId, false);
        }
        this.app.saveState();
      }
      sounds.playIncorrect();
      this.app.showNotice("Tu peonza se ha quedado sin energia. Hagamos un repaso antes de volver a luchar.", "Combate terminado");
      this.app.showScreen('map');
    }
  }

  buildMatchSummary() {
    return {
      roundsWonFirstTry: this.roundsWonFirstTry,
      roundsRepeated: this.roundsRepeated,
      bestCombo: this.bestCombo,
      fastCorrect: this.fastCorrect,
      assistedCorrect: this.assistedCorrect,
      totalRounds: this.rounds.length,
      correct: this.sessionCorrect,
      incorrect: this.sessionIncorrect,
      finishPoints: this.finishPoints,
      finishStats: this.finishStats,
      xtremeDashUses: this.xtremeDashUses,
      xtremeDashRisks: this.xtremeDashRisks,
      deckSwitches: this.deckSwitches
    };
  }

  buildCharacterGrowthSummary(beforeStats, afterStats, progress) {
    if (!beforeStats || !afterStats || !progress) return null;
    const labels = [
      ['attack', 'Ataque'],
      ['defense', 'Defensa'],
      ['stamina', 'Giro'],
      ['speed', 'Velocidad'],
      ['focus', 'Foco']
    ];
    return {
      level: afterStats.level || progress.level || 1,
      xp: progress.xp || 0,
      wins: progress.wins || 0,
      stats: labels.map(([key, label]) => ({
        key,
        label,
        before: beforeStats[key] || 0,
        after: afterStats[key] || 0,
        delta: Math.max(0, (afterStats[key] || 0) - (beforeStats[key] || 0))
      }))
    };
  }

  showCharacterGrowthAnimation(beforeStats, afterStats, progress) {
    const growth = this.buildCharacterGrowthSummary(beforeStats, afterStats, progress);
    if (!growth || typeof document === 'undefined') return;
    const avatarName = this.playerCharacter?.nombre || this.state?.player?.name || 'Blader';
    const improved = growth.stats.filter(stat => stat.delta > 0);
    const stats = growth.stats.map(stat => `
      <div class="character-growth-stat ${stat.delta > 0 ? 'improved' : ''}">
        <span>${stat.label}</span>
        <strong>${stat.after}</strong>
        <em>${stat.delta > 0 ? `+${stat.delta}` : '-'}</em>
      </div>
    `).join('');
    const overlay = document.createElement('div');
    overlay.className = 'character-growth-overlay';
    overlay.innerHTML = `
      <div class="character-growth-card">
        <span class="character-growth-kicker">Avatar mejorado</span>
        <strong>${avatarName} sube a nivel ${growth.level}</strong>
        <p>${improved.length ? 'Tus cualidades ya cuentan mas en las batallas.' : 'Ganas experiencia para la siguiente mejora.'}</p>
        <div class="character-growth-grid">${stats}</div>
      </div>
    `;
    document.body.appendChild(overlay);
    if (typeof sounds !== 'undefined' && typeof sounds.playReward === 'function') sounds.playReward();
    setTimeout(() => overlay.classList.add('visible'), 40);
    setTimeout(() => {
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 420);
    }, 3600);
  }

  getTowerBattleReward(sessionAccuracy) {
    const objectiveBonus = this.didCompleteSecondaryObjective(sessionAccuracy) ? 10 : 0;
    const xp = Math.max(24, (this.floorData?.rewardXP || this.floorData?.reward?.xp || 30) + objectiveBonus);
    const coins = Math.max(10, (this.floorData?.rewardCoins || this.floorData?.reward?.coins || 14) + objectiveBonus);
    return { xp, coins };
  }

  didCompleteSecondaryObjective(sessionAccuracy) {
    const objectiveText = `${this.floorData?.secondaryObjective || ''}`.toLowerCase();
    if (objectiveText.includes('3 aciertos') || objectiveText.includes('racha')) return this.sessionCorrect >= 3;
    if (objectiveText.includes('precision') || objectiveText.includes('atencion')) return sessionAccuracy >= (this.floorData?.targetAccuracy || 70);
    if (objectiveText.includes('rapido') || objectiveText.includes('clave')) return this.fastAnswerStreak >= 2;
    if (objectiveText.includes('evita dos fallos')) return this.sessionIncorrect < 2;
    return sessionAccuracy >= Math.min(85, this.floorData?.targetAccuracy || 65);
  }
}

// ----------------------------------------------------
