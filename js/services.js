// 3. GAME INITIAL STATE TEMPLATE
const INITIAL_STATE = {
  schemaVersion: 1,
  player: {
    avatar: 'trainer_leo',
    characterAvatarId: 'jaxonCross',
    name: 'Carlitos',
    coins: 20,
    xp: 0,
    currentWeek: 1,
    currentDay: 1,
    currentLeague: "Arena de Pruebas",
    equippedBeyId: 'blackshell',
    activeCombo: {
      core: 'core_wood',
      ring: 'ring_wood',
      driver: 'driver_wood',
      color: 'col_cyan'
    },
    customAvatar: {
      expression: 'alegre',
      hairStyle: 'corto',
      hairColor: 'cyan',
      hat: 'ninguno',
      glasses: 'ningunas'
    },
    characterProgress: {}
  },
  inventory: {
    beys: ['blackshell', 'cobaltdragon', 'dranbuster1', 'dranbuster2'],
    core: ['core_wood'],
    ring: ['ring_wood'],
    driver: ['driver_wood'],
    color: ['col_cyan'],
    favoriteBeys: [],
    favoriteCharacters: [],
    favoriteStadiums: [],
    cards: [],
    badges: []
  },
  progress: {
    sessions: {},
    tableStats: {},
    tower: {
      highestUnlockedFloor: 1,
      completedFloors: [],
      dailyNewFloors: {}
    },
    pendingReward: null,
    activeTowerBattle: null
  },
  pedagogy: {
    learning: null,
    math: {
      level: 1,
      correctAnswers: 0,
      incorrectAnswers: 0,
      timeSpentSeconds: 0,
      masteredTables: [],
      troublesomeOperations: [],
      dailyStreak: 0,
      lastPlayedDate: "",
      dailyStats: {},
      history: []
    }
  },
  config: {
    soundEnabled: true,
    musicVolume: 0.5,
    difficulty: 'auto',
    dailyTimeLimitMinutes: 15,
    parentalSecurity: {
      pinHash: "",
      failedAttempts: 0,
      lockedUntil: 0,
      sessionUntil: 0,
      auditLog: []
    }
  }
};

class StorageService {
  static VERSION = 1;
  static KEY = 'spin_academy_save';
  static BACKUP_KEY = 'spin_academy_save_backup';

  static clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  static todayKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static load() {
    const saved = localStorage.getItem(this.KEY);
    if (!saved) return this.normalizeState(null);

    try {
      return this.normalizeState(JSON.parse(saved));
    } catch (e) {
      console.error("Error cargando base de datos local. Intentando recuperar copia anterior.", e);
      return this.loadBackup();
    }
  }

  static loadBackup() {
    const backup = localStorage.getItem(this.BACKUP_KEY);
    if (!backup) return this.normalizeState(null);

    try {
      return this.normalizeState(JSON.parse(backup));
    } catch (e) {
      console.error("La copia de seguridad local tambien esta danada. Reiniciando estado.", e);
      return this.normalizeState(null);
    }
  }

  static save(state) {
    const normalized = this.normalizeState(state);
    try {
      const current = localStorage.getItem(this.KEY);
      if (current) localStorage.setItem(this.BACKUP_KEY, current);
      localStorage.setItem(this.KEY, JSON.stringify(normalized));
    } catch (e) {
      console.error("No se pudo guardar el progreso local.", e);
    }
    return normalized;
  }

  static reset() {
    try {
      const current = localStorage.getItem(this.KEY);
      if (current) localStorage.setItem(this.BACKUP_KEY, current);
    } catch (e) {
      console.error("No se pudo crear copia de seguridad antes del reset.", e);
    }
    const fresh = this.normalizeState(null);
    try {
      localStorage.setItem(this.KEY, JSON.stringify(fresh));
    } catch (e) {
      console.error("No se pudo guardar el estado inicial tras el reset.", e);
    }
    return fresh;
  }

  static importState(jsonText) {
    const imported = JSON.parse(jsonText);
    return this.save(imported);
  }

