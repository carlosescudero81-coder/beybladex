// ----------------------------------------------------
// LEARNING ENGINE: mission selection, mastery and review
// ----------------------------------------------------

class LearningEngine {
  static VERSION = 1;
  static REVIEW_STEPS_DAYS = [0, 1, 3, 7];

  static todayKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static createDefaultProfile() {
    const skills = {};
    CurriculumData.getAllSkills().forEach(skill => {
      skills[skill.id] = this.createSkillProgress(skill);
    });

    return {
      version: this.VERSION,
      currentWeek: 1,
      currentDay: 1,
      startedAt: this.todayKey(),
      lastMissionDate: '',
      skills,
      reviewQueue: [],
      diagnostics: {
        completedAt: null,
        baselineScore: 0,
        suggestedStartWeek: 1,
        recommendedSkillIds: [],
        results: {}
      },
      missionHistory: {},
      offlineEvidence: {},
      bossSummaries: {},
      postBossReviewHistory: {},
      spacedReviewPlans: {},
      spacedReviewStreak: {
        current: 0,
        best: 0,
        completedOnTime: 0,
        lastCompletedAt: null
      },
      spacedRecoveryNotes: [],
      dailyPlanCache: {}
    };
  }

  static createSkillProgress(skill) {
    return {
      id: skill.id,
      attempts: 0,
      correct: 0,
      incorrect: 0,
      mastery: 0,
      status: 'new',
      streak: 0,
      lastPracticedAt: null,
      masteredAt: null
    };
  }

  static normalizeProfile(rawProfile) {
    const profile = this.createDefaultProfile();
    const raw = rawProfile && typeof rawProfile === 'object' ? rawProfile : {};

    profile.version = this.VERSION;
    profile.currentWeek = Math.min(CurriculumData.summerWeeks.length, Math.max(1, parseInt(raw.currentWeek, 10) || 1));
    profile.currentDay = Math.min(5, Math.max(1, parseInt(raw.currentDay, 10) || 1));
    profile.startedAt = raw.startedAt || profile.startedAt;
    profile.lastMissionDate = raw.lastMissionDate || '';
    profile.diagnostics = this.normalizeDiagnostics(raw.diagnostics);
    profile.missionHistory = raw.missionHistory && typeof raw.missionHistory === 'object' && !Array.isArray(raw.missionHistory)
      ? raw.missionHistory
      : {};
    profile.offlineEvidence = raw.offlineEvidence && typeof raw.offlineEvidence === 'object' && !Array.isArray(raw.offlineEvidence)
      ? raw.offlineEvidence
      : {};
    profile.bossSummaries = raw.bossSummaries && typeof raw.bossSummaries === 'object' && !Array.isArray(raw.bossSummaries)
      ? raw.bossSummaries
      : {};
    profile.postBossReviewHistory = raw.postBossReviewHistory && typeof raw.postBossReviewHistory === 'object' && !Array.isArray(raw.postBossReviewHistory)
      ? raw.postBossReviewHistory
      : {};
    profile.spacedReviewPlans = raw.spacedReviewPlans && typeof raw.spacedReviewPlans === 'object' && !Array.isArray(raw.spacedReviewPlans)
      ? raw.spacedReviewPlans
      : {};
    profile.spacedReviewStreak = this.normalizeSpacedReviewStreak(raw.spacedReviewStreak);
    profile.spacedRecoveryNotes = Array.isArray(raw.spacedRecoveryNotes)
      ? raw.spacedRecoveryNotes.filter(item => item && typeof item === 'object').slice(-20)
      : [];
    profile.dailyPlanCache = raw.dailyPlanCache && typeof raw.dailyPlanCache === 'object' && !Array.isArray(raw.dailyPlanCache)
      ? raw.dailyPlanCache
      : {};

    const rawSkills = raw.skills && typeof raw.skills === 'object' && !Array.isArray(raw.skills) ? raw.skills : {};
    CurriculumData.getAllSkills().forEach(skill => {
      profile.skills[skill.id] = this.normalizeSkillProgress(skill, rawSkills[skill.id]);
    });

    profile.reviewQueue = Array.isArray(raw.reviewQueue)
      ? raw.reviewQueue
          .map(item => this.normalizeReviewItem(item))
          .filter(Boolean)
          .slice(0, 200)
      : [];

    return profile;
  }

  static normalizeDiagnostics(rawDiagnostics) {
    const raw = rawDiagnostics && typeof rawDiagnostics === 'object' ? rawDiagnostics : {};
    const results = raw.results && typeof raw.results === 'object' && !Array.isArray(raw.results) ? raw.results : {};
    const normalizedResults = {};
    CurriculumData.diagnosticBlueprint.forEach(item => {
      const result = results[item.skill] || {};
      normalizedResults[item.skill] = {
        attempts: Math.max(0, parseInt(result.attempts, 10) || 0),
        correct: Math.max(0, parseInt(result.correct, 10) || 0),
        recommended: result.recommended === true
      };
    });

    return {
      completedAt: raw.completedAt || null,
      baselineScore: Math.max(0, Math.min(100, parseInt(raw.baselineScore, 10) || 0)),
      suggestedStartWeek: Math.min(CurriculumData.summerWeeks.length, Math.max(1, parseInt(raw.suggestedStartWeek, 10) || 1)),
      recommendedSkillIds: Array.isArray(raw.recommendedSkillIds)
        ? raw.recommendedSkillIds.filter(skillId => CurriculumData.getSkill(skillId)).slice(0, 20)
        : [],
      results: normalizedResults
    };
  }

  static normalizeSkillProgress(skill, rawProgress) {
    const base = this.createSkillProgress(skill);
    const raw = rawProgress && typeof rawProgress === 'object' ? rawProgress : {};
    base.attempts = Math.max(0, parseInt(raw.attempts, 10) || 0);
    base.correct = Math.max(0, parseInt(raw.correct, 10) || 0);
    base.incorrect = Math.max(0, parseInt(raw.incorrect, 10) || 0);
    base.streak = Math.max(0, parseInt(raw.streak, 10) || 0);
    base.mastery = this.calculateMastery(base, skill);
    base.status = raw.status || this.statusForMastery(base.mastery, skill);
    base.lastPracticedAt = raw.lastPracticedAt || null;
    base.masteredAt = raw.masteredAt || null;
    if (base.status === 'mastered' && !base.masteredAt) base.masteredAt = this.todayKey();
    return base;
  }

