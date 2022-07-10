class MyPager {
    constructor(
        on,
        pictureGetterFunc = (item) =>
            `<img src="${item.photo}" alt="${item.name}">`,
        activeClass = "active"
    ) {
        this.data = null;
        this.current = 0;
        this.dataCout = 0;
        this.baseElement = on;
        this.pictureGetterFunc = pictureGetterFunc;
        this.activePictureClass = activeClass;
        this.tabsContainer = null;
        this.tabGetterFunc = null;
        this.activeTabClass = "active";
        this.knobsContainer = null;
        this.knobGetterFunc = null;
        this.activeKnobClass = "active";
        this.customHandler = null;
    }

    setData(data) {
        this.data = data;
        this.current = 0;
        this.dataCout = data.length;

        let pictures = "";
        for (let item of this.data) {
            pictures += this.pictureGetterFunc(item);
        }
        this.baseElement.innerHTML = pictures;

        if (this.knobsContainer !== null && this.knobGetterFunc !== null) {
            let knobs = "";
            for (let item of this.data) {
                knobs += this.knobGetterFunc(item);
            }
            this.knobsContainer.innerHTML = knobs;

            let children = this.knobsContainer.childNodes;
            for (let i = 0; i < children.length; ++i) {
                children[i].addEventListener("click", () => this.show(i));
            }
        }

        if (this.tabsContainer !== null && this.tabGetterFunc !== null) {
            let tabs = "";
            for (let item of this.data) {
                tabs += this.tabGetterFunc(item);
            }
            this.tabsContainer.innerHTML = tabs;

            let children = this.tabsContainer.childNodes;
            for (let i = 0; i < children.length; ++i) {
                children[i].addEventListener("click", () => this.show(i));
            }
        }

        this.show(0);

        return this;
    }

    show(idx) {
        if (this.dataCout == 0 || !this.baseElement.hasChildNodes()) return;

        let children = this.baseElement.childNodes;
        children[this.current].classList.remove(this.activePictureClass);
        children[idx].classList.add(this.activePictureClass);

        if (this.knobsContainer !== null) {
            let children = this.knobsContainer.childNodes;
            children[this.current].classList.remove(this.activeKnobClass);
            children[idx].classList.add(this.activeKnobClass);
        }

        if (this.tabsContainer !== null) {
            let children = this.tabsContainer.childNodes;
            children[this.current].classList.remove(this.activeTabClass);
            children[idx].classList.add(this.activeTabClass);
        }

        if (this.customHandler !== null) {
            this.customHandler(this.data[idx]);
        }

        this.current = idx;
    }

    showNext() {
        let idx = this.current;
        if (++idx >= this.dataCout) {
            idx = 0;
        }

        this.show(idx);
    }

    showPrev() {
        let idx = this.current;
        if (--idx < 0) {
            idx = Math.max(0, this.dataCout - 1);
        }

        this.show(idx);
    }

    withNavButtons(prev, next) {
        prev.addEventListener("click", () => this.showPrev());
        next.addEventListener("click", () => this.showNext());

        return this;
    }

    withKnobs(
        on,
        knobGetterFunc = (item) => `<button title="${item.name}"/>`,
        activeClass = "active"
    ) {
        this.knobsContainer = on;
        this.knobGetterFunc = knobGetterFunc;
        this.activeKnobClass = activeClass;

        return this;
    }

    withTabs(
        on,
        tabGetterFunc = (item) => `<li>"${item.name}"</li>`,
        activeClass = "active"
    ) {
        this.tabsContainer = on;
        this.tabGetterFunc = tabGetterFunc;
        this.activeTabClass = activeClass;

        return this;
    }

    withCustomHandler(handler = (item) => item) {
        this.customHandler = handler;

        return this;
    }
}