  static normalizeState(rawState) {
    const state = this.clone(INITIAL_STATE);
    const raw = rawState && typeof rawState === 'object' ? rawState : {};

    state.schemaVersion = this.VERSION;

    if (raw.player && typeof raw.player === 'object') {
      Object.assign(state.player, raw.player);
      state.player.activeCombo = {
        ...INITIAL_STATE.player.activeCombo,
        ...(raw.player.activeCombo || {})
      };
      state.player.customAvatar = {
        ...INITIAL_STATE.player.customAvatar,
        ...(raw.player.customAvatar || {})
      };
      state.player.characterAvatarId = typeof raw.player.characterAvatarId === 'string' && raw.player.characterAvatarId.trim()
        ? raw.player.characterAvatarId.trim()
        : INITIAL_STATE.player.characterAvatarId;
      state.player.characterProgress = raw.player.characterProgress && typeof raw.player.characterProgress === 'object' && !Array.isArray(raw.player.characterProgress)
        ? raw.player.characterProgress
        : {};
    }

    if (raw.inventory && typeof raw.inventory === 'object') {
      Object.keys(state.inventory).forEach(key => {
        if (Array.isArray(raw.inventory[key])) state.inventory[key] = raw.inventory[key];
      });
    }

    if (raw.progress && typeof raw.progress === 'object') {
      state.progress.sessions = raw.progress.sessions && typeof raw.progress.sessions === 'object' && !Array.isArray(raw.progress.sessions)
        ? raw.progress.sessions
        : {};
      state.progress.tableStats = raw.progress.tableStats && typeof raw.progress.tableStats === 'object' && !Array.isArray(raw.progress.tableStats)
        ? raw.progress.tableStats
        : {};
      state.progress.tower = raw.progress.tower && typeof raw.progress.tower === 'object' && !Array.isArray(raw.progress.tower)
        ? raw.progress.tower
        : null;
      state.progress.pendingReward = raw.progress.pendingReward || null;
      state.progress.activeTowerBattle = raw.progress.activeTowerBattle && typeof raw.progress.activeTowerBattle === 'object' && !Array.isArray(raw.progress.activeTowerBattle)
        ? raw.progress.activeTowerBattle
        : null;
    }

    if (raw.pedagogy && raw.pedagogy.math && typeof raw.pedagogy.math === 'object') {
      Object.assign(state.pedagogy.math, raw.pedagogy.math);
    }
    if (raw.pedagogy && raw.pedagogy.learning && typeof raw.pedagogy.learning === 'object') {
      state.pedagogy.learning = raw.pedagogy.learning;
    }

    if (raw.config && typeof raw.config === 'object') {
      Object.assign(state.config, raw.config);
    }

    const math = state.pedagogy.math;
    state.player.name = typeof state.player.name === 'string' && state.player.name.trim()
      ? state.player.name.trim()
      : INITIAL_STATE.player.name;
    state.player.characterAvatarId = typeof state.player.characterAvatarId === 'string' && state.player.characterAvatarId.trim()
      ? state.player.characterAvatarId.trim()
      : INITIAL_STATE.player.characterAvatarId;
    state.player.coins = Math.max(0, parseInt(state.player.coins, 10) || 0);
    state.player.xp = Math.max(0, parseInt(state.player.xp, 10) || 0);
    state.player.currentWeek = Math.min(12, Math.max(1, parseInt(state.player.currentWeek, 10) || 1));
    state.player.currentDay = Math.min(5, Math.max(1, parseInt(state.player.currentDay, 10) || 1));
    state.player.characterProgress = state.player.characterProgress && typeof state.player.characterProgress === 'object' && !Array.isArray(state.player.characterProgress)
      ? state.player.characterProgress
      : {};
    Object.keys(state.player.characterProgress).forEach(characterId => {
      const progress = state.player.characterProgress[characterId] || {};
      state.player.characterProgress[characterId] = {
        wins: Math.max(0, parseInt(progress.wins, 10) || 0),
        losses: Math.max(0, parseInt(progress.losses, 10) || 0),
        xp: Math.max(0, parseInt(progress.xp, 10) || 0),
        level: Math.max(1, Math.min(30, parseInt(progress.level, 10) || 1))
      };
    });
    Object.keys(state.inventory).forEach(key => {
      state.inventory[key] = [...new Set(Array.isArray(state.inventory[key]) ? state.inventory[key] : [])];
    });
    if (typeof BEYBLADE_X_BEYS !== 'undefined') {
      const validBeyIds = new Set(BEYBLADE_X_BEYS.map(bey => bey.id));
      const starterBeyIds = typeof STARTER_BEY_IDS !== 'undefined' && STARTER_BEY_IDS.length > 0
        ? STARTER_BEY_IDS
        : INITIAL_STATE.inventory.beys;
      state.inventory.beys = state.inventory.beys.filter(id => validBeyIds.has(id));
      starterBeyIds.forEach(id => {
        if (validBeyIds.has(id) && !state.inventory.beys.includes(id)) state.inventory.beys.push(id);
      });
      if (!validBeyIds.has(state.player.equippedBeyId)) {
        state.player.equippedBeyId = state.inventory.beys[0] || starterBeyIds[0] || INITIAL_STATE.player.equippedBeyId;
      }
      if (validBeyIds.has(state.player.equippedBeyId) && !state.inventory.beys.includes(state.player.equippedBeyId)) {
        state.inventory.beys.push(state.player.equippedBeyId);
      }
    }
    if (!state.inventory.core.includes('core_wood')) state.inventory.core.unshift('core_wood');
    if (!state.inventory.ring.includes('ring_wood')) state.inventory.ring.unshift('ring_wood');
    if (!state.inventory.driver.includes('driver_wood')) state.inventory.driver.unshift('driver_wood');
    if (!state.inventory.color.includes('col_cyan')) state.inventory.color.unshift('col_cyan');

    math.timeSpentSeconds = Math.max(0, parseInt(math.timeSpentSeconds, 10) || 0);
    math.correctAnswers = Math.max(0, parseInt(math.correctAnswers, 10) || 0);
    math.incorrectAnswers = Math.max(0, parseInt(math.incorrectAnswers, 10) || 0);
    math.dailyStats = (math.dailyStats && typeof math.dailyStats === 'object' && !Array.isArray(math.dailyStats))
      ? math.dailyStats
      : {};
    math.history = Array.isArray(math.history) ? math.history : [];
    math.masteredTables = Array.isArray(math.masteredTables) ? math.masteredTables : [];
    math.troublesomeOperations = Array.isArray(math.troublesomeOperations) ? math.troublesomeOperations : [];

    if (Object.keys(math.dailyStats).length === 0 && math.timeSpentSeconds > 0) {
      const legacyDate = math.lastPlayedDate || this.todayKey();
      math.dailyStats[legacyDate] = {
        seconds: math.timeSpentSeconds,
        answers: math.correctAnswers + math.incorrectAnswers,
        correct: math.correctAnswers,
        incorrect: math.incorrectAnswers
      };
    }

    const today = this.todayKey();
    if (!math.dailyStats[today]) {
      math.dailyStats[today] = { seconds: 0, answers: 0, correct: 0, incorrect: 0 };
    }
    Object.keys(math.dailyStats).forEach(date => {
      const day = math.dailyStats[date] || {};
      math.dailyStats[date] = {
        seconds: Math.max(0, parseInt(day.seconds, 10) || 0),
        answers: Math.max(0, parseInt(day.answers, 10) || 0),
        correct: Math.max(0, parseInt(day.correct, 10) || 0),
        incorrect: Math.max(0, parseInt(day.incorrect, 10) || 0)
      };
    });
    math.lastPlayedDate = today;

    state.config.dailyTimeLimitMinutes = parseInt(state.config.dailyTimeLimitMinutes, 10) || INITIAL_STATE.config.dailyTimeLimitMinutes;
    state.config.soundEnabled = state.config.soundEnabled !== false;
    state.config.difficulty = state.config.difficulty || 'auto';
    state.config.parentalSecurity = ParentalSecurityService.normalize(state.config.parentalSecurity);
    state.pedagogy.learning = LearningEngine.normalizeProfile(state.pedagogy.learning);
    state.progress = ProgressService.normalize(state.progress, state.player);

    return state;
  }
}