  static normalizeReviewItem(item) {
    if (!item || typeof item !== 'object') return null;
    const skill = CurriculumData.getSkill(item.skillId);
    if (!skill) return null;
    return {
      id: item.id || `${item.skillId}-${item.questionId || 'manual'}`,
      skillId: item.skillId,
      questionId: item.questionId || null,
      dueAt: item.dueAt || this.todayKey(),
      step: Math.max(0, Math.min(this.REVIEW_STEPS_DAYS.length - 1, parseInt(item.step, 10) || 0)),
      attempts: Math.max(0, parseInt(item.attempts, 10) || 0),
      lastResult: item.lastResult === 'correct' ? 'correct' : 'incorrect',
      source: item.source || 'question',
      week: item.week || null
    };
  }

  static normalizeSpacedReviewStreak(rawStreak) {
    const raw = rawStreak && typeof rawStreak === 'object' ? rawStreak : {};
    const current = Math.max(0, parseInt(raw.current, 10) || 0);
    const best = Math.max(current, parseInt(raw.best, 10) || 0);
    return {
      current,
      best,
      completedOnTime: Math.max(0, parseInt(raw.completedOnTime, 10) || 0),
      lastCompletedAt: raw.lastCompletedAt || null
    };
  }

  static getProfile(state) {
    if (!state.pedagogy) state.pedagogy = {};
    state.pedagogy.learning = this.normalizeProfile(state.pedagogy.learning);
    return state.pedagogy.learning;
  }

  static missionKey(week, day) {
    return `summer-week-${week}-day-${day}`;
  }

  static bossSummaryKey(week) {
    return `summer-week-${week}-boss-summary`;
  }

  static postBossReviewKey(week) {
    return `summer-week-${week}-post-boss-review`;
  }

  static spacedPlanKey(week) {
    return `summer-week-${week}-spaced-review`;
  }

  static getMissionByPosition(week, day) {
    const weekData = CurriculumData.summerWeeks.find(item => item.week === week) || CurriculumData.summerWeeks[0];
    const daily = weekData.dailyPlan[Math.max(0, Math.min(4, day - 1))];
    if (!daily) return null;
    const [subjectId, missionType, skillId] = daily;
    return {
      key: this.missionKey(weekData.week, day),
      week: weekData.week,
      day,
      weekTitle: weekData.title,
      boss: weekData.boss,
      subject: CurriculumData.subjects[subjectId],
      missionType: CurriculumData.missionTypes[missionType],
      skill: CurriculumData.getSkill(skillId),
      focus: weekData.focus
    };
  }

  static getCurrentMission(state) {
    const profile = this.getProfile(state);
    return this.getMissionByPosition(profile.currentWeek, profile.currentDay);
  }

  static isDiagnosticComplete(state) {
    const profile = this.getProfile(state);
    return !!profile.diagnostics.completedAt;
  }

  static getNextMissionBySubject(state, subjectId) {
    const profile = this.getProfile(state);
    for (let week = profile.currentWeek; week <= CurriculumData.summerWeeks.length; week += 1) {
      const startDay = week === profile.currentWeek ? profile.currentDay : 1;
      for (let day = startDay; day <= 5; day += 1) {
        const mission = this.getMissionByPosition(week, day);
        if (mission && mission.subject.id === subjectId) return mission;
      }
    }
    for (let week = 1; week <= CurriculumData.summerWeeks.length; week += 1) {
      for (let day = 1; day <= 5; day += 1) {
        const mission = this.getMissionByPosition(week, day);
        if (mission && mission.subject.id === subjectId) return mission;
      }
    }
    return null;
  }

  static getDueReviewItems(state, date = this.todayKey()) {
    const profile = this.getProfile(state);
    return profile.reviewQueue.filter(item => item.dueAt <= date);
  }

  static selectQuestionsForMission(state, mission = this.getCurrentMission(state), count = 5) {
    if (!mission || !mission.skill) return [];
    const dueReview = this.getDueReviewItems(state)
      .filter(item => item.skillId === mission.skill.id || mission.subject.id === 'math')
      .map(item => CurriculumData.questionBank.find(question => question.id === item.questionId))
      .filter(Boolean);
    const fresh = CurriculumData.getQuestionsBySkill(mission.skill.id);
    const fallback = CurriculumData.questionBank.filter(question => question.subject === mission.subject.id);
    return this.uniqueQuestions([...dueReview, ...fresh, ...fallback]).slice(0, count);
  }

  static selectQuestionsForWeeklyBoss(state, week, count = 10) {
    const weekData = CurriculumData.summerWeeks.find(item => item.week === week);
    if (!weekData) return [];
    const dueReview = this.getDueReviewItems(state)
      .filter(item => weekData.skills.includes(item.skillId))
      .map(item => CurriculumData.questionBank.find(question => question.id === item.questionId))
      .filter(Boolean);
    const skillQuestions = weekData.skills
      .flatMap(skillId => CurriculumData.getQuestionsBySkill(skillId));
    const subjectQuestions = weekData.subjects
      .flatMap(subjectId => CurriculumData.questionBank.filter(question => question.subject === subjectId));
    return this.uniqueQuestions([...dueReview, ...skillQuestions, ...subjectQuestions]).slice(0, count);
  }

  static uniqueQuestions(questions) {
    const seen = new Set();
    return questions.filter(question => {
      if (!question || seen.has(question.id)) return false;
      seen.add(question.id);
      return true;
    });
  }

  static recordAnswer(state, question, isCorrect, meta = {}) {
    const profile = this.getProfile(state);
    if (!question || !question.skill || !profile.skills[question.skill]) {
      return { ok: false, reason: 'Pregunta sin habilidad curricular valida.' };
    }

    const skill = CurriculumData.getSkill(question.skill);
    const progress = profile.skills[question.skill];
    progress.attempts += 1;
    progress.lastPracticedAt = this.todayKey();
    if (isCorrect) {
      progress.correct += 1;
      progress.streak += 1;
      this.advanceReviewItem(profile, question);
    } else {
      progress.incorrect += 1;
      progress.streak = 0;
      this.enqueueReview(profile, question);
    }
    progress.mastery = this.calculateMastery(progress, skill);
    progress.status = this.statusForMastery(progress.mastery, skill, progress.attempts);
    if (progress.status === 'mastered' && !progress.masteredAt) progress.masteredAt = progress.lastPracticedAt;

    if (meta.diagnostic) this.recordDiagnosticAnswer(profile, question.skill, isCorrect);

    return {
      ok: true,
      skillId: question.skill,
      mastery: progress.mastery,
      status: progress.status,
      dueReviews: this.getDueReviewItems(state).length
    };
  }

