function youtubeTabsButtonsInit() {
    const TABS_CLASS = 'tabs';
    const TABS_BUTTON_CLASS = `${TABS_CLASS}__button`;
    const TABS_BUTTON_ACTIVE_CLASS = `${TABS_BUTTON_CLASS}--active`;
    const TABS_WRAPPER_SELECTOR = `.${TABS_CLASS}[role="tablist"]`;
    const TABS_BUTTON_SELECTOR = `.${TABS_BUTTON_CLASS}[role="tab"]`;



    const tabsWrapper = document.querySelector(TABS_WRAPPER_SELECTOR);
    const tabsButtons = tabsWrapper.querySelectorAll(TABS_BUTTON_SELECTOR);
    


    const tabsButtonsCount = tabsButtons.length;
    const initialSelectedTabNumber = 1;
    let selectedTab = null;

    if (initialSelectedTabNumber > 0 && initialSelectedTabNumber <= tabsButtonsCount) {
        selectedTab = initialSelectedTabNumber;
    } else {
        throw Error(`Incorrect tab number. There is no tab with an ordinal number ${initialSelectedTabNumber}. Acceptable values are 0-${tabsButtonsCount}.`);
    }

    let initialSelectedTab = tabsWrapper.querySelector(`${TABS_BUTTON_SELECTOR}:nth-of-type(${selectedTab})`);
    initialSelectedTab.classList.add(TABS_BUTTON_ACTIVE_CLASS);
    
    let currentTab = initialSelectedTab;
    moveIndicator(currentTab, initialSelectedTab);
    
    

    // move underline indicator
    function moveIndicator(currentTab, newTab) {
        const tabsWrapperWidth = tabsWrapper.offsetWidth;

        let transitionWidth = null;
        const newTabPosition = currentTab.compareDocumentPosition(newTab);

        if (newTabPosition === 4) { // on the right
            transitionWidth = newTab.offsetLeft + newTab.offsetWidth - currentTab.offsetLeft;
        } else if (newTabPosition === 2) { // on the left
            transitionWidth = currentTab.offsetLeft + currentTab.offsetWidth - newTab.offsetLeft;
            tabsWrapper.style.setProperty('--indicator-move', newTab.offsetLeft + 'px');
        }
        tabsWrapper.style.setProperty('--indicator-width', transitionWidth / tabsWrapper.offsetWidth);
        
        const indicatorTransitionDelay = 0; // 0-100 optimal
        const indicatorTransition = parseInt(window.getComputedStyle(tabsWrapper).getPropertyValue('--indicator-transition')) + indicatorTransitionDelay;

        setTimeout(() => {
            tabsWrapper.style.setProperty('--indicator-move', newTab.offsetLeft + 'px');
            tabsWrapper.style.setProperty('--indicator-width', newTab.offsetWidth / tabsWrapper.offsetWidth);
        }, indicatorTransition)
    }



    tabsWrapper.addEventListener('click', (e) => {
        if (e.target.closest(TABS_BUTTON_SELECTOR)) {
            tabsButtons.forEach(tabBtn => {
                tabBtn.classList.remove(TABS_BUTTON_ACTIVE_CLASS);
            });
            
            const newTab = e.target;
            newTab.classList.add(TABS_BUTTON_ACTIVE_CLASS);

            moveIndicator(currentTab, newTab);

            currentTab = newTab;
        }
    });
}

export { youtubeTabsButtonsInit };