class ParentalSecurityService {
  static DEFAULT_PIN = '2468';
  static MAX_ATTEMPTS = 5;
  static LOCK_MINUTES = 5;
  static SESSION_MINUTES = 10;
  static MAX_LOG_ITEMS = 20;

  static hashPin(pin) {
    const normalized = String(pin || '').trim();
    let hash = 2166136261;
    for (let i = 0; i < normalized.length; i++) {
      hash ^= normalized.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `fnv1a:${(hash >>> 0).toString(16)}`;
  }

  static normalize(security) {
    const src = security && typeof security === 'object' ? security : {};
    return {
      pinHash: typeof src.pinHash === 'string' && src.pinHash ? src.pinHash : this.hashPin(this.DEFAULT_PIN),
      failedAttempts: Math.max(0, parseInt(src.failedAttempts, 10) || 0),
      lockedUntil: Math.max(0, parseInt(src.lockedUntil, 10) || 0),
      sessionUntil: Math.max(0, parseInt(src.sessionUntil, 10) || 0),
      auditLog: Array.isArray(src.auditLog) ? src.auditLog.slice(0, this.MAX_LOG_ITEMS) : []
    };
  }

  static isSessionActive(state) {
    return Date.now() < state.config.parentalSecurity.sessionUntil;
  }

  static lockRemainingMs(state) {
    return Math.max(0, state.config.parentalSecurity.lockedUntil - Date.now());
  }

  static verifyPin(state, pin) {
    const security = state.config.parentalSecurity;
    const remaining = this.lockRemainingMs(state);
    if (remaining > 0) {
      return {
        ok: false,
        locked: true,
        message: `Acceso bloqueado temporalmente. Espera ${Math.ceil(remaining / 60000)} minuto(s).`
      };
    }

    if (this.hashPin(pin) === security.pinHash) {
      security.failedAttempts = 0;
      security.lockedUntil = 0;
      security.sessionUntil = Date.now() + this.SESSION_MINUTES * 60 * 1000;
      this.audit(state, 'Acceso parental correcto');
      return { ok: true };
    }

    security.failedAttempts += 1;
    this.audit(state, 'Intento fallido de acceso parental');
    if (security.failedAttempts >= this.MAX_ATTEMPTS) {
      security.lockedUntil = Date.now() + this.LOCK_MINUTES * 60 * 1000;
      security.failedAttempts = 0;
      return {
        ok: false,
        locked: true,
        message: `Demasiados intentos fallidos. Acceso bloqueado durante ${this.LOCK_MINUTES} minutos.`
      };
    }

    return {
      ok: false,
      locked: false,
      message: `PIN incorrecto. Intentos restantes: ${this.MAX_ATTEMPTS - security.failedAttempts}.`
    };
  }

  static updatePin(state, newPin) {
    const pin = String(newPin || '').trim();
    if (!/^\d{4,8}$/.test(pin)) {
      return { ok: false, message: 'El PIN debe tener entre 4 y 8 digitos numericos.' };
    }
    state.config.parentalSecurity.pinHash = this.hashPin(pin);
    state.config.parentalSecurity.failedAttempts = 0;
    state.config.parentalSecurity.lockedUntil = 0;
    state.config.parentalSecurity.sessionUntil = Date.now() + this.SESSION_MINUTES * 60 * 1000;
    this.audit(state, 'PIN parental actualizado');
    return { ok: true };
  }

  static audit(state, action) {
    const security = state.config.parentalSecurity;
    security.auditLog.unshift({
      at: new Date().toISOString(),
      action
    });
    security.auditLog = security.auditLog.slice(0, this.MAX_LOG_ITEMS);
  }

  static formatAuditLog(state) {
    const log = state.config.parentalSecurity.auditLog || [];
    if (log.length === 0) return 'Sin cambios sensibles registrados.';
    return log.slice(0, 5).map(item => {
      const date = new Date(item.at);
      const when = Number.isNaN(date.getTime()) ? item.at : date.toLocaleString();
      return `${when}: ${item.action}`;
    }).join('\n');
  }
}

class ProgressService {
  // Numero maximo de plantas NUEVAS (nunca completadas antes) que se pueden
  // desbloquear/jugar en un mismo dia. Las plantas ya completadas se pueden
  // repetir sin limite.
  static DAILY_NEW_FLOOR_LIMIT = 1;