  static calculateMastery(progress, skill) {
    if (!progress.attempts) return 0;
    const accuracy = Math.round((progress.correct / progress.attempts) * 100);
    const attemptBonus = Math.min(10, progress.attempts * 2);
    const streakBonus = Math.min(10, progress.streak * 3);
    const penalty = Math.min(15, progress.incorrect * 2);
    return Math.max(0, Math.min(100, accuracy + attemptBonus + streakBonus - penalty));
  }

  static statusForMastery(mastery, skill, attempts = 0) {
    if (attempts === 0) return 'new';
    if (mastery >= skill.masteryTarget) return 'mastered';
    if (mastery >= 50) return 'practicing';
    return 'needs_review';
  }

  static enqueueReview(profile, question) {
    const existing = profile.reviewQueue.find(item => item.questionId === question.id);
    if (existing) {
      existing.step = 0;
      existing.attempts += 1;
      existing.dueAt = this.addDays(this.todayKey(), this.REVIEW_STEPS_DAYS[0]);
      existing.lastResult = 'incorrect';
      return existing;
    }

    const item = {
      id: `${question.skill}-${question.id}`,
      skillId: question.skill,
      questionId: question.id,
      dueAt: this.todayKey(),
      step: 0,
      attempts: 1,
      lastResult: 'incorrect'
    };
    profile.reviewQueue.unshift(item);
    profile.reviewQueue = profile.reviewQueue.slice(0, 200);
    return item;
  }

  static advanceReviewItem(profile, question) {
    const item = profile.reviewQueue.find(review => review.questionId === question.id);
    if (!item) return null;
    item.step += 1;
    item.attempts += 1;
    item.lastResult = 'correct';
    if (item.step >= this.REVIEW_STEPS_DAYS.length) {
      profile.reviewQueue = profile.reviewQueue.filter(review => review !== item);
      return null;
    }
    item.dueAt = this.addDays(this.todayKey(), this.REVIEW_STEPS_DAYS[item.step]);
    return item;
  }

