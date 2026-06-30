// 4. MAIN APP CONTROLLER
class App {
  constructor() {
    this.state = null;
    this.currentScreen = 'start';
    this.combatSession = null;
    this.sessionTimer = null;
    this.sessionStart = null;
    this.secondsSinceLastSave = 0;
    this.languageMission = null;
    this.languageReading = null;
    this.languageAnswers = {};
    this.subjectMissionType = 'english';
    this.subjectMission = null;
    this.subjectQuestions = [];
    this.subjectAnswers = {};
    this.plannerActions = [];
    this.diagnosticQuestions = [];
    this.diagnosticAnswers = {};
    this.diagnosticCompletedInView = false;
    this.offlineMission = null;
    this.postBossReviewPlan = null;
    this.albumTab = 'team';
    this.albumCompareIds = [];
    this.workshopPreviewCombo = null;
    this.workshopPreviewPart = null;
  }

  init() {
    this.loadState();
    this.bindEvents();
    this.renderHeader();
    this.showScreen('start');
    this.startSessionTimer();
    this.restorePendingReward();
  }

  // Load from localStorage or use default state
  loadState() {
    this.state = StorageService.load();
    this.saveState();
  }

  saveState() {
    this.state = StorageService.save(this.state);
  }

  resetData() {
    ParentalSecurityService.audit(this.state, 'Progreso restaurado a estado inicial');
    this.state = StorageService.reset();
    ParentalSecurityService.audit(this.state, 'Progreso restaurado a estado inicial');
    this.saveState();
    this.renderHeader();
    this.showScreen('start');
    this.showNotice("Datos del alumno restaurados con exito. Se ha conservado una copia de seguridad local previa.", "Datos restaurados");
  }

  getTodayStats() {
    const today = StorageService.todayKey();
    const math = this.state.pedagogy.math;
    if (!math.dailyStats) math.dailyStats = {};
    if (!math.dailyStats[today]) {
      math.dailyStats[today] = { seconds: 0, answers: 0, correct: 0, incorrect: 0 };
    }
    math.lastPlayedDate = today;
    return math.dailyStats[today];
  }

  getTrainingDaysCount() {
    const dailyStats = this.state.pedagogy.math.dailyStats || {};
    return Object.values(dailyStats).filter(day => day.seconds > 0 || day.answers > 0).length;
  }