  static normalize(progress, player) {
    const normalized = {
      sessions: progress && progress.sessions && typeof progress.sessions === 'object' && !Array.isArray(progress.sessions)
        ? progress.sessions
        : {},
      tableStats: progress && progress.tableStats && typeof progress.tableStats === 'object' && !Array.isArray(progress.tableStats)
        ? progress.tableStats
        : {},
      tower: progress && progress.tower && typeof progress.tower === 'object' && !Array.isArray(progress.tower)
        ? progress.tower
        : null,
      pendingReward: progress && progress.pendingReward && typeof progress.pendingReward === 'object'
        ? progress.pendingReward
        : null,
      activeTowerBattle: progress && progress.activeTowerBattle && typeof progress.activeTowerBattle === 'object' && !Array.isArray(progress.activeTowerBattle)
        ? progress.activeTowerBattle
        : null
    };

    Object.keys(normalized.sessions).forEach(key => {
      const session = normalized.sessions[key] || {};
      normalized.sessions[key] = {
        week: Math.min(12, Math.max(1, parseInt(session.week, 10) || 1)),
        day: session.day === null || session.day === undefined ? null : Math.min(5, Math.max(1, parseInt(session.day, 10) || 1)),
        type: ['boss', 'tower', 'review'].includes(session.type) ? session.type : 'training',
        attempts: Math.max(0, parseInt(session.attempts, 10) || 0),
        completedAt: session.completedAt || null,
        rewardClaimedAt: session.rewardClaimedAt || null,
        bestAccuracy: Math.max(0, Math.min(100, parseInt(session.bestAccuracy, 10) || 0))
      };
    });

    Object.keys(normalized.tableStats).forEach(table => {
      const stat = normalized.tableStats[table] || {};
      normalized.tableStats[table] = {
        correct: Math.max(0, parseInt(stat.correct, 10) || 0),
        incorrect: Math.max(0, parseInt(stat.incorrect, 10) || 0),
        attempts: Math.max(0, parseInt(stat.attempts, 10) || 0),
        lastPracticedAt: stat.lastPracticedAt || null
      };
    });

    normalized.tower = this.normalizeTowerProgress(normalized.tower, player);
    this.bootstrapLegacyProgress(normalized, player);
    if (normalized.pendingReward) {
      const key = normalized.pendingReward.key;
      const session = key ? normalized.sessions[key] : null;
      if (!session || session.rewardClaimedAt) {
        normalized.pendingReward = null;
      } else {
        normalized.pendingReward = {
          key,
          week: normalized.pendingReward.week,
          isBoss: !!normalized.pendingReward.isBoss,
          towerFloor: Math.max(1, Math.min(50, parseInt(normalized.pendingReward.towerFloor, 10) || 1))
        };
      }
    }
    normalized.activeTowerBattle = this.normalizeActiveTowerBattle(normalized.activeTowerBattle);
    return normalized;
  }