  static addDays(dateKey, days) {
    const date = new Date(`${dateKey}T00:00:00`);
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static recordMissionCompletion(state, mission = this.getCurrentMission(state), stats = {}) {
    const profile = this.getProfile(state);
    if (!mission) return { ok: false, reason: 'No hay mision actual.' };
    const key = mission.key;
    const firstCompletion = !profile.missionHistory[key];
    profile.missionHistory[key] = {
      key,
      week: mission.week,
      day: mission.day,
      subject: mission.subject.id,
      skill: mission.skill.id,
      missionType: mission.missionType.id,
      completedAt: this.todayKey(),
      accuracy: Math.max(0, Math.min(100, parseInt(stats.accuracy, 10) || 0)),
      answers: Math.max(0, parseInt(stats.answers, 10) || 0),
      evidence: typeof stats.evidence === 'string' ? stats.evidence.trim().slice(0, 180) : '',
      approvedBy: typeof stats.approvedBy === 'string' ? stats.approvedBy.slice(0, 40) : ''
    };
    profile.lastMissionDate = this.todayKey();
    const currentMission = this.getMissionByPosition(profile.currentWeek, profile.currentDay);
    const shouldAdvance = stats.advanceCursor !== false && currentMission && currentMission.key === key;
    if (firstCompletion && shouldAdvance) this.advanceMissionCursor(profile);
    return { ok: true, key, firstCompletion, nextMission: this.getMissionByPosition(profile.currentWeek, profile.currentDay) };
  }

  static recordPracticeSession(state, mission, stats = {}) {
    const profile = this.getProfile(state);
    if (!mission) return { ok: false, reason: 'No hay mision de practica.' };
    const date = this.todayKey();
    const key = `${mission.key}-practice-${date}`;
    profile.missionHistory[key] = {
      key,
      week: mission.week,
      day: mission.day,
      subject: mission.subject.id,
      skill: mission.skill.id,
      missionType: mission.missionType.id,
      completedAt: date,
      practiceOnly: true,
      accuracy: Math.max(0, Math.min(100, parseInt(stats.accuracy, 10) || 0)),
      answers: Math.max(0, parseInt(stats.answers, 10) || 0),
      evidence: typeof stats.evidence === 'string' ? stats.evidence.trim().slice(0, 180) : '',
      approvedBy: typeof stats.approvedBy === 'string' ? stats.approvedBy.slice(0, 40) : ''
    };
    profile.lastMissionDate = date;
    return { ok: true, key, firstCompletion: true, nextMission: this.getCurrentMission(state) };
  }

  static advanceMissionCursor(profile) {
    if (profile.currentDay < 5) {
      profile.currentDay += 1;
      return;
    }
    profile.currentDay = 1;
    profile.currentWeek = Math.min(CurriculumData.summerWeeks.length, profile.currentWeek + 1);
  }

  static canUnlockWeeklyBoss(state, week) {
    const profile = this.getProfile(state);
    const weekData = CurriculumData.summerWeeks.find(item => item.week === week);
    if (!weekData) return { ok: false, reason: 'Semana inexistente.' };
    const dayStatus = [1, 2, 3, 4, 5].map(day => {
      const mission = this.getMissionByPosition(week, day);
      return {
        day,
        mission,
        completed: !!profile.missionHistory[this.missionKey(week, day)]
      };
    });
    const completed = dayStatus.every(item => item.completed);
    const skills = weekData.skills.map(skillId => {
      const skill = CurriculumData.getSkill(skillId);
      const progress = profile.skills[skillId];
      return {
        id: skillId,
        name: skill ? skill.name : skillId,
        mastery: progress ? progress.mastery : 0,
        status: progress ? progress.status : 'new',
        target: skill ? skill.masteryTarget : 70
      };
    });
    const averageMastery = skills.length
      ? Math.round(skills.reduce((sum, skill) => sum + skill.mastery, 0) / skills.length)
      : 0;
    const weakSkills = skills.filter(skill => skill.mastery < Math.min(50, skill.target));
    const ready = completed && averageMastery >= 50 && weakSkills.length === 0;
    return {
      ok: ready,
      reason: !completed
        ? 'Completa las 5 misiones curriculares de la semana.'
        : averageMastery < 50
          ? 'Hace falta mas practica antes del jefe semanal.'
          : weakSkills.length > 0
            ? 'Hay habilidades clave por debajo del minimo de preparacion.'
            : '',
      averageMastery,
      completedDays: dayStatus.filter(item => item.completed).length,
      totalDays: dayStatus.length,
      dayStatus,
      skills,
      weakSkills,
      bossName: weekData.boss,
      weekTitle: weekData.title,
      focus: weekData.focus
    };
  }

  static recordWeeklyBossSummary(state, week, stats = {}) {
    const profile = this.getProfile(state);
    const weekData = CurriculumData.summerWeeks.find(item => item.week === week);
    if (!weekData) return null;

    const answerLog = Array.isArray(stats.answerLog) ? stats.answerLog.filter(Boolean) : [];
    const skills = weekData.skills.map(skillId => {
      const skill = CurriculumData.getSkill(skillId);
      const subjectId = this.getSubjectIdForSkill(skillId);
      const progress = profile.skills[skillId] || this.createSkillProgress(skill || { id: skillId, masteryTarget: 70 });
      const attempts = answerLog.filter(item => item.skill === skillId).length;
      const correct = answerLog.filter(item => item.skill === skillId && item.correct).length;
      const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
      return {
        id: skillId,
        name: skill ? skill.name : skillId,
        subject: subjectId,
        subjectName: subjectId && CurriculumData.subjects[subjectId] ? CurriculumData.subjects[subjectId].shortName : subjectId,
        mastery: progress.mastery,
        target: skill ? skill.masteryTarget : 70,
        status: progress.status,
        attempts,
        correct,
        accuracy
      };
    });

    const subjects = weekData.subjects.map(subjectId => {
      const subjectSkills = skills.filter(skill => skill.subject === subjectId);
      const attempts = answerLog.filter(item => item.subject === subjectId).length;
      const correct = answerLog.filter(item => item.subject === subjectId && item.correct).length;
      const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
      const mastery = subjectSkills.length
        ? Math.round(subjectSkills.reduce((sum, skill) => sum + skill.mastery, 0) / subjectSkills.length)
        : 0;
      return {
        id: subjectId,
        name: CurriculumData.subjects[subjectId]?.shortName || subjectId,
        attempts,
        correct,
        accuracy,
        mastery,
        proven: attempts > 0 ? accuracy >= 70 : mastery >= 60
      };
    });

    const reviewSkills = skills
      .filter(skill => skill.mastery < skill.target || skill.accuracy < 70 || skill.status === 'needs_review')
      .sort((a, b) => a.mastery - b.mastery || a.accuracy - b.accuracy)
      .slice(0, 5)
      .map(skill => ({
        id: skill.id,
        name: skill.name,
        subject: skill.subjectName || '',
        mastery: skill.mastery,
        target: skill.target,
        accuracy: skill.accuracy,
        reason: skill.attempts > 0 && skill.accuracy < 70
          ? 'Fallo en el jefe semanal'
          : skill.status === 'needs_review'
            ? 'En cola de repaso'
            : 'Aun por debajo del objetivo'
      }));

    const key = this.bossSummaryKey(weekData.week);
    const summary = {
      key,
      week: weekData.week,
      title: weekData.title,
      focus: weekData.focus,
      bossName: weekData.boss,
      completedAt: this.todayKey(),
      accuracy: Math.max(0, Math.min(100, parseInt(stats.accuracy, 10) || 0)),
      answers: Math.max(0, parseInt(stats.answers, 10) || answerLog.length),
      correct: Math.max(0, parseInt(stats.correct, 10) || subjects.reduce((sum, subject) => sum + subject.correct, 0)),
      incorrect: Math.max(0, parseInt(stats.incorrect, 10) || 0),
      subjects,
      provenSubjects: subjects.filter(subject => subject.proven).map(subject => subject.name),
      reviewSkills,
      nextReviewAction: reviewSkills.length > 0
        ? `${reviewSkills[0].subject}: ${reviewSkills[0].name}`
        : 'Mantener lectura, calculo y repaso mixto.'
    };
    profile.bossSummaries[key] = summary;
    return summary;
  }

  static getWeeklyBossSummary(state, week = null) {
    const profile = this.getProfile(state);
    const targetWeek = week || profile.currentWeek;
    return profile.bossSummaries[this.bossSummaryKey(targetWeek)] || null;
  }

  static getBossSummaries(state) {
    const profile = this.getProfile(state);
    return Object.values(profile.bossSummaries || {})
      .filter(Boolean)
      .sort((a, b) => a.week - b.week);
  }

  static getPostBossReviewPlan(state, week = null) {
    const profile = this.getProfile(state);
    const summaries = week
      ? [this.getWeeklyBossSummary(state, week)].filter(Boolean)
      : this.getBossSummaries(state).slice().reverse();
    const summary = summaries.find(item => item.reviewSkills && item.reviewSkills.length > 0);
    if (!summary) return null;
    const key = this.postBossReviewKey(summary.week);
    const skills = summary.reviewSkills
      .map(item => {
        const skill = CurriculumData.getSkill(item.id);
        const subjectId = this.getSubjectIdForSkill(item.id);
        return {
          ...item,
          skill,
          subjectId,
          subjectName: subjectId && CurriculumData.subjects[subjectId] ? CurriculumData.subjects[subjectId].shortName : item.subject
        };
      })
      .filter(item => item.skill);
    if (skills.length === 0) return null;
    const hasDueSpacedReview = this.getDueSpacedReviews(state, summary.week).length > 0;
    return {
      key,
      week: summary.week,
      title: `Repaso del jefe: ${summary.bossName}`,
      focus: `Volver a practicar ${skills.slice(0, 2).map(item => item.skill.name).join(' y ')}`,
      summary,
      skills,
      completed: !!profile.postBossReviewHistory[key] && !hasDueSpacedReview
    };
  }

  static selectQuestionsForPostBossReview(state, week = null, count = 10) {
    const plan = this.getPostBossReviewPlan(state, week);
    if (!plan || plan.completed) return [];
    const skillIds = plan.skills.map(item => item.id);
    const dueReview = this.getDueReviewItems(state)
      .filter(item => skillIds.includes(item.skillId))
      .map(item => CurriculumData.questionBank.find(question => question.id === item.questionId))
      .filter(Boolean);
    const skillQuestions = skillIds.flatMap(skillId => CurriculumData.getQuestionsBySkill(skillId));
    const targetedQuestions = this.uniqueQuestions([...dueReview, ...skillQuestions]);
    if (targetedQuestions.length > 0) return targetedQuestions.slice(0, count);
    const subjectQuestions = [...new Set(plan.skills.map(item => item.subjectId).filter(Boolean))]
      .flatMap(subjectId => CurriculumData.questionBank.filter(question => question.subject === subjectId));
    return this.uniqueQuestions(subjectQuestions).slice(0, count);
  }

  static recordPostBossReviewCompletion(state, week = null, stats = {}) {
    const plan = this.getPostBossReviewPlan(state, week);
    if (!plan) return { ok: false, reason: 'No hay repaso post-jefe pendiente.' };
    const dueSpacedReviews = this.getDueSpacedReviews(state, plan.week);
    const existingHistory = this.getProfile(state).postBossReviewHistory[plan.key] || {};
    const spacedPlan = dueSpacedReviews.length > 0 ? null : this.schedulePostBossSpacedReviews(state, plan);
    const streak = this.recordSpacedReviewStreak(state, plan.week);
    const recoveryNote = dueSpacedReviews.length > 0
      ? this.recordSpacedRecoveryNote(state, plan, dueSpacedReviews, streak)
      : null;
    const profile = this.getProfile(state);
    profile.postBossReviewHistory[plan.key] = {
      ...existingHistory,
      key: plan.key,
      week: plan.week,
      completedAt: existingHistory.completedAt || this.todayKey(),
      lastReviewAt: this.todayKey(),
      accuracy: Math.max(0, Math.min(100, parseInt(stats.accuracy, 10) || 0)),
      answers: Math.max(0, parseInt(stats.answers, 10) || 0),
      skills: plan.skills.map(item => item.id),
      spacedReviewDates: spacedPlan ? spacedPlan.dates : (existingHistory.spacedReviewDates || []),
      spacedStreak: streak,
      lastRecoveryNoteKey: recoveryNote ? recoveryNote.key : existingHistory.lastRecoveryNoteKey || null
    };
    return { ok: true, key: plan.key, plan, spacedPlan, streak, recoveryNote };
  }

  static recordSpacedReviewStreak(state, week = null, date = this.todayKey()) {
    const profile = this.getProfile(state);
    const dueItems = profile.reviewQueue.filter(item =>
      item.source === 'post_boss_spaced'
      && (!week || item.week === week)
      && item.dueAt <= date
    );
    if (dueItems.length === 0) return profile.spacedReviewStreak;

    const streak = profile.spacedReviewStreak;
    const alreadyCountedToday = streak.lastCompletedAt === date;
    if (!alreadyCountedToday) {
      streak.current += 1;
      streak.completedOnTime += dueItems.length;
      streak.best = Math.max(streak.best, streak.current);
      streak.lastCompletedAt = date;
    }
    const dueIds = new Set(dueItems.map(item => item.id));
    profile.reviewQueue = profile.reviewQueue.filter(item => !dueIds.has(item.id));
    return { ...streak };
  }

  static getSpacedReviewStreak(state) {
    const profile = this.getProfile(state);
    return { ...profile.spacedReviewStreak };
  }

  static recordSpacedRecoveryNote(state, plan, clearedItems, streak) {
    const grouped = clearedItems.reduce((acc, item) => {
      const skill = CurriculumData.getSkill(item.skillId);
      const subjectId = this.getSubjectIdForSkill(item.skillId);
      const key = item.skillId;
      if (!acc[key]) {
        acc[key] = {
          skillId: item.skillId,
          skillName: skill ? skill.name : item.skillId,
          subject: subjectId && CurriculumData.subjects[subjectId] ? CurriculumData.subjects[subjectId].shortName : subjectId,
          count: 0
        };
      }
      acc[key].count += 1;
      return acc;
    }, {});
    const remaining = this.getUpcomingSpacedReviews(state)
      .filter(item => item.week === plan.week)
      .slice(0, 6)
      .map(item => ({
        dueAt: item.dueAt,
        subject: item.subject,
        skillName: item.skillName
      }));
    const profile = this.getProfile(state);
    const note = {
      key: `spaced-recovery-${plan.week}-${this.todayKey()}-${profile.spacedRecoveryNotes.length + 1}`,
      week: plan.week,
      title: plan.title,
      completedAt: this.todayKey(),
      clearedCount: clearedItems.length,
      clearedSkills: Object.values(grouped),
      remainingDates: remaining,
      streak: { ...streak }
    };
    profile.spacedRecoveryNotes.push(note);
    profile.spacedRecoveryNotes = profile.spacedRecoveryNotes.slice(-20);
    return note;
  }

  static getLatestSpacedRecoveryNote(state) {
    const profile = this.getProfile(state);
    return profile.spacedRecoveryNotes.length
      ? profile.spacedRecoveryNotes[profile.spacedRecoveryNotes.length - 1]
      : null;
  }

  static getDueSpacedReviews(state, week = null, date = this.todayKey()) {
    const profile = this.getProfile(state);
    return profile.reviewQueue.filter(item =>
      item.source === 'post_boss_spaced'
      && (!week || item.week === week)
      && item.dueAt <= date
    );
  }

  static schedulePostBossSpacedReviews(state, plan) {
    const profile = this.getProfile(state);
    if (!plan || !plan.skills || plan.skills.length === 0) return null;
    const reviewSkills = plan.skills.filter(item => {
      const progress = profile.skills[item.id];
      const skill = CurriculumData.getSkill(item.id);
      return progress && skill && progress.mastery < skill.masteryTarget;
    });
    if (reviewSkills.length === 0) return null;
    const dates = [1, 3, 7].map(days => this.addDays(this.todayKey(), days));
    const key = this.spacedPlanKey(plan.week);
    const spacedPlan = {
      key,
      sourceReviewKey: plan.key,
      week: plan.week,
      createdAt: this.todayKey(),
      dates,
      skills: reviewSkills.map(item => ({
        id: item.id,
        name: item.skill ? item.skill.name : item.name,
        subject: item.subjectName || item.subject || '',
        masteryAtScheduling: profile.skills[item.id].mastery,
        target: CurriculumData.getSkill(item.id).masteryTarget
      }))
    };
    profile.spacedReviewPlans[key] = spacedPlan;

    reviewSkills.forEach(item => {
      dates.forEach((date, index) => {
        this.enqueueSpacedReview(profile, {
          skillId: item.id,
          dueAt: date,
          step: Math.min(index + 1, this.REVIEW_STEPS_DAYS.length - 1),
          week: plan.week
        });
      });
    });
    return spacedPlan;
  }

  static enqueueSpacedReview(profile, item) {
    const id = `post-boss-${item.week}-${item.skillId}-${item.dueAt}`;
    const existing = profile.reviewQueue.find(review => review.id === id);
    if (existing) return existing;
    const review = {
      id,
      skillId: item.skillId,
      questionId: null,
      dueAt: item.dueAt,
      step: item.step,
      attempts: 0,
      lastResult: 'incorrect',
      source: 'post_boss_spaced',
      week: item.week
    };
    profile.reviewQueue.push(review);
    profile.reviewQueue = profile.reviewQueue
      .sort((a, b) => a.dueAt.localeCompare(b.dueAt))
      .slice(0, 240);
    return review;
  }

  static getPostBossSpacedReviewPlan(state, week = null) {
    const profile = this.getProfile(state);
    if (week) return profile.spacedReviewPlans[this.spacedPlanKey(week)] || null;
    return Object.values(profile.spacedReviewPlans || {})
      .filter(Boolean)
      .sort((a, b) => b.week - a.week)[0] || null;
  }

  static getUpcomingSpacedReviews(state, date = this.todayKey()) {
    const profile = this.getProfile(state);
    return profile.reviewQueue
      .filter(item => item.source === 'post_boss_spaced' && item.dueAt >= date)
      .sort((a, b) => a.dueAt.localeCompare(b.dueAt))
      .map(item => {
        const skill = CurriculumData.getSkill(item.skillId);
        const subjectId = this.getSubjectIdForSkill(item.skillId);
        return {
          ...item,
          skillName: skill ? skill.name : item.skillId,
          subject: subjectId && CurriculumData.subjects[subjectId] ? CurriculumData.subjects[subjectId].shortName : subjectId
        };
      });
  }

  static getOverdueSpacedReviews(state, date = this.todayKey()) {
    const profile = this.getProfile(state);
    return profile.reviewQueue
      .filter(item => item.source === 'post_boss_spaced' && item.dueAt < date)
      .sort((a, b) => a.dueAt.localeCompare(b.dueAt))
      .map(item => {
        const skill = CurriculumData.getSkill(item.skillId);
        const subjectId = this.getSubjectIdForSkill(item.skillId);
        return {
          ...item,
          skillName: skill ? skill.name : item.skillId,
          subject: subjectId && CurriculumData.subjects[subjectId] ? CurriculumData.subjects[subjectId].shortName : subjectId,
          daysLate: this.daysBetween(item.dueAt, date)
        };
      });
  }

  static getSpacedReviewAlertSummary(state, date = this.todayKey()) {
    const overdue = this.getOverdueSpacedReviews(state, date);
    const streak = this.getSpacedReviewStreak(state);
    const bySkill = overdue.reduce((acc, item) => {
      const key = item.skillId;
      if (!acc[key]) {
        acc[key] = {
          skillId: item.skillId,
          skillName: item.skillName,
          subject: item.subject,
          count: 0,
          oldestDueAt: item.dueAt,
          maxDaysLate: item.daysLate
        };
      }
      acc[key].count += 1;
      if (item.dueAt < acc[key].oldestDueAt) acc[key].oldestDueAt = item.dueAt;
      acc[key].maxDaysLate = Math.max(acc[key].maxDaysLate, item.daysLate);
      return acc;
    }, {});
    return {
      hasAlert: overdue.length > 0,
      count: overdue.length,
      oldestDueAt: overdue[0]?.dueAt || null,
      recoveryWeek: overdue[0]?.week || null,
      maxDaysLate: overdue.reduce((max, item) => Math.max(max, item.daysLate), 0),
      skills: Object.values(bySkill).sort((a, b) => b.maxDaysLate - a.maxDaysLate || b.count - a.count),
      streak
    };
  }

  static daysBetween(startKey, endKey) {
    const start = new Date(`${startKey}T00:00:00`);
    const end = new Date(`${endKey}T00:00:00`);
    return Math.max(0, Math.round((end - start) / 86400000));
  }

  static recordDiagnosticAnswer(profile, skillId, isCorrect) {
    if (!profile.diagnostics.results[skillId]) {
      profile.diagnostics.results[skillId] = { attempts: 0, correct: 0, recommended: false };
    }
    const result = profile.diagnostics.results[skillId];
    result.attempts += 1;
    if (isCorrect) result.correct += 1;
    result.recommended = result.attempts > 0 && result.correct / result.attempts < 0.7;
  }

  static completeDiagnostic(state) {
    const profile = this.getProfile(state);
    const results = Object.entries(profile.diagnostics.results);
    const attempted = results.filter(([, result]) => result.attempts > 0);
    const totalAttempts = attempted.reduce((sum, [, result]) => sum + result.attempts, 0);
    const totalCorrect = attempted.reduce((sum, [, result]) => sum + result.correct, 0);
    const recommendedSkillIds = attempted
      .filter(([, result]) => result.recommended)
      .map(([skillId]) => skillId);
    const baselineScore = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    const hasCoreGaps = ['math_number_999', 'math_add_sub', 'lang_literal', 'lang_read_fluency']
      .some(skillId => recommendedSkillIds.includes(skillId));

    profile.diagnostics.baselineScore = baselineScore;
    profile.diagnostics.recommendedSkillIds = recommendedSkillIds;
    profile.diagnostics.suggestedStartWeek = baselineScore >= 85 && !hasCoreGaps ? 2 : 1;
    profile.diagnostics.completedAt = this.todayKey();
    if (profile.currentWeek === 1 && profile.currentDay === 1 && profile.diagnostics.suggestedStartWeek > 1) {
      profile.currentWeek = profile.diagnostics.suggestedStartWeek;
      profile.currentDay = 1;
    }
    return profile.diagnostics;
  }

  static getOfflineTemplateForMission(mission) {
    if (!mission) return null;
    return CurriculumData.offlineMissions.find(item => item.subject === mission.subject.id && item.skill === mission.skill.id)
      || {
        id: `${mission.subject.id}-${mission.skill.id}-offline`,
        subject: mission.subject.id,
        skill: mission.skill.id,
        type: mission.missionType.id,
        title: `${mission.subject.shortName}: ${mission.skill.name}`,
        instructions: mission.missionType.id === 'offline'
          ? 'Realiza la actividad fuera de pantalla y escribe una evidencia breve.'
          : 'Realiza el proyecto familiar y escribe que has observado o creado.',
        parentPrompt: 'Valida que la actividad se ha hecho con calma y que puede explicarla.'
      };
  }

  static submitOfflineEvidence(state, mission, evidenceText) {
    const profile = this.getProfile(state);
    if (!mission || !mission.key) return { ok: false, reason: 'No hay mision familiar valida.' };
    const evidence = String(evidenceText || '').trim();
    if (evidence.length < 8) return { ok: false, reason: 'La evidencia es demasiado corta.' };
    const template = this.getOfflineTemplateForMission(mission);
    const item = {
      id: mission.key,
      status: 'pending',
      week: mission.week,
      day: mission.day,
      subject: mission.subject.id,
      skill: mission.skill.id,
      missionType: mission.missionType.id,
      title: template.title,
      instructions: template.instructions,
      parentPrompt: template.parentPrompt,
      evidence: evidence.slice(0, 220),
      submittedAt: this.todayKey(),
      approvedAt: null
    };
    profile.offlineEvidence[item.id] = item;
    return { ok: true, item };
  }

  static getPendingOfflineEvidence(state) {
    const profile = this.getProfile(state);
    return Object.values(profile.offlineEvidence || {})
      .filter(item => item.status === 'pending')
      .sort((a, b) => `${a.week}-${a.day}`.localeCompare(`${b.week}-${b.day}`));
  }

  static approveOfflineEvidence(state, evidenceId, approver = 'parent') {
    const profile = this.getProfile(state);
    const item = profile.offlineEvidence[evidenceId];
    if (!item || item.status !== 'pending') return { ok: false, reason: 'No hay evidencia pendiente.' };
    const mission = this.getMissionByPosition(item.week, item.day);
    if (!mission) return { ok: false, reason: 'No se encontro la mision curricular.' };

    this.recordAnswer(state, {
      id: `${item.id}-approved-evidence`,
      subject: item.subject,
      skill: item.skill
    }, true);
    const completion = this.recordMissionCompletion(state, mission, {
      accuracy: 100,
      answers: 1,
      evidence: item.evidence,
      approvedBy: approver
    });
    item.status = 'approved';
    item.approvedAt = this.todayKey();
    item.approvedBy = approver;
    return { ok: true, item, completion };
  }

  static selectDiagnosticQuestions(state) {
    this.getProfile(state);
    const questions = [];
    CurriculumData.diagnosticBlueprint.forEach(item => {
      const skillQuestions = CurriculumData.getQuestionsBySkill(item.skill);
      const subjectFallback = CurriculumData.questionBank.filter(question => question.subject === item.subject);
      this.uniqueQuestions([...skillQuestions, ...subjectFallback])
        .slice(0, Math.max(1, Math.min(2, item.count || 1)))
        .forEach(question => questions.push(question));
    });
    return this.uniqueQuestions(questions).slice(0, 10);
  }

  static getDiagnosticSummary(state) {
    const profile = this.getProfile(state);
    const results = Object.entries(profile.diagnostics.results)
      .map(([skillId, result]) => {
        const skill = CurriculumData.getSkill(skillId);
        const subjectId = this.getSubjectIdForSkill(skillId);
        return {
          skillId,
          skillName: skill ? skill.name : skillId,
          subjectId,
          subjectName: subjectId && CurriculumData.subjects[subjectId] ? CurriculumData.subjects[subjectId].shortName : '',
          attempts: result.attempts,
          correct: result.correct,
          accuracy: result.attempts ? Math.round((result.correct / result.attempts) * 100) : 0,
          recommended: result.recommended
        };
      });
    return {
      completedAt: profile.diagnostics.completedAt,
      baselineScore: profile.diagnostics.baselineScore,
      suggestedStartWeek: profile.diagnostics.suggestedStartWeek,
      recommendedSkillIds: profile.diagnostics.recommendedSkillIds,
      results
    };
  }

  static getSkillSummary(state) {
    const profile = this.getProfile(state);
    return Object.values(profile.skills).map(progress => {
      const skill = CurriculumData.getSkill(progress.id);
      return {
        id: progress.id,
        name: skill ? skill.name : progress.id,
        mastery: progress.mastery,
        status: progress.status,
        attempts: progress.attempts,
        correct: progress.correct,
        incorrect: progress.incorrect
      };
    });
  }

  static getSubjectSummary(state) {
    const profile = this.getProfile(state);
    return Object.values(CurriculumData.subjects).map(subject => {
      const subjectSkills = CurriculumData.skills[subject.id] || [];
      const progressItems = subjectSkills.map(skill => profile.skills[skill.id]).filter(Boolean);
      const attempts = progressItems.reduce((sum, item) => sum + item.attempts, 0);
      const correct = progressItems.reduce((sum, item) => sum + item.correct, 0);
      const mastered = progressItems.filter(item => item.status === 'mastered').length;
      const mastery = progressItems.length
        ? Math.round(progressItems.reduce((sum, item) => sum + item.mastery, 0) / progressItems.length)
        : 0;
      return {
        id: subject.id,
        name: subject.name,
        shortName: subject.shortName,
        mastery,
        attempts,
        correct,
        mastered,
        totalSkills: subjectSkills.length
      };
    });
  }

  static getMissionStatus(state, mission) {
    const profile = this.getProfile(state);
    if (!mission) return 'locked';
    if (profile.missionHistory[mission.key]) return 'completed';
    if (mission.week < profile.currentWeek) return 'missed';
    if (mission.week === profile.currentWeek && mission.day < profile.currentDay) return 'missed';
    if (mission.week === profile.currentWeek && mission.day === profile.currentDay) return 'today';
    if (mission.week === profile.currentWeek) return 'upcoming';
    return 'locked';
  }

  static getWeekPlan(state, week = null) {
    const profile = this.getProfile(state);
    const targetWeek = Math.min(CurriculumData.summerWeeks.length, Math.max(1, parseInt(week || profile.currentWeek, 10) || 1));
    const weekData = CurriculumData.summerWeeks.find(item => item.week === targetWeek);
    if (!weekData) return null;

    const days = [1, 2, 3, 4, 5].map(day => {
      const mission = this.getMissionByPosition(targetWeek, day);
      const history = mission ? profile.missionHistory[mission.key] : null;
      return {
        day,
        mission,
        status: this.getMissionStatus(state, mission),
        completed: !!history,
        history
      };
    });

    return {
      week: targetWeek,
      title: weekData.title,
      focus: weekData.focus,
      boss: weekData.boss,
      subjects: weekData.subjects.map(subjectId => CurriculumData.subjects[subjectId]).filter(Boolean),
      days,
      completedCount: days.filter(day => day.completed).length,
      currentDay: profile.currentWeek === targetWeek ? profile.currentDay : null
    };
  }

  static getWeakSkillRecommendations(state, limit = 4) {
    const profile = this.getProfile(state);
    const dueReviewSkillIds = new Set(this.getDueReviewItems(state).map(item => item.skillId));
    return CurriculumData.getAllSkills()
      .map(skill => {
        const progress = profile.skills[skill.id] || this.createSkillProgress(skill);
        const subject = Object.values(CurriculumData.subjects).find(item => (CurriculumData.skills[item.id] || []).some(subjectSkill => subjectSkill.id === skill.id));
        let priority = 0;
        if (dueReviewSkillIds.has(skill.id)) priority += 60;
        if (profile.diagnostics.recommendedSkillIds.includes(skill.id)) priority += 55;
        if (progress.status === 'needs_review') priority += 50;
        if (progress.attempts > 0 && progress.mastery < skill.masteryTarget) priority += skill.masteryTarget - progress.mastery;
        if (progress.incorrect > 0) priority += Math.min(20, progress.incorrect * 4);
        if (progress.attempts === 0 && skill.gradeBand === '2-refuerzo') priority += 8;
        return {
          skill,
          subject,
          progress,
          priority,
          reason: dueReviewSkillIds.has(skill.id)
            ? 'Repaso espaciado pendiente'
            : profile.diagnostics.recommendedSkillIds.includes(skill.id)
              ? 'Detectado en el diagnostico'
            : progress.attempts === 0
              ? 'Aun sin practicar'
              : `Dominio ${progress.mastery}%`
        };
      })
      .filter(item => item.priority > 0)
      .sort((a, b) => b.priority - a.priority || a.progress.mastery - b.progress.mastery)
      .slice(0, limit);
  }

  static getDailyRecommendations(state) {
    const currentMission = this.getCurrentMission(state);
    const dueReviews = this.getDueReviewItems(state);
    const weakSkills = this.getWeakSkillRecommendations(state, 3);
    const actions = [];

    if (!this.isDiagnosticComplete(state)) {
      return {
        currentMission,
        dueReviewCount: dueReviews.length,
        weakSkills,
        actions: [{
          type: 'diagnostic',
          label: 'Primero: prueba de nivel',
          detail: '10 preguntas cortas para ajustar la ruta',
          subjectId: null,
          priority: 120
        }]
      };
    }

    if (dueReviews.length > 0) {
      const firstReview = dueReviews[0];
      const reviewSkill = CurriculumData.getSkill(firstReview.skillId);
      actions.push({
        type: 'review',
        label: 'Repasar antes de avanzar',
        detail: reviewSkill ? reviewSkill.name : firstReview.skillId,
        subjectId: reviewSkill ? this.getSubjectIdForSkill(reviewSkill.id) : null,
        priority: 100
      });
    }

    const postBossReview = this.getPostBossReviewPlan(state);
    if (postBossReview && !postBossReview.completed) {
      actions.push({
        type: 'post_boss_review',
        label: 'Repaso del jefe semanal',
        detail: postBossReview.focus,
        subjectId: postBossReview.skills[0]?.subjectId || null,
        week: postBossReview.week,
        priority: 115
      });
    }

    if (currentMission) {
      actions.push({
        type: 'mission',
        label: `Mision de hoy: ${currentMission.subject.shortName}`,
        detail: currentMission.skill.name,
        subjectId: currentMission.subject.id,
        week: currentMission.week,
        day: currentMission.day,
        priority: 90
      });
    }

    weakSkills.forEach(item => {
      actions.push({
        type: 'reinforcement',
        label: 'Refuerzo recomendado',
        detail: item.skill.name,
        subjectId: item.subject ? item.subject.id : null,
        priority: item.priority
      });
    });

    return {
      currentMission,
      dueReviewCount: dueReviews.length,
      weakSkills,
      actions: actions
        .filter((action, index, list) => list.findIndex(other => other.type === action.type && other.detail === action.detail) === index)
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 4)
    };
  }

