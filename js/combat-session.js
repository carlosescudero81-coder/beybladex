// COMBAT SESSION ENGINE (Mathematics Battle)
// ----------------------------------------------------
class CombatSession {
  constructor(weekNum, isBoss, playerState, appController) {
    this.weekNum = weekNum; // 'reinforce' or integer
    this.isBoss = isBoss;
    this.state = playerState;
    this.app = appController;
    this.questionCount = 10;
    this.currentQuestionIdx = 0;
    
    this.playerHP = 100;
    this.rivalHP = 100;
    
    this.correctStreak = 0;
    this.sessionCorrect = 0;
    this.sessionIncorrect = 0;
    this.curriculumAnswerLog = [];
    this.questionsList = [];
    this.currentQuestion = null;
    this.curriculumMission = appController && typeof appController.getCurriculumMissionForCombat === 'function'
      ? appController.getCurriculumMissionForCombat(weekNum, isBoss)
      : null;
    
    // Physics positions & motion state
    this.playerX = 30;
    this.playerY = 50;
    this.rivalX = 70;
    this.rivalY = 50;
    this.physTimer = null;
    this.gaugeInterval = null;
  }

  start() {
    // Generate questions
    this.generateQuestionsList();
    this.currentQuestionIdx = 0;
    this.playerHP = 100;
    this.rivalHP = 100;
    this.correctStreak = 0;
    this.sessionCorrect = 0;
    this.sessionIncorrect = 0;
    this.curriculumAnswerLog = [];

    // Reset HUD
    const weekData = WEEKS.find(w => w.week === this.weekNum) || WEEKS[0];
    const towerFloor = this.app?.currentTowerFloor || getCurrentTowerFloor(this.state);
    const floorData = getTowerFloorData(towerFloor);
    const rival = BEYBLADE_X_CHARACTERS.find(character => character.id === floorData.rivalId) || getFloorRival(towerFloor);
    const playerCharacter = BEYBLADE_X_CHARACTERS.find(character => character.id === this.state.player.characterAvatarId) || BEYBLADE_X_CHARACTERS[0];
    const playerBey = getEquippedBey(this.state);
    const rivalBey = getBeyById(floorData.rivalBeyId);
    const stadium = getFloorStadium(towerFloor);
    document.getElementById('hud-player').querySelector('.avatar-mini').innerHTML = renderAssetImage(playerCharacter.image, playerCharacter.nombre, 'asset-image header-character-avatar');
    document.getElementById('combat-player-name').innerText = this.state.player.name;
    document.getElementById('combat-rival-img').src = rival.image;
    document.getElementById('combat-rival-name').innerText = this.isBoss ? rival.nombre : floorData.rivalName;
    const floorLabel = document.getElementById('combat-floor-label');
    const stadiumName = document.getElementById('combat-stadium-name');
    const playerBeyName = document.getElementById('combat-player-bey-name');
    const rivalBeyName = document.getElementById('combat-rival-bey-name');
    if (floorLabel) floorLabel.innerText = `X Tower Planta ${towerFloor}`;
    if (stadiumName) stadiumName.innerText = stadium.nombre;
    if (playerBeyName) playerBeyName.innerText = `Tu Bey: ${playerBey.nombre}`;
    if (rivalBeyName) rivalBeyName.innerText = `Rival: ${rivalBey.nombre}`;
    const stadiumImg = document.querySelector('.battle-stadium-img');
    if (stadiumImg) {
      stadiumImg.src = stadium.image;
      stadiumImg.alt = stadium.nombre;
    }

    this.updateHpBars();

    // Render Custom Tops in Combat
    document.getElementById('player-top').innerHTML = renderAssetImage(playerBey.image, playerBey.nombre, 'asset-image battle-bey player');
    
    document.getElementById('rival-top').innerHTML = renderAssetImage(rivalBey.image, rivalBey.nombre, 'asset-image battle-bey rival');

    // Launch gauge phase first
    this.startLaunchPhase();
  }