  static normalizeActiveTowerBattle(rawBattle) {
    if (!rawBattle || typeof rawBattle !== 'object' || Array.isArray(rawBattle)) return null;
    const floor = Math.max(1, Math.min(50, parseInt(rawBattle.floor, 10) || 1));
    return {
      key: typeof rawBattle.key === 'string' ? rawBattle.key : `tower-floor-${floor}`,
      floor,
      roundIndex: Math.max(0, parseInt(rawBattle.roundIndex, 10) || 0),
      questionIndex: Math.max(0, parseInt(rawBattle.questionIndex, 10) || 0),
      usedQuestionIds: Array.isArray(rawBattle.usedQuestionIds) ? [...new Set(rawBattle.usedQuestionIds.filter(Boolean))] : [],
      usedQuestionSignatures: Array.isArray(rawBattle.usedQuestionSignatures) ? [...new Set(rawBattle.usedQuestionSignatures.filter(Boolean))] : [],
      playerHP: Math.max(0, Number(rawBattle.playerHP) || 0),
      rivalHP: Math.max(0, Number(rawBattle.rivalHP) || 0),
      correctStreak: Math.max(0, parseInt(rawBattle.correctStreak, 10) || 0),
      sessionCorrect: Math.max(0, parseInt(rawBattle.sessionCorrect, 10) || 0),
      sessionIncorrect: Math.max(0, parseInt(rawBattle.sessionIncorrect, 10) || 0),
      bestCombo: Math.max(0, parseInt(rawBattle.bestCombo, 10) || 0),
      fastCorrect: Math.max(0, parseInt(rawBattle.fastCorrect, 10) || 0),
      assistedCorrect: Math.max(0, parseInt(rawBattle.assistedCorrect, 10) || 0),
      roundsWonFirstTry: Math.max(0, parseInt(rawBattle.roundsWonFirstTry, 10) || 0),
      roundsRepeated: Math.max(0, parseInt(rawBattle.roundsRepeated, 10) || 0),
      roundAttempts: rawBattle.roundAttempts && typeof rawBattle.roundAttempts === 'object' && !Array.isArray(rawBattle.roundAttempts)
        ? Object.entries(rawBattle.roundAttempts).reduce((acc, [key, value]) => {
            acc[key] = Math.max(1, parseInt(value, 10) || 1);
            return acc;
          }, {})
        : {},
      playerDeck: Array.isArray(rawBattle.playerDeck) ? rawBattle.playerDeck.filter(Boolean).slice(0, 3) : [],
      activeDeckIndex: Math.max(0, Math.min(2, parseInt(rawBattle.activeDeckIndex, 10) || 0)),
      deckSwitches: Math.max(0, parseInt(rawBattle.deckSwitches, 10) || 0),
      finishPoints: Math.max(0, parseInt(rawBattle.finishPoints, 10) || 0),
      finishStats: rawBattle.finishStats && typeof rawBattle.finishStats === 'object' && !Array.isArray(rawBattle.finishStats)
        ? {
            spin: Math.max(0, parseInt(rawBattle.finishStats.spin, 10) || 0),
            over: Math.max(0, parseInt(rawBattle.finishStats.over, 10) || 0),
            burst: Math.max(0, parseInt(rawBattle.finishStats.burst, 10) || 0),
            xtreme: Math.max(0, parseInt(rawBattle.finishStats.xtreme, 10) || 0)
        }
        : { spin: 0, over: 0, burst: 0, xtreme: 0 },
      xtremeDashUses: Math.max(0, parseInt(rawBattle.xtremeDashUses, 10) || 0),
      xtremeDashRisks: Math.max(0, parseInt(rawBattle.xtremeDashRisks, 10) || 0),
      questionBank: Array.isArray(rawBattle.questionBank) ? rawBattle.questionBank.filter(item => item && typeof item === 'object').slice(0, 80) : [],
      rounds: Array.isArray(rawBattle.rounds) ? rawBattle.rounds.filter(item => item && typeof item === 'object').slice(0, 12) : [],
      savedAt: typeof rawBattle.savedAt === 'string' ? rawBattle.savedAt : StorageService.todayKey()
    };
  }

