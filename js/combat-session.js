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
    this.rivalCharacter = null;
    this.playerCharacterStats = null;
    this.rivalCharacterStats = null;
    this.playerCombatant = null;
    this.rivalCombatant = null;
    this.selectedAction = 'attack';
    this.rivalIntent = null;
    this.actionLocked = false;
    this.lastSpinUsed = false;
    this.fastAnswerStreak = 0;
    this.questionStartedAt = 0;
    this.battleIntroTimer = null;
    this.battleIntroExitTimer = null;
    this.battleIntroFinish = null;
  }

  start() {
    // Generate questions
    this.generateQuestionsList();
    this.currentQuestionIdx = 0;
    this.playerHP = 100;
    this.rivalHP = this.getRivalMaxHP();
    this.correctStreak = 0;
    this.sessionCorrect = 0;
    this.sessionIncorrect = 0;
    this.curriculumAnswerLog = [];
    this.selectedAction = 'attack';
    this.lastSpinUsed = false;
    this.fastAnswerStreak = 0;

    // Reset HUD
    const weekData = WEEKS.find(w => w.week === this.weekNum) || WEEKS[0];
    const towerFloor = this.towerFloor;
    const floorData = this.floorData || getTowerFloorData(towerFloor);
    const rival = BEYBLADE_X_CHARACTERS.find(character => character.id === floorData.rivalId) || getFloorRival(towerFloor);
    const playerCharacter = BEYBLADE_X_CHARACTERS.find(character => character.id === this.state.player.characterAvatarId) || BEYBLADE_X_CHARACTERS[0];
    const playerBey = getEquippedBey(this.state);
    const rivalBey = getBeyById(floorData.rivalBeyId);
    const stadium = getFloorStadium(towerFloor);
    this.playerBey = playerBey;
    this.rivalBey = rivalBey;
    this.playerCharacter = playerCharacter;
    this.rivalCharacter = rival;
    this.playerCharacterStats = typeof getEffectiveCharacterStats === 'function'
      ? getEffectiveCharacterStats(playerCharacter, this.state, true)
      : { attack: 55, defense: 55, stamina: 55, speed: 55, focus: 55, level: 1 };
    this.rivalCharacterStats = typeof getEffectiveCharacterStats === 'function'
      ? getEffectiveCharacterStats(rival, this.state, false)
      : { attack: 55, defense: 55, stamina: 55, speed: 55, focus: 55, level: 1 };
    this.playerMaxHP = this.getPlayerMaxHP();
    this.rivalMaxHP = this.getRivalMaxHP();
    this.playerHP = this.playerMaxHP;
    this.rivalHP = this.rivalMaxHP;
    document.getElementById('hud-player').querySelector('.avatar-mini').innerHTML = renderAssetImage(playerCharacter.image, playerCharacter.nombre, 'asset-image header-character-avatar');
    document.getElementById('combat-player-name').innerText = this.state.player.name;
    document.getElementById('combat-rival-img').src = rival.image;
    document.getElementById('combat-rival-name').innerText = this.isBoss ? rival.nombre : floorData.rivalName;
    const floorLabel = document.getElementById('combat-floor-label');
    const stadiumName = document.getElementById('combat-stadium-name');
    const playerBeyName = document.getElementById('combat-player-bey-name');
    const rivalBeyName = document.getElementById('combat-rival-bey-name');
    if (floorLabel) floorLabel.innerText = `X Tower Planta ${towerFloor} · ${floorData.secondaryObjective || 'Gana el duelo'}`;
    if (stadiumName) stadiumName.innerText = stadium.nombre;
    if (playerBeyName) playerBeyName.innerText = `Tu Bey: ${playerBey.nombre}`;
    if (rivalBeyName) rivalBeyName.innerText = `Rival: ${rivalBey.nombre}`;
    const playerTopLabel = document.querySelector('.top-label-player');
    const rivalTopLabel = document.querySelector('.top-label-rival');
    if (playerTopLabel) playerTopLabel.innerText = playerBey.nombre;
    if (rivalTopLabel) rivalTopLabel.innerText = rivalBey.nombre;
    const stadiumImg = document.querySelector('.battle-stadium-img');
    if (stadiumImg) {
      stadiumImg.src = stadium.image;
      stadiumImg.alt = stadium.nombre;
    }

    this.updateHpBars();
    this.initCombatants();
    this.initCombatControls();
    this.setRivalIntent(this.chooseRivalIntent());

    // Render Custom Tops in Combat
    document.getElementById('player-top').innerHTML = renderAssetImage(playerBey.image, playerBey.nombre, 'asset-image battle-bey player');
    
    document.getElementById('rival-top').innerHTML = renderAssetImage(rivalBey.image, rivalBey.nombre, 'asset-image battle-bey rival');
    this.decorateTopSprites();
    this.renderCombatants();
    this.updateXGauge();

    this.playBattleIntro({
      playerCharacter,
      rivalCharacter: rival,
      playerBey,
      rivalBey,
      stadium,
      floorData,
      towerFloor
    }, () => this.startLaunchPhase());
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
    return Math.max(10, Math.min(24, 9 + Math.ceil(floor / 5) + Math.ceil((difficulty || 1) / 2) + milestoneBonus));
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
    this.selectCombatAction(this.selectedAction || 'attack', false);
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
      const advice = this.getActionAdvice();
      const text = {
        attack: 'Ataque listo: si aciertas, embistes fuerte.',
        defense: 'Defensa lista: si fallas, aguantas mejor.',
        charge: 'Carga lista: si aciertas, sube tu especial.'
      };
      label.innerText = `${text[validAction]} ${advice}`;
    }
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
    if (this.difficulty >= 7 && this.playerHP <= 45 && Math.random() < 0.45) {
      return { type: 'attack', label: 'El rival huele la victoria', hint: 'Defiende y acierta.' };
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
          this.startPhysicsSimulation();
          this.nextQuestion();
        } else {
          sounds.playIncorrect();
          overlay.style.display = 'none';
          this.playerHP -= 10;
          this.updateHpBars();
          this.app.showNotice("Tu Bey se tambalea, pero puedes remontar.", "Lanzamiento");
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
      text: question.prompt,
      answer: question.answer,
      options: question.options,
      hint: question.explanation || 'Piensa en los datos importantes y elige el procedimiento antes de responder.',
      explanation: question.explanation || '',
      difficulty: question.difficulty || 1
    };
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
    if (this.currentQuestionIdx >= this.questionCount) {
      this.endCombat(true);
      return;
    }

    this.currentQuestion = this.questionsList[this.currentQuestionIdx];
    this.actionLocked = false;
    this.setRivalIntent(this.chooseRivalIntent());
    this.selectCombatAction(this.selectedAction || 'attack', false);
    
    // Update combat text indicators
    document.getElementById('question-index-label').innerText = `Reto ${this.currentQuestionIdx + 1} de ${this.questionCount}`;
    
    // Decrease question text size slightly for long word problems
    const questionTextEl = document.getElementById('combat-question-text');
    if (this.currentQuestion.text.length > 25) {
      questionTextEl.style.fontSize = '1.5rem';
    } else {
      questionTextEl.style.fontSize = '3.5rem';
    }
    questionTextEl.innerText = this.currentQuestion.text;

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
  }

  handleAnswer(selectedAnswer) {
    if (this.actionLocked) return;
    this.actionLocked = true;
    const action = this.selectedAction || 'attack';
    const answerMs = Date.now() - (this.questionStartedAt || Date.now());
    const isFastAnswer = answerMs <= Math.max(4500, 8500 - (this.difficulty * 420));
    const isCorrect = selectedAnswer === this.currentQuestion.answer;
    const outcome = this.resolveTurnOutcome(action, isCorrect, isFastAnswer);

    if (isCorrect) {
      sounds.playCorrect();
      this.correctStreak++;
      if (isFastAnswer) this.fastAnswerStreak += 1;
      this.sessionCorrect += 1;
      this.state.pedagogy.math.correctAnswers += 1;
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

    this.applyTurnOutcome(outcome, isCorrect);
    this.app.saveState();
  }

  calculatePlayerDamage(action) {
    const attack = this.playerBey?.ataque || 70;
    const defenderDefense = this.rivalBey?.defensa || 65;
    const characterAttack = this.playerCharacterStats?.attack || 55;
    const characterFocus = this.playerCharacterStats?.focus || 55;
    const rivalCharacterDefense = this.rivalCharacterStats?.defense || 55;
    const statBonus = Math.round((attack - defenderDefense) / 14) + Math.round((characterAttack + characterFocus - rivalCharacterDefense - 55) / 18);
    const actionBonus = action === 'attack' ? 7 : action === 'charge' ? -2 : 0;
    const rivalGuard = this.rivalIntent?.type === 'defense' ? -4 : 0;
    const fastBonus = this.fastAnswerStreak > 0 && this.fastAnswerStreak % 2 === 0 ? 2 : 0;
    return Math.max(7, 12 + statBonus + actionBonus + rivalGuard + fastBonus);
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
    return Math.max(6, Math.round(14 + (attack - defense) / 14 + (rivalPower - playerGuardStat) / 18 + intentBonus + playerGuard + this.getDifficultyDamageBonus()));
  }

  resolveTurnOutcome(action, isCorrect, isFastAnswer) {
    const normalizedAction = ['attack', 'defense', 'charge'].includes(action) ? action : 'attack';
    const rivalIntent = this.rivalIntent?.type || 'attack';
    const gaugeReady = (this.playerCombatant?.charge || 0) >= 3;
    const specialTriggered = isCorrect && (this.correctStreak + 1 >= 3 || gaugeReady);
    const playerDamage = specialTriggered
      ? this.calculateSpecialDamage(normalizedAction)
      : isCorrect
        ? this.calculatePlayerDamage(normalizedAction)
        : 0;
    let rivalDamage = 0;
    let chargeDelta = 0;
    let bannerTitle = '';
    let bannerSubtitle = '';
    let playerAttackAction = specialTriggered ? 'special' : normalizedAction;
    let rivalAttackAction = rivalIntent === 'charge' ? 'special' : 'counter';
    let showExplanation = !isCorrect;

    if (isCorrect) {
      if (specialTriggered) {
        bannerTitle = this.playerBey?.habilidad || ATTACK_NAMES[Math.floor(Math.random() * ATTACK_NAMES.length)];
        bannerSubtitle = 'Ataque especial';
        chargeDelta = -(this.playerCombatant?.charge || 0);
      } else if (normalizedAction === 'charge') {
        chargeDelta = 1;
        bannerTitle = 'Carga +1';
        bannerSubtitle = 'Energia X';
      } else if (normalizedAction === 'defense' && rivalIntent === 'attack') {
        bannerTitle = 'Bloqueo perfecto';
        bannerSubtitle = 'Sin daño rival';
      } else if (normalizedAction === 'attack' && rivalIntent === 'charge') {
        bannerTitle = 'Interrupcion X';
        bannerSubtitle = 'Cortas la carga rival';
      }

      if (!specialTriggered) {
        if (rivalIntent === 'attack' && normalizedAction === 'attack') {
          rivalDamage = Math.max(2, Math.round(this.calculateRivalDamage('defense') * 0.35));
          bannerTitle = bannerTitle || 'Choque doble';
          bannerSubtitle = 'Pegas fuerte, pero recibes impacto';
        } else if (rivalIntent === 'attack' && normalizedAction === 'charge') {
          rivalDamage = Math.max(4, Math.round(this.calculateRivalDamage('charge') * 0.55));
          chargeDelta = Math.max(chargeDelta, 1);
          bannerTitle = bannerTitle || 'Carga arriesgada';
          bannerSubtitle = 'Ganas energia, pero el rival roza';
        } else if (rivalIntent === 'defense' && normalizedAction === 'attack') {
          rivalDamage = Math.max(1, Math.round(this.getDifficultyDamageBonus() + 2));
          bannerTitle = bannerTitle || 'Rebote de guardia';
          bannerSubtitle = 'El rival estaba cubierto';
        }
      }

      if (isFastAnswer && normalizedAction === 'attack' && !specialTriggered) {
        bannerTitle = bannerTitle || 'Dash rapido';
        bannerSubtitle = 'Respuesta veloz';
      }
    } else {
      chargeDelta = normalizedAction === 'charge' ? -2 : -1;
      rivalDamage = this.calculateRivalDamage(normalizedAction);
      if (normalizedAction === 'defense') {
        rivalDamage = Math.max(3, Math.round(rivalDamage * 0.55));
        bannerTitle = 'Defensa de emergencia';
        bannerSubtitle = 'Fallaste, pero reduces daño';
      } else if (normalizedAction === 'attack') {
        rivalDamage = Math.round(rivalDamage * 1.15);
        bannerTitle = 'Contraataque rival';
        bannerSubtitle = 'Ataque arriesgado fallido';
      } else {
        bannerTitle = 'Carga rota';
        bannerSubtitle = 'Pierdes energia X';
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
      showExplanation
    };
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

    this.rivalHP = Math.max(0, this.rivalHP - outcome.playerDamage);
    this.playerHP = Math.max(0, this.playerHP - outcome.rivalDamage);
    this.applyLastSpinIfNeeded();
    this.updateHpBars();
    this.updateXGauge();

    if (outcome.bannerTitle) this.showAttackBanner(outcome.bannerTitle, outcome.bannerSubtitle, outcome.rivalDamage > 0 && !outcome.playerDamage ? 'rival' : 'player');
    if (outcome.playerDamage > 0) {
      this.performAttackSequence('player', outcome.playerAttackAction, outcome.playerDamage);
    }
    if (outcome.rivalDamage > 0) {
      setTimeout(() => this.performAttackSequence('rival', outcome.rivalAttackAction, outcome.rivalDamage), outcome.playerDamage > 0 ? 260 : 80);
    }

    const delay = outcome.specialTriggered || outcome.rivalDamage > 0 ? 980 : 720;
    setTimeout(() => {
      if (this.rivalHP <= 0) {
        this.endCombat(true);
      } else if (this.playerHP <= 0) {
        this.endCombat(false);
      } else if (outcome.showExplanation) {
        this.showPedagogicalExplanation();
      } else {
        this.currentQuestionIdx++;
        this.nextQuestion();
      }
    }, delay);
  }

  applyLastSpinIfNeeded() {
    if (this.lastSpinUsed || this.playerHP <= 0 || this.playerHP > this.playerMaxHP * 0.28) return;
    this.lastSpinUsed = true;
    this.playerHP = Math.min(this.playerMaxHP, this.playerHP + 14);
    if (this.playerCombatant) this.playerCombatant.charge = Math.min(3, this.playerCombatant.charge + 1);
    this.showAttackBanner('Ultimo Giro', 'Remonta con calma');
    this.spawnShockwave(this.playerCombatant?.x || 35, this.playerCombatant?.y || 55, '#00ff66', true);
  }

  performAttackSequence(attackerId, action = 'dash', damage = 0) {
    const attacker = attackerId === 'player' ? this.playerCombatant : this.rivalCombatant;
    const defender = attackerId === 'player' ? this.rivalCombatant : this.playerCombatant;
    if (!attacker || !defender) return;

    const isSpecial = action === 'special';
    const force = isSpecial ? 42 : action === 'attack' || action === 'counter' ? 32 : action === 'charge' ? 18 : 24;
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

  showAttackBanner(title, subtitle = '', side = 'player') {
    const banner = document.getElementById('attack-banner-layer');
    if (!banner) return;
    banner.innerHTML = `<div class="attack-banner ${side === 'rival' ? 'rival' : 'player'}"><strong>${title}</strong>${subtitle ? `<span>${subtitle}</span>` : ''}</div>`;
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
    trail.className = `motion-trail ${combatant.id}`;
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

  spawnShockwave(x, y, color = '#ffffff', isSpecial = false) {
    const layer = document.getElementById('particle-layer') || document.getElementById('battle-field');
    if (!layer) return;
    const wave = document.createElement('span');
    wave.className = `shockwave ${isSpecial ? 'special' : ''}`;
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
    pop.className = `damage-pop ${attackerId}`;
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
      skill: this.currentQuestion.skill
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
      this.endCombat(false);
    } else {
      this.currentQuestionIdx++;
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
    if (fill) {
      fill.style.width = `${(charge / 3) * 100}%`;
      fill.classList.toggle('ready', charge >= 3);
    }
    if (label) {
      label.innerText = charge >= 3 ? 'Especial listo' : `${charge}/3 para especial`;
    }
    document.querySelectorAll('[data-combat-action="charge"]').forEach(button => {
      button.classList.toggle('special-ready', charge >= 3);
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
      // Record game history session
      const ped = this.state.pedagogy.math;
      const totalSessionAnswers = this.sessionCorrect + this.sessionIncorrect;
      const sessionAccuracy = totalSessionAnswers > 0 ? Math.round((this.sessionCorrect / totalSessionAnswers) * 100) : 100;
      const completion = this.isTowerBattle
        ? ProgressService.recordTowerFloorCompletion(this.state, this.towerFloor, { accuracy: sessionAccuracy, week: this.weekNum })
        : ProgressService.recordCompletion(this.state, this.weekNum, this.isBoss, { accuracy: sessionAccuracy });
      const towerReward = this.getTowerBattleReward(sessionAccuracy);
      const characterProgress = typeof recordCharacterBattleResult === 'function'
        ? recordCharacterBattleResult(this.state, this.state.player.characterAvatarId, true, towerReward.xp)
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
        towerFloor: this.towerFloor
      });
      if (characterProgress) {
        this.app.showNotice(`Tu avatar sube a nivel ${characterProgress.level}. Sus cualidades cuentan en combate.`, "Avatar mejorado");
      }
    } else {
      if (typeof recordCharacterBattleResult === 'function') {
        recordCharacterBattleResult(this.state, this.state.player.characterAvatarId, false, 10);
        this.app.saveState();
      }
      sounds.playIncorrect();
      this.app.showNotice("Tu peonza se ha quedado sin energia. Hagamos un repaso antes de volver a luchar.", "Combate terminado");
      this.app.showScreen('map');
    }
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

