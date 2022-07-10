const slides = [
    {
        photo: "images/image 2.png",
        name: "Rostov-on-Don, Admiral",
        city: "Rostov-on-Don",
        location: "LCD admiral",
        area: 81,
        time: 3.5,
        cost: "Upon request",
    },
    {
        photo: "images/image 2.1.png",
        name: "Sochi Thieves",
        city: "Sochi",
        location: "Thieves",
        area: 105,
        time: 4,
        cost: "Upon request",
    },
    {
        photo: "images/image 3.jpg",
        name: "Rostov-on-Don Patriotic",
        city: "Rostov-on-Don",
        location: "Patriotic",
        area: 93,
        time: 3,
        cost: "Upon request",
    },
];

const pager = new MyPager(document.querySelector('.projects__photos'))
    .withNavButtons(
        document.querySelector(".projects__navigation>.projects__prev"),
        document.querySelector(".projects__navigation>.projects__next"))
    .withKnobs(
        document.querySelector(".projects__navigation>.projects__knobs"),
        item => `<button class="projects__knob button_point button" title="${item.name}" />`)
    .withTabs(document.querySelector(".projects__list"))
    .withCustomHandler(item => {
        selectedProjectCity.innerHTML = `${item.city}<br>${item.location}`;
        selectedProjectArea.innerText = item.area + " m2";
        selectedProjectTime.innerText = item.time + " months";
        selectedProjectCost.innerText = item.cost;
    });

pager.setData(slides);