  static normalizeTowerProgress(rawTower, player) {
    const today = StorageService.todayKey();
    const raw = rawTower && typeof rawTower === 'object' && !Array.isArray(rawTower) ? rawTower : {};
    const completedFloors = [...new Set(Array.isArray(raw.completedFloors)
      ? raw.completedFloors.map(floor => Math.max(1, Math.min(50, parseInt(floor, 10) || 1)))
      : [])].sort((a, b) => a - b);
    const legacyXpFloor = Math.floor(((player && Number(player.xp)) || 0) / 45) + 1;
    const legacyWeekFloor = ((((player && Number(player.currentWeek)) || 1) - 1) * 6) + 1;
    const legacyFloor = Math.max(1, Math.min(50, Math.max(legacyXpFloor, legacyWeekFloor)));
    const completedMax = completedFloors.length > 0 ? Math.max(...completedFloors) + 1 : 1;
    const highestUnlockedFloor = Math.max(
      1,
      Math.min(50, parseInt(raw.highestUnlockedFloor, 10) || Math.max(completedMax, legacyFloor))
    );
    const dailyNewFloors = raw.dailyNewFloors && typeof raw.dailyNewFloors === 'object' && !Array.isArray(raw.dailyNewFloors)
      ? Object.entries(raw.dailyNewFloors).reduce((acc, [date, value]) => {
          if (/^\d{4}-\d{2}-\d{2}$/.test(date)) acc[date] = Math.max(0, Math.min(this.DAILY_NEW_FLOOR_LIMIT, parseInt(value, 10) || 0));
          return acc;
        }, {})
      : {};
    if (!dailyNewFloors[today]) dailyNewFloors[today] = 0;
    return {
      highestUnlockedFloor,
      completedFloors,
      dailyNewFloors
    };
  }