  // physics loop simulator for spinning tops moving in circles
  startPhysicsSimulation() {
    if (this.physTimer) clearInterval(this.physTimer);
    
    let angle = 0;
    this.physTimer = setInterval(() => {
      angle += 0.08;
      // Ellipse paths
      this.playerX = 30 + Math.sin(angle) * 8;
      this.playerY = 45 + Math.cos(angle * 1.5) * 6;

      this.rivalX = 70 + Math.cos(angle) * 8;
      this.rivalY = 45 + Math.sin(angle * 1.5) * 6;

      const pTop = document.getElementById('player-top');
      const rTop = document.getElementById('rival-top');
      
      if (pTop && rTop) {
        pTop.style.left = `${this.playerX}%`;
        pTop.style.top = `${this.playerY}%`;
        rTop.style.left = `${this.rivalX}%`;
        rTop.style.top = `${this.rivalY}%`;
      }
    }, 40);
  }

  stopPhysicsSimulation() {
    if (this.physTimer) clearInterval(this.physTimer);
    this.physTimer = null;
  }

  dispose() {
    this.stopPhysicsSimulation();
    if (this.gaugeInterval) clearInterval(this.gaugeInterval);
    this.gaugeInterval = null;
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
            this.rivalHP -= 15;
            this.updateHpBars();
            this.triggerClashVisual(50, 50, true);
            this.app.showNotice("¡Lanzamiento perfecto! Tu Bey gana velocidad.", "Lanzamiento");
          } else {
            this.triggerClashVisual(50, 50, false);
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
        for (let i = 0; i < this.questionCount; i += 1) {
          const question = bossQuestions[i % bossQuestions.length];
          this.questionsList.push(this.adaptCurriculumQuestion(question, 'curriculum-boss'));
        }
        return;
      }
    }

    if (this.weekNum === 'post-boss-review') {
      const reviewQuestions = LearningEngine.selectQuestionsForPostBossReview(this.state, null, this.questionCount);
      if (reviewQuestions.length > 0) {
        for (let i = 0; i < this.questionCount; i += 1) {
          const question = reviewQuestions[i % reviewQuestions.length];
          this.questionsList.push(this.adaptCurriculumQuestion(question, 'curriculum-review'));
        }
        return;
      }
    }

    if (this.curriculumMission && this.curriculumMission.subject.id === 'math') {
      const curriculumQuestions = LearningEngine.selectQuestionsForMission(this.state, this.curriculumMission, this.questionCount);
      if (curriculumQuestions.length > 0) {
        for (let i = 0; i < this.questionCount; i += 1) {
          const question = curriculumQuestions[i % curriculumQuestions.length];
          this.questionsList.push(this.adaptCurriculumQuestion(question, 'curriculum-math'));
        }
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
          text: `¿Cuánto es ${a} + ${a}?`,
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
            hint: `¿Qué número multiplicado por ${table} da ${table * factor}?`
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
          `Carlitos tiene ${factorB} peonzas. Cada una cuesta ${factorA} monedas. ¿Cuántas monedas valen todas?`,
          `En el torneo hay ${factorB} equipos de ${factorA} entrenadores cada uno. ¿Cuántos juegan en total?`,
          `Un taller hace ${factorA} puntas al día. En ${factorB} días, ¿cuántas puntas fabrica?`
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
  }

  handleAnswer(selectedAnswer) {
    if (selectedAnswer === this.currentQuestion.answer) {
      // Correct!
      sounds.playCorrect();
      this.correctStreak++;
      
      // Damage calculations
      let damage = 12;
      let specialTriggered = false;

      if (this.correctStreak >= 3) {
        specialTriggered = true;
        damage = 25; // Massive hit
        sounds.playSpecial();
        
        const attackName = ATTACK_NAMES[Math.floor(Math.random() * ATTACK_NAMES.length)];
        this.app.showNotice(`¡Combo de conocimiento!\nAtaque critico: "${attackName}".`, "Ataque especial");
        this.correctStreak = 0; // reset
      }

      this.rivalHP = Math.max(0, this.rivalHP - damage);
      this.updateHpBars();

      // Trigger animation: Player top rushes to center, hits rival, sparks fly
      this.triggerClashVisual(50, 50, specialTriggered);

      // Track statistics
      this.sessionCorrect += 1;
      this.state.pedagogy.math.correctAnswers += 1;
      ProgressService.recordAnswer(this.state, this.currentQuestion, true);
      this.recordCurriculumAnswer(true);
      const todayStats = this.app.getTodayStats();
      todayStats.answers += 1;
      todayStats.correct += 1;

      // Small delay to appreciate collision
      setTimeout(() => {
        if (this.rivalHP <= 0) {
          this.endCombat(true);
        } else {
          this.currentQuestionIdx++;
          this.nextQuestion();
        }
      }, 600);

    } else {
      // Incorrect!
      sounds.playIncorrect();
      this.correctStreak = 0; // Break combo
      
      // Damage player
      this.playerHP = Math.max(0, this.playerHP - 15);
      this.updateHpBars();

      // Save error for parents panel & adaptive review
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

      // Show friendly explanation modal (scaffolding)
      this.showPedagogicalExplanation();
    }
    this.app.saveState();
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
      expl = `Piénsalo de este modo: ¿Cuántas veces tienes que sumar el primer número para llegar al resultado?`;
      aid = `El factor que falta es ${this.currentQuestion.answer}`;
    } else if (this.currentQuestion.type === 'sum') {
      expl = `Sumar dobles es como multiplicar por 2.`;
      aid = `${this.currentQuestion.answer / 2} + ${this.currentQuestion.answer / 2} = ${this.currentQuestion.answer}`;
    } else if (this.currentQuestion.type === 'curriculum-math' || this.currentQuestion.type === 'curriculum-boss' || this.currentQuestion.type === 'curriculum-review' || this.currentQuestion.type === 'curriculum') {
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
    document.getElementById('combat-player-hp').style.width = `${this.playerHP}%`;
    document.getElementById('combat-rival-hp').style.width = `${this.rivalHP}%`;
  }

  updateComboDots() {
    document.getElementById('dot-1').className = `combo-dot ${this.correctStreak >= 1 ? 'active' : ''}`;
    document.getElementById('dot-2').className = `combo-dot ${this.correctStreak >= 2 ? 'active' : ''}`;
    document.getElementById('dot-3').className = `combo-dot ${this.correctStreak >= 3 ? 'active' : ''}`;
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
      const completion = ProgressService.recordCompletion(this.state, this.weekNum, this.isBoss, { accuracy: sessionAccuracy });
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
        isBoss: this.isBoss
      };
      ped.history.push({
        date: StorageService.todayKey(),
        sessionMinutes: 1, // simulated duration
        accuracy: sessionAccuracy,
        week: this.weekNum,
        type: this.isBoss ? 'boss' : 'training',
        curriculumMission: this.curriculumMission ? this.curriculumMission.key : null,
        curriculumSkill: this.curriculumMission ? this.curriculumMission.skill.id : null,
        learningCompletion: learningCompletion ? learningCompletion.key : null,
        correct: this.sessionCorrect,
        incorrect: this.sessionIncorrect
      });
      this.state.pedagogy.math.dailyStreak += 1;
      this.app.saveState();

      // Show rewards chest overlay
      this.app.showRewardModal(this.weekNum, this.isBoss, {
        xp: 40,
        coins: 25,
        sessionKey: completion.key,
        rewardAlreadyClaimed: !!completion.session.rewardClaimedAt,
        bossSummary
      });
    } else {
      sounds.playIncorrect();
      this.app.showNotice("Tu peonza se ha quedado sin energia. Hagamos un repaso antes de volver a luchar.", "Combate terminado");
      this.app.showScreen('map');
    }
  }
}

// ----------------------------------------------------

