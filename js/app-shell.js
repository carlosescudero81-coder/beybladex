// App shell configuration for classic-script navigation.
// Keep this file free of App instance state so it can be tested and reused.
const AppShellConfig = {
  headerHiddenScreens: ['start', 'avatar'],
  navigationTargets: {
    map: 'btn-goto-map',
    language: 'btn-goto-language',
    workshop: 'btn-goto-workshop',
    cards: 'btn-goto-cards',
    parents: 'btn-goto-parents',
    modules: 'btn-goto-modules'
  },
  screenRenderers: {
    avatar: ['renderAvatarCustomizer'],
    diagnostic: ['renderDiagnosticPlacement'],
    map: ['renderMap', 'renderSummerPlanner'],
    language: ['renderLanguageMission'],
    subject: ['renderSubjectMission'],
    offline: ['renderOfflineMission'],
    workshop: ['renderWorkshop'],
    cards: ['renderCards'],
    parents: ['renderParentsPanel']
  }
};

window.AppShellConfig = AppShellConfig;