  static bootstrapLegacyProgress(progress, player) {
    if (Object.keys(progress.sessions).length > 0) return;

    const now = StorageService.todayKey();
    for (let week = 1; week < player.currentWeek; week++) {
      for (let day = 1; day <= 5; day++) {
        progress.sessions[this.trainingKey(week, day)] = this.completedSession(week, day, 'training', now);
      }
      progress.sessions[this.bossKey(week)] = this.completedSession(week, null, 'boss', now);
    }

    for (let day = 1; day < player.currentDay; day++) {
      progress.sessions[this.trainingKey(player.currentWeek, day)] = this.completedSession(player.currentWeek, day, 'training', now);
    }
  }

  static completedSession(week, day, type, date) {
    return {
      week,
      day,
      type,
      attempts: 1,
      completedAt: date,
      rewardClaimedAt: date,
      bestAccuracy: 100
    };
  }

  static trainingKey(week, day) {
    return `week-${week}-day-${day}`;
  }

  static bossKey(week) {
    return `week-${week}-boss`;
  }

  static reinforceKey() {
    return `reinforce-${StorageService.todayKey()}`;
  }

  static postBossReviewKey() {
    return `post-boss-review-${StorageService.todayKey()}`;
  }

  static sessionKey(week, isBoss, day) {
    if (week === 'reinforce') return this.reinforceKey();
    if (week === 'post-boss-review') return this.postBossReviewKey();
    return isBoss ? this.bossKey(week) : this.trainingKey(week, day);
  }

  static towerKey(floorNumber) {
    const floor = Math.max(1, Math.min(50, parseInt(floorNumber, 10) || 1));
    return `tower-floor-${floor}`;
  }

  static getSession(state, key) {
    if (!state.progress.sessions[key]) {
      state.progress.sessions[key] = {
        week: state.player.currentWeek,
        day: null,
        type: 'training',
        attempts: 0,
        completedAt: null,
        rewardClaimedAt: null,
        bestAccuracy: 0
      };
    }
    return state.progress.sessions[key];
  }

  static isCompleted(state, key) {
    return !!(state.progress.sessions[key] && state.progress.sessions[key].completedAt);
  }

  static completedDaysCount(state, week) {
    let count = 0;
    for (let day = 1; day <= 5; day++) {
      if (this.isCompleted(state, this.trainingKey(week, day))) count++;
    }
    return count;
  }

  static nextTrainingDay(state, week) {
    for (let day = 1; day <= 5; day++) {
      if (!this.isCompleted(state, this.trainingKey(week, day))) return day;
    }
    return null;
  }

  static canStart(state, week, isBoss) {
    if (week === 'reinforce') return { ok: true };
    if (week === 'post-boss-review') return { ok: true };
    if (week !== state.player.currentWeek) {
      return { ok: false, reason: 'Solo se puede avanzar desde la semana actual.' };
    }
    if (isBoss) {
      if (this.completedDaysCount(state, week) < 5) {
        return { ok: false, reason: 'Completa los 5 entrenamientos antes de retar al jefe.' };
      }
      if (this.isCompleted(state, this.bossKey(week))) {
        return { ok: false, reason: 'El jefe de esta arena ya esta completado.' };
      }
      return { ok: true };
    }

    if (this.nextTrainingDay(state, week) === null) {
      return { ok: false, reason: 'Los 5 entrenamientos de esta semana ya estan completados.' };
    }
    return { ok: true };
  }

  static getTowerProgress(state) {
    if (!state.progress.tower || typeof state.progress.tower !== 'object') {
      state.progress.tower = this.normalizeTowerProgress(null, state.player);
    }
    return state.progress.tower;
  }