  exportProgress() {
    this.saveState();
    const payload = JSON.stringify(this.state, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spin-academy-progreso-${StorageService.todayKey()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  escapeReportText(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  escapeHtml(value) {
    return this.escapeReportText(value);
  }

  buildWeeklyFamilyReportHtml() {
    const report = LearningEngine.getWeeklyEvidence(this.state);
    const diagnostic = LearningEngine.getDiagnosticSummary(this.state);
    const subjects = LearningEngine.getSubjectSummary(this.state);
    const timeline = LearningEngine.getSummerTimeline(this.state);
    const pending = LearningEngine.getPendingOfflineEvidence(this.state);
    const spacedReviews = LearningEngine.getUpcomingSpacedReviews(this.state).slice(0, 12);
    const spacedStreak = LearningEngine.getSpacedReviewStreak(this.state);
    const spacedAlert = LearningEngine.getSpacedReviewAlertSummary(this.state);
    const recoveryNote = LearningEngine.getLatestSpacedRecoveryNote(this.state);
    const today = StorageService.todayKey();
    const childName = this.escapeReportText(this.state.player.name);
    const e = value => this.escapeReportText(value);
    const bossSummary = report.bossSummary;

    const subjectRows = subjects.map(subject => `
      <tr>
        <td>${e(subject.name)}</td>
        <td>${subject.mastery}%</td>
        <td>${subject.mastered}/${subject.totalSkills}</td>
        <td>${subject.attempts}</td>
      </tr>
    `).join('');

    const evidenceRows = report.evidence.length > 0
      ? report.evidence.map(item => `
          <li><strong>Dia ${item.day} · ${e(item.subject)} · ${e(item.skill)}:</strong> ${e(item.text)}</li>
        `).join('')
      : '<li>Sin evidencias escritas registradas esta semana.</li>';

    const weakRows = report.weakSkills.length > 0
      ? report.weakSkills.map(item => `<li>${e(item.subject)}: ${e(item.name)} (${item.mastery}% dominio) - ${e(item.reason)}</li>`).join('')
      : '<li>Sin refuerzos urgentes. Mantener rutina diaria.</li>';

    const bossSubjectRows = bossSummary && bossSummary.subjects.length > 0
      ? bossSummary.subjects.map(subject => `<li>${e(subject.name)}: ${subject.proven ? 'probado' : 'a reforzar'} - ${subject.accuracy}% en el jefe - ${subject.mastery}% dominio</li>`).join('')
      : '<li>Jefe semanal aun no completado.</li>';

    const bossReviewRows = bossSummary && bossSummary.reviewSkills.length > 0
      ? bossSummary.reviewSkills.map(item => `<li>${e(item.subject)}: ${e(item.name)} (${item.mastery}%/${item.target}%) - ${e(item.reason)}</li>`).join('')
      : '<li>Sin habilidades criticas tras el jefe semanal.</li>';

    const spacedRows = spacedReviews.length > 0
      ? spacedReviews.map(item => `<li>${e(item.dueAt)} - ${e(item.subject)}: ${e(item.skillName)}</li>`).join('')
      : '<li>No hay repasos espaciados pendientes.</li>';

    const spacedAlertRows = spacedAlert.hasAlert
      ? spacedAlert.skills.map(item => `<li>${e(item.subject)}: ${e(item.skillName)} - ${item.count} fecha(s) atrasada(s), hasta ${item.maxDaysLate} dia(s).</li>`).join('')
      : '<li>No hay repasos espaciados atrasados.</li>';

    const recoveryRows = recoveryNote
      ? recoveryNote.clearedSkills.map(item => `<li>${e(item.subject)}: ${e(item.skillName)} - ${item.count} fecha(s) recuperada(s).</li>`).join('')
      : '<li>Aun no hay recuperaciones registradas.</li>';

    const remainingRecoveryRows = recoveryNote && recoveryNote.remainingDates.length > 0
      ? recoveryNote.remainingDates.map(item => `<li>${e(item.dueAt)} - ${e(item.subject)}: ${e(item.skillName)}</li>`).join('')
      : '<li>No quedan fechas pendientes para esa recuperacion.</li>';

    const pendingRows = pending.length > 0
      ? pending.map(item => `<li>Semana ${item.week}, dia ${item.day}: ${e(item.title)} - pendiente de validar.</li>`).join('')
      : '<li>No hay validaciones familiares pendientes.</li>';

    const timelineRows = timeline.map(item => `
      <tr>
        <td>Semana ${item.week}</td>
        <td>${e(item.title)}</td>
        <td>${item.completedCount}/${item.totalCount}</td>
        <td>${item.averageAccuracy}%</td>
        <td>${item.evidenceCount}</td>
        <td>${item.pendingOfflineCount}</td>
      </tr>
    `).join('');

    const nextStep = report.nextMission
      ? `${report.nextMission.subject.shortName}: ${report.nextMission.skill.name}`
      : 'Mantener lectura, calculo y repaso mixto.';

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Informe semanal - ${childName}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #172033; margin: 32px; line-height: 1.45; }
    header { border-bottom: 3px solid #00a6c8; padding-bottom: 16px; margin-bottom: 22px; }
    h1 { margin: 0 0 6px; font-size: 30px; }
    h2 { margin: 24px 0 10px; color: #0b6f88; font-size: 20px; }
    .meta { color: #59657a; font-size: 14px; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 16px 0; }
    .card { border: 1px solid #d9e1ec; border-radius: 8px; padding: 12px; background: #f8fbff; }
    .card strong { display: block; font-size: 13px; color: #59657a; margin-bottom: 4px; }
    .card span { font-size: 20px; font-weight: 800; color: #172033; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th, td { border: 1px solid #d9e1ec; padding: 8px; text-align: left; font-size: 14px; }
    th { background: #eef6f9; }
    li { margin-bottom: 7px; }
    .note { border-left: 4px solid #00a6c8; padding: 10px 12px; background: #f3fbfd; }
    @media print { body { margin: 18mm; } button { display: none; } }
  </style>
</head>
<body>
  <header>
    <h1>Informe semanal de Spin Academy</h1>
    <div class="meta">Alumno: ${childName} · Fecha: ${today} · Semana ${report.week}: ${e(report.title)}</div>
  </header>

  <section class="grid">
    <div class="card"><strong>Diagnostico inicial</strong><span>${diagnostic.completedAt ? `${diagnostic.baselineScore}%` : 'Pendiente'}</span></div>
    <div class="card"><strong>Inicio sugerido</strong><span>Semana ${diagnostic.suggestedStartWeek}</span></div>
    <div class="card"><strong>Misiones semana</strong><span>${report.completedCount}/${report.totalCount}</span></div>
    <div class="card"><strong>Acierto medio</strong><span>${report.averageAccuracy}%</span></div>
  </section>

  <section>
    <h2>Foco de la semana</h2>
    <p class="note">${e(report.focus)}</p>
  </section>

  <section>
    <h2>Progreso por materia</h2>
    <table>
      <thead><tr><th>Materia</th><th>Dominio</th><th>Habilidades dominadas</th><th>Intentos</th></tr></thead>
      <tbody>${subjectRows}</tbody>
    </table>
  </section>

  <section>
    <h2>Evidencias registradas</h2>
    <ul>${evidenceRows}</ul>
  </section>

  <section>
    <h2>Linea temporal del verano</h2>
    <table>
      <thead><tr><th>Semana</th><th>Foco</th><th>Misiones</th><th>Acierto</th><th>Evidencias</th><th>Pendientes</th></tr></thead>
      <tbody>${timelineRows}</tbody>
    </table>
  </section>

  <section>
    <h2>Resumen del jefe semanal</h2>
    <p class="note">${bossSummary ? `Jefe: ${e(bossSummary.bossName)} - Resultado: ${bossSummary.accuracy}% - Siguiente repaso: ${e(bossSummary.nextReviewAction)}` : 'Jefe semanal aun no completado.'}</p>
    <h3>Materias probadas</h3>
    <ul>${bossSubjectRows}</ul>
    <h3>Habilidades que vuelven al ciclo de repaso</h3>
    <ul>${bossReviewRows}</ul>
    <h3>Calendario de repeticion espaciada</h3>
    <p class="note">Racha actual: ${spacedStreak.current} · Mejor racha: ${spacedStreak.best} · Repasos en fecha: ${spacedStreak.completedOnTime}</p>
    <ul>${spacedRows}</ul>
    <h3>Alertas parentales</h3>
    <p class="note">${spacedAlert.hasAlert ? `${spacedAlert.count} repaso(s) atrasado(s). Recuperar con una sesion corta, sin borrar el contexto de racha.` : 'Sin alertas de atraso.'}</p>
    <ul>${spacedAlertRows}</ul>
    <h3>Ultima recuperacion</h3>
    <p class="note">${recoveryNote ? `Recuperacion completada el ${e(recoveryNote.completedAt)}. Racha: ${recoveryNote.streak.current}.` : 'Sin recuperaciones todavia.'}</p>
    <ul>${recoveryRows}</ul>
    <h3>Fechas que siguen programadas</h3>
    <ul>${remainingRecoveryRows}</ul>
  </section>

  <section>
    <h2>Refuerzos recomendados</h2>
    <ul>${weakRows}</ul>
  </section>

  <section>
    <h2>Retos familiares pendientes</h2>
    <ul>${pendingRows}</ul>
  </section>

  <section>
    <h2>Siguiente paso</h2>
    <p class="note">${e(nextStep)}</p>
  </section>
</body>
</html>`;
  }

  exportWeeklyFamilyReport() {
    if (!this.requireParentSession()) return;
    const html = this.buildWeeklyFamilyReportHtml();
    this.lastWeeklyReportHtml = html;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spin-academy-informe-semanal-${StorageService.todayKey()}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  importProgress(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        this.state = StorageService.importState(reader.result);
        ParentalSecurityService.audit(this.state, 'Progreso importado');
        this.saveState();
        this.renderHeader();
        if (this.currentScreen === 'parents') this.renderParentsPanel();
        this.showNotice("Progreso importado correctamente.", "Importacion completada");
      } catch (e) {
        console.error("No se pudo importar el progreso.", e);
        this.showNotice("No se pudo importar el archivo. Revisa que sea un JSON valido de Spin Academy.", "Importacion fallida");
      }
    };
    reader.readAsText(file);
  }

  restorePendingReward() {
    const pending = this.state.progress.pendingReward;
    if (!pending || !pending.key) return;

    setTimeout(() => {
      this.showRewardModal(pending.week, pending.isBoss, {
        sessionKey: pending.key,
        rewardAlreadyClaimed: false,
        towerFloor: pending.towerFloor
      });
    }, 300);
  }

  showNotice(message, title = "Aviso") {
    return this.showDialog({ title, message, mode: 'alert' });
  }

  showConfirm(message, title = "Confirmar") {
    return this.showDialog({ title, message, mode: 'confirm' });
  }

  showDialog({ title, message, mode }) {
    const overlay = document.getElementById('app-dialog');
    const titleEl = document.getElementById('app-dialog-title');
    const messageEl = document.getElementById('app-dialog-message');
    const confirmBtn = document.getElementById('app-dialog-confirm');
    const cancelBtn = document.getElementById('app-dialog-cancel');
    const previousFocus = document.activeElement;

    titleEl.innerText = title;
    messageEl.innerText = message;
    cancelBtn.style.display = mode === 'confirm' ? 'inline-flex' : 'none';
    confirmBtn.innerText = mode === 'confirm' ? 'Aceptar' : 'Entendido';
    overlay.style.display = 'flex';
    confirmBtn.focus();

    return new Promise(resolve => {
      const finish = (value) => {
        overlay.style.display = 'none';
        confirmBtn.onclick = null;
        cancelBtn.onclick = null;
        document.removeEventListener('keydown', onKeydown);
        if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
        resolve(value);
      };

      const onKeydown = (e) => {
        if (e.key === 'Escape') finish(false);
        if (e.key === 'Tab') {
          const first = mode === 'confirm' ? cancelBtn : confirmBtn;
          const last = confirmBtn;
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      confirmBtn.onclick = () => finish(true);
      cancelBtn.onclick = () => finish(false);
      document.addEventListener('keydown', onKeydown);
    });
  }

  // Manage daily study time
  startSessionTimer() {
    this.sessionStart = Date.now();
    this.secondsSinceLastSave = 0;
    this.getTodayStats();
    if (this.sessionTimer) clearInterval(this.sessionTimer);
    
    this.sessionTimer = setInterval(() => {
      const elapsedSeconds = Math.max(1, Math.floor((Date.now() - this.sessionStart) / 1000));
      const todayStats = this.getTodayStats();
      todayStats.seconds += elapsedSeconds;
      this.state.pedagogy.math.timeSpentSeconds += elapsedSeconds;
      this.sessionStart = Date.now();
      this.secondsSinceLastSave += elapsedSeconds;
      
      // Save progress regularly
      if (this.secondsSinceLastSave >= 10) {
        this.saveState();
        this.secondsSinceLastSave = 0;
      }

      // Check daily limit (Parents setting)
      const minutesSpentToday = Math.floor(todayStats.seconds / 60);
      if (minutesSpentToday >= this.state.config.dailyTimeLimitMinutes && this.state.config.dailyTimeLimitMinutes < 900) {
        clearInterval(this.sessionTimer);
        this.saveState();
        this.showNotice("Has alcanzado tu limite de juego diario para hoy. Es hora de descansar y jugar fuera.", "Limite diario alcanzado");
        this.showScreen('start');
      }
    }, 1000);
  }

  getSelectedCharacterAvatar() {
    const selectedId = this.state?.player?.characterAvatarId || 'jaxonCross';
    return BEYBLADE_X_CHARACTERS.find(character => character.id === selectedId) || BEYBLADE_X_CHARACTERS[0];
  }

  getSelectedCompanionCharacter() {
    const selectedId = this.state?.player?.companionCharacterId || this.state?.player?.characterAvatarId || 'jaxonCross';
    return BEYBLADE_X_CHARACTERS.find(character => character.id === selectedId) || this.getSelectedCharacterAvatar();
  }

  renderCharacterAvatar(character, className = 'asset-image header-character-avatar') {
    const selected = character || this.getSelectedCharacterAvatar();
    return renderAssetImage(selected.image, selected.nombre, className);
  }

  // Render player info in Header
  renderHeader() {
    const selectedCharacter = this.getSelectedCharacterAvatar();
    
    // Replace element HTML dynamically to embed the selected character avatar.
    const avatarHolder = document.getElementById('header-avatar-btn');
    if (avatarHolder) {
      avatarHolder.innerHTML = this.renderCharacterAvatar(selectedCharacter);
      avatarHolder.title = `Cambiar avatar: ${selectedCharacter.nombre}`;
    } else {
      // Re-create parent structure if replaced
      const headerLeft = document.querySelector('.header-left');
      if (headerLeft) {
        headerLeft.innerHTML = `
          <button class="avatar-mini" id="header-avatar-btn" type="button" aria-label="Editar mi avatar">
            ${this.renderCharacterAvatar(selectedCharacter)}
          </button>
          <div class="profile-info">
            <span class="player-name" id="header-player-name">${this.escapeHtml(this.state.player.name)}</span>
            <span class="player-level" id="header-player-level">Rango Blader 1</span>
          </div>
        `;
      }
    }
    // Bind click trigger to edit avatar
    const btn = document.getElementById('header-avatar-btn');
    if (btn) btn.onclick = () => this.showScreen('avatar');

    document.getElementById('header-player-name').innerText = this.state.player.name;
    
    // XP to Level mapping: 1 level per 200 XP
    const lvl = Math.floor(this.state.player.xp / 200) + 1;
    const equippedBey = typeof getEquippedBey === 'function' ? getEquippedBey(this.state) : null;
    document.getElementById('header-player-level').innerText = `Rango Blader ${lvl}${equippedBey ? ` - ${equippedBey.nombre}` : ''}`;
    document.getElementById('header-coins').innerText = this.state.player.coins;
    document.getElementById('header-xp').innerText = this.state.player.xp;
  }

  // Navigate between screens
  showScreen(screenId) {
    sounds.playClick();
    
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
      s.style.opacity = '0';
    });

    const target = document.getElementById(`screen-${screenId}`);
    if (target) {
      target.style.display = '';
      // Delay opacity to allow browser layout calculation for smooth transition
      setTimeout(() => {
        target.classList.add('active');
        target.style.opacity = '1';
      }, 50);
      this.currentScreen = screenId;
    }

    // Header visibility rules
    const header = document.getElementById('app-header');
    if (screenId === 'start' || screenId === 'avatar') {
      header.style.display = 'none';
    } else {
      header.style.display = '';
    }

    const navigationTargets = {
      map: 'btn-goto-map',
      language: 'btn-goto-language',
      workshop: 'btn-goto-workshop',
      cards: 'btn-goto-cards',
      parents: 'btn-goto-parents',
      modules: 'btn-goto-modules'
    };
    document.querySelectorAll('.btn-header').forEach(button => button.removeAttribute('aria-current'));
    const activeNavigationId = navigationTargets[screenId];
    const activeNavigation = activeNavigationId ? document.getElementById(activeNavigationId) : null;
    if (activeNavigation) activeNavigation.setAttribute('aria-current', 'page');

    // Refresh screens data when showing them
    if (screenId === 'avatar') this.renderAvatarCustomizer();
    if (screenId === 'diagnostic') this.renderDiagnosticPlacement();
    if (screenId === 'map') {
      this.renderMap();
      this.renderSummerPlanner();
    }
    if (screenId === 'language') this.renderLanguageMission();
    if (screenId === 'subject') this.renderSubjectMission();
    if (screenId === 'offline') this.renderOfflineMission();
    if (screenId === 'workshop') this.renderWorkshop();
    if (screenId === 'cards') this.renderCards();
    if (screenId === 'parents') this.renderParentsPanel();
  }

  // Event handlers
  bindEvents() {
    // Navigation buttons
    document.getElementById('btn-start-game').onclick = () => {
      // If first launch, go to avatar selection, otherwise go to map
      if (this.state.player.xp === 0 && this.state.player.name === 'Carlitos') {
        this.showScreen('avatar');
      } else {
        this.showScreen('map');
      }
    };

    document.getElementById('btn-parents-gate-trigger').onclick = () => this.showParentGate();
    document.getElementById('btn-goto-parents').onclick = () => this.showParentGate();

    document.getElementById('btn-parent-gate-cancel').onclick = () => {
      sounds.playClick();
      document.getElementById('parent-gate-modal').style.display = 'none';
    };

    document.getElementById('btn-parent-gate-submit').onclick = () => this.verifyParentGate();
    document.getElementById('parent-gate-input').onkeydown = (e) => {
      if (e.key === 'Enter') this.verifyParentGate();
    };

    document.getElementById('btn-confirm-avatar').onclick = () => this.confirmAvatarSelection();

    document.getElementById('btn-goto-map').onclick = () => this.showScreen('map');
    document.getElementById('btn-goto-language').onclick = () => this.showScreen('language');
    document.getElementById('btn-goto-english').onclick = () => this.openSubjectMission('english');
    document.getElementById('btn-goto-science').onclick = () => this.openSubjectMission('science');
    document.getElementById('btn-goto-workshop').onclick = () => this.showScreen('workshop');
    document.getElementById('btn-goto-cards').onclick = () => this.showScreen('cards');
    document.getElementById('btn-goto-modules').onclick = () => this.showScreen('modules');

    document.getElementById('btn-close-missions').onclick = () => {
      sounds.playClick();
      document.getElementById('daily-mission-modal').style.display = 'none';
    };

    document.getElementById('btn-start-training').onclick = () => this.startCombat(false);
    document.getElementById('btn-start-boss').onclick = () => this.startCombat(true);
    document.getElementById('btn-planner-primary').onclick = () => this.openPlannerAction(0);
    document.getElementById('btn-diagnostic-complete').onclick = () => this.completeDiagnosticPlacement();

    document.getElementById('btn-combat-pause').onclick = () => {
      this.showConfirm("Seguro que quieres salir de la batalla? Se perdera el progreso de esta arena.", "Salir de la batalla")
        .then(confirmed => {
          if (confirmed) this.exitCombatToMap();
        });
    };

    document.getElementById('btn-combat-hint').onclick = () => this.triggerCombatHint();

    document.getElementById('btn-feedback-close').onclick = () => {
      sounds.playClick();
      document.getElementById('combat-feedback').style.display = 'none';
      if (this.combatSession) {
        this.combatSession.resumeCombatAfterError();
      }
    };

    document.getElementById('reward-chest-btn').onclick = () => this.openRewardChest();
    document.getElementById('btn-reward-collect').onclick = () => {
      sounds.playClick();
      document.getElementById('reward-modal').style.display = 'none';
      this.showScreen('map');
    };

    document.getElementById('btn-language-complete').onclick = () => this.completeLanguageMission();
    document.getElementById('btn-subject-complete').onclick = () => this.completeSubjectMission();
    document.getElementById('btn-offline-submit').onclick = () => this.submitOfflineEvidence();

    // Parents Panel events
    document.getElementById('btn-parent-generate-reinforcement').onclick = () => {
      sounds.playClick();
      if (!this.requireParentSession()) return;
      this.generateReinforcementSession();
    };

    document.getElementById('btn-parent-save-pin').onclick = () => {
      sounds.playClick();
      if (!this.requireParentSession()) return;
      const input = document.getElementById('input-parent-pin');
      const result = ParentalSecurityService.updatePin(this.state, input.value);
      if (result.ok) {
        input.value = '';
        this.saveState();
        this.renderParentsPanel();
        this.showNotice('PIN parental actualizado correctamente.', 'Seguridad parental');
      } else {
        this.showNotice(result.message, 'PIN no valido');
      }
    };

    document.getElementById('btn-parent-reset-data').onclick = () => {
      sounds.playClick();
      if (!this.requireParentSession()) return;
      this.showConfirm("Estas seguro de que quieres restablecer todo el progreso escolar? Esta accion es irreversible.", "Restaurar datos")
        .then(confirmed => {
          if (confirmed) this.resetData();
        });
    };

    document.getElementById('btn-parent-export-data').onclick = () => {
      sounds.playClick();
      if (!this.requireParentSession()) return;
      ParentalSecurityService.audit(this.state, 'Progreso exportado');
      this.saveState();
      this.exportProgress();
    };

    document.getElementById('btn-parent-export-weekly-report').onclick = () => {
      sounds.playClick();
      this.exportWeeklyFamilyReport();
    };

    document.getElementById('btn-parent-import-data').onclick = () => {
      sounds.playClick();
      if (!this.requireParentSession()) return;
      document.getElementById('input-parent-import-data').click();
    };

    document.getElementById('input-parent-import-data').onchange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) {
        e.target.value = "";
        return;
      }
      if (!this.requireParentSession()) {
        e.target.value = "";
        return;
      }
      this.showConfirm("Importar este progreso reemplazara el progreso actual. Se guardara una copia local previa.", "Importar progreso")
        .then(confirmed => {
          if (confirmed) this.importProgress(file);
          e.target.value = "";
        });
    };
    document.getElementById('toggle-parent-sounds').onchange = (e) => {
      if (!this.requireParentSession()) return;
      this.state.config.soundEnabled = e.target.checked;
      ParentalSecurityService.audit(this.state, `Sonido ${e.target.checked ? 'activado' : 'desactivado'}`);
      this.saveState();
      this.renderParentsPanel();
    };

    document.getElementById('select-parent-difficulty').onchange = (e) => {
      if (!this.requireParentSession()) return;
      this.state.config.difficulty = e.target.value;
      ParentalSecurityService.audit(this.state, `Dificultad cambiada a ${e.target.value}`);
      this.saveState();
      this.renderParentsPanel();
    };

    document.getElementById('select-parent-timelimit').onchange = (e) => {
      if (!this.requireParentSession()) return;
      this.state.config.dailyTimeLimitMinutes = parseInt(e.target.value);
      ParentalSecurityService.audit(this.state, `Limite diario cambiado a ${e.target.value} minutos`);
      this.saveState();
      this.renderParentsPanel();
    };

    // Avatar customizer tabs
    const avatarTabs = document.getElementById('avatar-customizer-tabs');
    if (avatarTabs) {
      avatarTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.workshop-tab');
        if (tab) {
          sounds.playClick();
          document.querySelectorAll('#avatar-customizer-tabs .workshop-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.renderAvatarCustomizer();
        }
      });
    }

    // Avatar name text input live binding
    const nameInput = document.getElementById('avatar-name-input');
    if (nameInput) {
      nameInput.oninput = (e) => {
        this.state.player.name = e.target.value.trim() || 'Carlitos';
        this.saveState();
      };
    }

    // Parts workshop clicking tabs
    document.querySelectorAll('.workshop-tab').forEach(tab => {
      // Avoid binding if it's the avatar customizer tabs
      if (tab.parentElement.id === 'avatar-customizer-tabs') return;
      
      tab.onclick = (e) => {
        sounds.playClick();
        const clicked = e.target.closest('.workshop-tab');
        if (!clicked) return;
        document.querySelectorAll('.workshop-tab').forEach(t => {
          if (t.parentElement.id === 'avatar-customizer-tabs') return;
          t.classList.remove('active');
        });
        clicked.classList.add('active');
        this.workshopPreviewCombo = null;
        this.workshopPreviewPart = null;
        this.renderWorkshop();
      };
    });
  }

  // -------------------- PARENT GATE LOCK --------------------
  showParentGate() {
    sounds.playClick();
    if (ParentalSecurityService.isSessionActive(this.state)) {
      this.showScreen('parents');
      return;
    }

    const remaining = ParentalSecurityService.lockRemainingMs(this.state);
    document.getElementById('parent-gate-question').innerText = remaining > 0
      ? `Bloqueado ${Math.ceil(remaining / 60000)} minuto(s)`
      : 'PIN parental';
    document.getElementById('parent-gate-input').value = '';
    document.getElementById('parent-gate-modal').style.display = 'flex';
    document.getElementById('parent-gate-input').focus();
  }

  requireParentSession() {
    if (ParentalSecurityService.isSessionActive(this.state)) return true;
    this.showNotice('La sesion parental ha caducado. Vuelve a introducir el PIN.', 'Sesion caducada');
    this.showScreen('map');
    this.showParentGate();
    return false;
  }

  verifyParentGate() {
    const inputVal = document.getElementById('parent-gate-input').value;
    const result = ParentalSecurityService.verifyPin(this.state, inputVal);
    this.saveState();
    if (result.ok) {
      sounds.playCorrect();
      document.getElementById('parent-gate-modal').style.display = 'none';
      this.showScreen('parents');
    } else {
      sounds.playIncorrect();
      document.getElementById('parent-gate-question').innerText = result.locked
        ? `Bloqueado ${Math.ceil(ParentalSecurityService.lockRemainingMs(this.state) / 60000)} minuto(s)`
        : 'PIN parental';
      this.showNotice(result.message, "Acceso denegado");
      document.getElementById('parent-gate-modal').style.display = 'none';
    }
  }

  // -------------------- AVATAR SCREEN --------------------
  confirmAvatarSelection() {
    sounds.playClick();
    const nameInput = document.getElementById('avatar-name-input');
    if (nameInput) {
      const nameVal = nameInput.value.trim();
      if (nameVal) {
        this.state.player.name = nameVal;
      }
    }
    if (!this.state.player.characterAvatarId) {
      this.state.player.characterAvatarId = this.getSelectedCharacterAvatar().id;
    }
    // Grant initial XP to trigger map next time
    this.state.player.xp = Math.max(this.state.player.xp, 10);
    this.saveState();
    this.renderHeader();
    this.showScreen(LearningEngine.isDiagnosticComplete(this.state) ? 'map' : 'diagnostic');
  }

  // -------------------- DIAGNOSTIC PLACEMENT --------------------
  renderDiagnosticPlacement() {
    this.diagnosticQuestions = LearningEngine.selectDiagnosticQuestions(this.state);
    this.diagnosticAnswers = {};
    this.diagnosticCompletedInView = LearningEngine.isDiagnosticComplete(this.state);

    const summary = LearningEngine.getDiagnosticSummary(this.state);
    document.getElementById('diagnostic-step-label').innerText = this.diagnosticCompletedInView
      ? `Calibracion completada - ${summary.baselineScore}%`
      : 'Prueba de calibracion inicial';
    document.getElementById('btn-diagnostic-complete').innerText = this.diagnosticCompletedInView ? 'Entrar a la X Tower' : 'Completar calibracion';
    document.getElementById('diagnostic-result-panel').style.display = this.diagnosticCompletedInView ? 'block' : 'none';
    if (this.diagnosticCompletedInView) this.renderDiagnosticResult(summary);

    const container = document.getElementById('diagnostic-question-list');
    container.innerHTML = '';

    this.diagnosticQuestions.forEach((question, questionIndex) => {
      const card = document.createElement('div');
      card.className = 'diagnostic-question-card';
      const skill = CurriculumData.getSkill(question.skill);
      card.innerHTML = `
        <h4>${questionIndex + 1}. ${question.prompt}</h4>
        <div class="diagnostic-kicker">${skill ? skill.name : question.subject}</div>
        <div class="diagnostic-options" id="diagnostic-options-${questionIndex}"></div>
      `;
      container.appendChild(card);

      const options = card.querySelector('.diagnostic-options');
      question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'diagnostic-option';
        btn.type = 'button';
        btn.innerText = option;
        btn.onclick = () => this.handleDiagnosticAnswer(questionIndex, option);
        options.appendChild(btn);
      });
    });

    this.updateDiagnosticProgress();
  }

  handleDiagnosticAnswer(questionIndex, selectedOption) {
    const question = this.diagnosticQuestions[questionIndex];
    if (!question || this.diagnosticAnswers[questionIndex]) return;

    const isCorrect = selectedOption === question.answer;
    this.diagnosticAnswers[questionIndex] = { selectedOption, isCorrect };
    LearningEngine.recordAnswer(this.state, question, isCorrect, { diagnostic: true });

    if (isCorrect) sounds.playCorrect();
    else sounds.playIncorrect();

    const options = document.getElementById(`diagnostic-options-${questionIndex}`);
    if (options) {
      options.querySelectorAll('.diagnostic-option').forEach(btn => {
        if (btn.innerText === question.answer) btn.classList.add('correct');
        if (btn.innerText === selectedOption && !isCorrect) btn.classList.add('incorrect');
      });
    }

    this.updateDiagnosticProgress();
    this.saveState();
  }

  updateDiagnosticProgress() {
    const total = this.diagnosticQuestions.length;
    const answered = Object.keys(this.diagnosticAnswers).length;
    const percent = total > 0 ? Math.round((answered / total) * 100) : 0;
    document.getElementById('diagnostic-progress-label').innerText = `${answered}/${total} respuestas`;
    document.getElementById('diagnostic-progress-bar').style.width = `${percent}%`;
  }

  completeDiagnosticPlacement() {
    if (this.diagnosticCompletedInView || LearningEngine.isDiagnosticComplete(this.state)) {
      this.showScreen('map');
      return;
    }

    const answered = Object.keys(this.diagnosticAnswers).length;
    if (answered < this.diagnosticQuestions.length) {
      this.showNotice('Termina todas las preguntas para ajustar bien la ruta.', 'Diagnostico incompleto');
      return;
    }

    const summary = LearningEngine.completeDiagnostic(this.state);
    this.state.player.coins += 12;
    this.state.player.xp += 20;
    this.diagnosticCompletedInView = true;
    this.saveState();
    this.renderHeader();
    this.renderDiagnosticResult(LearningEngine.getDiagnosticSummary(this.state));
    document.getElementById('diagnostic-result-panel').style.display = 'block';
    document.getElementById('diagnostic-step-label').innerText = `Calibracion ajustada · ${summary.baselineScore}%`;
    document.getElementById('btn-diagnostic-complete').innerText = 'Entrar a la X Tower';
  }

  renderDiagnosticResult(summary) {
    const panel = document.getElementById('diagnostic-result-panel');
    const recommended = summary.results.filter(item => item.recommended);
    const recommendedText = recommended.length > 0
      ? recommended.slice(0, 4).map(item => `${item.subjectName}: ${item.skillName}`).join(' - ')
      : 'Sin refuerzos urgentes. Mantener practica diaria.';
    panel.innerHTML = `
      <strong>Resultado inicial: ${summary.baselineScore}%</strong><br>
      Inicio sugerido: semana ${summary.suggestedStartWeek}.<br>
      Refuerzos detectados: ${recommendedText}
    `;
  }

  renderAvatarCustomizer() {
    const selectedCharacter = this.getSelectedCharacterAvatar();
    const preview = document.getElementById('avatar-preview-container');
    if (preview) {
      const progress = typeof getCharacterProgress === 'function' ? getCharacterProgress(this.state, selectedCharacter.id) : { level: 1, wins: 0 };
      const stats = typeof getEffectiveCharacterStats === 'function' ? getEffectiveCharacterStats(selectedCharacter, this.state, true) : selectedCharacter.stats;
      const statCards = this.getAvatarStatCards(stats);
      const mainStyle = this.getAvatarBattleStyle(selectedCharacter, stats);
      const associatedBey = BEYBLADE_X_BEYS.find(bey => bey.nombre === selectedCharacter.beyAsociado) || getEquippedBey(this.state);
      preview.innerHTML = `
        <div class="blader-x-card" style="--character-color:${selectedCharacter.colorPrincipal}">
          <div class="blader-card-hero">
            <div class="x-power-ring" aria-hidden="true">
              ${statCards.map(card => `<span style="--ring-color:${card.color}; --ring-power:${Math.max(18, Math.min(100, card.value))}%"></span>`).join('')}
            </div>
            ${this.renderCharacterAvatar(selectedCharacter, 'asset-image avatar-character-image')}
            <div class="blader-level-badge">Nivel ${progress.level}</div>
          </div>
          <div class="blader-card-info">
            <div class="blader-style-chip">${mainStyle.label}</div>
            <h3 class="avatar-character-name">${selectedCharacter.nombre}</h3>
            <p class="avatar-character-role">${selectedCharacter.equipo} - ${selectedCharacter.rol}</p>
            <p class="blader-style-line">${mainStyle.description}</p>
            <div class="blader-mini-facts">
              <span>Bey: ${associatedBey ? associatedBey.nombre : selectedCharacter.beyAsociado}</span>
              <span>Entrena: ${selectedCharacter.materiaRecomendada}</span>
              <span>Victorias: ${progress.wins}</span>
            </div>
          </div>
          <div class="avatar-stat-rails">
            ${statCards.map(card => `
              <div class="avatar-stat-rail" style="--stat-color:${card.color}; --stat-value:${Math.max(8, Math.min(100, card.value))}%">
                <div class="avatar-stat-icon">${card.icon}</div>
                <div class="avatar-stat-copy">
                  <strong>${card.label}</strong>
                  <span>${card.meaning}</span>
                </div>
                <div class="avatar-stat-score">${card.value}</div>
                <div class="avatar-stat-track"><i></i></div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    const nameInput = document.getElementById('avatar-name-input');
    if (nameInput) nameInput.value = this.state.player.name;

    const tabs = document.getElementById('avatar-customizer-tabs');
    if (tabs) tabs.hidden = true;

    const container = document.getElementById('avatar-customizer-items');
    if (!container) return;
    container.innerHTML = '';
    container.classList.add('avatar-character-grid');

    BEYBLADE_X_CHARACTERS.forEach(character => {
      const isSelected = selectedCharacter.id === character.id;
      const card = document.createElement('div');
      card.className = `workshop-item-card character-select-card ${isSelected ? 'selected' : ''}`;
      card.setAttribute('style', `--character-color:${character.colorPrincipal}`);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      card.setAttribute('aria-label', `Elegir avatar ${character.nombre}`);

      card.innerHTML = `
        <div class="character-select-portrait">
          ${this.renderCharacterAvatar(character, 'asset-image character-select-image')}
        </div>
        <div class="workshop-item-name">${character.nombre}</div>
        <div class="character-select-meta">${this.getAvatarBattleStyle(character, character.stats).shortLabel}</div>
        <div class="character-select-role">${character.materiaRecomendada}</div>
        ${isSelected ? '<div class="character-selected-badge">Elegido</div>' : ''}
      `;

      const selectCharacter = () => {
        sounds.playClick();
        this.state.player.characterAvatarId = character.id;
        this.state.player.avatar = character.id;
        this.saveState();
        this.renderHeader();
        this.renderAvatarCustomizer();
      };
      card.onclick = selectCharacter;
      card.onkeydown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectCharacter();
        }
      };

      container.appendChild(card);
    });
  }

  getAvatarStatCards(stats = {}) {
    return [
      { key: 'attack', label: 'Ataque', icon: '?', color: '#ff2b3d', value: stats.attack || 0, meaning: 'Golpea fuerte' },
      { key: 'defense', label: 'Defensa', icon: '?', color: '#3aa7ff', value: stats.defense || 0, meaning: 'Aguanta mejor' },
      { key: 'stamina', label: 'Estamina', icon: '?', color: '#ffd33d', value: stats.stamina || 0, meaning: 'Gira mas tiempo' },
      { key: 'speed', label: 'Velocidad', icon: '?', color: '#00e5ff', value: stats.speed || 0, meaning: 'Corre como un rayo' },
      { key: 'focus', label: 'Foco', icon: '?', color: '#9cff3a', value: stats.focus || 0, meaning: 'Mantiene la calma' }
    ];
  }

  getAvatarBattleStyle(character, stats = {}) {
    const cards = this.getAvatarStatCards(stats);
    const strongest = cards.slice().sort((a, b) => b.value - a.value)[0] || cards[0];
    const map = {
      attack: ['Atacante X', 'Fuerte', 'Entra al choque y hace mas daño cuando aciertas.'],
      defense: ['Muro Blader', 'Resistente', 'Aguanta golpes y perdona mejor los fallos.'],
      stamina: ['Giro eterno', 'Constante', 'Mantiene la peonza viva durante duelos largos.'],
      speed: ['Rayo X', 'Rapido', 'Se mueve rapido y aprovecha respuestas veloces.'],
      focus: ['Mente X', 'Preciso', 'Se concentra y convierte la calma en ventaja.']
    };
    const [label, shortLabel, description] = map[strongest.key] || map.attack;
    return {
      label,
      shortLabel,
      description: character?.rol ? `${description} ${character.rol}.` : description
    };
  }

  // -------------------- X TOWER DEL CONOCIMIENTO --------------------
  getKidSubjectName(floorData) {
    const labels = {
      diagnostic: 'Revisar mi nivel',
      math: 'Mates',
      language: 'Lectura',
      english: 'Ingles',
      science: 'Medio',
      art: 'Arte',
      movement: 'Movimiento',
      mixed: 'Duelo mixto'
    };
    return labels[floorData.subject] || floorData.arenaName || 'Reto';
  }

  getKidFloorGoal(floorData) {
    if (floorData.type === 'diagnostic') return 'Contesta unas preguntas cortas para empezar en una planta buena para ti.';
    if (floorData.type === 'final') return 'Derrota al rival final y demuestra todo lo que has aprendido.';
    if (floorData.type === 'tower-rival') return `Duelo especial contra ${floorData.rivalName}.`;
    if (floorData.type === 'ascension') return 'Duelo de ascenso para subir a una zona nueva.';
    return `Combate contra ${floorData.rivalName} y gana energia con ${this.getKidSubjectName(floorData)}.`;
  }

  getTowerDifficultyLabel(floorData) {
    if (typeof floorData.difficultyTier === 'string') {
      const labels = {
        baja: 'Suave',
        media: 'Media',
        alta: 'Intensa',
        experta: 'Experta',
        legendaria: 'Final'
      };
      return labels[floorData.difficultyTier] || floorData.difficultyTier;
    }
    const difficulty = floorData.difficulty || Math.ceil((floorData.floor || 1) / 10);
    const labels = {
      1: 'Suave',
      2: 'Media',
      3: 'Intensa',
      4: 'Experta',
      5: 'Final'
    };
    return labels[Math.max(1, Math.min(5, difficulty))] || 'Media';
  }

  getVisibleTowerFloors(currentFloor) {
    const windowSize = 7;
    let start = Math.max(1, currentFloor - 3);
    let end = Math.min(50, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    return X_TOWER_FLOORS.filter(floor => floor.floor >= start && floor.floor <= end);
  }

  renderMap() {
    const content = document.getElementById('map-scroll-content');
    if (!content) return;
    content.innerHTML = '<div class="map-grid-bg"></div>';

    const currentFloor = getCurrentTowerFloor(this.state);
    const currentData = getTowerFloorData(currentFloor);
    const equippedBey = getEquippedBey(this.state);
    const currentGate = ProgressService.canStartTowerFloor(this.state, currentFloor);

    const floorLabel = document.getElementById('tower-current-floor');
    const blockLabel = document.getElementById('tower-current-block');
    const rivalLabel = document.getElementById('tower-current-rival');
    const beyLabel = document.getElementById('tower-current-bey');
    const titleLabel = document.getElementById('tower-current-title');
    const missionLabel = document.getElementById('tower-current-mission');
    const rewardLabel = document.getElementById('tower-current-reward');
    const progressFill = document.getElementById('tower-progress-fill');
    const nextStepLabel = document.getElementById('tower-next-step');
    if (floorLabel) floorLabel.innerText = `${currentFloor} de 50`;
    if (titleLabel) titleLabel.innerText = `Planta ${currentFloor}: duelo contra ${currentData.rivalName}`;
    if (missionLabel) missionLabel.innerText = this.getKidFloorGoal(currentData);
    if (blockLabel) blockLabel.innerText = `Zona: ${currentData.blockName}`;
    if (rivalLabel) rivalLabel.innerText = `Rival: ${currentData.rivalName} (${this.getTowerDifficultyLabel(currentData)})`;
    if (beyLabel) beyLabel.innerText = `Tu Bey: ${equippedBey.nombre} vs ${currentData.rivalBeyName}`;
    if (rewardLabel) rewardLabel.innerText = `Premio: ${currentData.reward.label}`;
    if (progressFill) progressFill.style.width = `${Math.max(2, Math.round((currentFloor / 50) * 100))}%`;
    if (nextStepLabel) nextStepLabel.innerText = currentFloor >= 50
      ? 'Estas en la cima de la torre.'
      : !currentGate.ok
        ? `Planta ${currentFloor} desbloqueada para manana. Hoy puedes repetir combates para practicar.`
        : `Gana esta planta para abrir la ${currentFloor + 1}.`;

    const enterBtn = document.getElementById('btn-tower-enter');
    if (enterBtn) {
      const isCurrentFloorCompleted = (this.state.progress.tower?.completedFloors || []).includes(currentFloor);
      const isDailyBlocked = !isCurrentFloorCompleted && !currentGate.ok;
      enterBtn.disabled = isDailyBlocked;
      enterBtn.innerText = isDailyBlocked
        ? 'Vuelve manana'
        : isCurrentFloorCompleted
        ? 'Repetir combate'
        : currentData.type === 'diagnostic' && !LearningEngine.isDiagnosticComplete(this.state)
        ? 'Empezar revision'
        : 'Combatir';
      enterBtn.onclick = () => this.openTowerFloor(currentFloor);
    }
    const recalibrateBtn = document.getElementById('btn-tower-recalibrate');
    if (recalibrateBtn) recalibrateBtn.onclick = () => this.showScreen('diagnostic');
    const rivalsBtn = document.getElementById('btn-tower-rivals');
    if (rivalsBtn) rivalsBtn.onclick = () => this.showScreen('cards');
    const beysBtn = document.getElementById('btn-tower-beys');
    if (beysBtn) beysBtn.onclick = () => this.openBeySelection();

    this.getVisibleTowerFloors(currentFloor).forEach(floorData => {
      const towerGate = ProgressService.canStartTowerFloor(this.state, floorData.floor);
      const isCompleted = (this.state.progress.tower?.completedFloors || []).includes(floorData.floor) || floorData.floor < currentFloor;
      const isDailyBlocked = !isCompleted && floorData.floor === currentFloor && !towerGate.ok;
      const isAvailable = floorData.floor === currentFloor && towerGate.ok;
      const isLocked = floorData.floor > currentFloor || isDailyBlocked;
      const statusClass = isCompleted ? 'completed' : isAvailable ? 'available' : 'locked';
      const typeClass = floorData.type === 'tower-rival' || floorData.type === 'final' ? 'boss' : floorData.type === 'ascension' ? 'ascension' : '';
      const statusText = isCompleted ? 'Ya ganada' : isDailyBlocked ? 'Manana' : isAvailable ? 'Estoy aqui' : 'Luego';
      const actionText = isCompleted ? 'Repetir' : isDailyBlocked ? 'Vuelve manana' : isAvailable ? 'Jugar' : 'Bloqueada';
      const node = document.createElement('article');
      node.className = `tower-floor-node ${statusClass} ${typeClass}`;
      node.dataset.floor = floorData.floor;
      node.innerHTML = `
        <div class="tower-floor-top">
          <span class="tower-floor-number">${floorData.floor}</span>
          <span class="tower-floor-status">${statusText}</span>
        </div>
        <h3>${floorData.rivalName}</h3>
        <div class="tower-floor-meta">${isDailyBlocked ? towerGate.reason : isLocked ? 'Gana la planta anterior para abrirla.' : this.getKidFloorGoal(floorData)}</div>
        <div class="tower-floor-meta">Dificultad: ${this.getTowerDifficultyLabel(floorData)} · Objetivo: ${floorData.secondaryObjective || 'Gana el duelo'}</div>
        <div class="tower-floor-reward">Premio: ${floorData.reward.label}</div>
        <button class="btn-action ${isLocked ? 'secondary' : ''}" type="button" ${isLocked ? 'disabled' : ''}>${actionText}</button>
      `;
      const action = node.querySelector('button');
      if (!isLocked && action) action.onclick = () => this.openTowerFloor(floorData.floor);
      content.appendChild(node);
    });
  }

  openBeySelection() {
    this.albumTab = 'beys';
    this.showScreen('cards');
  }

  openTowerFloor(floorNumber) {
    const floorData = getTowerFloorData(floorNumber);
    sounds.playClick();
    const isCompleted = (this.state.progress.tower?.completedFloors || []).includes(floorNumber);
    const towerGate = ProgressService.canStartTowerFloor(this.state, floorData.floor);
    if (!towerGate.ok && !isCompleted) {
      this.showNotice(towerGate.reason, "Torre X");
      return;
    }
    if (floorData.type === 'diagnostic' && !LearningEngine.isDiagnosticComplete(this.state)) {
      this.showScreen('diagnostic');
      return;
    }
    this.selectedWeekNum = floorData.week;
    this.currentTowerFloor = floorData.floor;
    this.pendingTowerBattle = true;
    this.startCombat(floorData.type === 'tower-rival' || floorData.type === 'ascension' || floorData.type === 'final');
  }

  renderSummerPlanner() {
    const plan = LearningEngine.getWeekPlan(this.state);
    const recommendation = LearningEngine.getDailyRecommendations(this.state);
    if (!plan || !recommendation.currentMission) return;

    document.getElementById('planner-week-label').innerText = `Semana ${plan.week}: ${plan.title}`;
    document.getElementById('planner-today-title').innerText = recommendation.actions[0]?.label || 'Empieza por aqui';
    document.getElementById('planner-today-detail').innerText = recommendation.actions[0]?.detail || 'Completa un reto corto para subir la torre.';

    const track = document.getElementById('planner-week-track');
    track.innerHTML = '';
    plan.days.forEach(dayInfo => {
      const mission = dayInfo.mission;
      const card = document.createElement('div');
      card.className = `planner-day ${dayInfo.status}`;
      const statusLabel = dayInfo.completed ? 'Hecho' : dayInfo.status === 'today' ? 'Hoy' : dayInfo.status === 'upcoming' ? 'Luego' : 'Cerrado';
      card.innerHTML = `
        <div class="planner-day-top">
          <span>Dia ${dayInfo.day}</span>
          <span>${statusLabel}</span>
        </div>
        <h4>${mission.subject.shortName}</h4>
        <p>${mission.skill.name}</p>
      `;
      track.appendChild(card);
    });

    const actions = document.getElementById('planner-actions-list');
    actions.innerHTML = '';
    recommendation.actions.forEach((action, index) => {
      const item = document.createElement('div');
      item.className = 'planner-action';
      item.innerHTML = `
        <div>
          <strong>${action.label}</strong>
          <span>${action.detail}</span>
        </div>
        <button type="button" data-planner-action="${index}">${index === 0 ? 'Jugar' : 'Abrir'}</button>
      `;
      actions.appendChild(item);
    });

    actions.querySelectorAll('[data-planner-action]').forEach(button => {
      button.onclick = () => this.openPlannerAction(parseInt(button.dataset.plannerAction, 10));
    });

    this.plannerActions = recommendation.actions;
    this.renderSpacedReviewStrip();
  }

  renderSpacedReviewStrip() {
    const container = document.getElementById('spaced-review-strip');
    if (!container) return;
    const reviews = LearningEngine.getUpcomingSpacedReviews(this.state).slice(0, 4);
    if (reviews.length === 0) {
      container.innerHTML = '';
      container.style.display = 'none';
      return;
    }

    const today = LearningEngine.todayKey();
    const streak = LearningEngine.getSpacedReviewStreak(this.state);
    const dueReviews = reviews.filter(item => item.dueAt <= today);
    const next = reviews[0];
    const title = dueReviews.length > 0
      ? `${dueReviews.length} repaso${dueReviews.length === 1 ? '' : 's'} listo${dueReviews.length === 1 ? '' : 's'}`
      : `Proximo repaso: ${next.dueAt}`;
    const detail = reviews
      .map(item => `${item.subject}: ${item.skillName}`)
      .slice(0, 2)
      .join(' · ');
    const chips = reviews.map(item => `
      <span class="spaced-review-chip ${item.dueAt <= today ? 'due' : ''}">
        ${this.escapeReportText(item.dueAt)} · ${this.escapeReportText(item.subject)}
      </span>
    `).join('');

    container.innerHTML = `
      <div class="spaced-review-copy">
        <div class="spaced-review-kicker">Calendario 1-3-7</div>
        <strong>${this.escapeReportText(title)}</strong>
        <p>${this.escapeReportText(detail || 'Mantener el ciclo de repaso espaciado.')}</p>
      </div>
      <div class="spaced-review-chips">${chips}</div>
      <div class="spaced-streak-meter" title="Repasos espaciados completados en fecha">
        <span class="spaced-streak-value">${streak.current}</span>
        <span class="spaced-streak-label">racha</span>
        <span class="spaced-streak-best">mejor ${streak.best}</span>
      </div>
      <button id="btn-spaced-review-start" class="spaced-review-button" type="button" ${dueReviews.length === 0 ? 'disabled' : ''}>
        ${dueReviews.length > 0 ? 'Repasar ahora' : 'Programado'}
      </button>
    `;
    container.style.display = 'grid';
    const button = document.getElementById('btn-spaced-review-start');
    if (button && dueReviews.length > 0) {
      button.onclick = () => this.startPostBossReview(next.week);
    }
  }

  openPlannerAction(index = 0) {
    const action = (this.plannerActions || LearningEngine.getDailyRecommendations(this.state).actions)[index];
    if (action?.type === 'diagnostic') {
      this.showScreen('diagnostic');
      return;
    }
    if (action?.type === 'post_boss_review') {
      this.startPostBossReview(action.week);
      return;
    }
    const subjectId = action?.subjectId || LearningEngine.getCurrentMission(this.state)?.subject.id;
    if (!subjectId) {
      this.showDailyMissions(this.state.player.currentWeek);
      return;
    }
    const currentMission = LearningEngine.getCurrentMission(this.state);
    if (currentMission && (currentMission.missionType.id === 'offline' || currentMission.missionType.id === 'project') && currentMission.subject.id === subjectId) {
      this.openOfflineMission(currentMission);
      return;
    }

    if (subjectId === 'math') {
      const mission = LearningEngine.getCurrentMission(this.state);
      this.showDailyMissions(mission ? mission.week : this.state.player.currentWeek);
      return;
    }
    if (subjectId === 'language') {
      this.showScreen('language');
      return;
    }
    if (subjectId === 'english' || subjectId === 'science') {
      this.openSubjectMission(subjectId);
      return;
    }

    const mission = LearningEngine.getNextMissionBySubject(this.state, subjectId);
    this.openOfflineMission(mission);
  }

  openOfflineMission(mission = null) {
    this.offlineMission = mission || LearningEngine.getCurrentMission(this.state);
    this.showScreen('offline');
  }

  renderOfflineMission() {
    const mission = this.offlineMission || LearningEngine.getCurrentMission(this.state);
    this.offlineMission = mission;
    const status = document.getElementById('offline-status-message');
    status.innerText = '';
    document.getElementById('offline-evidence-input').value = '';

    if (!mission) {
      document.getElementById('offline-mission-world').innerText = 'Reto no disponible';
      document.getElementById('offline-mission-title').innerText = 'Sin actividad preparada';
      document.getElementById('offline-mission-instructions').innerText = 'No hay una actividad fuera de pantalla activa ahora mismo.';
      document.getElementById('offline-parent-prompt').innerText = '';
      return;
    }

    const template = LearningEngine.getOfflineTemplateForMission(mission);
    const pending = LearningEngine.getPendingOfflineEvidence(this.state).find(item => item.id === mission.key);
    document.getElementById('offline-mission-world').innerText = `${mission.subject.worldName} · Semana ${mission.week} Dia ${mission.day}`;
    document.getElementById('offline-mission-title').innerText = template.title;
    document.getElementById('offline-mission-instructions').innerText = template.instructions;
    document.getElementById('offline-parent-prompt').innerText = `Para validar: ${template.parentPrompt}`;
    if (pending) {
      document.getElementById('offline-evidence-input').value = pending.evidence;
      status.innerText = 'Esta evidencia ya esta pendiente. Un adulto puede aprobarla desde el panel de padres.';
    }
  }

  submitOfflineEvidence() {
    const mission = this.offlineMission;
    if (!mission) return;
    const evidence = document.getElementById('offline-evidence-input').value.trim();
    const result = LearningEngine.submitOfflineEvidence(this.state, mission, evidence);
    if (!result.ok) {
      this.showNotice(result.reason, 'Evidencia incompleta');
      return;
    }
    this.saveState();
    document.getElementById('offline-status-message').innerText = 'Evidencia enviada. Pide a un adulto que la valide en el panel de padres.';
    this.showNotice('Evidencia guardada. Ahora queda pendiente de validacion parental.', 'Reto enviado');
  }

  // -------------------- DAILY MISSIONS PANEL --------------------
  showDailyMissions(weekNum) {
    sounds.playClick();
    const weekData = WEEKS.find(w => w.week === weekNum);
    const curriculumPlan = LearningEngine.getWeekPlan(this.state, Math.min(weekNum, CurriculumData.summerWeeks.length));
    this.selectedWeekNum = weekNum;

    document.getElementById('mission-modal-title').innerText = curriculumPlan ? curriculumPlan.title : weekData.name;
    document.getElementById('mission-modal-subtitle').innerText = curriculumPlan ? `${curriculumPlan.focus} (Jefe: ${curriculumPlan.boss})` : `${weekData.detail} (Rival: ${weekData.rival})`;

    const listContainer = document.getElementById('mission-list-container');
    listContainer.innerHTML = '';

    const currentDay = this.state.player.currentDay;
    const isCurrentWeek = weekNum === this.state.player.currentWeek;
    const completedDays = ProgressService.completedDaysCount(this.state, weekNum);

    // Generate 5 days missions from curriculum progress when available.
    for (let day = 1; day <= 5; day++) {
      let status = 'locked';
      let icon = 'LOCK';
      const key = ProgressService.trainingKey(weekNum, day);
      const completed = ProgressService.isCompleted(this.state, key);
      const curriculumDay = curriculumPlan ? curriculumPlan.days[day - 1] : null;
      const curriculumCompleted = curriculumDay ? curriculumDay.completed : false;
      const mission = curriculumDay ? curriculumDay.mission : null;

      if (completed || curriculumCompleted) {
        status = 'completed';
        icon = 'OK';
      } else if ((curriculumDay && curriculumDay.status === 'today') || (isCurrentWeek && day === currentDay)) {
        status = 'active-day';
        icon = 'HOY';
      }

      const bonusText = mission ? mission.subject.shortName : ((day === 5) ? 'Pieza Especial' : '15 Monedas');
      const title = mission ? `${mission.subject.name}: ${mission.skill.name}` : `Entrenamiento Dia ${day}`;
      const detail = mission ? `${mission.missionType.name} - ${mission.weekTitle}` : `${weekData.target} - Repaso de velocidad`;

      listContainer.innerHTML += `
        <div class="mission-item ${status}">
          <div class="mission-info">
            <span class="mission-status-icon">${icon}</span>
            <div class="mission-text">
              <h4>${title}</h4>
              <p>${detail}</p>
            </div>
          </div>
          <div class="mission-reward">${bonusText}</div>
        </div>
      `;
    }

    const btnBoss = document.getElementById('btn-start-boss');
    const bossReadiness = LearningEngine.canUnlockWeeklyBoss(this.state, Math.min(weekNum, CurriculumData.summerWeeks.length));
    this.renderBossReadiness(bossReadiness);
    if (bossReadiness.ok) {
      btnBoss.removeAttribute('disabled');
      btnBoss.style.opacity = '1';
    } else {
      btnBoss.setAttribute('disabled', 'true');
      btnBoss.style.opacity = '0.4';
      btnBoss.title = bossReadiness.reason;
    }

    const btnTraining = document.getElementById('btn-start-training');
    const canTrain = ProgressService.canStart(this.state, weekNum, false);
    if (canTrain.ok) {
      btnTraining.removeAttribute('disabled');
      btnTraining.style.opacity = '1';
    } else {
      btnTraining.setAttribute('disabled', 'true');
      btnTraining.style.opacity = '0.4';
    }

    document.getElementById('daily-mission-modal').style.display = 'flex';
  }

  renderBossReadiness(readiness) {
    const panel = document.getElementById('boss-readiness-panel');
    if (!panel || !readiness) return;
    const score = Math.max(0, Math.min(100, readiness.averageMastery || 0));
    document.getElementById('boss-readiness-title').innerText = readiness.bossName
      ? `${readiness.bossName} - ${readiness.weekTitle}`
      : 'Jefe semanal';
    document.getElementById('boss-readiness-score').innerText = `${score}%`;
    document.getElementById('boss-readiness-bar').style.width = `${score}%`;

    const dayText = `${readiness.completedDays}/${readiness.totalDays} misiones`;
    const statusText = readiness.ok ? 'Listo para el jefe' : readiness.reason;
    const weakText = readiness.weakSkills && readiness.weakSkills.length > 0
      ? `Refuerzo: ${readiness.weakSkills.slice(0, 2).map(skill => skill.name).join(', ')}`
      : 'Sin bloqueos de habilidad';
    document.getElementById('boss-readiness-detail').innerHTML = `
      <span>${dayText}</span>
      <span>${statusText}</span>
      <span>${weakText}</span>
    `;
  }
  // -------------------- TOYSHOP SCREEN (TALLER) --------------------
  getWorkshopCombo(overrides = {}) {
    return {
      ...this.state.player.activeCombo,
      ...(overrides || {})
    };
  }

  getWorkshopBey(combo = this.state.player.activeCombo) {
    return buildCustomBeyFromCombo({
      ...this.state,
      player: {
        ...this.state.player,
        activeCombo: {
          ...this.state.player.activeCombo,
          ...(combo || {})
        }
      }
    });
  }

  getWorkshopTypeInfo(type) {
    const info = {
      ataque: {
        title: 'Bey de ATAQUE',
        copy: 'Pega fuerte y busca terminar rapido.',
        tip: 'Ideal si Carlos responde con seguridad y quiere castigar al rival.'
      },
      defensa: {
        title: 'Bey de DEFENSA',
        copy: 'Aguanta golpes y reduce errores peligrosos.',
        tip: 'Ideal contra rivales que hacen mucho daño.'
      },
      estamina: {
        title: 'Bey de ESTAMINA',
        copy: 'Mantiene el giro y premia las rachas largas.',
        tip: 'Ideal para plantas con muchas preguntas.'
      },
      balance: {
        title: 'Bey BALANCE',
        copy: 'Se adapta sin tener un punto debil claro.',
        tip: 'Ideal cuando no sabes que rival viene.'
      }
    };
    return info[type] || info.balance;
  }

  getWorkshopPartRole(partType) {
    const roles = {
      core: 'Define el caracter del Bey: potencia, control o giro.',
      ring: 'Marca como choca: cortes, rebotes y defensa exterior.',
      driver: 'Decide como se mueve por el estadio y cuanto dura girando.',
      color: 'Cambia la energia visual y firma del montaje.'
    };
    return roles[partType] || 'Ajusta el comportamiento del montaje.';
  }

  getWorkshopUnlockHint(partType, index) {
    if (partType === 'core') return index < 1 ? 'Inicial' : 'Capsulas de jefe y duelos de ascenso.';
    if (partType === 'ring') return index < 1 ? 'Inicial' : 'Capsulas de jefe y plantas especiales.';
    if (partType === 'driver') return index < 1 ? 'Inicial' : 'Capsulas normales al ganar combates.';
    if (partType === 'color') return index < 1 ? 'Inicial' : 'Capsulas normales y recompensas de energia.';
    return 'Recompensa de la X Tower.';
  }

  getWorkshopPartDelta(partType, part, baseCombo = this.state.player.activeCombo) {
    const current = this.getWorkshopBey(baseCombo);
    const preview = this.getWorkshopBey({ ...baseCombo, [partType]: part.id });
    return {
      ataque: preview.ataque - current.ataque,
      defensa: preview.defensa - current.defensa,
      estamina: preview.estamina - current.estamina,
      velocidad: preview.velocidad - current.velocidad,
      typeChanged: preview.tipo !== current.tipo,
      preview
    };
  }

  formatWorkshopDelta(value) {
    if (!value) return '0';
    return value > 0 ? `+${value}` : `${value}`;
  }

  getWorkshopRecommendedType() {
    const floor = getCurrentTowerFloor(this.state);
    const floorData = getTowerFloorData(floor);
    const rivalBey = getBeyById(floorData?.rivalBeyId);
    const rivalType = rivalBey?.tipo || 'balance';
    const recommendedByRival = {
      ataque: 'defensa',
      defensa: 'estamina',
      estamina: 'ataque'
    };
    const recommendedType = recommendedByRival[rivalType] || 'balance';
    return { floor, floorData, rivalBey, rivalType, recommendedType };
  }

  renderWorkshopTypePanel(bey) {
    const panel = document.getElementById('workshop-type-panel');
    if (!panel) return;
    const info = this.getWorkshopTypeInfo(bey.tipo);
    panel.dataset.type = bey.tipo;
    panel.innerHTML = `
      <div>
        <span>Tipo actual</span>
        <strong>${info.title}</strong>
      </div>
      <p>${info.copy}</p>
      <em>${bey.habilidad}: ${info.tip}</em>
    `;
  }

  renderWorkshopRecommendation(bey) {
    const panel = document.getElementById('workshop-recommendation-panel');
    if (!panel) return;
    const recommendation = this.getWorkshopRecommendedType();
    const typeInfo = this.getWorkshopTypeInfo(recommendation.recommendedType);
    const isReady = bey.tipo === recommendation.recommendedType || recommendation.recommendedType === 'balance';
    panel.classList.toggle('ready', isReady);
    panel.innerHTML = `
      <span>Próxima planta ${recommendation.floor}</span>
      <strong>${isReady ? 'Montaje preparado' : `Conviene ${typeInfo.title.replace('Bey ', '')}`}</strong>
      <p>Rival: ${recommendation.floorData?.rivalName || 'Rival'} con ${recommendation.rivalBey?.nombre || 'Bey rival'} (${recommendation.rivalType}).</p>
    `;
  }

  renderWorkshopComparison(activeBey, previewBey = null, part = null) {
    const panel = document.getElementById('workshop-compare-panel');
    if (!panel) return;
    if (!previewBey || !part) {
      panel.innerHTML = `
        <strong>Elige una pieza</strong>
        <p>Pasa por encima o toca una pieza para ver si mejora ataque, defensa, giro o velocidad antes de montarla.</p>
      `;
      return;
    }
    const stats = ['ataque', 'defensa', 'estamina', 'velocidad'];
    panel.innerHTML = `
      <strong>${part.name}</strong>
      <p>${this.getWorkshopPartRole(this.workshopPreviewPart?.type)}</p>
      <div class="workshop-delta-grid">
        ${stats.map(stat => {
          const delta = previewBey[stat] - activeBey[stat];
          const cls = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
          return `<span class="${cls}"><b>${stat}</b><i>${this.formatWorkshopDelta(delta)}</i></span>`;
        }).join('')}
      </div>
      <em>${previewBey.tipo !== activeBey.tipo ? `Cambia a tipo ${previewBey.tipo.toUpperCase()}.` : `Mantiene tipo ${previewBey.tipo.toUpperCase()}.`}</em>
    `;
  }

  renderWorkshopBuildSlots() {
    const container = document.getElementById('workshop-build-slots');
    if (!container) return;
    const builds = Array.isArray(this.state.player.savedBeyBuilds) ? this.state.player.savedBeyBuilds.slice(0, 3) : [];
    container.innerHTML = '';
    for (let index = 0; index < 3; index++) {
      const build = builds[index] || null;
      const bey = build ? this.getWorkshopBey(build) : null;
      const slot = document.createElement('div');
      slot.className = `workshop-build-slot ${build ? 'filled' : 'empty'}`;
      const safeBeyName = bey ? this.escapeHtml(bey.nombre) : '';
      const safeBeyType = bey ? this.escapeHtml(bey.tipo.toUpperCase()) : '';
      const safeAbility = bey ? this.escapeHtml(bey.habilidad) : '';
      slot.innerHTML = build ? `
        <strong>${safeBeyName}</strong>
        <span>${safeBeyType} · ${safeAbility}</span>
        <div class="workshop-build-actions">
          <button type="button" data-load-build="${index}">Usar</button>
          <button type="button" data-save-build="${index}">Guardar aquí</button>
        </div>
      ` : `
        <strong>Ranura ${index + 1}</strong>
        <span>Vacía</span>
        <div class="workshop-build-actions">
          <button type="button" data-save-build="${index}">Guardar aquí</button>
        </div>
      `;
      container.appendChild(slot);
    }
    container.querySelectorAll('[data-save-build]').forEach(button => {
      button.onclick = () => this.saveWorkshopBuild(parseInt(button.dataset.saveBuild, 10));
    });
    container.querySelectorAll('[data-load-build]').forEach(button => {
      button.onclick = () => this.loadWorkshopBuild(parseInt(button.dataset.loadBuild, 10));
    });
  }

  saveWorkshopBuild(index) {
    sounds.playClick();
    if (!Array.isArray(this.state.player.savedBeyBuilds)) this.state.player.savedBeyBuilds = [];
    this.state.player.savedBeyBuilds[index] = { ...this.state.player.activeCombo };
    this.saveState();
    this.renderWorkshop();
    this.showNotice('Montaje guardado en el garaje.', 'Build guardada');
  }

  loadWorkshopBuild(index) {
    const build = this.state.player.savedBeyBuilds?.[index];
    if (!build) return;
    sounds.playClick();
    this.state.player.activeCombo = {
      ...this.state.player.activeCombo,
      ...build
    };
    this.saveState();
    this.renderHeader();
    this.renderWorkshop();
    this.showNotice(`${this.getWorkshopBey().nombre} cargada en el taller.`, 'Build lista');
  }

  runWorkshopSpinTest() {
    const viewer = document.getElementById('workshop-top-preview');
    const bey = this.getWorkshopBey(this.state.player.activeCombo);
    if (!viewer) return;
    sounds.playClick();
    viewer.classList.remove('workshop-spin-test', 'workshop-spin-attack', 'workshop-spin-defense', 'workshop-spin-stamina', 'workshop-spin-balance');
    void viewer.offsetWidth;
    viewer.classList.add('workshop-spin-test', `workshop-spin-${bey.tipo}`);
    this.showNotice(`${bey.nombre}: ${bey.habilidad}. Ataque ${bey.ataque}, defensa ${bey.defensa}, giro ${bey.estamina}.`, 'Prueba de giro');
    setTimeout(() => viewer.classList.remove('workshop-spin-test', 'workshop-spin-attack', 'workshop-spin-defense', 'workshop-spin-stamina', 'workshop-spin-balance'), 2600);
  }

  renderWorkshop() {
    this.renderTopPreview();
    const nameInput = document.getElementById('custom-bey-name-input');
    if (nameInput) {
      nameInput.value = this.state.player.activeCombo?.name || 'Mi Peonza X';
      nameInput.oninput = () => {
        const value = nameInput.value.trim().slice(0, 24) || 'Mi Peonza X';
        this.state.player.activeCombo.name = value;
        this.renderHeader();
        this.renderTopPreview();
      };
      nameInput.onchange = () => {
        this.state.player.activeCombo.name = (nameInput.value.trim().slice(0, 24) || 'Mi Peonza X');
        this.saveState();
        this.renderHeader();
        this.renderWorkshop();
      };
    }
    const testSpinBtn = document.getElementById('btn-workshop-test-spin');
    if (testSpinBtn) testSpinBtn.onclick = () => this.runWorkshopSpinTest();
    const equipCustomBtn = document.getElementById('btn-equip-custom-bey');
    if (equipCustomBtn) {
      const isEquipped = this.state.player.equippedBeyId === 'custom_x_bey';
      const customName = buildCustomBeyFromCombo(this.state).nombre;
      equipCustomBtn.innerText = isEquipped ? `${customName} equipada` : `Usar ${customName} en batalla`;
      equipCustomBtn.classList.toggle('equipped', isEquipped);
      equipCustomBtn.onclick = () => this.equipCustomWorkshopBey();
    }
    // Buscar tab activa SOLO en el taller (excluir avatar-customizer-tabs)
    const tallerTabs = document.querySelectorAll('.workshop-tab:not(#avatar-customizer-tabs .workshop-tab)');
    const activeTab = [...tallerTabs].find(t => t.classList.contains('active'));
    const firstTab = tallerTabs[0];
    const partType = activeTab?.dataset.part || firstTab?.dataset.part || 'core';
    if (!CUSTOM_PARTS[partType]) {
      const fallback = Object.keys(CUSTOM_PARTS)[0];
      this.renderWorkshopItems(fallback);
      return;
    }
    this.renderWorkshopItems(partType);
  }

  renderTopPreview() {
    const combo = this.workshopPreviewCombo || this.state.player.activeCombo;
    const activeBey = this.getWorkshopBey(this.state.player.activeCombo);
    const previewBey = this.getWorkshopBey(combo);
    const container = document.getElementById('workshop-top-preview');
    container.innerHTML = generateTopSVG(combo.core, combo.ring, combo.driver, combo.color);
    container.classList.toggle('previewing', !!this.workshopPreviewCombo);

    document.getElementById('stat-val-attack').innerText = previewBey.ataque;
    document.getElementById('stat-val-defense').innerText = previewBey.defensa;
    document.getElementById('stat-val-stamina').innerText = previewBey.estamina;

    document.getElementById('stat-bar-attack').style.width = `${Math.min(100, previewBey.ataque)}%`;
    document.getElementById('stat-bar-defense').style.width = `${Math.min(100, previewBey.defensa)}%`;
    document.getElementById('stat-bar-stamina').style.width = `${Math.min(100, previewBey.estamina)}%`;
    this.renderWorkshopTypePanel(previewBey);
    this.renderWorkshopRecommendation(previewBey);
    this.renderWorkshopComparison(activeBey, this.workshopPreviewCombo ? previewBey : null, this.workshopPreviewPart?.part || null);
    this.renderWorkshopBuildSlots();
  }

  equipCustomWorkshopBey() {
    sounds.playClick();
    this.state.player.equippedBeyId = 'custom_x_bey';
    this.saveState();
    this.renderHeader();
    this.renderWorkshop();
    this.showNotice(`${buildCustomBeyFromCombo(this.state).nombre} equipada. La proxima batalla usara tu montaje del taller.`, 'Peonza del taller lista');
  }

  renderWorkshopItems(partType) {
    const container = document.getElementById('workshop-items-container');
    container.innerHTML = '';

    const unlockedIds = this.state.inventory[partType] || [];
    const activeCombo = this.state.player.activeCombo;

    const partsList = CUSTOM_PARTS[partType];
    if (!partsList) {
      console.warn(`renderWorkshopItems: partType desconocido "${partType}"`);
      return;
    }

    partsList.forEach((part, index) => {
      const isUnlocked = unlockedIds.includes(part.id);
      const isSelected = activeCombo[partType] === part.id;
      const delta = this.getWorkshopPartDelta(partType, part, activeCombo);
      
      const itemCard = document.createElement('div');
      itemCard.className = `workshop-item-card ${isSelected ? 'selected' : ''}`;
      itemCard.dataset.partType = partType;
      itemCard.dataset.partId = part.id;
      
      if (!isUnlocked) {
        itemCard.style.opacity = '0.35';
        itemCard.innerHTML = `
          <div class="workshop-item-icon" style="font-size: 2.2rem; text-align:center;">??</div>
          <div class="workshop-item-name">${part.name}</div>
          <div class="workshop-item-rarity rarity-${part.rarity}">${part.rarity}</div>
          <div class="workshop-item-meta">${this.getWorkshopUnlockHint(partType, index)}</div>
        `;
        itemCard.onclick = () => {
          sounds.playIncorrect();
          this.showNotice(`Esta pieza esta bloqueada. ${this.getWorkshopUnlockHint(partType, index)}`, "Pieza bloqueada");
        };
      } else {
        let previewHtml = '';
        if (partType === 'color') {
          previewHtml = `<div class="workshop-item-icon" style="background-color: ${part.code}; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px ${part.code}"></div>`;
        } else if (part.image) {
          previewHtml = `<div class="workshop-item-icon"><img class="workshop-part-image" src="${part.image}" alt="${part.name}"></div>`;
        } else {
          previewHtml = `<div class="workshop-item-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">${part.svg}</svg></div>`;
        }

        itemCard.innerHTML = `
          ${previewHtml}
          <div class="workshop-item-name">${part.name}</div>
          <div class="workshop-item-rarity rarity-${part.rarity}">${part.rarity}</div>
          <div class="workshop-item-deltas">
            <span class="${delta.ataque > 0 ? 'up' : delta.ataque < 0 ? 'down' : ''}">ATK ${this.formatWorkshopDelta(delta.ataque)}</span>
            <span class="${delta.defensa > 0 ? 'up' : delta.defensa < 0 ? 'down' : ''}">DEF ${this.formatWorkshopDelta(delta.defensa)}</span>
            <span class="${delta.estamina > 0 ? 'up' : delta.estamina < 0 ? 'down' : ''}">GIR ${this.formatWorkshopDelta(delta.estamina)}</span>
          </div>
          <div class="workshop-item-meta">${this.getWorkshopPartRole(partType)}</div>
        `;

        const preview = () => {
          this.workshopPreviewCombo = { ...activeCombo, [partType]: part.id };
          this.workshopPreviewPart = { type: partType, part };
          this.renderTopPreview();
        };
        const clearPreview = () => {
          this.workshopPreviewCombo = null;
          this.workshopPreviewPart = null;
          this.renderTopPreview();
        };
        itemCard.onmouseenter = preview;
        itemCard.onfocus = preview;
        itemCard.onmouseleave = clearPreview;
        itemCard.onblur = clearPreview;
        itemCard.tabIndex = 0;
        itemCard.onclick = () => {
          sounds.playClick();
          itemCard.classList.add('assembling');
          this.state.player.activeCombo[partType] = part.id;
          this.workshopPreviewCombo = null;
          this.workshopPreviewPart = null;
          this.saveState();
          setTimeout(() => this.renderWorkshop(), 110);
          if (this.state.player.equippedBeyId === 'custom_x_bey') {
            this.showNotice(`${buildCustomBeyFromCombo(this.state).nombre} actualizada para la proxima batalla.`, 'Montaje actualizado');
          }
        };
      }
      container.appendChild(itemCard);
    });
  }

  // -------------------- ALBUM / CROMOS SCREEN --------------------
  ensureAlbumCollections() {
    if (!this.state.inventory.favoriteBeys) this.state.inventory.favoriteBeys = [];
    if (!this.state.inventory.favoriteCharacters) this.state.inventory.favoriteCharacters = [];
    if (!this.state.inventory.favoriteStadiums) this.state.inventory.favoriteStadiums = [];
  }

  toggleAlbumFavorite(type, id) {
    this.ensureAlbumCollections();
    const key = type === 'bey' ? 'favoriteBeys' : type === 'character' ? 'favoriteCharacters' : 'favoriteStadiums';
    const values = new Set(this.state.inventory[key] || []);
    if (values.has(id)) values.delete(id);
    else values.add(id);
    this.state.inventory[key] = Array.from(values);
    this.saveState();
    this.renderCards();
  }

  isAlbumFavorite(type, id) {
    this.ensureAlbumCollections();
    const key = type === 'bey' ? 'favoriteBeys' : type === 'character' ? 'favoriteCharacters' : 'favoriteStadiums';
    return (this.state.inventory[key] || []).includes(id);
  }

  getAlbumStats() {
    this.ensureAlbumCollections();
    const unlockedBeys = BEYBLADE_X_BEYS.filter(bey => isBeyUnlocked(this.state, bey)).length;
    const favorites = this.state.inventory.favoriteBeys.length + this.state.inventory.favoriteCharacters.length + this.state.inventory.favoriteStadiums.length;
    return {
      unlockedBeys,
      totalBeys: BEYBLADE_X_BEYS.length,
      totalCharacters: BEYBLADE_X_CHARACTERS.length,
      totalStadiums: BEYBLADE_X_STADIUMS.length,
      favorites,
      total: BEYBLADE_X_BEYS.length + BEYBLADE_X_CHARACTERS.length + BEYBLADE_X_STADIUMS.length
    };
  }

  getNextBeyToUnlock() {
    const currentFloor = getCurrentTowerFloor(this.state);
    return [...BEYBLADE_X_BEYS]
      .filter(bey => !isBeyUnlocked(this.state, bey))
      .sort((a, b) => {
        const aDue = Math.max(0, (a.nivelRequerido || 1) - currentFloor);
        const bDue = Math.max(0, (b.nivelRequerido || 1) - currentFloor);
        if (aDue !== bDue) return aDue - bDue;
        return (a.nivelRequerido || 1) - (b.nivelRequerido || 1);
      })[0] || null;
  }

  setAlbumTab(tab) {
    this.albumTab = tab;
    this.renderCards();
  }

  toggleAlbumCompare(id) {
    const current = new Set(this.albumCompareIds || []);
    if (current.has(id)) current.delete(id);
    else {
      if (current.size >= 2) current.delete(Array.from(current)[0]);
      current.add(id);
    }
    this.albumCompareIds = Array.from(current);
    this.renderCards();
  }

  renderAlbumHero(container) {
    const stats = this.getAlbumStats();
    const equipped = getEquippedBey(this.state);
    const selectedCharacter = this.getSelectedCharacterAvatar();
    const companion = this.getSelectedCompanionCharacter();
    const currentFloor = getCurrentTowerFloor(this.state);
    const nextBey = this.getNextBeyToUnlock();
    const progress = Math.round((stats.unlockedBeys / stats.totalBeys) * 100);

    const hero = document.createElement('section');
    hero.className = 'album-hero';
    hero.innerHTML = `
      <div class="album-hero-copy">
        <div class="album-kicker">Mi coleccion</div>
        <h3>Elige tu equipo y descubre que desbloquear despues</h3>
        <p>Usa esta pantalla para escoger tu Bey, guardar favoritos, comparar fuerza y ver en que estadios lucharás.</p>
        <div class="album-progress">
          <span>${stats.unlockedBeys}/${stats.totalBeys} Beys desbloqueados</span>
          <div><strong style="width:${progress}%"></strong></div>
        </div>
      </div>
      <div class="album-team-strip">
        <div>${this.renderCharacterAvatar(selectedCharacter, 'asset-image album-team-avatar')}<span>Blader: ${selectedCharacter.nombre}</span></div>
        <div>${renderAssetImage(companion.image, companion.nombre, 'asset-image album-team-avatar')}<span>Compañero: ${companion.nombre}</span></div>
        <div>${renderAssetImage(equipped.image, equipped.nombre, 'asset-image album-team-bey')}<span>Bey: ${equipped.nombre}</span></div>
        <div><strong>Planta ${currentFloor}</strong><span>${nextBey ? `Proximo Bey: ${nextBey.nombre}` : 'Coleccion Bey completa'}</span></div>
      </div>
    `;
    container.appendChild(hero);
  }

  renderAlbumTabs(container) {
    const tabs = [
      ['team', 'Mi equipo'],
      ['beys', 'Beys'],
      ['rivals', 'Rivales'],
      ['stadiums', 'Estadios'],
      ['favorites', 'Favoritos']
    ];
    const nav = document.createElement('div');
    nav.className = 'album-tabs';
    nav.innerHTML = tabs.map(([id, label]) => `
      <button type="button" class="${this.albumTab === id ? 'active' : ''}" data-album-tab="${id}">${label}</button>
    `).join('');
    container.appendChild(nav);
    nav.querySelectorAll('[data-album-tab]').forEach(button => {
      button.onclick = () => this.setAlbumTab(button.dataset.albumTab);
    });
  }

  renderAlbumMissionPanel(container) {
    const nextBey = this.getNextBeyToUnlock();
    const currentFloor = getCurrentTowerFloor(this.state);
    const dueFloor = nextBey ? Math.max(0, nextBey.nivelRequerido - currentFloor) : 0;
    const panel = document.createElement('section');
    panel.className = 'album-mission-panel';
    panel.innerHTML = `
      <article>
        <span>Objetivo</span>
        <strong>${nextBey ? `Desbloquea ${nextBey.nombre}` : 'Todos los Beys desbloqueados'}</strong>
        <p>${nextBey ? `Sube ${dueFloor} planta${dueFloor === 1 ? '' : 's'} mas en la X Tower.` : 'Ahora puedes elegir tus favoritos y comparar tu equipo.'}</p>
      </article>
      <article>
        <span>Mision de cromo</span>
        <strong>Gana 3 retos con tu Bey favorito</strong>
        <p>Marca un favorito y juega retos para sentir que ese es tu compañero de torre.</p>
      </article>
      <article>
        <span>Estadios</span>
        <strong>Aprende donde luchas</strong>
        <p>Cada estadio marca una zona de plantas y el tipo de desafio que viene.</p>
      </article>
    `;
    container.appendChild(panel);
  }

  renderBeyCard(bey) {
    const equipped = getEquippedBey(this.state);
    const unlocked = isBeyUnlocked(this.state, bey);
    const favorite = this.isAlbumFavorite('bey', bey.id);
    const comparing = (this.albumCompareIds || []).includes(bey.id);
    const card = document.createElement('article');
    card.className = `bey-card ${unlocked ? '' : 'locked'} ${equipped.id === bey.id ? 'equipped' : ''}`;
    card.style.setProperty('--bey-accent', bey.colorPrincipal || '#00f0ff');
    card.style.setProperty('--bey-accent-2', bey.colorSecundario || '#ff0055');
    card.innerHTML = `
      <div class="collection-card-media bey-media">
        ${renderAssetImage(bey.image, bey.nombre, 'asset-image bey-asset')}
        <span class="collection-lock-badge">${unlocked ? equipped.id === bey.id ? 'Equipado' : 'Listo' : `Planta ${bey.nivelRequerido}`}</span>
      </div>
      <div class="collection-card-copy">
        <h3>${bey.nombre}</h3>
        <div class="bey-tag-row">
          <span>${bey.tipo}</span>
          <span>${bey.rareza}</span>
          <span>${unlocked ? 'Disponible' : 'Bloqueado'}</span>
        </div>
        <p>${unlocked ? bey.descripcion : `Se desbloquea en la planta ${bey.nivelRequerido}. Sigue subiendo la X Tower.`}</p>
        <div class="bey-stats">
          <span>Ataque ${bey.ataque}</span>
          <span>Defensa ${bey.defensa}</span>
          <span>Estamina ${bey.estamina}</span>
          <span>Velocidad ${bey.velocidad}</span>
        </div>
        <div class="collection-card-actions">
          <button class="btn-action collection-equip" type="button" ${unlocked ? '' : 'disabled'}>${equipped.id === bey.id ? 'Equipado' : 'Usar este Bey'}</button>
          <button class="collection-icon-btn ${favorite ? 'active' : ''}" type="button" data-favorite-bey="${bey.id}" title="Favorito">&#9733;</button>
          <button class="collection-icon-btn ${comparing ? 'active' : ''}" type="button" data-compare-bey="${bey.id}" title="Comparar">VS</button>
        </div>
      </div>
    `;
    const equip = card.querySelector('.collection-equip');
    if (equip && unlocked) {
      equip.onclick = () => {
        sounds.playClick();
        const wasEquipped = this.state.player.equippedBeyId === bey.id;
        this.state.player.equippedBeyId = bey.id;
        if (!bey.isCustom) {
          this.state.inventory.beys = Array.from(new Set([...(this.state.inventory.beys || []), bey.id]));
        }
        this.saveState();
        this.renderHeader();
        if (this.currentScreen === 'map') this.renderMap();
        this.renderCards();
        this.showNotice(
          wasEquipped ? `${bey.nombre} ya estaba equipado.` : `${bey.nombre} equipado para la proxima batalla.`,
          wasEquipped ? 'Bey actual' : 'Bey cambiado'
        );
      };
    }
    card.querySelector('[data-favorite-bey]').onclick = () => this.toggleAlbumFavorite('bey', bey.id);
    card.querySelector('[data-compare-bey]').onclick = () => this.toggleAlbumCompare(bey.id);
    return card;
  }

  renderOwnedBeySelector(container) {
    const customBey = buildCustomBeyFromCombo(this.state);
    const ownedBeys = [customBey, ...BEYBLADE_X_BEYS.filter(bey => isBeyUnlocked(this.state, bey))];
    const equipped = getEquippedBey(this.state);
    const panel = document.createElement('section');
    panel.className = 'owned-bey-selector';
    panel.innerHTML = `
      <div class="owned-bey-selector-head">
        <span>Cambiar peonza</span>
        <strong>${equipped.nombre}</strong>
      </div>
      <div class="owned-bey-selector-grid">
        ${ownedBeys.map(bey => `
          <button class="owned-bey-choice ${equipped.id === bey.id ? 'active' : ''}" type="button" data-owned-bey="${bey.id}">
            ${renderAssetImage(bey.image, bey.nombre, 'asset-image owned-bey-choice-img')}
            <span>${bey.nombre}</span>
            <em>${equipped.id === bey.id ? 'Equipada' : 'Usar'}</em>
          </button>
        `).join('')}
      </div>
    `;
    container.appendChild(panel);
    panel.querySelectorAll('[data-owned-bey]').forEach(button => {
      button.onclick = () => {
        const bey = button.dataset.ownedBey === 'custom_x_bey'
          ? buildCustomBeyFromCombo(this.state)
          : getBeyById(button.dataset.ownedBey);
        if (!bey || !isBeyUnlocked(this.state, bey)) return;
        sounds.playClick();
        this.state.player.equippedBeyId = bey.id;
        if (!bey.isCustom) {
          this.state.inventory.beys = Array.from(new Set([...(this.state.inventory.beys || []), bey.id]));
        }
        this.saveState();
        this.renderHeader();
        this.renderCards();
        this.showNotice(`${bey.nombre} equipado para la proxima batalla.`, 'Bey cambiado');
      };
    });
  }

  renderCharacterCard(character, { selectable = false } = {}) {
    const favorite = this.isAlbumFavorite('character', character.id);
    const isEquipped = (this.state?.player?.companionCharacterId || this.state?.player?.characterAvatarId || 'jaxonCross') === character.id;
    const bond = typeof getCompanionBond === 'function' ? getCompanionBond(this.state, character.id) : { bondLevel: 0, wins: 0 };
    const passive = typeof getCompanionPassive === 'function' ? getCompanionPassive(character, this.state) : null;
    const stats = typeof getCharacterBaseStats === 'function' ? getCharacterBaseStats(character) : character.stats || {};
    const card = document.createElement('article');
    card.className = `character-card ${isEquipped && selectable ? 'equipped' : ''}`;
    card.style.setProperty('--character-color', character.colorPrincipal || '#00f0ff');
    const equipBadge = selectable ? `<span class="collection-lock-badge">${isEquipped ? 'Tu compañero' : 'Disponible'}</span>` : '';
    const actionBtn = selectable
      ? `<button class="btn-action collection-equip character-equip" type="button">${isEquipped ? 'Compañero actual' : 'Elegir compañero'}</button>`
      : `<button class="btn-action collection-info" type="button">Ficha rival</button>`;
    card.innerHTML = `
      <div class="collection-card-media character-media">
        ${renderAssetImage(character.image, character.nombre, 'asset-image character-asset')}
        ${equipBadge}
      </div>
      <div class="collection-card-copy">
        <h3>${character.nombre}</h3>
        <div class="bey-tag-row"><span>${character.equipo}</span><span>${character.dificultad}</span></div>
        <p>${character.rol}. Le ganas practicando ${character.materiaRecomendada}.</p>
        <div class="bey-tag-row"><span>Usa: ${character.beyAsociado}</span></div>
        <div class="companion-passive-box">
          <strong>${passive ? passive.label : 'Apoyo de equipo'}</strong>
          <span>${passive ? passive.description : 'Ayuda en combate.'}</span>
          <em>Vinculo ${bond.bondLevel || 0} · ${bond.wins || 0} victorias juntos</em>
        </div>
        <div class="companion-stat-row">
          <span>Ataque ${stats.attack || 0}</span>
          <span>Defensa ${stats.defense || 0}</span>
          <span>Giro ${stats.stamina || 0}</span>
          <span>Foco ${stats.focus || 0}</span>
        </div>
        <div class="collection-card-actions">
          ${actionBtn}
          <button class="collection-icon-btn ${favorite ? 'active' : ''}" type="button" data-favorite-character="${character.id}" title="Favorito"></button>
        </div>
      </div>
    `;
    if (selectable) {
      const equipBtn = card.querySelector('.character-equip');
      if (equipBtn && !isEquipped) {
        equipBtn.onclick = () => {
          sounds.playClick();
          this.state.player.companionCharacterId = character.id;
          if (typeof getCompanionBond === 'function') getCompanionBond(this.state, character.id);
          this.saveState();
          this.renderHeader();
          this.renderCards();
          this.showNotice(`${character.nombre} sera tu compañero en la proxima batalla.`, 'Compañero elegido');
        };
      }
    } else {
      card.querySelector('.collection-info').onclick = () => this.showNotice(`${character.nombre}\n\nEquipo: ${character.equipo}\nRol: ${character.rol}\nBey: ${character.beyAsociado}\nPara vencerle, practica: ${character.materiaRecomendada}.`, 'Ficha rival');
    }
    card.querySelector('[data-favorite-character]').onclick = () => this.toggleAlbumFavorite('character', character.id);
    return card;
  }


  renderStadiumCard(stadium) {
    const favorite = this.isAlbumFavorite('stadium', stadium.id);
    const card = document.createElement('article');
    card.className = 'stadium-card';
    card.style.setProperty('--stadium-accent', stadium.colorPrincipal || '#00f0ff');
    card.innerHTML = `
      <div class="collection-card-media stadium-media">
        ${renderAssetImage(stadium.fichaImage || stadium.image, stadium.nombre, 'asset-image stadium-preview')}
      </div>
      <div class="collection-card-copy">
        <h3>${stadium.nombre}</h3>
        <div class="bey-tag-row"><span>${stadium.tramo}</span><span>${stadium.dificultad}</span></div>
        <p>${stadium.descripcion}</p>
        <div class="collection-card-actions">
          <button class="btn-action collection-info" type="button">Ver mundo</button>
          <button class="collection-icon-btn ${favorite ? 'active' : ''}" type="button" data-favorite-stadium="${stadium.id}" title="Favorito">&#9733;</button>
        </div>
      </div>
    `;
    card.querySelector('.collection-info').onclick = () => this.showNotice(`${stadium.nombre}\n\nZona: ${stadium.tramo}\nDificultad: ${stadium.dificultad}\n\n${stadium.descripcion}`, 'Estadio');
    card.querySelector('[data-favorite-stadium]').onclick = () => this.toggleAlbumFavorite('stadium', stadium.id);
    return card;
  }

  renderAlbumCompare(container) {
    const selected = (this.albumCompareIds || []).map(id => BEYBLADE_X_BEYS.find(bey => bey.id === id)).filter(Boolean);
    if (selected.length === 0) return;
    const panel = document.createElement('section');
    panel.className = 'album-compare-panel';
    panel.innerHTML = `
      <div>
        <span>Comparador</span>
        <strong>${selected.length === 1 ? `Elige otro Bey para comparar con ${selected[0].nombre}` : `${selected[0].nombre} VS ${selected[1].nombre}`}</strong>
      </div>
      <div class="album-compare-bars">
        ${['ataque', 'defensa', 'estamina', 'velocidad'].map(stat => `
          <div class="compare-row">
            <span>${stat}</span>
            ${selected.map(bey => `<div><label>${bey.nombre}</label><strong style="width:${bey[stat]}%"></strong><em>${bey[stat]}</em></div>`).join('')}
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(panel);
  }

  renderCards() {
    const container = document.getElementById('cards-grid-container');
    const typeGrid = document.getElementById('bey-type-grid');
    this.ensureAlbumCollections();
    if (typeGrid) typeGrid.innerHTML = '';
    container.innerHTML = '';

    this.renderAlbumHero(container);
    this.renderAlbumTabs(container);
    this.renderAlbumMissionPanel(container);
    this.renderAlbumCompare(container);

    const filterBar = document.createElement('div');
    filterBar.className = 'bey-filter-bar';
    filterBar.style.display = this.albumTab === 'beys' ? 'flex' : 'none';
    filterBar.innerHTML = `
      <label>Tipo
        <select id="bey-filter-type">
          <option value="all">Todos</option>
          ${BEY_TYPES.map(type => `<option value="${type.id}" ${this.beyTypeFilter === type.id ? 'selected' : ''}>${type.name}</option>`).join('')}
        </select>
      </label>
      <label>Rareza
        <select id="bey-filter-rarity">
          <option value="all">Todas</option>
          ${['comun', 'rara', 'epica', 'legendaria'].map(rarity => `<option value="${rarity}" ${this.beyRarityFilter === rarity ? 'selected' : ''}>${rarity}</option>`).join('')}
        </select>
      </label>
    `;
    container.appendChild(filterBar);
    filterBar.querySelector('#bey-filter-type').onchange = (e) => {
      this.beyTypeFilter = e.target.value;
      this.renderCards();
    };
    filterBar.querySelector('#bey-filter-rarity').onchange = (e) => {
      this.beyRarityFilter = e.target.value;
      this.renderCards();
    };

    const addSubtitle = text => {
      const header = document.createElement('h3');
      header.className = 'collection-subtitle';
      header.innerText = text;
      container.appendChild(header);
    };

    if (this.albumTab === 'team') {
      addSubtitle('Mi equipo actual (toca Elegir compañero para cambiar de personaje)');
      container.appendChild(this.renderBeyCard(getEquippedBey(this.state)));
      this.renderOwnedBeySelector(container);
      container.appendChild(this.renderCharacterCard(this.getSelectedCompanionCharacter(), { selectable: true }));
      const currentStadium = getFloorStadium(getCurrentTowerFloor(this.state));
      container.appendChild(this.renderStadiumCard(currentStadium));
      addSubtitle('Misiones para conseguir cromos');
      return;
    }

    if (this.albumTab === 'beys') {
      addSubtitle('Beys de combate');
      BEYBLADE_X_BEYS
        .filter(bey => !this.beyTypeFilter || this.beyTypeFilter === 'all' || bey.tipo === this.beyTypeFilter)
        .filter(bey => !this.beyRarityFilter || this.beyRarityFilter === 'all' || bey.rareza === this.beyRarityFilter)
        .forEach(bey => container.appendChild(this.renderBeyCard(bey)));
      return;
    }

    if (this.albumTab === 'rivals') {
      addSubtitle('Rivales y entrenadores');
      BEYBLADE_X_CHARACTERS.forEach(character => container.appendChild(this.renderCharacterCard(character, { selectable: true })));
      return;
    }

    if (this.albumTab === 'stadiums') {
      addSubtitle('Estadios de combate');
      BEYBLADE_X_STADIUMS.forEach(stadium => container.appendChild(this.renderStadiumCard(stadium)));
      return;
    }

    if (this.albumTab === 'favorites') {
      addSubtitle('Favoritos');
      const favorites = [
        ...BEYBLADE_X_BEYS.filter(bey => this.isAlbumFavorite('bey', bey.id)).map(bey => this.renderBeyCard(bey)),
        ...BEYBLADE_X_CHARACTERS.filter(character => this.isAlbumFavorite('character', character.id)).map(character => this.renderCharacterCard(character)),
        ...BEYBLADE_X_STADIUMS.filter(stadium => this.isAlbumFavorite('stadium', stadium.id)).map(stadium => this.renderStadiumCard(stadium))
      ];
      if (favorites.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'album-empty-state';
        empty.innerHTML = '<strong>Aun no tienes favoritos.</strong><p>Marca la estrella en Beys, rivales o estadios para montar tu coleccion especial.</p>';
        container.appendChild(empty);
        return;
      }
      favorites.forEach(card => container.appendChild(card));
      return;
    }

    // We have 30 cards total representing rivals and achievements
    const totalCards = 30;
    const unlockedCards = this.state.inventory.cards || [];

    for (let c = 1; c <= totalCards; c++) {
      const isUnlocked = unlockedCards.includes(c);
      
      // Card metadata based on card index
      let name = `Rival Astral #${c}`;
      let rarity = 'comun';
      let icon = '???';
      let desc = 'Entrenador de la Liga Spin.';
      
      // Custom cards for weekly bosses
      if (c <= WEEKS.length) {
        const week = WEEKS[c - 1];
        name = `${week.rival} (${week.name})`;
        icon = week.rivalImg;
        desc = `Líder de la semana ${c}. Usa el estilo ${week.detail}.`;
        rarity = c <= 4 ? 'comun' : c <= 8 ? 'raro' : c <= 10 ? 'epico' : c === 11 ? 'legendario' : 'cosmico';
      } else {
        // Collectible cards
        const collectibleNames = [
          "Giro de Oro", "Súper Velocidad", "Defensa Platino", "Ronda Perfecta",
          "Tormenta Mental", "Cero Fallos", "Matemático Veloz", "Sombra Astral",
          "Giro Infinito", "Espíritu de Lucha", "Isla de Verano", "Campeonato"
        ];
        const namesIndex = c - 13;
        name = collectibleNames[namesIndex % collectibleNames.length] || `Cromo Especial #${c}`;
        rarity = c % 5 === 0 ? 'legendario' : c % 3 === 0 ? 'epico' : 'raro';
        icon = c % 5 === 0 ? '*' : c % 3 === 0 ? '+' : '.';
        desc = "Insignia escolar otorgada por constancia y cálculo mental veloz.";
      }

      const card = document.createElement('div');
      card.className = `card-item ${isUnlocked ? '' : 'locked'}`;
      card.innerHTML = `
        <div class="card-img-holder" style="font-size: 3rem;">
          ${isUnlocked ? icon : '?'}
        </div>
        <div class="card-name">${isUnlocked ? name : 'Incognito'}</div>
        <div class="card-rarity rarity-${rarity}">${rarity}</div>
      `;

      if (isUnlocked) {
        card.onclick = () => {
          sounds.playClick();
          this.showNotice(`CROMO DE COLECCION\n\nNombre: ${name}\nRareza: ${rarity.toUpperCase()}\n\n${desc}`, "Album");
        };
      }
      container.appendChild(card);
    }
  }

  // -------------------- COMBAT ARENA GAMEPLAY --------------------
  getCurriculumMissionForCombat() {
    if (this.selectedWeekNum === 'post-boss-review') return null;
    const currentMission = LearningEngine.getCurrentMission(this.state);
    if (currentMission && currentMission.subject.id === 'math') return currentMission;
    return LearningEngine.getNextMissionBySubject(this.state, 'math');
  }

  startPostBossReview(week = null) {
    sounds.playClick();
    const plan = LearningEngine.getPostBossReviewPlan(this.state, week);
    if (!plan || plan.completed) {
      this.showNotice('No hay repaso post-jefe pendiente ahora mismo.', 'Repaso completado');
      return;
    }
    this.postBossReviewPlan = plan;
    this.selectedWeekNum = 'post-boss-review';
    document.getElementById('daily-mission-modal').style.display = 'none';
    this.showScreen('combat');
    if (this.combatSession && typeof this.combatSession.dispose === 'function') this.combatSession.dispose();
    this.combatSession = new CombatSession('post-boss-review', false, this.state, this);
    this.combatSession.start();
  }

  startCombat(isBoss = false) {
    sounds.playClick();
    if (!this.currentTowerFloor) {
      this.currentTowerFloor = getCurrentTowerFloor(this.state);
    }
    const floorData = getTowerFloorData(this.currentTowerFloor);
    // A tower battle occurs when launched from a floor node (pendingTowerBattle)
    // OR directly from buttons on the map screen (btn-start-training / btn-start-boss)
    // that always play the current tower floor. Both paths must unlock the next floor.
    const isTowerBattle = (this.pendingTowerBattle === true || this.currentScreen === 'map') && !!floorData && floorData.floor === this.currentTowerFloor;
    this.activeTowerBattle = isTowerBattle;
    this.pendingTowerBattle = false;
    // Use floor's week when it's a tower battle; fall back to currentWeek for legacy modal flow
    // Note: use null/undefined check (not falsy) to allow week=0
    if (isTowerBattle && floorData) {
      this.selectedWeekNum = floorData.week != null ? floorData.week : (this.selectedWeekNum ?? this.state.player.currentWeek ?? 1);
    } else if (this.selectedWeekNum == null || Number.isNaN(Number(this.selectedWeekNum))) {
      this.selectedWeekNum = this.state.player.currentWeek || 1;
    }
    const bossReadiness = isBoss
      ? LearningEngine.canUnlockWeeklyBoss(this.state, Math.min(this.selectedWeekNum, CurriculumData.summerWeeks.length))
      : null;
    const gate = ProgressService.canStart(this.state, this.selectedWeekNum, isBoss);
    if (isBoss && !isTowerBattle && !bossReadiness.ok) {
      sounds.playIncorrect();
      this.showNotice(bossReadiness.reason, "Jefe bloqueado");
      return;
    }
    if (!isBoss && !isTowerBattle && !gate.ok) {
      sounds.playIncorrect();
      this.showNotice(gate.reason, "Sesion bloqueada");
      return;
    }
    document.getElementById('daily-mission-modal').style.display = 'none';
    this.showScreen('combat');

    // Create session
    if (this.combatSession && typeof this.combatSession.dispose === 'function') this.combatSession.dispose();
    this.combatSession = new CombatSession(this.selectedWeekNum, isBoss, this.state, this);
    this.combatSession.start();
  }

  triggerCombatHint() {
    if (this.combatSession) {
      this.combatSession.showHint();
    }
  }

  exitCombatToMap() {
    if (this.combatSession && typeof this.combatSession.dispose === 'function') {
      this.combatSession.dispose();
      this.saveState();
    }
    this.combatSession = null;
    this.showScreen('map');
  }

  // -------------------- LANGUAGE / READING MISSIONS --------------------
  getLanguageMissionForReading() {
    const currentMission = LearningEngine.getCurrentMission(this.state);
    if (currentMission && currentMission.subject.id === 'language') return currentMission;
    return LearningEngine.getNextMissionBySubject(this.state, 'language');
  }

  selectReadingForMission(mission) {
    const reading = LearningEngine.selectReadingForMission(this.state, mission)
      || CurriculumData.readingBank[0];
    if (reading) LearningEngine.recordReadingShown(this.state, reading);
    return reading;
  }

  renderLanguageMission() {
    this.languageMission = this.getLanguageMissionForReading();
    this.languageReading = this.selectReadingForMission(this.languageMission);
    this.languageAnswers = {};

    const mission = this.languageMission;
    const reading = this.languageReading;
    if (!mission || !reading) {
      document.getElementById('language-reading-title').innerText = 'Biblioteca sin mision';
      document.getElementById('language-reading-meta').innerText = 'No hay lectura disponible todavia.';
      document.getElementById('language-reading-text').innerText = '';
      document.getElementById('language-question-list').innerHTML = '';
      this.updateLanguageProgress();
      return;
    }

    document.getElementById('language-mission-label').innerText = `Semana ${mission.week} Dia ${mission.day} · ${mission.skill.name}`;
    document.getElementById('language-reading-title').innerText = reading.title;
    document.getElementById('language-reading-meta').innerText = `${mission.weekTitle} · ${mission.missionType.name}`;
    document.getElementById('language-reading-text').innerText = reading.text;
    const writingLabel = document.getElementById('language-writing-label');
    const writingBox = document.querySelector('.language-writing-box');
    const writingInput = document.getElementById('language-writing-input');
    writingInput.value = '';
    if (reading.writingPrompt) {
      if (writingBox) writingBox.style.display = '';
      if (writingLabel) writingLabel.innerText = reading.writingPrompt;
      writingInput.placeholder = 'Escribe tu respuesta en una o dos frases completas.';
    } else if (writingBox) {
      writingBox.style.display = 'none';
    }
    this.renderLanguageQuestionList();
    this.updateLanguageProgress();
  }

  renderLanguageQuestionList() {
    const container = document.getElementById('language-question-list');
    container.innerHTML = '';
    const reading = this.languageReading;
    if (!reading) return;

    reading.questions.forEach((question, questionIndex) => {
      const card = document.createElement('div');
      card.className = 'language-question-card';
      card.innerHTML = `
        <h4>${questionIndex + 1}. ${question.prompt}</h4>
        <div class="language-options" id="language-options-${questionIndex}"></div>
      `;
      container.appendChild(card);

      const options = card.querySelector('.language-options');
      const displayOptions = question.type === 'truefalse'
        ? ['Verdadero', 'Falso']
        : (question.options || []);
      displayOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'language-option';
        btn.type = 'button';
        btn.innerText = option;
        btn.onclick = () => this.handleLanguageAnswer(questionIndex, option);
        options.appendChild(btn);
      });
    });
  }

  handleLanguageAnswer(questionIndex, selectedOption) {
    const reading = this.languageReading;
    if (!reading || !reading.questions[questionIndex]) return;
    const question = reading.questions[questionIndex];
    const isCorrect = question.type === 'truefalse'
      ? (selectedOption === 'Verdadero') === question.answer
      : selectedOption === question.answer;
    this.languageAnswers[questionIndex] = { selectedOption, isCorrect };

    LearningEngine.recordAnswer(this.state, {
      id: `${reading.id}-q${questionIndex + 1}`,
      subject: 'language',
      skill: reading.skill
    }, isCorrect);

    const todayStats = this.getTodayStats();
    todayStats.answers += 1;
    if (isCorrect) {
      sounds.playCorrect();
      todayStats.correct += 1;
      this.state.pedagogy.math.correctAnswers += 1;
    } else {
      sounds.playIncorrect();
      todayStats.incorrect += 1;
      this.state.pedagogy.math.incorrectAnswers += 1;
    }

    const correctOptionText = question.type === 'truefalse'
      ? (question.answer ? 'Verdadero' : 'Falso')
      : question.answer;
    const options = document.getElementById(`language-options-${questionIndex}`);
    if (options) {
      options.querySelectorAll('.language-option').forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        if (btn.innerText === correctOptionText) btn.classList.add('correct');
        if (btn.innerText === selectedOption && !isCorrect) btn.classList.add('incorrect');
      });
    }
    this.updateLanguageProgress();
    this.saveState();
  }

  updateLanguageProgress() {
    const total = this.languageReading ? this.languageReading.questions.length : 0;
    const answered = Object.keys(this.languageAnswers || {}).length;
    const percent = total > 0 ? Math.round((answered / total) * 100) : 0;
    document.getElementById('language-progress-label').innerText = `${answered}/${total} respuestas`;
    document.getElementById('language-progress-bar').style.width = `${percent}%`;
  }

  completeLanguageMission() {
    const mission = this.languageMission;
    const reading = this.languageReading;
    if (!mission || !reading) return;

    const answered = Object.keys(this.languageAnswers).length;
    if (answered < reading.questions.length) {
      this.showNotice('Responde todas las preguntas de lectura antes de completar la mision.', 'Lectura incompleta');
      return;
    }

    const writing = document.getElementById('language-writing-input').value.trim();
    if (reading.writingPrompt && writing.length < 12) {
      this.showNotice('Escribe al menos una frase completa sobre la lectura.', 'Falta escritura');
      return;
    }

    if (reading.writingPrompt && writing) {
      LearningEngine.recordReadingWriting(this.state, reading, writing);
    }

    const correct = Object.values(this.languageAnswers).filter(answer => answer.isCorrect).length;
    const total = reading.questions.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
    LearningEngine.recordAnswer(this.state, {
      id: `${reading.id}-writing`,
      subject: 'language',
      skill: 'lang_writing_story'
    }, true);

    const currentMission = LearningEngine.getCurrentMission(this.state);
    const completion = currentMission && currentMission.key === mission.key
      ? LearningEngine.recordMissionCompletion(this.state, mission, { accuracy, answers: total, evidence: writing })
      : LearningEngine.recordPracticeSession(this.state, mission, { accuracy, answers: total, evidence: writing });

    this.state.player.coins += 10;
    this.state.player.xp += 20;
    this.saveState();
    this.renderHeader();
    this.showNotice(`Mision de lectura completada.\nComprension: ${accuracy}%\nHas ganado 10 monedas y 20 XP.`, 'Biblioteca completada')
      .then(() => {
        if (completion.ok) this.showScreen('map');
      });
  }

  // -------------------- ENGLISH / SCIENCE MISSIONS --------------------
  openSubjectMission(subjectId) {
    this.subjectMissionType = subjectId;
    this.showScreen('subject');
  }

  getSubjectMission(subjectId) {
    const currentMission = LearningEngine.getCurrentMission(this.state);
    if (currentMission && currentMission.subject.id === subjectId) return currentMission;
    return LearningEngine.getNextMissionBySubject(this.state, subjectId);
  }

  renderSubjectMission() {
    const subjectId = this.subjectMissionType || 'english';
    this.subjectMission = this.getSubjectMission(subjectId);
    this.subjectAnswers = {};

    const mission = this.subjectMission;
    if (!mission) {
      document.getElementById('subject-mission-world').innerText = 'Mundo no disponible';
      document.getElementById('subject-mission-title').innerText = 'Sin mision';
      document.getElementById('subject-mission-focus').innerText = 'No hay contenido preparado para esta materia.';
      document.getElementById('subject-question-list').innerHTML = '';
      this.subjectQuestions = [];
      this.updateSubjectMissionProgress();
      return;
    }

    const questions = LearningEngine.selectQuestionsForMission(this.state, mission, 4);
    const fallbackQuestions = typeof LearningEngine.allowedQuestionBank === 'function'
      ? LearningEngine.allowedQuestionBank().filter(q => q.subject === subjectId)
      : CurriculumData.questionBank.filter(q => q.subject === subjectId && q.skill !== 'math_division_intro');
    this.subjectQuestions = questions.length > 0 ? questions : fallbackQuestions.slice(0, 4);

    document.getElementById('subject-mission-world').innerText = mission.subject.worldName;
    document.getElementById('subject-mission-title').innerText = `${mission.subject.name}: ${mission.skill.name}`;
    document.getElementById('subject-mission-focus').innerText = mission.focus;
    document.getElementById('subject-mission-evidence').innerText = this.subjectMissionEvidenceText(mission);
    document.getElementById('subject-evidence-input').value = '';
    this.renderSubjectQuestionList();
    this.updateSubjectMissionProgress();
  }

  subjectMissionEvidenceText(mission) {
    if (mission.subject.id === 'english') {
      return 'Objetivo: entender una palabra o frase y responder con calma. La evidencia puede ser una frase en ingles o su traduccion.';
    }
    if (mission.missionType.id === 'project') {
      const offline = CurriculumData.offlineMissions.find(item => item.subject === mission.subject.id && item.skill === mission.skill.id);
      return offline ? `${offline.title}: ${offline.instructions}` : 'Objetivo: observar, clasificar y explicar con tus palabras.';
    }
    return 'Objetivo: observar el mundo cercano, elegir la respuesta y explicar una conclusion breve.';
  }

  renderSubjectQuestionList() {
    const container = document.getElementById('subject-question-list');
    container.innerHTML = '';

    this.subjectQuestions.forEach((question, questionIndex) => {
      const card = document.createElement('div');
      card.className = 'language-question-card';
      card.innerHTML = `
        <h4>${questionIndex + 1}. ${question.prompt}</h4>
        <div class="language-options" id="subject-options-${questionIndex}"></div>
      `;
      container.appendChild(card);

      const options = card.querySelector('.language-options');
      question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'language-option';
        btn.type = 'button';
        btn.innerText = option;
        btn.onclick = () => this.handleSubjectAnswer(questionIndex, option);
        options.appendChild(btn);
      });
    });
  }

  handleSubjectAnswer(questionIndex, selectedOption) {
    const question = this.subjectQuestions[questionIndex];
    if (!question || this.subjectAnswers[questionIndex]) return;
    const isCorrect = selectedOption === question.answer;
    this.subjectAnswers[questionIndex] = { selectedOption, isCorrect };

    LearningEngine.recordAnswer(this.state, question, isCorrect);

    const todayStats = this.getTodayStats();
    todayStats.answers += 1;
    if (isCorrect) {
      sounds.playCorrect();
      todayStats.correct += 1;
      this.state.pedagogy.math.correctAnswers += 1;
    } else {
      sounds.playIncorrect();
      todayStats.incorrect += 1;
      this.state.pedagogy.math.incorrectAnswers += 1;
    }

    const options = document.getElementById(`subject-options-${questionIndex}`);
    if (options) {
      options.querySelectorAll('.language-option').forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        if (btn.innerText === question.answer) btn.classList.add('correct');
        if (btn.innerText === selectedOption && !isCorrect) btn.classList.add('incorrect');
      });
    }
    this.updateSubjectMissionProgress();
    this.saveState();
  }

  updateSubjectMissionProgress() {
    const total = this.subjectQuestions ? this.subjectQuestions.length : 0;
    const answered = Object.keys(this.subjectAnswers || {}).length;
    const percent = total > 0 ? Math.round((answered / total) * 100) : 0;
    document.getElementById('subject-mission-progress-label').innerText = `${answered}/${total} retos`;
    document.getElementById('subject-mission-progress-bar').style.width = `${percent}%`;
  }

  completeSubjectMission() {
    const mission = this.subjectMission;
    if (!mission) return;

    const answered = Object.keys(this.subjectAnswers).length;
    if (answered < this.subjectQuestions.length) {
      this.showNotice('Completa todos los retos antes de cerrar esta mision.', 'Mision incompleta');
      return;
    }

    const evidence = document.getElementById('subject-evidence-input').value.trim();
    if (evidence.length < 8) {
      this.showNotice('Escribe una evidencia corta: una frase, ejemplo o conclusion.', 'Falta evidencia');
      return;
    }

    const correct = Object.values(this.subjectAnswers).filter(answer => answer.isCorrect).length;
    const total = this.subjectQuestions.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
    LearningEngine.recordAnswer(this.state, {
      id: `${mission.key}-evidence`,
      subject: mission.subject.id,
      skill: mission.skill.id
    }, true);

    const currentMission = LearningEngine.getCurrentMission(this.state);
    const completion = currentMission && currentMission.key === mission.key
      ? LearningEngine.recordMissionCompletion(this.state, mission, { accuracy, answers: total, evidence })
      : LearningEngine.recordPracticeSession(this.state, mission, { accuracy, answers: total, evidence });

    this.state.player.coins += 8;
    this.state.player.xp += 18;
    this.saveState();
    this.renderHeader();
    this.showNotice(`Mision completada.\nResultado: ${accuracy}%\nHas ganado 8 monedas y 18 XP.`, mission.subject.name)
      .then(() => {
        if (completion.ok) this.showScreen('map');
      });
  }

  // -------------------- REWARDS COFRE MODAL --------------------
  showRewardModal(weekNum, isBoss, stats) {
    sounds.playVictory();
    this.rewardWeek = weekNum;
    this.rewardIsBoss = isBoss;
    this.rewardSessionKey = stats?.sessionKey || null;
    this.rewardAlreadyClaimed = stats?.rewardAlreadyClaimed || false;
    this.rewardBossSummary = stats?.bossSummary || (isBoss ? LearningEngine.getWeeklyBossSummary(this.state, weekNum) : null);
    this.rewardMatchSummary = stats?.matchSummary || null;
    this.rewardTowerFloor = Math.max(1, Math.min(50, parseInt(stats?.towerFloor || this.currentTowerFloor || getCurrentTowerFloor(this.state), 10) || 1));
    const floorRewardForModal = getTowerFloorData(this.rewardTowerFloor)?.reward || {};
    this.rewardCoins = Math.max(0, parseInt(stats?.coins ?? floorRewardForModal.coins ?? (isBoss ? 100 : 25), 10) || 0);
    this.rewardXp = Math.max(0, parseInt(stats?.xp ?? floorRewardForModal.xp ?? (isBoss ? 150 : 40), 10) || 0);

    const isPostBossReview = weekNum === 'post-boss-review';
    const floorReward = getTowerFloorData(this.rewardTowerFloor)?.reward || null;
    const rewardBey = floorReward?.beyId ? getBeyById(floorReward.beyId) : null;
    const beyAlreadyOwned = rewardBey ? (this.state.inventory.beys || []).includes(rewardBey.id) : false;
    document.getElementById('reward-header-text').innerText = isBoss
      ? "RIVAL DE TORRE SUPERADO!"
      : isPostBossReview
        ? "RECALIBRACION COMPLETADA"
        : "¡ENTRENAMIENTO COMPLETADO!";
    document.getElementById('reward-desc-text').innerText = rewardBey && !beyAlreadyOwned
      ? `Has vencido la planta ${this.rewardTowerFloor}. Abre la capsula para conseguir ${rewardBey.nombre}.`
      : isBoss
        ? `Has vencido un duelo de la X Tower. Abre tu capsula de piezas.`
        : isPostBossReview
        ? "Has estabilizado tu Bey con repaso espaciado. Abre tu capsula."
        : "Has completado la sesion diaria de entrenamiento. Abre tu capsula de piezas.";
    this.renderRewardBossSummary();

    document.getElementById('reward-chest-area').style.display = 'flex';
    document.getElementById('reward-reveal-area').style.display = 'none';
    document.getElementById('reward-modal').style.display = 'flex';

    // Trigger slight shake on start
    const chest = document.getElementById('reward-chest-btn');
    chest.className = 'chest-icon shaking';
    setTimeout(() => chest.className = 'chest-icon', 600);
  }

  renderRewardBossSummary() {
    const container = document.getElementById('reward-boss-summary');
    if (!container) return;
    if (this.rewardMatchSummary) {
      container.innerHTML = this.renderMatchSummaryMarkup(this.rewardMatchSummary);
      container.style.display = 'block';
      return;
    }
    if (!this.rewardIsBoss || !this.rewardBossSummary) {
      container.style.display = 'none';
      container.innerHTML = '';
      return;
    }
    container.innerHTML = this.renderBossSummaryMarkup(this.rewardBossSummary);
    container.style.display = 'block';
  }

  renderMatchSummaryMarkup(summary) {
    if (!summary) return '';
    return `
      <div class="boss-summary-head">
        <strong>Marcador de planta</strong>
        <span class="boss-summary-score">${summary.correct || 0}-${summary.incorrect || 0}</span>
      </div>
      <div class="boss-summary-grid">
        <div><span>Rondas perfectas</span><strong>${summary.roundsWonFirstTry || 0}/${summary.totalRounds || 1}</strong></div>
        <div><span>Rondas repetidas</span><strong>${summary.roundsRepeated || 0}</strong></div>
        <div><span>Mejor combo</span><strong>${summary.bestCombo || 0}</strong></div>
        <div><span>Puntos Finish</span><strong>${summary.finishPoints || 0}</strong></div>
        <div><span>Xtreme</span><strong>${summary.finishStats?.xtreme || 0}</strong></div>
        <div><span>Dash X</span><strong>${summary.xtremeDashUses || 0}</strong></div>
        <div><span>Riesgo X</span><strong>${summary.xtremeDashRisks || 0}</strong></div>
        <div><span>Cambios deck</span><strong>${summary.deckSwitches || 0}</strong></div>
        <div><span>Sin pista</span><strong>${summary.fastCorrect || 0}</strong></div>
        <div><span>Con calma</span><strong>${summary.assistedCorrect || 0}</strong></div>
      </div>
    `;
  }

  renderBossSummaryMarkup(summary) {
    if (!summary) return '';
    const proven = summary.provenSubjects && summary.provenSubjects.length > 0
      ? summary.provenSubjects.map(subject => `<span class="boss-summary-pill">${this.escapeReportText(subject)}</span>`).join('')
      : '<span class="boss-summary-pill">Pendiente de consolidar</span>';
    const review = summary.reviewSkills && summary.reviewSkills.length > 0
      ? summary.reviewSkills.slice(0, 4).map(item => `<span class="boss-summary-pill">${this.escapeReportText(item.subject)}: ${this.escapeReportText(item.name)} ${item.mastery}%</span>`).join('')
      : '<span class="boss-summary-pill">Sin refuerzo critico</span>';
    return `
      <div class="boss-summary-head">
        <strong>${this.escapeReportText(summary.bossName)} · Semana ${summary.week}</strong>
        <span class="boss-summary-score">${summary.accuracy}%</span>
      </div>
      <div class="boss-summary-grid">
        <div class="boss-summary-block">
          <div class="boss-summary-label">Materias probadas</div>
          <div class="boss-summary-list">${proven}</div>
        </div>
        <div class="boss-summary-block">
          <div class="boss-summary-label">Vuelve a repaso</div>
          <div class="boss-summary-list">${review}</div>
        </div>
      </div>
    `;
  }

  openRewardChest() {
    sounds.playSpecial();
    const chest = document.getElementById('reward-chest-btn');
    chest.className = 'chest-icon shaking';

    setTimeout(() => {
      document.getElementById('reward-chest-area').style.display = 'none';
      const canClaimReward = this.rewardSessionKey && ProgressService.claimReward(this.state, this.rewardSessionKey);
      if (!canClaimReward) {
        if (this.state.progress.pendingReward?.key === this.rewardSessionKey) {
          this.state.progress.pendingReward = null;
        }
        this.saveState();
        document.getElementById('reward-item-icon').innerText = '?';
        document.getElementById('reward-item-name').innerText = 'Capsula ya recogida';
        document.getElementById('reward-rarity-badge').innerText = 'COMPLETADO';
        document.getElementById('reward-rarity-badge').className = 'rarity-comun';
        document.getElementById('reward-item-desc').innerText = 'Esta sesion ya estaba completada y no genera recompensas duplicadas.';
        document.getElementById('reward-reveal-area').style.display = 'flex';
        return;
      }
      
      const floorData = getTowerFloorData(this.rewardTowerFloor);
      const floorReward = floorData?.reward || null;
      const rewardBey = floorReward?.beyId ? getBeyById(floorReward.beyId) : null;
      if (!this.state.inventory.beys) this.state.inventory.beys = [];

      // Determine what to reward
      let rewardedPart = null;
      let rewardedBey = null;
      let partType = 'color';

      if (rewardBey && !this.state.inventory.beys.includes(rewardBey.id)) {
        rewardedBey = rewardBey;
        partType = 'bey';
        this.state.inventory.beys.push(rewardedBey.id);
      } else {
        // Choose part type based on week / boss
        if (this.rewardIsBoss) {
          // Boss gives Ring or Core (Epic/Legendary/Cosmic)
          const candidates = ['core', 'ring'];
          partType = candidates[Math.floor(Math.random() * candidates.length)];
        } else {
          // Training gives Driver or Color
          const candidates = ['driver', 'color'];
          partType = candidates[Math.floor(Math.random() * candidates.length)];
        }

        const allParts = CUSTOM_PARTS[partType];
        // Find one not owned
        const owned = this.state.inventory[partType] || [];
        const unowned = allParts.filter(p => !owned.includes(p.id));

        if (unowned.length > 0) {
          // Reward one of the unowned parts
          rewardedPart = unowned[0];
          this.state.inventory[partType].push(rewardedPart.id);
        } else {
          // If all owned, give a random card
          partType = 'card';
        }
      }

      // Handle card reward
      let cardNum = 1;
      if (partType !== 'bey' && (partType === 'card' || !rewardedPart)) {
        partType = 'card';
        // Unlock next chronologic card
        if (!this.state.inventory.cards) this.state.inventory.cards = [];
        const unlocked = this.state.inventory.cards;
        for (let c = 1; c <= 30; c++) {
          if (!unlocked.includes(c)) {
            cardNum = c;
            this.state.inventory.cards.push(c);
            break;
          }
        }
      }

      // Safety net: ensure the completed floor is registered even if recordTowerFloorCompletion
      // was skipped (e.g. isTowerBattle was false). Guarantees highestUnlockedFloor advances.
      if (this.rewardTowerFloor && this.rewardTowerFloor >= 1) {
        if (!this.state.progress.tower) this.state.progress.tower = {};
        if (!this.state.progress.tower.completedFloors) this.state.progress.tower.completedFloors = [];
        if (!this.state.progress.tower.dailyNewFloors) this.state.progress.tower.dailyNewFloors = {};
        const today = StorageService.todayKey();
        if (!this.state.progress.tower.completedFloors.includes(this.rewardTowerFloor)) {
          this.state.progress.tower.completedFloors.push(this.rewardTowerFloor);
          const huf = this.state.progress.tower.highestUnlockedFloor || 1;
          if (this.rewardTowerFloor >= huf) {
            this.state.progress.tower.highestUnlockedFloor = Math.min(50, this.rewardTowerFloor + 1);
            this.state.progress.tower.dailyNewFloors[today] = (this.state.progress.tower.dailyNewFloors[today] || 0) + 1;
          }
        }
      }

      // Usa la recompensa calculada por planta/dificultad; perfiles antiguos caen al valor base.
      const gainedCoins = Math.max(0, parseInt(this.rewardCoins, 10) || (this.rewardIsBoss ? 100 : 25));
      const gainedXp = Math.max(0, parseInt(this.rewardXp, 10) || (this.rewardIsBoss ? 150 : 40));
      this.state.player.coins += gainedCoins;
      this.state.player.xp += gainedXp;
      if (this.state.progress.pendingReward?.key === this.rewardSessionKey) {
        this.state.progress.pendingReward = null;
      }

      this.saveState();
      this.renderHeader();

      // Display the reward details
      const revealIcon = document.getElementById('reward-item-icon');
      const revealName = document.getElementById('reward-item-name');
      const revealRarity = document.getElementById('reward-rarity-badge');
      const revealDesc = document.getElementById('reward-item-desc');

      if (partType === 'bey' && rewardedBey) {
        revealIcon.innerHTML = renderAssetImage(rewardedBey.image, rewardedBey.nombre, 'asset-image reward-bey-image');
        revealName.innerText = rewardedBey.nombre;
        revealRarity.innerText = rewardedBey.rareza.toUpperCase();
        revealRarity.className = `rarity-${rewardedBey.rareza}`;
        revealDesc.innerText = `Nueva Bey desbloqueada para tus combates. Tipo: ${rewardedBey.tipo.toUpperCase()} (+${gainedCoins} chips de energia / +${gainedXp} puntos de giro)`;
      } else if (partType === 'card') {
        revealIcon.innerText = 'B';
        revealName.innerText = `Emblema de arena #${cardNum}`;
        revealRarity.innerText = "COLECCIONABLE";
        revealRarity.className = "rarity-raro";
        revealDesc.innerText = `Nuevo emblema desbloqueado en tu album. (+${gainedCoins} chips de energia / +${gainedXp} puntos de giro)`;
      } else {
        revealIcon.innerHTML = partType === 'color' 
          ? `<div style="width:70px;height:70px;background-color:${rewardedPart.code};border-radius:50%;margin:auto;border:3px solid #fff;"></div>`
          : rewardedPart.image
            ? `<img class="reward-part-image" src="${rewardedPart.image}" alt="${rewardedPart.name}">`
            : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" style="width:70px;height:70px;">${rewardedPart.svg}</svg>`;
        revealName.innerText = rewardedPart.name;
        revealRarity.innerText = rewardedPart.rarity.toUpperCase();
        revealRarity.className = `rarity-${rewardedPart.rarity}`;
        revealDesc.innerText = `Nueva pieza para tu taller. Tipo: ${partType.toUpperCase()} (+${gainedCoins} chips de energia / +${gainedXp} puntos de giro)`;
      }

      document.getElementById('reward-reveal-area').style.display = 'flex';
    }, 600);
  }

  // -------------------- PARENTS PANEL LOGIC --------------------
  renderParentsPanel() {
    const ped = this.state.pedagogy.math;
    const todayStats = this.getTodayStats();
    const learningSummary = LearningEngine.getSubjectSummary(this.state);
    const mathSummary = learningSummary.find(subject => subject.id === 'math');
    const languageSummary = learningSummary.find(subject => subject.id === 'language');
    const englishSummary = learningSummary.find(subject => subject.id === 'english');
    const scienceSummary = learningSummary.find(subject => subject.id === 'science');
    const dueReviews = LearningEngine.getDueReviewItems(this.state);
    
    // Stats calculation
    document.getElementById('parent-stat-days').innerText = this.getTrainingDaysCount();
    
    const minSpent = Math.ceil(todayStats.seconds / 60);
    document.getElementById('parent-stat-time').innerText = `${minSpent} min`;

    const totalAns = ped.correctAnswers + ped.incorrectAnswers;
    const accuracy = totalAns > 0 ? Math.round((ped.correctAnswers / totalAns) * 100) : 100;
    document.getElementById('parent-stat-accuracy').innerText = `${accuracy}%`;

    // Mastered Tables
    const masteredDiv = document.getElementById('parent-mastered-tables');
    masteredDiv.innerHTML = '';
    
    // Auto detect mastered tables: any table with >= 10 correct answers and <= 1 error
    const counts = {};
    const errs = {};
    ped.history.forEach(session => {
      // Dummy check if we have history. In production we track each multiplication
    });
    
    // Add default values based on player progress
    const activeTables = [2, 10]; // Basic
    if (this.state.player.currentWeek > 3) activeTables.push(3);
    if (this.state.player.currentWeek > 4) activeTables.push(4);
    if (this.state.player.currentWeek > 5) activeTables.push(5);
    if (this.state.player.currentWeek > 7) activeTables.push(6, 7);
    if (this.state.player.currentWeek > 9) activeTables.push(8, 9);

    activeTables.forEach(t => {
      masteredDiv.innerHTML += `<span class="stat-pill" style="border-color: var(--green); color: var(--green); margin: 2px;">Tabla del ${t}</span>`;
    });
    if (mathSummary) {
      masteredDiv.innerHTML += `<span class="stat-pill" style="border-color: var(--cyan); color: var(--cyan); margin: 2px;">Mates ${mathSummary.mastery}% dominio</span>`;
      masteredDiv.innerHTML += `<span class="stat-pill" style="border-color: var(--yellow); color: var(--yellow); margin: 2px;">${mathSummary.mastered}/${mathSummary.totalSkills} habilidades</span>`;
    }
    if (languageSummary) {
      masteredDiv.innerHTML += `<span class="stat-pill" style="border-color: var(--purple); color: #c084fc; margin: 2px;">Lengua ${languageSummary.mastery}% dominio</span>`;
      masteredDiv.innerHTML += `<span class="stat-pill" style="border-color: var(--green); color: var(--green); margin: 2px;">${languageSummary.mastered}/${languageSummary.totalSkills} lengua</span>`;
    }
    if (englishSummary) {
      masteredDiv.innerHTML += `<span class="stat-pill" style="border-color: var(--purple); color: #c084fc; margin: 2px;">Ingles ${englishSummary.mastery}%</span>`;
    }
    if (scienceSummary) {
      masteredDiv.innerHTML += `<span class="stat-pill" style="border-color: var(--green); color: var(--green); margin: 2px;">Medio ${scienceSummary.mastery}%</span>`;
    }

    // Weak Operations
    const weakList = document.getElementById('parent-weak-operations');
    weakList.innerHTML = '';
    const uniqueTroubles = [...new Set(ped.troublesomeOperations)];
    
    if (dueReviews.length > 0) {
      dueReviews.slice(0, 5).forEach(item => {
        const skill = CurriculumData.getSkill(item.skillId);
        weakList.innerHTML += `
          <li style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:8px 12px; border-radius:8px; border-left:4px solid var(--yellow);">
            <span>Repaso: <strong>${skill ? skill.name : item.skillId}</strong></span>
            <span style="font-size:0.85rem; color:rgba(255,255,255,0.5);">vence: ${item.dueAt}</span>
          </li>
        `;
      });
    }

    if (uniqueTroubles.length === 0 && dueReviews.length === 0) {
      weakList.innerHTML = `<li>Ninguna registrada todavía. ¡Buen trabajo!</li>`;
    } else {
      uniqueTroubles.forEach(op => {
        const parts = op.split('x');
        const ans = parseInt(parts[0]) * parseInt(parts[1]);
        weakList.innerHTML += `
          <li style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:8px 12px; border-radius:8px; border-left:4px solid var(--pink);">
            <span>Operación: <strong>${op}</strong></span>
            <span style="font-size:0.85rem; color:rgba(255,255,255,0.5);">Resultado: ${ans}</span>
          </li>
        `;
      });
    }

    // Load configs
    document.getElementById('toggle-parent-sounds').checked = this.state.config.soundEnabled;
    document.getElementById('select-parent-difficulty').value = this.state.config.difficulty || 'auto';
    document.getElementById('select-parent-timelimit').value = this.state.config.dailyTimeLimitMinutes.toString();
    document.getElementById('parent-security-log').innerText = ParentalSecurityService.formatAuditLog(this.state);
    this.renderParentWeeklyEvidence();
    this.renderParentSpacedAlerts();
    this.renderParentSummerTimeline();
    this.renderOfflineValidationList();
  }

  renderParentSpacedAlerts() {
    const container = document.getElementById('parent-spaced-alerts');
    if (!container) return;
    const summary = LearningEngine.getSpacedReviewAlertSummary(this.state);
    if (!summary.hasAlert) {
      const note = LearningEngine.getLatestSpacedRecoveryNote(this.state);
      const noteMarkup = note ? this.renderSpacedRecoveryNoteMarkup(note) : '';
      container.innerHTML = `
        <div class="spaced-alert-card clear">
          <strong>Rutina al dia</strong>
          <p>No hay repasos espaciados atrasados. Mantener el calendario 1-3-7.</p>
          <span>Racha actual: ${summary.streak.current} · Mejor: ${summary.streak.best}</span>
        </div>
        ${noteMarkup}
      `;
      return;
    }

    const note = LearningEngine.getLatestSpacedRecoveryNote(this.state);
    const noteMarkup = note ? this.renderSpacedRecoveryNoteMarkup(note) : '';
    container.innerHTML = `
      <div class="spaced-alert-card urgent">
        <strong>${summary.count} repaso${summary.count === 1 ? '' : 's'} atrasado${summary.count === 1 ? '' : 's'}</strong>
        <p>Recuperar con una sesion corta hoy. La racha se mantiene como contexto; el objetivo es volver al ritmo sin castigo.</p>
        <span>Mayor atraso: ${summary.maxDaysLate} dia${summary.maxDaysLate === 1 ? '' : 's'} - Racha actual: ${summary.streak.current}</span>
        <button class="spaced-alert-recover" type="button" data-spaced-recover-week="${summary.recoveryWeek || ''}">Lanzar repaso de recuperacion</button>
      </div>
      <div class="spaced-alert-list">
        ${summary.skills.slice(0, 6).map(item => `
          <div class="spaced-alert-item">
            <strong>${this.escapeReportText(item.subject)}: ${this.escapeReportText(item.skillName)}</strong>
            <span>${item.count} fecha${item.count === 1 ? '' : 's'} - hasta ${item.maxDaysLate} dia${item.maxDaysLate === 1 ? '' : 's'}</span>
          </div>
        `).join('')}
      </div>
      ${noteMarkup}
    `;
    const recoverButton = container.querySelector('[data-spaced-recover-week]');
    if (recoverButton) {
      recoverButton.onclick = () => this.recoverOverdueSpacedReview(parseInt(recoverButton.dataset.spacedRecoverWeek, 10) || null);
    }
  }

  renderSpacedRecoveryNoteMarkup(note) {
    if (!note) return '';
    const cleared = note.clearedSkills && note.clearedSkills.length > 0
      ? note.clearedSkills.map(item => `<span class="spaced-alert-pill">${this.escapeReportText(item.subject)}: ${this.escapeReportText(item.skillName)} - ${item.count}</span>`).join('')
      : '<span class="spaced-alert-pill">Sin habilidades registradas</span>';
    const remaining = note.remainingDates && note.remainingDates.length > 0
      ? note.remainingDates.map(item => `<span class="spaced-alert-pill">${this.escapeReportText(item.dueAt)} - ${this.escapeReportText(item.subject)}</span>`).join('')
      : '<span class="spaced-alert-pill">No quedan fechas pendientes</span>';
    return `
      <div class="spaced-alert-card recovery">
        <strong>Ultima recuperacion completada</strong>
        <p>Se limpiaron ${note.clearedCount} repaso${note.clearedCount === 1 ? '' : 's'} atrasado${note.clearedCount === 1 ? '' : 's'} el ${this.escapeReportText(note.completedAt)}. Racha actual: ${note.streak.current}.</p>
        <div class="spaced-alert-pill-row">${cleared}</div>
        <div class="spaced-alert-mini-title">Fechas que siguen programadas</div>
        <div class="spaced-alert-pill-row">${remaining}</div>
      </div>
    `;
  }

  recoverOverdueSpacedReview(week = null) {
    if (!this.requireParentSession()) return;
    const summary = LearningEngine.getSpacedReviewAlertSummary(this.state);
    if (!summary.hasAlert) {
      this.showNotice('No hay repasos espaciados atrasados ahora mismo.', 'Rutina al dia');
      return;
    }
    this.startPostBossReview(week || summary.recoveryWeek);
  }

  renderParentWeeklyEvidence() {
    const report = LearningEngine.getWeeklyEvidence(this.state);
    const diagnostic = LearningEngine.getDiagnosticSummary(this.state);
    const evidenceContainer = document.getElementById('parent-weekly-evidence');
    const bossContainer = document.getElementById('parent-boss-summary');
    const recommendationsContainer = document.getElementById('parent-weekly-recommendations');
    if (!report || !evidenceContainer || !recommendationsContainer) return;

    const subjectText = Object.entries(report.subjectCounts)
      .map(([subjectId, count]) => `${CurriculumData.subjects[subjectId]?.shortName || subjectId}: ${count}`)
      .join(' · ') || 'Sin misiones cerradas todavia';

    const diagnosticText = diagnostic.completedAt
      ? `Nivel inicial: ${diagnostic.baselineScore}%. Inicio sugerido: semana ${diagnostic.suggestedStartWeek}.`
      : 'Diagnostico inicial pendiente.';

    const evidenceCards = [
      {
        title: 'Diagnostico inicial',
        text: diagnosticText
      },
      {
        title: `Semana ${report.week}: ${report.title}`,
        text: `${report.completedCount}/${report.totalCount} misiones. Acierto medio: ${report.averageAccuracy}%. ${subjectText}.`
      },
      {
        title: 'Foco del dosier',
        text: report.focus
      },
      {
        title: 'Siguiente paso',
        text: report.nextMission ? `${report.nextMission.subject.shortName}: ${report.nextMission.skill.name}` : 'Mantener lectura, calculo y repaso mixto.'
      }
    ];

    evidenceContainer.innerHTML = evidenceCards.map(card => `
      <div class="weekly-evidence-card">
        <strong>${card.title}</strong>
        <p>${card.text}</p>
      </div>
    `).join('');

    if (report.evidence.length > 0) {
      report.evidence.forEach(item => {
        evidenceContainer.innerHTML += `
          <div class="weekly-evidence-card">
            <strong>Dia ${item.day} · ${item.subject}</strong>
            <p>${item.skill}: "${item.text}"</p>
          </div>
        `;
      });
    }

    if (bossContainer) {
      const spacedReviews = LearningEngine.getUpcomingSpacedReviews(this.state).slice(0, 6);
      const spacedMarkup = spacedReviews.length > 0
        ? `
          <div class="boss-summary-block boss-spaced-block">
            <div class="boss-summary-label">Proximas fechas 1-3-7</div>
            <div class="boss-summary-list">
              ${spacedReviews.map(item => `<span class="boss-summary-pill">${this.escapeReportText(item.dueAt)} · ${this.escapeReportText(item.subject)}: ${this.escapeReportText(item.skillName)}</span>`).join('')}
            </div>
          </div>
        `
        : '';
      bossContainer.innerHTML = report.bossSummary
        ? `${this.renderBossSummaryMarkup(report.bossSummary)}${spacedMarkup}`
        : '<div class="weekly-evidence-card"><strong>Jefe semanal</strong><p>Aun no hay resumen. Aparecera al derrotar al jefe de la semana.</p></div>';
    }

    recommendationsContainer.innerHTML = report.weakSkills.length > 0
      ? report.weakSkills.map(item => `
          <span class="weekly-recommendation-pill">${item.subject}: ${item.name} · ${item.mastery}%</span>
        `).join('')
      : '<span class="weekly-recommendation-pill">Sin refuerzos urgentes: mantener rutina diaria.</span>';
  }

  renderParentSummerTimeline() {
    const container = document.getElementById('parent-summer-timeline');
    if (!container) return;
    const timeline = LearningEngine.getSummerTimeline(this.state);
    const statusLabels = {
      completed: 'Completada',
      in_progress: 'En marcha',
      current: 'Actual',
      next: 'Siguiente',
      locked: 'Pendiente'
    };

    container.innerHTML = timeline.map(item => {
      const percent = item.totalCount > 0 ? Math.round((item.completedCount / item.totalCount) * 100) : 0;
      const subjectText = Object.entries(item.subjectCounts)
        .map(([subject, count]) => `${subject} ${count}`)
        .join(' · ') || 'Sin actividad';
      return `
        <div class="timeline-week-card ${item.status}">
          <div class="timeline-week-head">
            <strong>Semana ${item.week}: ${item.title}</strong>
            <span class="timeline-status">${statusLabels[item.status] || item.status}</span>
          </div>
          <p class="timeline-week-focus">${item.focus}</p>
          <div class="timeline-progress-bar">
            <div class="timeline-progress-fill" style="width: ${percent}%"></div>
          </div>
          <div class="timeline-week-meta">
            <span>${item.completedCount}/${item.totalCount} misiones</span>
            <span>${item.averageAccuracy}% acierto</span>
            <span>${item.evidenceCount} evidencias</span>
            <span>${item.pendingOfflineCount} pendientes</span>
          </div>
          <div class="timeline-week-meta">
            <span>${subjectText}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  renderOfflineValidationList() {
    const container = document.getElementById('parent-offline-validation-list');
    if (!container) return;
    const pending = LearningEngine.getPendingOfflineEvidence(this.state);
    if (pending.length === 0) {
      container.innerHTML = '<div class="offline-status-message">No hay retos familiares pendientes de validar.</div>';
      return;
    }

    container.innerHTML = pending.map(item => {
      const subject = CurriculumData.subjects[item.subject];
      const skill = CurriculumData.getSkill(item.skill);
      return `
        <div class="offline-validation-item">
          <div>
            <strong>Semana ${item.week} Dia ${item.day} - ${subject ? subject.shortName : item.subject}</strong>
            <p>${skill ? skill.name : item.skill}: "${item.evidence}"</p>
            <p>${item.parentPrompt}</p>
          </div>
          <button class="btn-action" type="button" data-offline-approve="${item.id}">Validar</button>
        </div>
      `;
    }).join('');

    container.querySelectorAll('[data-offline-approve]').forEach(button => {
      button.onclick = () => this.approveOfflineEvidence(button.dataset.offlineApprove);
    });
  }

  approveOfflineEvidence(evidenceId) {
    if (!this.requireParentSession()) return;
    const result = LearningEngine.approveOfflineEvidence(this.state, evidenceId, 'parent');
    if (!result.ok) {
      this.showNotice(result.reason, 'Validacion pendiente');
      return;
    }
    this.state.player.coins += 14;
    this.state.player.xp += 24;
    this.saveState();
    this.renderHeader();
    this.renderParentsPanel();
    this.showNotice('Reto familiar validado. La mision ya cuenta en la ruta de verano.', 'Validacion completada');
  }

  // Create customized session focusing strictly on child's weaknesses
  generateReinforcementSession() {
    const ped = this.state.pedagogy.math;
    const uniqueTroubles = [...new Set(ped.troublesomeOperations)];

    if (uniqueTroubles.length === 0) {
      this.showNotice("No hay errores registrados. Carlitos tiene un excelente rendimiento. No es necesaria una sesion de refuerzo todavia.", "Sin refuerzo pendiente");
      return;
    }

    // Force start a combat session using custom reinforcement questions
    this.selectedWeekNum = 'reinforce';
    document.getElementById('daily-mission-modal').style.display = 'none';
    this.showScreen('combat');
    if (this.combatSession && typeof this.combatSession.dispose === 'function') this.combatSession.dispose();
    this.combatSession = new CombatSession('reinforce', false, this.state, this);
    this.combatSession.start();
  }
}

// ----------------------------------------------------

// Instantiate App
window.__SpinAcademyCore = {
  SoundFX,
  CurriculumData,
  LearningEngine,
  StorageService,
  ProgressService,
  ParentalSecurityService,
  CombatSession
};

const app = new App();
window.onload = () => {
  app.init();
};
window.app = app; // Bind globally for HTML access