  static getSubjectIdForSkill(skillId) {
    const entry = Object.entries(CurriculumData.skills).find(([, skills]) => skills.some(skill => skill.id === skillId));
    return entry ? entry[0] : null;
  }

  static getWeeklyEvidence(state, week = null) {
    const profile = this.getProfile(state);
    const plan = this.getWeekPlan(state, week);
    if (!plan) return null;
    const completed = Object.values(profile.missionHistory)
      .filter(item => item && item.week === plan.week && !item.practiceOnly)
      .sort((a, b) => a.day - b.day);
    const accuracyItems = completed.filter(item => typeof item.accuracy === 'number');
    const averageAccuracy = accuracyItems.length
      ? Math.round(accuracyItems.reduce((sum, item) => sum + item.accuracy, 0) / accuracyItems.length)
      : 0;
    const subjectCounts = completed.reduce((acc, item) => {
      acc[item.subject] = (acc[item.subject] || 0) + 1;
      return acc;
    }, {});
    const weakSkills = this.getWeakSkillRecommendations(state, 3).map(item => ({
      id: item.skill.id,
      name: item.skill.name,
      subject: item.subject ? item.subject.shortName : '',
      reason: item.reason,
      mastery: item.progress.mastery
    }));

    return {
      week: plan.week,
      title: plan.title,
      focus: plan.focus,
      bossSummary: this.getWeeklyBossSummary(state, plan.week),
      completedCount: completed.length,
      totalCount: plan.days.length,
      averageAccuracy,
      subjectCounts,
      evidence: completed
        .filter(item => item.evidence)
        .map(item => ({
          day: item.day,
          subject: CurriculumData.subjects[item.subject]?.shortName || item.subject,
          skill: CurriculumData.getSkill(item.skill)?.name || item.skill,
          text: item.evidence
        }))
        .slice(-5),
      weakSkills,
      nextMission: plan.days.find(day => !day.completed && (day.status === 'today' || day.status === 'upcoming'))?.mission || this.getCurrentMission(state)
    };
  }

