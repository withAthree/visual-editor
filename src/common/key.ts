import browser from './browser';

const currentBrowser = browser();

export default {
  ctrlKeyDown: (e) => {
    return (currentBrowser.system === 'macos' && e.metaKey) || (currentBrowser.system !== 'macos' && e.ctrlKey);
  },
};