  static canStartTowerFloor(state, floorNumber) {
    const floor = Math.max(1, Math.min(50, parseInt(floorNumber, 10) || 1));
    const tower = this.getTowerProgress(state);
    const completed = new Set(tower.completedFloors || []);
    if (completed.has(floor) || floor < tower.highestUnlockedFloor) return { ok: true, replay: true };
    if (floor > tower.highestUnlockedFloor) return { ok: false, reason: 'Gana la planta anterior para desbloquear esta.' };
    const today = StorageService.todayKey();
    const winsToday = Math.max(0, parseInt(tower.dailyNewFloors?.[today], 10) || 0);
    if (winsToday >= this.DAILY_NEW_FLOOR_LIMIT) return { ok: false, reason: `Hoy ya has ganado ${this.DAILY_NEW_FLOOR_LIMIT} plantas nuevas. Puedes repetir combates o volver manana para subir mas.` };
    return { ok: true, replay: false };
  }

  static recordCompletion(state, week, isBoss, stats = {}) {
    const day = (week === 'reinforce' || week === 'post-boss-review') ? null : (isBoss ? null : this.nextTrainingDay(state, week));
    const key = this.sessionKey(week, isBoss, day);
    const session = this.getSession(state, key);
    const today = StorageService.todayKey();

    session.week = (week === 'reinforce' || week === 'post-boss-review') ? state.player.currentWeek : week;
    session.day = day;
    session.type = week === 'post-boss-review' ? 'review' : (isBoss ? 'boss' : 'training');
    session.attempts += 1;
    session.bestAccuracy = Math.max(session.bestAccuracy || 0, stats.accuracy || 0);

    const firstCompletion = !session.completedAt;
    if (firstCompletion) {
      session.completedAt = today;
      if (week !== 'post-boss-review') this.advancePlayer(state, week, isBoss);
    }

    return { key, session, firstCompletion };
  }

  static recordTowerFloorCompletion(state, floorNumber, stats = {}) {
    const floor = Math.max(1, Math.min(50, parseInt(floorNumber, 10) || 1));
    const tower = this.getTowerProgress(state);
    const key = this.towerKey(floor);
    const session = this.getSession(state, key);
    const today = StorageService.todayKey();
    const completed = new Set(tower.completedFloors || []);

    session.week = Math.max(1, Math.min(12, parseInt(stats.week, 10) || state.player.currentWeek || 1));
    session.day = null;
    session.type = 'tower';
    session.towerFloor = floor;
    session.attempts += 1;
    session.bestAccuracy = Math.max(session.bestAccuracy || 0, stats.accuracy || 0);

    const firstCompletion = !session.completedAt && !completed.has(floor);
    if (firstCompletion) {
      session.completedAt = today;
      completed.add(floor);
      tower.completedFloors = [...completed].sort((a, b) => a - b);
      if (floor >= tower.highestUnlockedFloor) {
        tower.highestUnlockedFloor = Math.min(50, floor + 1);
        tower.dailyNewFloors[today] = Math.max(0, parseInt(tower.dailyNewFloors[today], 10) || 0) + 1;
      }
    }

    return { key, session, firstCompletion };
  }

  static advancePlayer(state, week, isBoss) {
    if (week === 'reinforce' || week !== state.player.currentWeek) return;

    if (isBoss) {
      state.player.currentWeek = Math.min(12, state.player.currentWeek + 1);
      state.player.currentDay = 1;
    } else {
      const nextDay = this.nextTrainingDay(state, week);
      state.player.currentDay = nextDay || 5;
    }
  }

  static claimReward(state, sessionKey) {
    const session = this.getSession(state, sessionKey);
    if (session.rewardClaimedAt) {
      return false;
    }
    session.rewardClaimedAt = StorageService.todayKey();
    return true;
  }

  static recordAnswer(state, question, isCorrect) {
    if (!question || question.type !== 'mult') return;
    const table = String(question.a);
    const stat = state.progress.tableStats[table] || { correct: 0, incorrect: 0, attempts: 0, lastPracticedAt: null };
    stat.attempts += 1;
    if (isCorrect) stat.correct += 1;
    else stat.incorrect += 1;
    stat.lastPracticedAt = StorageService.todayKey();
    state.progress.tableStats[table] = stat;
  }
}

