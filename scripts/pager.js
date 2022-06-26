
var currentProject = 0;
var projectsCount = document.querySelectorAll(".projects__list>li").length;

function setProjectHandlers()
{
    let knobs = document.querySelectorAll(".projects__navigatiom>.projects__knob");

    for (let i = 0; i < knobs.length; i++)
    {
        let knob = knobs[i];
        knob.addEventListener("click", () => setProject(i));
    }

    let prev = document.querySelector(".projects__navigatiom>.projects__prev");
    prev.addEventListener("click", () => setPrevProject());

    let next = document.querySelector(".projects__navigatiom>.projects__next");
    next.addEventListener("click", () => setNextProject());
}

function setProject(projectNum)
{
    let projects = document.querySelectorAll(".projects__list>li");
    let knobs = document.querySelectorAll(".projects__navigatiom>.projects__knob");

    for (let i = 0; i < projects.length; i++)
    {
        let project = projects[i];
        let knob = knobs[i];
        
        if (i == projectNum)
        {
            project.classList.add("active")
            knob.classList.add("active")

            let photo = project.querySelector('.project-item__photo');
            selectedProjectPhoto.src = photo.src;

            let city = project.querySelector('.project-item__city');
            selectedProjectCity.innerHTML = city.innerHTML;

            let area = project.querySelector('.project-item__area');
            selectedProjectArea.innerHTML = area.innerHTML;

            let time = project.querySelector('.project-item__time');
            selectedProjectTime.innerHTML = time.innerHTML;

            let cost = project.querySelector('.project-item__cost');
            selectedProjectCost.innerHTML = cost.innerHTML;
        }
        else
        {
            project.classList.remove("active")
            knob.classList.remove("active")
        }
    }
}

function setNextProject()
{
    if (++currentProject >= projectsCount)
    {
        currentProject = 0;
    }

    setProject(currentProject)
}

function setPrevProject()
{
    if (--currentProject < 0)
    {
        currentProject = Math.max(0, projectsCount - 1);
    }

    setProject(currentProject)
}


setProjectHandlers()
setProject(0)