  static getSummerTimeline(state) {
    const profile = this.getProfile(state);
    const pendingOffline = Object.values(profile.offlineEvidence || {}).filter(item => item.status === 'pending');
    return CurriculumData.summerWeeks.map(weekData => {
      const report = this.getWeeklyEvidence(state, weekData.week);
      const history = Object.values(profile.missionHistory)
        .filter(item => item && item.week === weekData.week && !item.practiceOnly);
      const subjectCounts = history.reduce((acc, item) => {
        const subject = CurriculumData.subjects[item.subject];
        const label = subject ? subject.shortName : item.subject;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});
      const pendingCount = pendingOffline.filter(item => item.week === weekData.week).length;
      let status = 'locked';
      if (weekData.week < profile.currentWeek || (report && report.completedCount === report.totalCount)) status = 'completed';
      else if (weekData.week === profile.currentWeek) status = report && report.completedCount > 0 ? 'in_progress' : 'current';
      else if (weekData.week === profile.currentWeek + 1) status = 'next';

      return {
        week: weekData.week,
        title: weekData.title,
        focus: weekData.focus,
        status,
        completedCount: report ? report.completedCount : 0,
        totalCount: report ? report.totalCount : 5,
        averageAccuracy: report ? report.averageAccuracy : 0,
        evidenceCount: report ? report.evidence.length : 0,
        pendingOfflineCount: pendingCount,
        subjectCounts,
        nextMission: report ? report.nextMission : null
      };
    });
  }
}

window.LearningEngine = LearningEngine;
